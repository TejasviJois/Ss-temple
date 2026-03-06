import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck } from 'react-icons/fi'
import './Pages.css'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  return (
    <div>
      <div className="page-banner">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                Have questions about our pujas, events, or the temple? Reach out to us
                and we'll be happy to help.
              </p>

              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail__icon"><FiMapPin /></div>
                  <div>
                    <h4>Temple Address</h4>
                    <p>Shree Samrajya Lakshmi Temple,<br />Madhugiri, Tumkur District,<br />Karnataka 572101, India</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail__icon"><FiPhone /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 98765 43210<br />+91 98765 43211</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail__icon"><FiMail /></div>
                  <div>
                    <h4>Email</h4>
                    <p>info@samrajyalakshmitemple.org<br />bookings@samrajyalakshmitemple.org</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail__icon"><FiClock /></div>
                  <div>
                    <h4>Temple Timings</h4>
                    <p>Morning: 6:00 AM – 12:00 PM<br />Evening: 4:00 PM – 8:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              {sent ? (
                <div className="contact-sent card">
                  <div className="contact-sent__icon"><FiCheck /></div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="contact-form card" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                  <h3>Send a Message</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Name *</label>
                      <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label>Phone *</label>
                      <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Subject *</label>
                      <select required value={form.subject} onChange={e => update('subject', e.target.value)}>
                        <option value="">Select a topic</option>
                        <option>Puja Booking Inquiry</option>
                        <option>Event Information</option>
                        <option>Donation / E-Hundi</option>
                        <option>Volunteer Opportunity</option>
                        <option>Temple Visit Information</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group form-group--full">
                    <label>Message *</label>
                    <textarea rows={5} required value={form.message} onChange={e => update('message', e.target.value)} placeholder="How can we help you?" />
                  </div>
                  <button type="submit" className="btn btn-maroon" style={{ width: '100%' }}>Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
