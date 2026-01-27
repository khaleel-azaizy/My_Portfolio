import { motion } from 'framer-motion'
import { FaGraduationCap, FaReact, FaRobot, FaCloud } from 'react-icons/fa'

const Education = () => {
    return (
        <div className="education-content">
            <h2 className="section-heading">Academic Journey</h2>
            <div className="education-grid">
                <div className="education-column">
                    <h3 className="column-title">Formal Education</h3>
                    <motion.div
                        className="education-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="edu-icon"><FaGraduationCap /></div>
                        <h3 className="edu-degree">B.Sc. Software Engineering</h3>
                        <p className="edu-school">Kinneret Academic College</p>
                        <p className="edu-year">2021 – Present</p>
                        <p className="edu-desc">
                            Focusing on software architecture, algorithms, and system design.
                        </p>
                    </motion.div>
                </div>

                <div className="education-column">
                    <h3 className="column-title">Self-Directed Learning</h3>
                    <div className="self-taught-list">
                        <motion.div
                            className="self-taught-card"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="st-icon"><FaReact /></div>
                            <div className="st-content">
                                <h4>Full Stack Development</h4>
                                <p>Mastered React, Node.js, and Express through building complex projects like the Daily Habit Tracker and Travel Diary.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="self-taught-card"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="st-icon"><FaRobot /></div>
                            <div className="st-content">
                                <h4>Machine Learning & AI</h4>
                                <p>Deep dived into Neural Networks, PyTorch, and NLP. Implemented models for income classification and sentiment analysis.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="self-taught-card"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="st-icon"><FaCloud /></div>
                            <div className="st-content">
                                <h4>Cloud & DevOps</h4>
                                <p>Learned Docker, Firebase, and basic CI/CD pipelines to deploy and manage applications efficiently.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Education
