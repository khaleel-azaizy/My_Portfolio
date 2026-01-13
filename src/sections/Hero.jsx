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
                                'UI/UX Enthusiast',
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
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
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

                {/* Replaced Code Window with 3D Element - NOW REMOVED per user request */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Placeholder or empty for now */}
                </motion.div>
            </div>
        </div>
    )
}

export default Hero
