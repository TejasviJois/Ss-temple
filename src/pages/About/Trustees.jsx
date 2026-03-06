import { FiMail, FiPhone } from 'react-icons/fi'
import './About.css'

const trustees = [
  { name: 'Dr. Krupanidhi Guruji', role: 'Founder & Spiritual Head', desc: 'Visionary spiritual leader guiding the temple\'s sacred mission and all rituals.' },
  { name: 'Trustee Member 1', role: 'Managing Trustee', desc: 'Oversees day-to-day operations and administration of the temple trust.' },
  { name: 'Trustee Member 2', role: 'Trustee – Finance', desc: 'Manages financial planning, auditing, and transparent fund allocation.' },
  { name: 'Trustee Member 3', role: 'Trustee – Construction', desc: 'Leads temple construction project, ensuring quality and timely completion.' },
  { name: 'Trustee Member 4', role: 'Trustee – Events & Programs', desc: 'Coordinates all spiritual events, festivals, and devotee programs.' },
  { name: 'Trustee Member 5', role: 'Trustee – Community Outreach', desc: 'Drives charitable initiatives and community welfare programs.' },
]

export default function Trustees() {
  return (
    <div className="about-page">
      <div className="page-banner">
        <h1>Trustees & Team</h1>
        <p>The dedicated individuals behind our sacred mission</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Board of Trustees</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Guided by dharma and devoted to service, our trustees ensure the temple fulfills its sacred purpose.
          </p>

          <div className="trustees-grid">
            {trustees.map((t) => (
              <div key={t.name} className="trustee-card card">
                <div className="trustee-card__avatar">
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <h3>{t.name}</h3>
                <span className="trustee-card__role">{t.role}</span>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="about-text" style={{ marginTop: 60 }}>
            <h2>Join Our Volunteer Team</h2>
            <div className="divider" style={{ margin: '16px 0 24px' }} />
            <p>
              We welcome devoted individuals who wish to serve the temple in various
              capacities — from event management and hospitality to digital outreach and
              construction support. If you feel called to be part of this divine mission,
              please reach out to us.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)' }}>
                <FiMail /> volunteer@samrajyalakshmitemple.org
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)' }}>
                <FiPhone /> +91 98765 43210
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
