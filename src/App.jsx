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
  const [isMobile, setIsMobile] = useState(false)
  const [slideDirection, setSlideDirection] = useState(1) // 1 = forward, -1 = backward
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

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track navigation direction
  const handleNavigation = (newSection) => {
    const sectionNames = sections.map(s => s.id)
    const newIndex = sectionNames.indexOf(newSection)
    const currentIndex = sectionNames.indexOf(activeSection)
    setSlideDirection(newIndex > currentIndex ? 1 : -1)
    setActiveSection(newSection)
  }

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
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const sectionNames = sections.map(s => s.id)
        const currentIndex = sectionNames.indexOf(activeSection)
        
        if (diffX > 0 && currentIndex < sectionNames.length - 1) {
          // Swipe left -> next section (slides in from right)
          setSlideDirection(1)
          setActiveSection(sectionNames[currentIndex + 1])
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right -> previous section (slides in from left)
          setSlideDirection(-1)
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
      case 'home': return <Hero key="home" onNavigate={handleNavigation} />
      case 'about': return <About key="about" />
      case 'projects': return <Projects key="projects" />
      case 'skills': return <Skills key="skills" />
      case 'education': return <Education key="education" />
      case 'contact': return <Contact key="contact" />
      default: return null
    }
  }

  // Animation variants for desktop and mobile
  const desktopVariants = {
    initial: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.05, filter: 'blur(10px)' }
  }

  const mobileVariants = {
    initial: { x: slideDirection * 100 + '%', zIndex: 2 },
    animate: { x: 0, zIndex: 2 },
    exit: { x: 0, zIndex: 1, opacity: 1 }
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
        onNavClick={handleNavigation}
      />

      {/* Main Content Area */}
      <main className="main-content" ref={mainContentRef}>
        <AnimatePresence mode="popLayout">
          <motion.section
            key={activeSection}
            className={`section section-${activeSection}`}
            initial={isMobile ? mobileVariants.initial : desktopVariants.initial}
            animate={isMobile ? mobileVariants.animate : desktopVariants.animate}
            exit={isMobile ? mobileVariants.exit : desktopVariants.exit}
            transition={{ 
              duration: isMobile ? 0.4 : 0.5, 
              ease: isMobile ? [0.32, 0.72, 0, 1] : "circOut" 
            }}
          >
            {renderSectionContent()}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
