import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'

interface StoryInputProps {
  story: string
  onStoryChange: (story: string) => void
  onGenerate: () => void
  isGenerating: boolean
}

function StoryInput({ story, onStoryChange, onGenerate, isGenerating }: StoryInputProps) {
  const [charCount, setCharCount] = useState(story.length)
  const maxLength = 1000

  const handleStoryChange = (value: string) => {
    if (value.length <= maxLength) {
      onStoryChange(value)
      setCharCount(value.length)
    }
  }

  const placeholder = `Tell us your love story! Share the special moments, inside jokes, shared dreams, or meaningful places that define your relationship. For example:

"We met at a coffee shop on a rainy Tuesday morning. Sarah was reading a book about astronomy, and I couldn't help but notice the constellation bookmark peeking out. That led to our first conversation about dreams, stars, and how we both believed in magic. Now, three years later, we still go stargazing every month on our anniversary date. She says I'm her North Star, and I know she's mine. We're both teachers who love traveling, and our dream is to see the Northern Lights together in Iceland next year."`

  return (
    <div className="story-input">
      <div className="story-form">
        <textarea
          className="story-textarea"
          value={story}
          onChange={(e) => handleStoryChange(e.target.value)}
          placeholder={placeholder}
          rows={8}
          disabled={isGenerating}
        />
        
        <div className="story-footer">
          <div className="char-counter">
            <span className={charCount > maxLength * 0.9 ? 'warning' : ''}>
              {charCount}/{maxLength}
            </span>
          </div>
          
          <button 
            className="generate-button"
            onClick={onGenerate}
            disabled={!story.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="spinner" />
                Designing Your Ring...
              </>
            ) : (
              <>
                <Sparkles className="sparkle" />
                Design My Ring
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="story-tips">
        <h3>💡 Tips for a Better Design</h3>
        <ul>
          <li>Mention specific places, activities, or interests you share</li>
          <li>Include meaningful symbols, colors, or themes in your relationship</li>
          <li>Share your personality traits and what makes you unique as a couple</li>
          <li>Describe your hopes and dreams for the future together</li>
          <li>Include any special traditions or inside jokes</li>
        </ul>
      </div>
    </div>
  )
}

export default StoryInput