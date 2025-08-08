import type { SymbolismData } from '../components/types'

interface LLMConfig {
  apiKey?: string
  model?: string
  baseUrl?: string
}

export class LLMService {
  private config: LLMConfig

  constructor(config: LLMConfig = {}) {
    this.config = {
      model: 'gpt-3.5-turbo',
      baseUrl: 'https://api.openai.com/v1',
      ...config
    }
  }

  async extractSymbolism(story: string): Promise<SymbolismData> {
    if (!story.trim()) {
      throw new Error('Story cannot be empty')
    }

    if (!this.config.apiKey) {
      throw new Error('LLM API key not configured. Please set REACT_APP_OPENAI_API_KEY in your environment.')
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: `You are a jewelry design expert who extracts symbolic meaning from love stories. 
              Analyze the story and return ONLY a JSON object with exactly this structure:
              {
                "symbols": ["array", "of", "3-5", "key", "symbols"],
                "meaning": "meaningful 1-2 sentence interpretation",
                "designElements": ["array", "of", "3-4", "specific", "ring", "design", "elements"]
              }
              
              Focus on symbols like: celestial, nature, infinity, journey, heart, wisdom, harmony, creativity, strength, unity.
              Design elements should be specific ring features like: "star-shaped prong setting", "twisted infinity band", "vintage milgrain detail", etc.`
            },
            {
              role: 'user',
              content: `Extract symbolic meaning from this love story: "${story}"`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        throw new Error(`LLM API request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response from LLM API')
      }

      const content = data.choices[0].message.content
      const symbolismData = JSON.parse(content)

      // Validate the response structure
      if (!symbolismData.symbols || !symbolismData.meaning || !symbolismData.designElements) {
        throw new Error('Invalid symbolism data structure from LLM')
      }

      return symbolismData as SymbolismData
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse LLM response. Please try again.')
      }
      throw error
    }
  }
}

// Export a default instance
export const llmService = new LLMService({
  apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY
})