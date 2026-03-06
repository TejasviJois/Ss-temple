import { useState } from 'react'
import { FiHeart, FiCheck } from 'react-icons/fi'
import './Pages.css'

const amounts = [101, 251, 501, 1001, 2501, 5001, 11001, 21001]

const causes = [
  { name: 'General Temple Fund', desc: 'Support daily temple operations and maintenance' },
  { name: 'Temple Construction', desc: 'Contribute to the sacred temple building project' },
  { name: 'Anna Danam (Food Service)', desc: 'Feed devotees with free prasadam meals' },
  { name: 'Go Seva (Cow Protection)', desc: 'Support the care of sacred cows at the temple' },
  { name: 'Vidya Danam (Education)', desc: 'Sponsor education for underprivileged children' },
  { name: 'Festival Fund', desc: 'Support grand celebrations of Hindu festivals' },
]

export default function EHundi() {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [cause, setCause] = useState('')
  const [donated, setDonated] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', pancard: '' })

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))
  const selectedAmount = customAmount || amount

  if (donated) {
    return (
      <div>
        <div className="page-banner">
          <h1>E-Hundi</h1>
          <p>Thank you for your generous contribution</p>
        </div>
        <section className="section">
          <div className="container">
            <div className="hundi-success">
              <div className="hundi-success__icon"><FiCheck /></div>
              <h2>Donation Received!</h2>
              <p>Thank you, <strong>{form.name}</strong>, for your generous offering of <strong>₹{selectedAmount}</strong>.</p>
              <p>May Shree Samrajya Lakshmi bless you with prosperity and sovereign grace.</p>
              <p className="hundi-bless">|| श्री समराज्य लक्ष्म्यै नमः ||</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="page-banner">
        <h1>E-Hundi</h1>
        <p>Make a sacred offering to the temple online</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="hundi-container">
            <div className="hundi-left">
              <div className="hundi-icon-large"><FiHeart /></div>
              <h2>Your Offering Matters</h2>
              <p>
                Every contribution to the E-Hundi directly supports the temple's mission —
                from daily worship and maintenance to community service and the ongoing
                construction of the divine abode.
              </p>
              <p>
                All donations are tax-deductible under Section 80G. A receipt will be
                sent to your email and phone.
              </p>

              <h3 style={{ marginTop: 30, marginBottom: 16 }}>Choose a Cause</h3>
              <div className="hundi-causes">
                {causes.map(c => (
                  <label key={c.name} className={`hundi-cause ${cause === c.name ? 'hundi-cause--selected' : ''}`}>
                    <input type="radio" name="cause" value={c.name} checked={cause === c.name} onChange={e => setCause(e.target.value)} />
                    <div>
                      <strong>{c.name}</strong>
                      <span>{c.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="hundi-right">
              <form className="hundi-form card" onSubmit={e => { e.preventDefault(); setDonated(true) }}>
                <h3>Select Amount</h3>
                <div className="hundi-amounts">
                  {amounts.map(a => (
                    <button
                      key={a}
                      type="button"
                      className={`hundi-amount ${amount === String(a) && !customAmount ? 'hundi-amount--selected' : ''}`}
                      onClick={() => { setAmount(String(a)); setCustomAmount('') }}
                    >
                      ₹{a.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="form-group">
                  <label>Or enter custom amount</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="₹ Enter amount"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setAmount('') }}
                  />
                </div>

                <h3 style={{ marginTop: 20 }}>Your Details</h3>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="For receipt" />
                </div>
                <div className="form-group">
                  <label>PAN Card (for 80G receipt)</label>
                  <input type="text" value={form.pancard} onChange={e => update('pancard', e.target.value)} placeholder="ABCDE1234F" />
                </div>

                <button type="submit" className="btn btn-maroon" style={{ width: '100%', marginTop: 16 }} disabled={!selectedAmount}>
                  Donate {selectedAmount ? `₹${Number(selectedAmount).toLocaleString()}` : ''}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
