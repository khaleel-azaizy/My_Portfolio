import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [copied, setCopied] = useState('')
    const [submitStatus, setSubmitStatus] = useState('')

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text)
        setCopied(type)
        setTimeout(() => setCopied(''), 2000)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus('error')
            setTimeout(() => setSubmitStatus(''), 3000)
            return
        }

        // Create mailto link with form data
        const subject = encodeURIComponent(formData.subject || 'Portfolio Contact')
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )
        const mailtoLink = `mailto:khaleelazaizy@gmail.com?subject=${subject}&body=${body}`
        
        // Create a temporary anchor element and click it to open email client
        const anchor = document.createElement('a')
        anchor.href = mailtoLink
        anchor.target = '_blank'
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        
        // Show success message and reset form
        setSubmitStatus('success')
        setTimeout(() => {
            setSubmitStatus('')
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
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
                    onSubmit={handleSubmit}
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
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
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
                        required
                    />
                    <button type="submit" className="submit-btn">
                       <p>Send Message</p> <span>→</span>
                    </button>
                    {submitStatus === 'success' && (
                        <motion.p 
                            className="submit-success"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            ✓ Opening email client...
                        </motion.p>
                    )}
                    {submitStatus === 'error' && (
                        <motion.p 
                            className="submit-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            ✗ Please fill in all required fields
                        </motion.p>
                    )}
                </motion.form>
            </div>
            <footer className="contact-footer">
                <p>© 2025 Khaleel Azaizy</p>
            </footer>
        </div>
    )
}

export default Contact
