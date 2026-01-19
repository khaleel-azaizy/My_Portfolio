import { useState, useEffect, useRef } from 'react'
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
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const mainContentRef = useRef(null)
  const scrollTimeout = useRef(null)
  const isScrolling = useRef(false)

  useEffect(() => {
    // Simulate loading time and wait for assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // Handle touch swipe gestures for mobile navigation
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const diffX = touchStartX.current - touchEndX
      const diffY = touchStartY.current - touchEndY
      
      // Only trigger navigation if horizontal swipe is more significant than vertical
      // and if we're not scrolling within content
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const sectionNames = sections.map(s => s.id)
        const currentIndex = sectionNames.indexOf(activeSection)
        
        if (diffX > 0 && currentIndex < sectionNames.length - 1) {
          // Swipe left -> next section
          setActiveSection(sectionNames[currentIndex + 1])
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right -> previous section
          setActiveSection(sectionNames[currentIndex - 1])
        }
      }
    }

    const mainContent = mainContentRef.current
    if (mainContent && !isLoading) {
      mainContent.addEventListener('touchstart', handleTouchStart, { passive: true })
      mainContent.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('touchstart', handleTouchStart)
        mainContent.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [activeSection, isLoading])

  // Handle wheel scroll navigation for desktop
  useEffect(() => {
    const handleWheel = (e) => {
      // Only enable for desktop (screen width > 768px)
      if (window.innerWidth <= 768) return
      
      // Prevent navigation while already scrolling
      if (isScrolling.current) return
      
      const sectionNames = sections.map(s => s.id)
      const currentIndex = sectionNames.indexOf(activeSection)
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      // Set timeout to detect significant scroll
      scrollTimeout.current = setTimeout(() => {
        if (e.deltaY > 0 && currentIndex < sectionNames.length - 1) {
          // Scrolling down -> next section
          isScrolling.current = true
          setActiveSection(sectionNames[currentIndex + 1])
          setTimeout(() => { isScrolling.current = false }, 800)
        } else if (e.deltaY < 0 && currentIndex > 0) {
          // Scrolling up -> previous section
          isScrolling.current = true
          setActiveSection(sectionNames[currentIndex - 1])
          setTimeout(() => { isScrolling.current = false }, 800)
        }
      }, 100)
    }

    const mainContent = mainContentRef.current
    if (mainContent && !isLoading) {
      mainContent.addEventListener('wheel', handleWheel, { passive: true })
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('wheel', handleWheel)
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [activeSection, isLoading])

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
      <main className="main-content" ref={mainContentRef}>
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
