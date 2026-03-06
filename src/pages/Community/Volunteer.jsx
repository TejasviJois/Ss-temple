import { useState } from 'react'
import { FiCheck, FiHeart, FiUsers, FiTool, FiBookOpen, FiCamera } from 'react-icons/fi'
import '../Pages.css'
import './Community.css'

const sevaAreas = [
  { icon: <FiHeart />, name: 'Temple Seva', desc: 'Assist in daily puja, cleaning, and flower decoration of the temple.' },
  { icon: <FiUsers />, name: 'Event Management', desc: 'Help organize festivals, celebrations, and community gatherings.' },
  { icon: <FiBookOpen />, name: 'Education & Outreach', desc: 'Teach children, conduct workshops, and spread awareness.' },
  { icon: <FiTool />, name: 'Construction Support', desc: 'Contribute skills to the ongoing temple construction project.' },
  { icon: <FiCamera />, name: 'Media & Digital', desc: 'Photography, videography, social media, and website management.' },
  { icon: <FiUsers />, name: 'Hospitality & Anna Danam', desc: 'Serve food to devotees and manage prasadam distribution.' },
]

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '',
    education: '', skills: '', sevaArea: '', availability: '', message: '',
  })

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  if (submitted) {
    return (
      <div>
        <div className="page-banner">
          <h1>Volunteer / Seva Signup</h1>
          <p>Thank you for offering your seva</p>
        </div>
        <section className="section">
          <div className="container">
            <div className="community-success">
              <div className="community-success__icon"><FiCheck /></div>
              <h2>Application Received!</h2>
              <p>Thank you, <strong>{form.name}</strong>. Your volunteer application has been submitted successfully.</p>
              <p>Our seva coordinator will contact you at <strong>{form.phone}</strong> within 2–3 working days.</p>
              <p className="community-bless">|| श्री समराज्य लक्ष्म्यै नमः ||</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="page-banner">
        <h1>Volunteer / Seva Signup</h1>
        <p>Serve the divine and make a difference in the community</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Seva Opportunities</h2>
          <div className="divider" />
          <p className="section-subtitle">Choose how you'd like to serve at the temple</p>

          <div className="seva-grid">
            {sevaAreas.map((s) => (
              <div key={s.name} className="seva-card card">
                <div className="seva-card__icon">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="volunteer-form-wrap">
            <form className="volunteer-form card" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
              <h2>Volunteer Application</h2>
              <p className="volunteer-form__desc">Fill in your details and our team will reach out to you.</p>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>City / Place *</label>
                  <input type="text" required value={form.city} onChange={e => update('city', e.target.value)} placeholder="Your city" />
                </div>
                <div className="form-group">
                  <label>Education</label>
                  <input type="text" value={form.education} onChange={e => update('education', e.target.value)} placeholder="Your qualification" />
                </div>
                <div className="form-group">
                  <label>Skills</label>
                  <input type="text" value={form.skills} onChange={e => update('skills', e.target.value)} placeholder="Relevant skills" />
                </div>
                <div className="form-group">
                  <label>Preferred Seva Area *</label>
                  <select required value={form.sevaArea} onChange={e => update('sevaArea', e.target.value)}>
                    <option value="">Select area</option>
                    {sevaAreas.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Availability *</label>
                  <select required value={form.availability} onChange={e => update('availability', e.target.value)}>
                    <option value="">Select availability</option>
                    <option>Weekdays</option>
                    <option>Weekends</option>
                    <option>Festivals & Events Only</option>
                    <option>Full-time</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-group form-group--full">
                <label>Additional Information</label>
                <textarea rows={3} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Anything else you'd like us to know" />
              </div>

              <button type="submit" className="btn btn-maroon" style={{ width: '100%', marginTop: 8 }}>
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
