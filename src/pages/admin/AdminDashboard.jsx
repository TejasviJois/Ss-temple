import { Link } from 'react-router-dom'
import { FiUsers, FiBookOpen, FiShoppingBag, FiHeart, FiCalendar, FiBell } from 'react-icons/fi'
import './Admin.css'

const quickLinks = [
  { to: '/admin/members', icon: FiUsers, label: 'Member Management', count: '248' },
  { to: '/admin/puja-seva', icon: FiBookOpen, label: 'Puja & Seva Bookings', count: '12 pending' },
  { to: '/admin/store', icon: FiShoppingBag, label: 'Store & Orders', count: '5 new orders' },
  { to: '/admin/donations', icon: FiHeart, label: 'Donations & E-Hundi', count: '₹2.4L today' },
  { to: '/admin/events', icon: FiCalendar, label: 'Event Management', count: '3 upcoming' },
  { to: '/admin/notifications', icon: FiBell, label: 'Send Notifications', count: '' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="admin-section-title">Dashboard</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 28 }}>Temple / Office Manager — overview and quick actions.</p>

      <div className="admin-dashboard-grid">
        {quickLinks.map((q) => (
          <Link key={q.to} to={q.to} className="admin-dashboard-card">
            <div className="admin-dashboard-card__icon">
              <q.icon />
            </div>
            <div className="admin-dashboard-card__body">
              <span className="admin-dashboard-card__label">{q.label}</span>
              {q.count && <span className="admin-dashboard-card__count">{q.count}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 16 }}>Recent Activity</h3>
        <ul style={{ paddingLeft: 20, color: 'var(--color-text-light)', lineHeight: 2 }}>
          <li>New puja booking #PJ-1024 — Samrajya Lakshmi Puja (Mar 18)</li>
          <li>Donation received — ₹5,100 — Temple Construction</li>
          <li>New member registered — MBR9X2K</li>
          <li>Order #ORD-089 — Prasadam box shipped</li>
        </ul>
      </div>
    </div>
  )
}
