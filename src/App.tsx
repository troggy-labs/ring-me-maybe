import { Heart, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import RingDesigner from './components/RingDesigner'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="main-nav">
          <a href="#config">Configuration</a>
          <a href="#story">Story</a>
          <a href="#preview">Preview</a>
          <a href="#explanation">Explanation</a>
        </nav>
        <div className="header-content">
          <motion.div
            className="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="heart-icon" />
            <h1>Ring Designer</h1>
            <Sparkles className="sparkle-icon" />
          </motion.div>
          <p>Design the perfect engagement ring with AI-powered personalization</p>
        </div>
      </header>
      
      <main className="app-main">
        <RingDesigner />
      </main>
      
      <footer className="app-footer">
        <p>Creating memories, one ring at a time ✨</p>
      </footer>
    </div>
  )
}

export default App