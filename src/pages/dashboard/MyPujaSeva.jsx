import { FiDownload, FiCalendar } from 'react-icons/fi'
import './Dashboard.css'

const upcoming = [
  { id: 1, puja: 'Samrajya Lakshmi Puja', date: '2026-03-15', time: '9:00 AM', status: 'Confirmed' },
  { id: 2, puja: 'Lalitha Sahasranama Parayana', date: '2026-03-22', time: '6:00 AM', status: 'Confirmed' },
]

const past = [
  { id: 1, puja: 'Lakshmi Narayana Puja', date: '2026-02-10', sankalpa: 'Family peace and prosperity' },
  { id: 2, puja: 'Special Archana', date: '2026-01-28', sankalpa: 'Health and success' },
]

export default function MyPujaSeva() {
  return (
    <div className="dashboard-section">
      <div className="dashboard-form card">
        <h3>Upcoming Bookings</h3>
        <div className="dashboard-list">
          {upcoming.map((b) => (
            <div key={b.id} className="dashboard-list-item">
              <div className="dashboard-list-item__main">
                <strong>{b.puja}</strong>
                <span><FiCalendar /> {b.date} at {b.time}</span>
              </div>
              <div className="dashboard-list-item__meta">
                <span className="dashboard-list-item__status">{b.status}</span>
                <button type="button" className="btn btn-secondary btn--sm"><FiDownload /> Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-form card">
        <h3>Past Pujas</h3>
        <p className="dashboard-form__desc">Sankalpa details and download options for completed pujas.</p>
        <div className="dashboard-list">
          {past.map((b) => (
            <div key={b.id} className="dashboard-list-item">
              <div className="dashboard-list-item__main">
                <strong>{b.puja}</strong>
                <span><FiCalendar /> {b.date}</span>
                <p className="dashboard-list-item__sankalpa">{b.sankalpa}</p>
              </div>
              <button type="button" className="btn btn-secondary btn--sm"><FiDownload /> Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
