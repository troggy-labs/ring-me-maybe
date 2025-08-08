import type { RingSpecs, SymbolismData } from '../components/types'

interface ImageConfig {
  apiKey?: string
  model?: string
  baseUrl?: string
}

export class ImageService {
  private config: ImageConfig

  constructor(config: ImageConfig = {}) {
    this.config = {
      model: 'dall-e-3',
      baseUrl: 'https://api.openai.com/v1',
      ...config
    }
  }

  async generateRingImage(specs: RingSpecs, symbolism: SymbolismData): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('Image generation API key not configured. Please set REACT_APP_OPENAI_API_KEY in your environment.')
    }

    const prompt = this.buildPrompt(specs, symbolism)

    try {
      const response = await fetch(`${this.config.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          prompt,
          n: 1,
          size: '1024x1024',
          quality: 'hd',
          style: 'natural'
        })
      })

      if (!response.ok) {
        throw new Error(`Image API request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.data || !data.data[0] || !data.data[0].url) {
        throw new Error('Invalid response from image generation API')
      }

      return data.data[0].url
    } catch (error) {
      throw error
    }
  }

  private buildPrompt(specs: RingSpecs, symbolism: SymbolismData): string {
    const metalDescription = this.getMetalDescription(specs.metalType)
    const stoneDescription = this.getStoneDescription(specs.stoneType, specs.cut, specs.carat)
    const styleDescription = this.getStyleDescription(specs.style)
    const symbolismDescription = symbolism.designElements.join(', ')

    return `Professional jewelry photography of an elegant engagement ring. 
    ${stoneDescription} set in ${metalDescription} with ${styleDescription} style.
    Incorporating symbolic design elements: ${symbolismDescription}.
    The ring should be photographed on a clean white background with professional lighting.
    Ultra-high quality, detailed, luxury jewelry photography, photorealistic.
    The design should reflect themes of: ${symbolism.symbols.join(', ')}.
    Studio lighting, macro lens, crystal clear details.`
  }

  private getMetalDescription(metalType: string): string {
    const descriptions: Record<string, string> = {
      'platinum': 'lustrous platinum metal',
      'white-gold': 'polished 14k white gold',
      'yellow-gold': 'warm 14k yellow gold',
      'rose-gold': 'romantic rose gold',
      'palladium': 'bright palladium metal'
    }
    return descriptions[metalType] || 'precious metal'
  }

  private getStoneDescription(stoneType: string, cut: string, carat: number): string {
    const cutDescriptions: Record<string, string> = {
      'round': 'brilliant round cut',
      'princess': 'princess cut square',
      'emerald': 'elegant emerald cut',
      'asscher': 'vintage asscher cut',
      'oval': 'elongated oval cut',
      'radiant': 'radiant cut',
      'pear': 'pear-shaped',
      'heart': 'heart-shaped',
      'marquise': 'marquise cut'
    }

    const stoneDescriptions: Record<string, string> = {
      'diamond': 'sparkling diamond',
      'sapphire': 'brilliant blue sapphire',
      'ruby': 'deep red ruby',
      'emerald': 'vibrant emerald',
      'moissanite': 'brilliant moissanite'
    }

    const cutDesc = cutDescriptions[cut] || cut
    const stoneDesc = stoneDescriptions[stoneType] || stoneType

    return `${carat} carat ${cutDesc} ${stoneDesc}`
  }

  private getStyleDescription(style: string): string {
    const descriptions: Record<string, string> = {
      'solitaire': 'classic solitaire',
      'halo': 'halo surrounded',
      'three-stone': 'three stone',
      'vintage': 'vintage inspired',
      'pave': 'pavé diamond accented',
      'channel': 'channel set',
      'tension': 'modern tension set'
    }
    return descriptions[style] || style
  }
}

// Export a default instance
export const imageService = new ImageService({
  apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY
})