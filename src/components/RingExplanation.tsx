import { Heart, Star, Sparkles } from 'lucide-react'
import type { SymbolismData, RingSpecs } from './types'

interface RingExplanationProps {
  symbolism: SymbolismData
  specs: RingSpecs
}

function RingExplanation({ symbolism, specs }: RingExplanationProps) {
  const getSymbolIcon = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case 'heart':
        return <Heart className="symbol-icon" />
      case 'star':
      case 'eternity':
        return <Star className="symbol-icon" />
      default:
        return <Sparkles className="symbol-icon" />
    }
  }

  return (
    <div className="ring-explanation">
      <h2>Your Ring's Story</h2>
      
      <div className="explanation-content">
        <div className="symbolism-section">
          <h3>Symbolic Meaning</h3>
          <p className="meaning-text">{symbolism.meaning}</p>
          
          <div className="symbols-list">
            <h4>Key Symbols Found in Your Story:</h4>
            <div className="symbols-grid">
              {symbolism.symbols.map((symbol, index) => (
                <div key={index} className="symbol-item">
                  {getSymbolIcon(symbol)}
                  <span className="symbol-name">{symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="design-mapping">
          <h3>How Your Story Influenced the Design</h3>
          <div className="mapping-list">
            {symbolism.designElements.map((element, index) => (
              <div key={index} className="mapping-item">
                <div className="mapping-symbol">✨</div>
                <div className="mapping-content">
                  <strong>{element}</strong>
                  <p>This design element reflects the {symbolism.symbols[index % symbolism.symbols.length]} symbolism from your story.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="technical-choices">
          <h3>Why These Specifications</h3>
          <div className="choices-grid">
            <div className="choice-item">
              <strong>{specs.cut} Cut</strong>
              <p>Chosen to maximize brilliance and reflect your bright future together</p>
            </div>
            <div className="choice-item">
              <strong>{specs.metalType}</strong>
              <p>Selected for its durability and timeless elegance, matching your enduring love</p>
            </div>
            <div className="choice-item">
              <strong>{specs.style} Style</strong>
              <p>This setting style complements the symbolic elements in your story</p>
            </div>
            <div className="choice-item">
              <strong>{specs.carat}ct {specs.stoneType}</strong>
              <p>The size and stone type reflect the significance of your commitment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RingExplanation