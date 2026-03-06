import { useState } from 'react'
import { FiStar, FiCheck } from 'react-icons/fi'
import '../Pages.css'
import './Community.css'

const testimonials = [
  {
    name: 'Ramesh Kumar',
    location: 'Bengaluru',
    text: 'The Samrajya Lakshmi Puja transformed my life. After years of struggle, I received unexpected professional growth and financial stability. Guruji\'s guidance is truly divine.',
    rating: 5,
  },
  {
    name: 'Dr. Anjali Sharma',
    location: 'Mumbai',
    text: 'As a doctor, I was skeptical at first. But the peace and clarity I experienced after the Maha Homam was profound. I now regularly participate in temple events and feel deeply connected.',
    rating: 5,
  },
  {
    name: 'Lakshmi Devi',
    location: 'Madhugiri',
    text: 'Guruji\'s vision of free healthcare for all is truly divine. I have been a devotee for over a decade and witnessed countless miracles at the temple. My family owes everything to Samrajya Lakshmi.',
    rating: 5,
  },
  {
    name: 'Suresh Reddy',
    location: 'Hyderabad',
    text: 'Having a world-class temple in our region is a blessing. I donated towards the construction and have seen the progress firsthand — the dedication of the team is remarkable.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    location: 'Chennai',
    text: 'I booked a Lakshmi Narayana Puja for our family. The priests were so thorough and the entire process was seamless. The prasadam we received was beautifully packed and blessed.',
    rating: 5,
  },
  {
    name: 'Venkatesh Iyer',
    location: 'Tumkur',
    text: 'I have been volunteering at the temple for 3 years. The Anna Danam program feeds hundreds every week. Being part of this seva has given my life a deeper purpose.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', text: '' })
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  return (
    <div>
      <div className="page-banner">
        <h1>Devotee Contributions & Testimonials</h1>
        <p>Hear from our devoted community members</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Stories of Divine Grace</h2>
          <div className="divider" />
          <p className="section-subtitle">Real experiences from devotees whose lives were touched by Samrajya Lakshmi</p>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card card">
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FiStar key={j} className="testimonial-star" />
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="volunteer-form-wrap">
            {submitted ? (
              <div className="community-success">
                <div className="community-success__icon"><FiCheck /></div>
                <h2>Thank You!</h2>
                <p>Your testimonial has been submitted. It will appear on the site after review.</p>
              </div>
            ) : (
              <form className="volunteer-form card" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <h2>Share Your Experience</h2>
                <p className="volunteer-form__desc">We'd love to hear how Samrajya Lakshmi has touched your life.</p>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>City / Location *</label>
                    <input type="text" required value={form.location} onChange={e => update('location', e.target.value)} placeholder="Your city" />
                  </div>
                </div>
                <div className="form-group form-group--full">
                  <label>Your Testimonial *</label>
                  <textarea rows={5} required value={form.text} onChange={e => update('text', e.target.value)} placeholder="Share your experience with Shree Samrajya Lakshmi..." />
                </div>
                <button type="submit" className="btn btn-maroon" style={{ width: '100%', marginTop: 8 }}>
                  Submit Testimonial
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
