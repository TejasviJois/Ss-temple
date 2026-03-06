import { Link } from 'react-router-dom'
import './PujaSeva.css'

const rituals = [
  {
    name: 'Samrajya Lakshmi Maha Puja',
    desc: 'The most powerful puja dedicated to Samrajya Lakshmi, performed with full Vedic honors for prosperity and sovereign blessings.',
    duration: '3 hours',
    price: '₹11,000',
    includes: ['108 Lotus Archana', 'Abhishekam', 'Homam', 'Prasadam'],
  },
  {
    name: 'Sri Lalitha Sahasranama Parayana Maha Yagnam',
    desc: 'Grand recitation of the thousand names of Goddess Lalitha with elaborate fire ritual, invoking her complete grace.',
    duration: '5 hours',
    price: '₹21,000',
    includes: ['Full Yagnam', 'Kumkum Archana', 'Anna Danam', 'Special Prasadam'],
  },
  {
    name: 'Ashta Lakshmi Puja Package',
    desc: 'Comprehensive worship of all eight forms of Lakshmi in a single ceremony for complete all-round prosperity.',
    duration: '4 hours',
    price: '₹15,000',
    includes: ['8 Form Archana', 'Abhishekam', 'Alankaram', 'Prasadam'],
  },
  {
    name: 'Navagraha Shanti Maha Homam',
    desc: 'Powerful fire ritual to pacify all nine planetary influences and bring harmony to your life.',
    duration: '4 hours',
    price: '₹18,000',
    includes: ['9 Graha Homam', 'Shanti Puja', 'Raksha', 'Prasadam'],
  },
  {
    name: 'Sudarshana Homam',
    desc: 'Sacred fire ritual invoking Lord Sudarshana for protection from negativity and overcoming obstacles.',
    duration: '2.5 hours',
    price: '₹8,000',
    includes: ['Homam', 'Kavacham', 'Protection Energization', 'Prasadam'],
  },
  {
    name: 'Satyanarayana Maha Puja',
    desc: 'Traditional puja for truth, righteousness, and divine grace in family life.',
    duration: '2 hours',
    price: '₹5,100',
    includes: ['Full Puja', 'Katha Shravanam', 'Panchamritam', 'Prasadam'],
  },
]

export default function SpecialRituals() {
  return (
    <div className="puja-page">
      <div className="page-banner">
        <h1>Special Rituals & Packages</h1>
        <p>Sacred ceremonies for profound spiritual transformation</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="rituals-grid">
            {rituals.map((r) => (
              <div key={r.name} className="ritual-card card">
                <div className="ritual-card__header">
                  <h3>{r.name}</h3>
                  <div className="ritual-card__meta">
                    <span className="ritual-card__price">{r.price}</span>
                    <span className="ritual-card__duration">{r.duration}</span>
                  </div>
                </div>
                <p>{r.desc}</p>
                <div className="ritual-card__includes">
                  <strong>Includes:</strong>
                  <ul>
                    {r.includes.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <Link to="/puja-seva/book" className="btn btn-maroon" style={{ marginTop: 'auto' }}>
                  Book This Ritual
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
