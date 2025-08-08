import { Loader2, Diamond } from 'lucide-react'
import type { RingSpecs } from './types'

interface RingVisualizationProps {
  specs: RingSpecs
  imageUrl: string | null
  isGenerating: boolean
  error?: string | null
}

function RingVisualization({ specs, imageUrl, isGenerating, error }: RingVisualizationProps) {
  return (
    <div className="ring-visualization">
      <h2>Your Ring Preview</h2>
      
      <div className="visualization-container">
        {error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Generation Failed</h3>
            <p className="error-message">{error}</p>
            <div className="error-help">
              <p>Please check your API configuration and try again.</p>
            </div>
          </div>
        ) : isGenerating ? (
          <div className="generating-state">
            <Loader2 className="large-spinner" />
            <p>Creating your personalized ring design...</p>
            <div className="generation-steps">
              <div className="step">✨ Analyzing your love story</div>
              <div className="step">🎨 Extracting meaningful symbols</div>
              <div className="step">💎 Designing your perfect ring</div>
            </div>
          </div>
        ) : imageUrl ? (
          <div className="ring-image-container">
            <img src={imageUrl} alt="Your custom engagement ring" className="ring-image" />
          </div>
        ) : (
          <div className="placeholder-state">
            <Diamond className="placeholder-icon" />
            <h3>Ready to Design</h3>
            <p>Configure your ring settings and share your love story to see your personalized design</p>
          </div>
        )}
      </div>
      
      <div className="current-specs">
        <h3>Current Specifications</h3>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Stone:</span>
            <span className="spec-value">{specs.carat}ct {specs.stoneType}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Cut:</span>
            <span className="spec-value">{specs.cut}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Color:</span>
            <span className="spec-value">{specs.color}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Clarity:</span>
            <span className="spec-value">{specs.clarity}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Metal:</span>
            <span className="spec-value">{specs.metalType}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Style:</span>
            <span className="spec-value">{specs.style}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RingVisualization