import { motion } from 'framer-motion'

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <div className="about-content">
            <h2 className="section-heading">About Me</h2>
            <div className="about-grid">
                <motion.div
                    className="about-text"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p className="about-intro" variants={itemVariants}>
                        <span className="highlight">Khaleel Azaizy</span> — B.Sc. Software Engineering candidate
                        who enjoys turning real-world problems into reliable digital products.
                    </motion.p>
                    <motion.p className="about-body" variants={itemVariants}>
                        I plan and build <span className="text-white font-bold">full-stack experiences</span> end-to-end — shaping UX, architecting APIs,
                        automating deployments, and weaving <span className="highlight">AI/ML features</span> where they create measurable value.
                    </motion.p>
                    <motion.p className="about-body" variants={itemVariants}>
                        Recent work spans progressive web apps for daily routines, multilingual marketplaces,
                        and data-driven simulations that help teams move faster.
                    </motion.p>
                    <motion.div className="about-actions" variants={itemVariants}>
                        {/* Potential signature or tagline could go here */}
                    </motion.div>
                </motion.div>

                <div className="about-visual">
                    <motion.div
                        className="about-stats"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 2, 0]
                        }}
                    >
                        <div className="stat-card">
                            <span className="stat-number">20+</span>
                            <span className="stat-label">Projects Finished</span>
                            <span className="stat-sublabel">Working with heart, creating with mind</span>
                        </div>
                        {/* Background elements for the card */}
                        <div className="stat-card-bg"></div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default About
