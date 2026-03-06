import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FiHome, FiUser, FiHeart, FiBookOpen, FiMessageCircle, FiBell, FiLogOut,
  FiChevronLeft, FiMenu,
} from 'react-icons/fi'
import './DashboardLayout.css'

const menuItems = [
  { to: '/dashboard', icon: FiHome, label: 'Dashboard Home' },
  { to: '/dashboard/profile', icon: FiUser, label: 'My Profile' },
  { to: '/dashboard/donations', icon: FiHeart, label: 'My Donations & E-Hundi' },
  { to: '/dashboard/puja-seva', icon: FiBookOpen, label: 'My Puja & Seva' },
  { to: '/dashboard/contributions', icon: FiMessageCircle, label: 'My Contributions' },
  { to: '/dashboard/notifications', icon: FiBell, label: 'Notifications' },
]

export default function DashboardLayout() {
  const { member, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <aside className={`dashboard__sidebar ${sidebarOpen ? 'dashboard__sidebar--open' : ''}`}>
        <div className="dashboard__sidebar-header">
          <span className="dashboard__logo">ॐ</span>
          <span className="dashboard__title">Member Dashboard</span>
          <button type="button" className="dashboard__toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            <FiChevronLeft className={sidebarOpen ? '' : 'dashboard__toggle--closed'} />
          </button>
        </div>
        <nav className="dashboard__nav">
          {menuItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/dashboard'} className={({ isActive }) => `dashboard__nav-item ${isActive ? 'dashboard__nav-item--active' : ''}`}>
              <item.icon className="dashboard__nav-icon" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="dashboard__sidebar-footer">
          <div className="dashboard__user">
            {sidebarOpen && (
              <>
                <span className="dashboard__user-name">{member?.full_name ?? member?.fullName ?? 'Member'}</span>
                <span className="dashboard__user-id">{member?.member_id ?? member?.memberId}</span>
              </>
            )}
          </div>
          <button type="button" className="dashboard__logout" onClick={handleLogout}>
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="dashboard__main">
        <header className="dashboard__header">
          <button type="button" className="dashboard__menu-btn" onClick={() => setSidebarOpen((o) => !o)} aria-label="Menu">
            <FiMenu />
          </button>
          <h1 className="dashboard__page-title" id="dashboard-page-title">Dashboard</h1>
        </header>
        <div className="dashboard__content">
          <Outlet />
        </div>
      </div>

      <div className={`dashboard__overlay ${sidebarOpen ? '' : 'dashboard__overlay--hidden'}`} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
    </div>
  )
}
