import { useState } from 'react'
import type { RingSpecs, SymbolismData } from './types'
import { llmService } from '../services/llmService'
import { imageService } from '../services/imageService'
import RingConfiguration from './RingConfiguration'
import StoryInput from './StoryInput'
import RingVisualization from './RingVisualization'
import RingExplanation from './RingExplanation'

function RingDesigner() {
  const [ringSpecs, setRingSpecs] = useState<RingSpecs>({
    stoneType: 'diamond',
    carat: 1.0,
    color: 'D',
    clarity: 'VVS1',
    cut: 'round',
    metalType: 'platinum',
    style: 'solitaire'
  })
  
  const [story, setStory] = useState('')
  const [symbolism, setSymbolism] = useState<SymbolismData | null>(null)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!story.trim()) return
    
    setIsGenerating(true)
    setError(null)
    
    try {
      // Extract symbolism from story using LLM
      const symbolismResponse = await llmService.extractSymbolism(story)
      setSymbolism(symbolismResponse)
      
      // Generate ring image
      const imageUrl = await imageService.generateRingImage(ringSpecs, symbolismResponse)
      setGeneratedImageUrl(imageUrl)
    } catch (error) {
      console.error('Generation failed:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
      setSymbolism(null)
      setGeneratedImageUrl(null)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="ring-designer">
      <div className="designer-grid">
        <div className="configuration-section">
          <h2>Ring Configuration</h2>
          <RingConfiguration 
            specs={ringSpecs} 
            onSpecsChange={setRingSpecs} 
          />
          
          <h2>Your Love Story</h2>
          <StoryInput 
            story={story} 
            onStoryChange={setStory}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
        
        <div className="visualization-section">
          <RingVisualization 
            specs={ringSpecs}
            imageUrl={generatedImageUrl}
            isGenerating={isGenerating}
            error={error}
          />
          
          {symbolism && generatedImageUrl && (
            <RingExplanation 
              symbolism={symbolism}
              specs={ringSpecs}
            />
          )}
        </div>
      </div>
    </div>
  )
}


export default RingDesigner