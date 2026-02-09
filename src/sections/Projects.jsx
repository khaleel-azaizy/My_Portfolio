import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data'

const Projects = () => {
    const constraintsRef = useRef(null)
    const cardWidth = 340 // card width + gap
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="projects-content">
            <h2 className="section-heading">Projects</h2>
            <div className="projects-slider-wrapper" style={{ overflow: isMobile ? 'visible' : 'hidden' }}>
                <motion.div
                    ref={constraintsRef}
                    className="projects-drag-container"
                    style={{
                        width: '100%',
                        overflow: 'visible',
                        cursor: isMobile ? 'default' : 'grab'
                    }}
                >
                    <motion.div
                        className="projects-grid-inner"
                        drag={isMobile ? false : "x"}
                        dragConstraints={isMobile ? undefined : {
                            left: -(projects.length * cardWidth - window.innerWidth + 400),
                            right: 0
                        }}
                        dragElastic={0.1}
                        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                        style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '20px',
                            padding: isMobile ? '20px 10px' : '20px 50px 20px 10px',
                            cursor: isMobile ? 'default' : 'grab'
                        }}
                        whileTap={isMobile ? {} : { cursor: 'grabbing' }}
                    >
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.title}
                                className={`project-card ${project.gradient}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                whileHover={{
                                    y: -10,
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                                    borderColor: 'rgba(230, 57, 70, 0.3)'
                                }}
                                style={{
                                    minWidth: isMobile ? '100%' : '320px',
                                    width: isMobile ? '100%' : 'auto',
                                    flexShrink: 0
                                }}
                            >
                                <span className="project-icon">{project.icon && <project.icon />}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <span className="project-type">{project.type}</span>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                {project.links.length > 0 && (
                                    <div className="project-links">
                                        {project.links.map((link) => (
                                            <a
                                                key={link.url}
                                                href={link.url}
                                                className="project-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onPointerDown={(e) => e.stopPropagation()}
                                            >
                                                <span>{link.icon}</span>
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Projects
