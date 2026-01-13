import { motion } from 'framer-motion'
import { useState } from 'react'

const Navbar = ({ sections, activeSection, onNavClick }) => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <span className="brand-badge">K</span>
            </div>
            <ul className="nav-links">
                {sections.map((section) => (
                    <li key={section.id}>
                        <button
                            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => onNavClick(section.id)}
                        >
                            <span className="nav-icon">{section.icon}</span>
                            <span className="nav-label">{section.label}</span>
                            {activeSection === section.id && (
                                <motion.span
                                    layoutId="active-nav"
                                    className="nav-indicator"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="nav-footer">
                <a href="https://linkedin.com/in/khaleel-azaizy" target="_blank" rel="noopener noreferrer" className="nav-social">in</a>
                <a href="https://github.com/khaleel-azaizy" target="_blank" rel="noopener noreferrer" className="nav-social">⟨/⟩</a>
            </div>
        </nav>
    )
}

export default Navbar
