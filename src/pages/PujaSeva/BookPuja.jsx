import { useState } from 'react'
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi'
import './PujaSeva.css'

const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Moola', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
]

const pujaTypes = [
  { name: 'Samrajya Lakshmi Puja', price: '₹1,100', duration: '1.5 hrs' },
  { name: 'Lakshmi Narayana Puja', price: '₹2,100', duration: '2 hrs' },
  { name: 'Lalitha Sahasranama', price: '₹1,500', duration: '1.5 hrs' },
  { name: 'Ganapathi Homam', price: '₹3,100', duration: '2.5 hrs' },
  { name: 'Navagraha Shanti Puja', price: '₹5,100', duration: '3 hrs' },
  { name: 'Sudarshana Homam', price: '₹4,100', duration: '2.5 hrs' },
  { name: 'Satyanarayana Puja', price: '₹2,500', duration: '2 hrs' },
  { name: 'Special Archana', price: '₹501', duration: '30 min' },
]

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
]

export default function BookPuja() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', gotra: '', nakshatra: '',
    sankalpa: '', selectedPuja: '', date: '', timeSlot: '',
    familyMembers: [{ name: '', relation: '' }],
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const addFamilyMember = () => {
    setForm(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { name: '', relation: '' }],
    }))
  }

  const removeFamilyMember = (index) => {
    setForm(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((_, i) => i !== index),
    }))
  }

  const updateFamilyMember = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.map((m, i) => i === index ? { ...m, [field]: value } : m),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="puja-page">
        <div className="page-banner">
          <h1>Book Puja / Seva</h1>
          <p>Your booking has been received</p>
        </div>
        <section className="section">
          <div className="container">
            <div className="puja-success">
              <div className="puja-success__icon"><FiCheck /></div>
              <h2>Booking Confirmed!</h2>
              <p>
                Thank you, <strong>{form.name}</strong>. Your booking for <strong>{form.selectedPuja}</strong> on{' '}
                <strong>{form.date}</strong> at <strong>{form.timeSlot}</strong> has been received.
              </p>
              <p>We will contact you at {form.phone} to confirm the details and share payment information.</p>
              <p className="puja-success__bless">|| श्री समराज्य लक्ष्म्यै नमः ||</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="puja-page">
      <div className="page-banner">
        <h1>Book Puja / Seva</h1>
        <p>Schedule a sacred puja with personalized sankalpa</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="puja-booking">
            <div className="puja-steps">
              {['Select Puja', 'Personal Details', 'Schedule'].map((label, i) => (
                <div key={label} className={`puja-step ${step > i + 1 ? 'puja-step--done' : ''} ${step === i + 1 ? 'puja-step--active' : ''}`}>
                  <div className="puja-step__num">{step > i + 1 ? <FiCheck /> : i + 1}</div>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="puja-form-section">
                  <h2>Select a Puja / Seva</h2>
                  <div className="puja-types-grid">
                    {pujaTypes.map((p) => (
                      <label
                        key={p.name}
                        className={`puja-type-card ${form.selectedPuja === p.name ? 'puja-type-card--selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="pujaType"
                          value={p.name}
                          checked={form.selectedPuja === p.name}
                          onChange={(e) => update('selectedPuja', e.target.value)}
                        />
                        <div className="puja-type-card__content">
                          <h4>{p.name}</h4>
                          <div className="puja-type-card__meta">
                            <span className="puja-type-card__price">{p.price}</span>
                            <span className="puja-type-card__duration">{p.duration}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="puja-form-actions">
                    <button type="button" className="btn btn-maroon" disabled={!form.selectedPuja} onClick={() => setStep(2)}>
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="puja-form-section">
                  <h2>Personal & Sankalpa Details</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Enter your full name" />
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
                      <label>Gotra *</label>
                      <input type="text" required value={form.gotra} onChange={e => update('gotra', e.target.value)} placeholder="Enter your gotra" />
                    </div>
                    <div className="form-group">
                      <label>Nakshatra *</label>
                      <select required value={form.nakshatra} onChange={e => update('nakshatra', e.target.value)}>
                        <option value="">Select Nakshatra</option>
                        {nakshatras.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group form-group--full">
                    <label>Sankalpa Details</label>
                    <textarea
                      rows={3}
                      value={form.sankalpa}
                      onChange={e => update('sankalpa', e.target.value)}
                      placeholder="Mention your specific prayer/wish for the sankalpa (optional)"
                    />
                  </div>

                  <div className="family-section">
                    <div className="family-section__header">
                      <h3>Family Members</h3>
                      <button type="button" className="btn-icon" onClick={addFamilyMember}>
                        <FiPlus /> Add Member
                      </button>
                    </div>
                    {form.familyMembers.map((m, i) => (
                      <div key={i} className="family-row">
                        <input
                          type="text"
                          placeholder="Member name"
                          value={m.name}
                          onChange={e => updateFamilyMember(i, 'name', e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Relation (e.g. Spouse, Son)"
                          value={m.relation}
                          onChange={e => updateFamilyMember(i, 'relation', e.target.value)}
                        />
                        {form.familyMembers.length > 1 && (
                          <button type="button" className="btn-icon btn-icon--danger" onClick={() => removeFamilyMember(i)}>
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="puja-form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                    <button type="button" className="btn btn-maroon" onClick={() => setStep(3)}>Continue</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="puja-form-section">
                  <h2>Select Date & Time</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Preferred Date *</label>
                      <input type="date" required value={form.date} onChange={e => update('date', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Preferred Time Slot *</label>
                    <div className="time-slots-grid">
                      {timeSlots.map(ts => (
                        <label key={ts} className={`time-slot ${form.timeSlot === ts ? 'time-slot--selected' : ''}`}>
                          <input
                            type="radio"
                            name="timeSlot"
                            value={ts}
                            checked={form.timeSlot === ts}
                            onChange={e => update('timeSlot', e.target.value)}
                          />
                          {ts}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="booking-summary">
                    <h3>Booking Summary</h3>
                    <div className="booking-summary__row">
                      <span>Puja</span><strong>{form.selectedPuja}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>Devotee</span><strong>{form.name}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>Gotra</span><strong>{form.gotra}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>Nakshatra</span><strong>{form.nakshatra}</strong>
                    </div>
                    {form.date && (
                      <div className="booking-summary__row">
                        <span>Date</span><strong>{form.date}</strong>
                      </div>
                    )}
                    {form.timeSlot && (
                      <div className="booking-summary__row">
                        <span>Time</span><strong>{form.timeSlot}</strong>
                      </div>
                    )}
                  </div>

                  <div className="puja-form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
                    <button type="submit" className="btn btn-maroon" disabled={!form.date || !form.timeSlot}>
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
