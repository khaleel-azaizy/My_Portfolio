import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import Navbar from './components/Navbar'
import Background3D from './components/Background3D'
import Loader from './components/Loader'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'
import { sections } from './data'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Simulate loading time and wait for assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'home': return <Hero key="home" onNavigate={setActiveSection} />
      case 'about': return <About key="about" />
      case 'projects': return <Projects key="projects" />
      case 'skills': return <Skills key="skills" />
      case 'education': return <Education key="education" />
      case 'contact': return <Contact key="contact" />
      default: return null
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="portfolio-container">
      {/* Background Effects */}
      <Background3D />
      <div className="bg-grid"></div>
      {/* Removed bg-orbs in favor of 3D background */}

      <Navbar
        sections={sections}
        activeSection={activeSection}
        onNavClick={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.section
            key={activeSection}
            className={`section section-${activeSection}`}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            {renderSectionContent()}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
