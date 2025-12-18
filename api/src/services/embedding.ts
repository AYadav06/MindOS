/**
 * Embedding service for generating vector embeddings
 * Supports Google Gemini API
 */

interface EmbeddingProvider {
  generateEmbedding(text: string): Promise<number[]>;
}

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

    try {
      // Google Gemini OpenAI-compatible embeddings endpoint
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:embedContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: `models/${this.model}`,
            content: {
              parts: [
                {
                  text: text,
                },
              ],
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
        throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      // Gemini returns embedding in data.embedding.values
      if (data.embedding && data.embedding.values) {
        return data.embedding.values;
      }
      throw new Error('Invalid response format from Gemini API');
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }
}

/**
 * Simple embedding provider that uses a hash-based approach
 * This is a fallback when no API key is available (not recommended for production)
 */
class SimpleEmbeddingProvider implements EmbeddingProvider {
  async generateEmbedding(text: string): Promise<number[]> {
    // Simple hash-based embedding (not semantic, just for fallback)
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(384).fill(0);
    
    words.forEach((word, idx) => {
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = ((hash << 5) - hash) + word.charCodeAt(i);
        hash = hash & hash;
      }
      embedding[Math.abs(hash) % 384] += 1 / (idx + 1);
    });

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
  }
}

class EmbeddingService {
  private provider: EmbeddingProvider;

  constructor() {
    const geminiKey = process.env.GEMINI_API_KEY;
    
    if (geminiKey) {
      this.provider = new GeminiEmbeddingProvider(geminiKey);
    } else {
      console.warn('Gemini API key not found. Using simple embedding provider (not recommended for production).');
      this.provider = new SimpleEmbeddingProvider();
    }
  }

  /**
   * Generate embedding for a text string
   */
  async generateEmbedding(text: string): Promise<number[]> {
    return this.provider.generateEmbedding(text);
  }

  /**
   * Generate embedding for content (combines title, tags, and type)
   */
  async generateContentEmbedding(title: string, tags: Array<{ title: string }>, type?: string): Promise<number[]> {
    const tagText = tags.map(tag => tag.title).join(' ');
    const combinedText = `${title} ${tagText} ${type || ''}`.trim();
    return this.generateEmbedding(combinedText);
  }
}

export const embeddingService = new EmbeddingService();

