import { useState } from 'react'
import { motion } from 'framer-motion'
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
        <div className="left-panel">
          <motion.section
            className="configuration-section"
            id="config"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ring Configuration</h2>
            <RingConfiguration
              specs={ringSpecs}
              onSpecsChange={setRingSpecs}
            />
          </motion.section>

          <motion.section
            className="story-section"
            id="story"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2>Your Love Story</h2>
            <StoryInput
              story={story}
              onStoryChange={setStory}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </motion.section>
        </div>

        <div className="right-panel">
          <motion.section
            className="visualization-section"
            id="preview"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RingVisualization
              specs={ringSpecs}
              imageUrl={generatedImageUrl}
              isGenerating={isGenerating}
              error={error}
            />
          </motion.section>

          {symbolism && generatedImageUrl && (
            <motion.section
              className="explanation-section"
              id="explanation"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <RingExplanation symbolism={symbolism} specs={ringSpecs} />
            </motion.section>
          )}
        </div>
      </div>
    </div>
  )
}


export default RingDesigner