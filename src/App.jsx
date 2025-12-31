import { useState, useEffect } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import './App.css'

const sections = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'about', label: 'About', icon: '◈' },
  { id: 'projects', label: 'Projects', icon: '◲' },
  { id: 'skills', label: 'Skills', icon: '⬡' },
  { id: 'education', label: 'Education', icon: '◆' },
  { id: 'contact', label: 'Contact', icon: '✉' },
]

const projects = [
  {
    title: 'Daily Habits Tracker',
    type: 'Full-Stack PWA',
    description: 'A comprehensive web application for tracking daily habits and events with yearly/monthly calendar views.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    icon: '📱',
    gradient: 'gradient-emerald',
    links: [{ label: 'View Code', url: 'https://github.com/khaleel-azaizy/Daily-Habit-Tracker', icon: '⟨/⟩' }]
  },
  {
    title: 'AJ Motors - Car Rental',
    type: 'Dual-Application Platform',
    description: 'A comprehensive car rental platform with customer app and admin dashboard featuring multi-language support.',
    tags: ['React', 'Vite', 'Firebase', 'PWA'],
    icon: '🚗',
    gradient: 'gradient-ocean',
    links: [{ label: 'Live Demo', url: 'https://aj-motors.site/', icon: '↗' }]
  },
  {
    title: 'Travel Diary Platform',
    type: 'Social Platform',
    description: 'A full-stack social platform for travelers to share experiences with interactive maps and photo galleries.',
    tags: ['Angular', 'Express', 'SQL', 'Leaflet.js'],
    icon: '🌍',
    gradient: 'gradient-sunset',
    links: [
      { label: 'Frontend', url: 'https://github.com/khaleel-azaizy/webDevelopment_Travel-Diary', icon: '⟨/⟩' },
      { label: 'Backend', url: 'https://github.com/khaleel-azaizy/webDevelopment_Travel-Diary-server', icon: '⟨/⟩' }
    ]
  },
  {
    title: 'Income Classification ANN',
    type: 'Neural Network',
    description: 'PyTorch neural network achieving 85% accuracy in classifying income brackets from census data.',
    tags: ['Python', 'PyTorch', 'Pandas', 'Scikit-learn'],
    icon: '🧠',
    gradient: 'gradient-purple',
    links: [{ label: 'View Notebook', url: 'https://colab.research.google.com/drive/1iGGvt2jLmkD2pvvzmB9UGclbOle-PbnY', icon: '📓' }]
  },
  {
    title: 'Medical Sensor Simulation',
    type: 'Healthcare IoT',
    description: 'Simulated patient vitals with real-time alerts, visualizations, and anomaly detection for healthcare monitoring.',
    tags: ['Python', 'Matplotlib', 'IoT'],
    icon: '💓',
    gradient: 'gradient-rose',
    links: [{ label: 'View Code', url: 'https://colab.research.google.com/drive/1ysOhiV-WObB7A5XS57omxPijnWvrYH1n', icon: '📓' }]
  },
  {
    title: 'TCP/UDP File Transfer',
    type: 'Network Programming',
    description: 'Client-server file transfer application implementing both TCP and UDP protocols with performance comparison.',
    tags: ['Java', 'TCP', 'UDP', 'Networking'],
    icon: '🔌',
    gradient: 'gradient-cyan',
    links: []
  },
  {
    title: 'ML Lab Exercises',
    type: 'Academic Research',
    description: 'Comprehensive collection of ML algorithms and techniques including supervised and unsupervised learning.',
    tags: ['Python', 'Scikit-learn', 'NumPy', 'Jupyter'],
    icon: '🧪',
    gradient: 'gradient-amber',
    links: []
  },
  {
    title: 'NLP Final Project',
    type: 'Natural Language Processing',
    description: 'Advanced NLP project implementing text classification and sentiment analysis with transformer models.',
    tags: ['Python', 'Transformers', 'PyTorch', 'NLP'],
    icon: '💬',
    gradient: 'gradient-mint',
    links: []
  }
]

const skills = [
  { name: 'HTML5', category: 'frontend', icon: '🌐' },
  { name: 'CSS3', category: 'frontend', icon: '🎨' },
  { name: 'JavaScript', category: 'frontend', icon: '⚡' },
  { name: 'React', category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', icon: '📘' },
  { name: 'Angular', category: 'frontend', icon: '🅰️' },
  { name: 'Bootstrap', category: 'frontend', icon: '🅱️' },
  { name: 'Node.js', category: 'backend', icon: '💚' },
  { name: 'Express.js', category: 'backend', icon: '🚂' },
  { name: 'Python', category: 'backend', icon: '🐍' },
  { name: 'Java', category: 'backend', icon: '☕' },
  { name: 'PHP', category: 'backend', icon: '🐘' },
  { name: 'MongoDB', category: 'backend', icon: '🍃' },
  { name: 'MySQL', category: 'backend', icon: '🗄️' },
  { name: 'Firebase', category: 'backend', icon: '🔥' },
  { name: 'Git', category: 'tools', icon: '📂' },
  { name: 'GitHub', category: 'tools', icon: '🐱' },
  { name: 'Docker', category: 'tools', icon: '🐳' },
  { name: 'VS Code', category: 'tools', icon: '💻' },
  { name: 'Figma', category: 'tools', icon: '🎯' },
  { name: 'NPM', category: 'tools', icon: '📦' },
  { name: 'Terminal', category: 'tools', icon: '⌨️' },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevSection, setPrevSection] = useState('home')
  const [projectIndex, setProjectIndex] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [copied, setCopied] = useState('')

  useEffect(() => {
    // Simulate loading time and wait for assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleNavClick = (sectionId) => {
    if (sectionId === activeSection || isAnimating) return
    
    setIsAnimating(true)
    setPrevSection(activeSection)
    
    // Wait for exit animation to complete (matches CSS transition of 1s)
    setTimeout(() => {
      setActiveSection(sectionId)
    }, 500)
    
    // Total animation duration (exit + enter)
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  const slideProjects = (direction) => {
    const maxIndex = Math.ceil(projects.length / 3) - 1
    setProjectIndex(prev => {
      const newIndex = prev + direction
      if (newIndex < 0) return maxIndex
      if (newIndex > maxIndex) return 0
      return newIndex
    })
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  

  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'home':
        return (
          <>
            <ShaderGradientCanvas
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              <ShaderGradient
                animate="on"
                axesHelper="off"
                brightness={1.2}
                cAzimuthAngle={180}
                cDistance={3.1}
                cPolarAngle={70}
                cameraZoom={1}
                color1="#000000"
                color2="#ff0000"
                color3="#c60000"
                envPreset="city"
                fov={50}
                frameRate={10}
                grain="on"
                lightType="3d"
                pixelDensity={2.1}
                positionX={-1.4}
                positionY={-1.1}
                positionZ={0}
                reflection={0.1}
                rotationX={0}
                rotationY={10}
                rotationZ={50}
                shader="defaults"
                type="plane"
                uAmplitude={1.9}
                uDensity={4}
                uFrequency={5.5}
                uSpeed={0.1}
                uStrength={5.7}
                uTime={0}
                wireframe={false}
              />
            </ShaderGradientCanvas>
            <div className="hero-content">
              <div className="hero-grid">
                <div className="hero-text">
                  <p className="hero-kicker">Hi, I'm</p>
                  <h1 className="hero-name">Khaleel Azaizy</h1>
                  <h2 className="hero-title">Software Engineer</h2>
                  <p className="hero-description">
                    I craft thoughtful digital experiences clean layouts, confident typography, 
                    and purposeful interactions that help brands speak clearly online.
                  </p>
                  <button className="hero-cta" onClick={() => handleNavClick('about')}>
                    Explore My Work
                    <span className="cta-arrow">→</span>
                  </button>
                </div>
                <div className="hero-visual">
                  <div className="code-window">
                    <div className="code-header">
                      <div className="code-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                      </div>
                      <span className="code-title">developer.js</span>
                    </div>
                    <div className="code-body">
                      <div className="code-line">
                        <span className="line-number">1</span>
                        <span className="code-keyword">const</span> <span className="code-variable">developer</span> <span className="code-operator">=</span> <span className="code-bracket">{'{'}</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">2</span>
                        <span className="code-property">  name</span><span className="code-operator">:</span> <span className="code-string">"Khaleel Azaizy"</span><span className="code-operator">,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">3</span>
                        <span className="code-property">  role</span><span className="code-operator">:</span> <span className="code-string">"Software Engineer"</span><span className="code-operator">,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">4</span>
                        <span className="code-property">  skills</span><span className="code-operator">:</span> <span className="code-bracket">[</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">5</span>
                        <span className="code-string">    "React"</span><span className="code-operator">,</span> <span className="code-string">"Node.js"</span><span className="code-operator">,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">6</span>
                        <span className="code-string">    "TypeScript"</span><span className="code-operator">,</span> <span className="code-string">"Python"</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">7</span>
                        <span className="code-bracket">  ]</span><span className="code-operator">,</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">8</span>
                        <span className="code-property">  passion</span><span className="code-operator">:</span> <span className="code-string">"Building things"</span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">9</span>
                        <span className="code-bracket">{'}'}</span><span className="code-operator">;</span>
                      </div>
                      <div className="code-line typing">
                        <span className="line-number">10</span>
                        <span className="cursor">|</span>
                      </div>
                    </div>
                    <div className="code-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )

      case 'about':
        return (
          <div className="about-content">
            <h2 className="section-heading">About Me</h2>
            <div className="about-grid">
              <div className="about-text">
                <p className="about-intro">
                  <span className="highlight">Khaleel Azaizy</span> — B.Sc. Software Engineering candidate 
                  who enjoys turning real-world problems into reliable digital products.
                </p>
                <p className="about-body">
                  I plan and build full-stack experiences end-to-end — shaping UX, architecting APIs, 
                  automating deployments, and weaving AI/ML features where they create measurable value.
                </p>
                <p className="about-body">
                  Recent work spans progressive web apps for daily routines, multilingual marketplaces, 
                  and data-driven simulations that help teams move faster.
                </p>
              </div>
              <div className="about-stats">
                <div className="stat-card">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Projects Finished</span>
                  <span className="stat-sublabel">Working with heart, creating with mind</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="projects-content">
            <h2 className="section-heading">Featured Projects</h2>
            <div className="projects-slider-wrapper">
              <button className="slider-btn prev" onClick={() => slideProjects(-1)}>‹</button>
              <div className="projects-grid">
                {projects.slice(projectIndex * 3, projectIndex * 3 + 3).map((project, idx) => (
                  <div key={idx} className={`project-card ${project.gradient}`}>
                    <div className="project-icon">{project.icon}</div>
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-type">{project.type}</span>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                    {project.links.length > 0 && (
                      <div className="project-links">
                        {project.links.map((link, i) => (
                          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link">
                            {link.icon} {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="slider-btn next" onClick={() => slideProjects(1)}>›</button>
            </div>
            <div className="slider-dots">
              {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, i) => (
                <button 
                  key={i} 
                  className={`dot ${projectIndex === i ? 'active' : ''}`}
                  onClick={() => setProjectIndex(i)}
                />
              ))}
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="skills-content">
            <h2 className="section-heading">Skills & Tools</h2>
            <div className="skills-grid">
              {skills.map((skill, idx) => (
                <div key={idx} className={`skill-card ${skill.category}`}>
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'education':
        return (
          <div className="education-content">
            <h2 className="section-heading">Academic Journey</h2>
            <div className="education-grid">
              <div className="education-text">
                <p className="education-intro">
                  I'm pursuing a <span className="highlight">B.Sc. in Software Engineering</span> at 
                  Kinneret Academic College.
                </p>
                <p className="education-body">
                  Full-stack development, cloud infrastructure, networks, and applied AI/ML — 
                  all grounded in practical problem-solving.
                </p>
              </div>
              <div className="education-card">
                <div className="edu-icon">🎓</div>
                <h3 className="edu-degree">B.Sc. Software Engineering</h3>
                <p className="edu-school">Kinneret Academic College</p>
                <p className="edu-year">2021 – Present</p>
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="contact-content">
            <h2 className="section-heading">Get In Touch</h2>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-item" onClick={() => copyToClipboard('khaleelazaizy@gmail.com', 'email')}>
                  <span className="contact-icon">✉</span>
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">khaleelazaizy@gmail.com</span>
                  </div>
                  <span className={`copy-indicator ${copied === 'email' ? 'show' : ''}`}>Copied!</span>
                </div>
                <div className="contact-item" onClick={() => copyToClipboard('0546585424', 'phone')}>
                  <span className="contact-icon">📱</span>
                  <div className="contact-details">
                    <span className="contact-label">Phone</span>
                    <span className="contact-value">0546585424</span>
                  </div>
                  <span className={`copy-indicator ${copied === 'phone' ? 'show' : ''}`}>Copied!</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="contact-details">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">Daborya, Israel</span>
                  </div>
                </div>
                <div className="contact-socials">
                  <a href="https://linkedin.com/in/khaleel-azaizy" target="_blank" rel="noopener noreferrer" className="social-btn">
                    in
                  </a>
                  <a href="https://github.com/khaleel-azaizy" target="_blank" rel="noopener noreferrer" className="social-btn">
                    ⟨/⟩
                  </a>
                </div>
              </div>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
                <textarea 
                  placeholder="Your Message" 
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <button type="submit" className="submit-btn">
                  Send Message <span>→</span>
                </button>
              </form>
            </div>
            <footer className="contact-footer">
              <p>© 2025 Khaleel Azaizy</p>
            </footer>
          </div>
        )

      default:
        return <h1 className="section-title">{sectionId.toUpperCase()}</h1>
    }
  }

  const getPrevContent = () => {
    return renderSectionContent(prevSection)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader-content">
          <div className="loader-name">
            {'KHALEEL'.split('').map((letter, i) => (
              <span key={i} className="loader-letter" style={{ '--delay': `${i * 0.15}s` }}>
                <span className="letter-bg">{letter}</span>
                <span className="letter-fill">{letter}</span>
              </span>
            ))}
            <span className="loader-space"></span>
            {'AZAIZY'.split('').map((letter, i) => (
              <span key={i + 7} className="loader-letter" style={{ '--delay': `${(i + 8) * 0.15}s` }}>
                <span className="letter-bg">{letter}</span>
                <span className="letter-fill">{letter}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-badge">K</span>
        </div>
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleNavClick(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
                <span className="nav-indicator"></span>
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-footer">
          <a href="https://linkedin.com/in/khaleel-azaizy" target="_blank" rel="noopener noreferrer" className="nav-social">in</a>
          <a href="https://github.com/khaleel-azaizy" target="_blank" rel="noopener noreferrer" className="nav-social">⟨/⟩</a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <div className={`page-wrapper ${isAnimating ? 'rotating' : ''}`}>
          {/* Previous Section (shown during animation) */}
          {isAnimating && (
            <section className={`section section-${prevSection} section-exit`}>
              {getPrevContent()}
            </section>
          )}
          
          {/* Current Section */}
          <section className={`section section-${activeSection} ${isAnimating ? 'section-enter' : ''}`}>
            {renderSectionContent(activeSection)}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
