import { motion } from 'framer-motion'
import { skills } from '../data'

const Skills = () => {
    return (
        <div className="skills-content">
            <h2 className="section-heading">Skills & Tools</h2>
            <div className="skills-grid">
                {skills.map((skill, idx) => (
                    <motion.div
                        key={idx}
                        className={`skill-card ${skill.category}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Skills
