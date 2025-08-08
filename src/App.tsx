import { Heart, Sparkles } from 'lucide-react'
import RingDesigner from './components/RingDesigner'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Heart className="heart-icon" />
            <h1>Ring Designer</h1>
            <Sparkles className="sparkle-icon" />
          </div>
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