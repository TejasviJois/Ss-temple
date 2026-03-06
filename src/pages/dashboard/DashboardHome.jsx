import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiBookOpen, FiHeart, FiCalendar, FiUsers } from 'react-icons/fi'
import './Dashboard.css'

const spiritualMessages = [
  'May Shree Samrajya Lakshmi bless you with prosperity and sovereign grace.',
  'True devotion is the key to receiving divine blessings.',
  'Serve with love; the divine sees every selfless act.',
  'Let your actions reflect the grace of the Goddess.',
]

export default function DashboardHome() {
  const { member } = useAuth()
  const name = (member?.full_name ?? member?.fullName)?.split(' ')[0] || 'Devotee'
  const message = spiritualMessages[new Date().getDate() % spiritualMessages.length]

  const stats = [
    { icon: FiBookOpen, label: 'Pujas Booked', value: '3', to: '/dashboard/puja-seva' },
    { icon: FiHeart, label: 'Donations / E-Hundi', value: '₹12,500', to: '/dashboard/donations' },
    { icon: FiCalendar, label: 'Events Registered', value: '2', to: '/dashboard/notifications' },
    { icon: FiUsers, label: 'Volunteer Status', value: member?.isVolunteer ? 'Active' : '—', to: '/dashboard/contributions' },
  ]

  return (
    <div className="dashboard-home">
      <div className="dashboard-home__greeting">
        <h2>Welcome, {name}</h2>
        <p className="dashboard-home__message">"{message}"</p>
      </div>

      <div className="dashboard-home__cards">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="dashboard-card dashboard-card--link">
            <div className="dashboard-card__icon">
              <s.icon />
            </div>
            <div className="dashboard-card__body">
              <span className="dashboard-card__value">{s.value}</span>
              <span className="dashboard-card__label">{s.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-home__quick">
        <h3>Quick Actions</h3>
        <div className="dashboard-home__quick-links">
          <Link to="/puja-seva/book" className="btn btn-maroon">Book a Puja</Link>
          <Link to="/e-hundi" className="btn btn-secondary">Make a Donation</Link>
          <Link to="/events/calendar" className="btn btn-secondary">View Events</Link>
        </div>
      </div>
    </div>
  )
}
