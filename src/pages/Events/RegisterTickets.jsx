import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import './Events.css'

export default function RegisterTickets() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', event: '', tickets: '1', notes: '' })

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  if (submitted) {
    return (
      <div className="events-page">
        <div className="page-banner">
          <h1>Registration Successful</h1>
          <p>Your ticket has been booked</p>
        </div>
        <section className="section">
          <div className="container">
            <div className="register-success">
              <div className="register-success__icon"><FiCheck /></div>
              <h2>You're Registered!</h2>
              <p>Thank you, <strong>{form.name}</strong>. Your registration for <strong>{form.event}</strong> is confirmed.</p>
              <p>A confirmation will be sent to {form.email || form.phone}.</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="events-page">
      <div className="page-banner">
        <h1>Register / Buy Tickets</h1>
        <p>Secure your spot for upcoming temple events</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="register-form-container">
            <form className="register-form card" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
              <h2>Event Registration</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
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
                  <label>Select Event *</label>
                  <select required value={form.event} onChange={e => update('event', e.target.value)}>
                    <option value="">Choose an event</option>
                    <option>Maha Shivaratri Special Puja - Mar 14</option>
                    <option>Ugadi Celebrations - Mar 25</option>
                    <option>Sri Rama Navami - Apr 2</option>
                    <option>Samrajya Lakshmi Jayanti - Apr 14</option>
                    <option>Akshaya Tritiya - May 1</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Number of Tickets *</label>
                  <select required value={form.tickets} onChange={e => update('tickets', e.target.value)}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group form-group--full">
                <label>Additional Notes</label>
                <textarea rows={3} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Any special requirements or notes" />
              </div>
              <button type="submit" className="btn btn-maroon" style={{ width: '100%', marginTop: 12 }}>
                Register Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
