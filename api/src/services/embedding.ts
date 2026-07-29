/**
 * Embedding service for generating vector embeddings
 * 
 * Provider priority:
 * 1. Google Gemini API — if GEMINI_API_KEY is set (remote cloud)
 * 2. Local Ollama — if USE_LOCAL_OLLAMA=true (local AI server)
 * 3. Built-in TF-IDF Vectorizer — always available, zero dependencies, no API keys
 * 
 * If a remote provider is configured but fails at runtime, the service
 * automatically falls back to the built-in vectorizer so search always works.
 */

interface EmbeddingProvider {
  generateEmbedding(text: string): Promise<number[]>;
}

// ────────────────────────────────────────────
// 1. Remote Google Gemini Embedding Provider
// ────────────────────────────────────────────
class GeminiEmbeddingProvider implements EmbeddingProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'text-embedding-004') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:embedContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: `models/${this.model}`,
          content: { parts: [{ text }] },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    if (data.embedding && data.embedding.values) {
      return data.embedding.values;
    }
    throw new Error('Invalid response format from Gemini API');
  }
}

// ────────────────────────────────────────────
// 2. Local Ollama Provider
// ────────────────────────────────────────────
class LocalOllamaEmbeddingProvider implements EmbeddingProvider {
  private endpoint: string;
  private model: string;

  constructor(endpoint: string = 'http://localhost:11434', model: string = 'nomic-embed-text') {
    this.endpoint = endpoint;
    this.model = model;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.endpoint}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: this.model, prompt: text }),
    });

    if (!response.ok) {
      throw new Error(`Ollama connection error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.embedding;
  }
}

// ────────────────────────────────────────────
// 3. Built-in TF-IDF + N-gram Vectorizer
//    Zero dependencies, no API keys, runs in-process.
//    Produces 512-dim vectors using character n-grams
//    and word-level term frequency features.
// ────────────────────────────────────────────
class LocalTFIDFEmbeddingProvider implements EmbeddingProvider {
  private readonly DIM = 512;

  async generateEmbedding(text: string): Promise<number[]> {
    const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const embedding: number[] = new Array(this.DIM).fill(0);

    // ── Word-level features (first half of vector) ──
    const words = normalized.split(' ').filter(w => w.length > 0);
    const wordFreq = new Map<string, number>();
    for (const w of words) {
      wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
    }

    const halfDim = this.DIM / 2;

    for (const [word, freq] of wordFreq) {
      const tf = Math.log(1 + freq);
      for (let seed = 0; seed < 3; seed++) {
        const h = this.hash(word, seed);
        const idx = h % halfDim;
        const sign = (this.hash(word, seed + 100) & 1) === 0 ? 1 : -1;
        embedding[idx] = (embedding[idx] || 0) + sign * tf;
      }
    }

    // ── Character n-gram features (second half of vector) ──
    const padded = `^${normalized}$`;
    for (let n = 2; n <= 4; n++) {
      for (let i = 0; i <= padded.length - n; i++) {
        const ngram = padded.substring(i, i + n);
        const h = this.hash(ngram, 42 + n);
        const idx = halfDim + (h % halfDim);
        const sign = (this.hash(ngram, 142 + n) & 1) === 0 ? 1 : -1;
        embedding[idx] = (embedding[idx] || 0) + sign * (1 / n);
      }
    }

    // ── L2 normalize ──
    let magnitude = 0;
    for (let i = 0; i < this.DIM; i++) {
      const v = embedding[i] || 0;
      magnitude += v * v;
    }
    magnitude = Math.sqrt(magnitude);

    if (magnitude > 0) {
      for (let i = 0; i < this.DIM; i++) {
        embedding[i] = (embedding[i] || 0) / magnitude;
      }
    }
    return embedding;
  }

  /** FNV-1a inspired hash with seed */
  private hash(str: string, seed: number): number {
    let h = 0x811c9dc5 ^ seed;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0; // ensure unsigned 32-bit
  }
}

// ────────────────────────────────────────────
// Embedding Service (with automatic fallback)
// ────────────────────────────────────────────
class EmbeddingService {
  private primary: EmbeddingProvider | null = null;
  private fallback: LocalTFIDFEmbeddingProvider;
  private useFallbackOnly = false;
  private providerName: string;

  constructor() {
    this.fallback = new LocalTFIDFEmbeddingProvider();

    const geminiKey = process.env.GEMINI_API_KEY;
    const useOllama = process.env.USE_LOCAL_OLLAMA === 'true';

    if (geminiKey && geminiKey.trim().length > 0) {
      this.primary = new GeminiEmbeddingProvider(geminiKey);
      this.providerName = 'Gemini API';
      console.log('📡 Embedding provider: Google Gemini API (with local fallback)');
    } else if (useOllama) {
      this.primary = new LocalOllamaEmbeddingProvider();
      this.providerName = 'Local Ollama';
      console.log('🖥️  Embedding provider: Local Ollama (with local fallback)');
    } else {
      this.primary = null;
      this.useFallbackOnly = true;
      this.providerName = 'Built-in TF-IDF';
      console.log('🧮 Embedding provider: Built-in TF-IDF vectorizer (no API keys needed)');
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    // If we've already determined the primary doesn't work, go straight to fallback
    if (this.useFallbackOnly || !this.primary) {
      return this.fallback.generateEmbedding(text);
    }

    // Try the primary provider, fall back on any failure
    try {
      return await this.primary.generateEmbedding(text);
    } catch (err) {
      console.warn(
        `⚠️  ${this.providerName} failed, switching to built-in TF-IDF vectorizer. Error:`,
        err instanceof Error ? err.message : err
      );
      // Permanently switch to fallback so we don't keep hitting a dead API
      this.useFallbackOnly = true;
      return this.fallback.generateEmbedding(text);
    }
  }

  async generateContentEmbedding(title: string, tags: Array<{ title: string }>, type?: string): Promise<number[]> {
    const tagText = tags.map(tag => tag.title).join(' ');
    const combinedText = `${title} ${tagText} ${type || ''}`.trim();
    return this.generateEmbedding(combinedText);
  }
}

export const embeddingService = new EmbeddingService();
