import { Link } from 'react-router-dom'
import './Events.css'

const events = [
  { date: 'Mar 14, 2026', title: 'Maha Shivaratri Special Puja', desc: 'Grand night-long worship with Rudra Abhishekam and cultural programs.', type: 'Festival' },
  { date: 'Mar 25, 2026', title: 'Ugadi Celebrations', desc: 'Telugu & Kannada New Year celebrations with special pujas and Panchangam Shravanam.', type: 'Festival' },
  { date: 'Apr 2, 2026', title: 'Sri Rama Navami', desc: 'Grand celebration of Lord Rama\'s birth with Kalyanam and special archana.', type: 'Festival' },
  { date: 'Apr 14, 2026', title: 'Samrajya Lakshmi Jayanti', desc: 'Annual celebration of Samrajya Lakshmi with Maha Puja and community feast.', type: 'Special' },
  { date: 'May 1, 2026', title: 'Akshaya Tritiya', desc: 'Auspicious day for new beginnings with Lakshmi Puja and gold offering ceremony.', type: 'Festival' },
  { date: 'Every Friday', title: 'Lakshmi Puja & Archana', desc: 'Weekly Lakshmi worship with special 108 archana and deepotsavam.', type: 'Regular' },
  { date: 'Every Full Moon', title: 'Pournami Special Puja', desc: 'Full moon Samrajya Lakshmi worship with Lalitha Sahasranama parayana.', type: 'Regular' },
  { date: 'First Saturday', title: 'Monthly Homam', desc: 'Monthly fire ritual for peace, prosperity, and divine blessings.', type: 'Regular' },
]

const typeColors = {
  Festival: '#8B1A1A',
  Special: '#D4A843',
  Regular: '#2E7D32',
}

export default function TempleCalendar() {
  return (
    <div className="events-page">
      <div className="page-banner">
        <h1>Temple Calendar</h1>
        <p>Upcoming spiritual events and celebrations</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="calendar-filters">
            <span className="calendar-filter calendar-filter--active">All Events</span>
            <span className="calendar-filter">Festivals</span>
            <span className="calendar-filter">Special</span>
            <span className="calendar-filter">Regular</span>
          </div>

          <div className="calendar-list">
            {events.map((e, i) => (
              <div key={i} className="calendar-item card">
                <div className="calendar-item__date">
                  <span>{e.date}</span>
                </div>
                <div className="calendar-item__content">
                  <div className="calendar-item__header">
                    <h3>{e.title}</h3>
                    <span className="calendar-item__type" style={{ background: typeColors[e.type] }}>
                      {e.type}
                    </span>
                  </div>
                  <p>{e.desc}</p>
                </div>
                <Link to="/events/register" className="btn btn-maroon calendar-item__btn">
                  Register
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
