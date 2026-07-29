/**
 * Content Analysis Service using Google Gemini
 * Provides AI-powered insights and analysis of saved content
 */

export interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  insights: string;
  relatedTopics: string[];
}

class GeminiAnalysisService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gemini-3-pro-preview') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async analyzeContent(
    title: string,
    tags: Array<{ title: string }>,
    type: string,
    link?: string
  ): Promise<AnalysisResult> {
    if (!this.apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    try {
      const tagText = tags.map(tag => tag.title).join(', ');
      const contentContext = link ? `Link: ${link}` : 'This is a note without a link.';
      
      const prompt = `Analyze the following content and provide a comprehensive analysis:

Title: ${title}
Type: ${type}
Tags: ${tagText}
${contentContext}

Please provide:
1. A brief summary (2-3 sentences)
2. Key points (3-5 bullet points)
3. Insights and implications (2-3 sentences)
4. Related topics or concepts (3-5 items)

Format your response as JSON with the following structure:
{
  "summary": "brief summary here",
  "keyPoints": ["point1", "point2", "point3"],
  "insights": "insights here",
  "relatedTopics": ["topic1", "topic2", "topic3"]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
        throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }

      const text = data.candidates[0].content.parts[0].text;
      
      // Try to parse JSON from the response
      try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
        const jsonText = jsonMatch ? jsonMatch[1] : text;
        const parsed = JSON.parse(jsonText.trim());
        
        return {
          summary: parsed.summary || 'No summary available.',
          keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
          insights: parsed.insights || 'No insights available.',
          relatedTopics: Array.isArray(parsed.relatedTopics) ? parsed.relatedTopics : [],
        };
      } catch (parseError) {
        // If JSON parsing fails, return a structured response from the text
        const lines = text.split('\n').filter((line: string) => line.trim());
        return {
          summary: lines[0] || 'Analysis generated successfully.',
          keyPoints: lines.filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('•')).slice(0, 5),
          insights: lines.slice(1, 3).join(' ') || 'No specific insights available.',
          relatedTopics: lines.filter((line: string) => line.toLowerCase().includes('related') || line.toLowerCase().includes('topic')).slice(0, 5),
        };
      }
    } catch (error) {
      console.error('Error analyzing content:', error);
      throw error;
    }
  }
}

class AnalysisService {
  private service: GeminiAnalysisService | null;

  constructor() {
    const geminiKey = process.env.GEMINI_API_KEY;
    
    if (geminiKey) {
      this.service = new GeminiAnalysisService(geminiKey);
    } else {
      console.warn('Gemini API key not found. Content analysis will not be available.');
      this.service = null;
    }
  }

  /**
   * Analyze content and provide insights
   */
  async analyzeContent(
    title: string,
    tags: Array<{ title: string }>,
    type: string,
    link?: string
  ): Promise<AnalysisResult> {
    if (!this.service) {
      throw new Error('Analysis service is not configured. Please set GEMINI_API_KEY.');
    }
    
    return this.service.analyzeContent(title, tags, type, link);
  }

  /**
   * Check if analysis service is available
   */
  isAvailable(): boolean {
    return this.service !== null;
  }
}

export const analysisService = new AnalysisService();

