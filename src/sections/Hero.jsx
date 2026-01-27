import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const Hero = ({ onNavigate }) => {
    return (
        <div className="hero-content">
            <div className="hero-grid">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="hero-kicker">Hello, I'm</p>
                    <h1 className="hero-name">Khaleel Azaizy</h1>
                    <h2 className="hero-title">
                        <TypeAnimation
                            sequence={[
                                'Software Engineer',
                                2000,
                                'Full Stack Developer',
                                2000,
                                'AI Enthusiast',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </h2>
                    <p className="hero-description">
                        Building digital experiences that merge <span className="highlight">performance</span> with <span className="highlight">beauty</span>.
                        Specializing in modern web technologies and scalable architectures.
                    </p>
                    <div className='buttons-box' style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <motion.button
                            className="hero-cta"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('about')}
                        >
                            Explore More
                        </motion.button>
                        <motion.a
                            href="/Resume.pdf"
                            download="Khaleel_Azaizy_Resume.pdf"
                            className="hero-cta"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                        >
                            Download CV
                        </motion.a>
                    </div>
                </motion.div>

                {/* Code Window Visual */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileHover={{
                        y: -8,
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.div
                        className="code-window"
                        whileHover={{
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(230, 57, 70, 0.15)',
                            borderColor: 'rgba(230, 57, 70, 0.4)'
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ border: '1px solid rgba(230, 57, 70, 0.3)' }}
                    >
                        <div className="code-header">
                            <div className="code-dots">
                                <motion.span
                                    className="dot red"
                                    whileHover={{
                                        scale: 1.4,
                                        boxShadow: '0 0 12px #ff5f57',
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                                <motion.span
                                    className="dot yellow"
                                    whileHover={{
                                        scale: 1.4,
                                        boxShadow: '0 0 12px #ffbd2e',
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                                <motion.span
                                    className="dot green"
                                    whileHover={{
                                        scale: 1.4,
                                        boxShadow: '0 0 12px #28c840',
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <motion.span
                                className="code-title"
                                whileHover={{ color: '#fff' }}
                            >
                                developer.js
                            </motion.span>
                        </div>
                        <div className="code-body">
                            <div className="code-line">
                                <span className="line-number">1</span>
                                <span><span className="code-keyword">const</span> <span className="code-variable">developer</span> <span className="code-operator">=</span> <span className="code-bracket">{'{'}</span></span>
                            </div>
                            <div className="code-line">
                                <span className="line-number">2</span>
                                <span>  <span className="code-property">name</span>: <span className="code-string">"Khaleel Azaizy"</span>,</span>
                            </div>
                            <div className="code-line">
                                <span className="line-number">3</span>
                                <span>  <span className="code-property">role</span>: <span className="code-string">"Full Stack Developer"</span>,</span>
                            </div>
                            <div className="code-line">
                                <span className="line-number">4</span>
                                <span>  <span className="code-property">skills</span>: [<span className="code-string">"React"</span>, <span className="code-string">"Node"</span>, <span className="code-string">"Python"</span>],</span>
                            </div>
                            <div className="code-line">
                                <span className="line-number">5</span>
                                <span>  <span className="code-property">passion</span>: <span className="code-string">"Building great UX"</span>,</span>
                            </div>
                            <div className="code-line">
                                <span className="line-number">6</span>
                                <span>  <span className="code-property">available</span>: <span className="code-keyword">true</span>,</span>
                            </div>
                            <div className="code-line">
                                <span className="line-number">7</span>
                                <span><span className="code-bracket">{'}'}</span>;</span>
                            </div>
                            <div className="code-line" style={{ marginTop: '10px' }}>
                                <span className="line-number">8</span>
                                <span><span className="code-keyword">export default</span> <span className="code-variable">developer</span>;</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero
