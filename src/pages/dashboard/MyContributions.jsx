import { Link } from 'react-router-dom'
import { FiMessageCircle, FiImage, FiMusic, FiCheck, FiClock, FiX } from 'react-icons/fi'
import './Dashboard.css'

const contributions = [
  { type: 'Testimonial', title: 'My experience at the temple', date: '2026-02-20', status: 'Approved', icon: FiMessageCircle },
  { type: 'Media', title: 'Festival photos uploaded', date: '2026-02-15', status: 'Approved', icon: FiImage },
  { type: 'Chanting Audio', title: 'Lalitha Sahasranama recording', date: '2026-03-01', status: 'Pending', icon: FiMusic },
]

function StatusBadge({ status }) {
  const icons = { Approved: FiCheck, Pending: FiClock, Rejected: FiX }
  const Icon = icons[status] || FiClock
  return (
    <span className={`dashboard-status dashboard-status--${status.toLowerCase()}`}>
      <Icon /> {status}
    </span>
  )
}

export default function MyContributions() {
  return (
    <div className="dashboard-section">
      <div className="dashboard-form card">
        <h3>My Contributions</h3>
        <p className="dashboard-form__desc">Testimonials, media uploads, and chanting audio you have submitted. Status: Pending / Approved / Rejected.</p>

        <div className="dashboard-list">
          {contributions.map((c, i) => (
            <div key={i} className="dashboard-list-item">
              <div className="dashboard-list-item__icon">
                <c.icon />
              </div>
              <div className="dashboard-list-item__main">
                <strong>{c.title}</strong>
                <span>{c.type} • {c.date}</span>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>

        <div className="dashboard-form__actions">
          <Link to="/community/testimonials" className="btn btn-maroon">Submit Testimonial</Link>
        </div>
      </div>
    </div>
  )
}
