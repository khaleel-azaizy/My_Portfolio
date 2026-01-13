import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [copied, setCopied] = useState('')

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text)
        setCopied(type)
        setTimeout(() => setCopied(''), 2000)
    }

    return (
        <div className="contact-content">
            <h2 className="section-heading">Get In Touch</h2>
            <div className="contact-grid">
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
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
                </motion.div>
                <motion.form
                    className="contact-form"
                    onSubmit={(e) => e.preventDefault()}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="form-row">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    <textarea
                        placeholder="Your Message"
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <button type="submit" className="submit-btn">
                        Send Message <span>→</span>
                    </button>
                </motion.form>
            </div>
            <footer className="contact-footer">
                <p>© 2025 Khaleel Azaizy</p>
            </footer>
        </div>
    )
}

export default Contact
