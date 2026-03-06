import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import {
  FiHome, FiUsers, FiBookOpen, FiShoppingBag, FiHeart, FiCalendar,
  FiBell, FiLogOut, FiChevronLeft, FiMenu, FiShield, FiUserCheck, FiCheckSquare,
} from 'react-icons/fi'
import './AdminLayout.css'

const menuItems = [
  { to: '/admin', end: true, icon: FiHome, label: 'Dashboard' },
  { to: '/admin/members', end: false, icon: FiUsers, label: 'Member Management' },
  { to: '/admin/puja-seva', end: true, icon: FiBookOpen, label: 'Puja & Seva Management' },
  { to: '/admin/store', end: true, icon: FiShoppingBag, label: 'Store' },
  { to: '/admin/donations', end: true, icon: FiHeart, label: 'Donations & E-Hundi' },
  { to: '/admin/events', end: true, icon: FiCalendar, label: 'Event Management' },
  { to: '/admin/volunteers', end: true, icon: FiUserCheck, label: 'Volunteer Management' },
  { to: '/admin/content', end: true, icon: FiCheckSquare, label: 'Content Moderation' },
  { to: '/admin/notifications', end: true, icon: FiBell, label: 'Notifications' },
]

export default function AdminLayout() {
  const { admin, logout, isSuperAdmin } = useAdmin()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <span className="admin-sidebar__logo">ॐ</span>
          <span className="admin-sidebar__title">Admin</span>
          <button type="button" className="admin-sidebar__toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            <FiChevronLeft className={sidebarOpen ? '' : 'admin-sidebar__toggle--closed'} />
          </button>
        </div>
        <nav className="admin-sidebar__nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-sidebar__item ${isActive ? 'admin-sidebar__item--active' : ''}`}
            >
              <item.icon className="admin-sidebar__icon" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
          {isSuperAdmin && (
            <NavLink to="/super-admin" className={({ isActive }) => `admin-sidebar__item admin-sidebar__item--super ${isActive ? 'admin-sidebar__item--active' : ''}`}>
              <FiShield className="admin-sidebar__icon" />
              {sidebarOpen && <span>Super Admin</span>}
            </NavLink>
          )}
        </nav>
        <div className="admin-sidebar__footer">
          {sidebarOpen && <span className="admin-sidebar__user">{admin?.name}</span>}
          <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button type="button" className="admin-header__menu" onClick={() => setSidebarOpen((o) => !o)} aria-label="Menu">
            <FiMenu />
          </button>
          <h1 className="admin-header__title">Temple / Office Manager</h1>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      <div className={`admin-overlay ${sidebarOpen ? '' : 'admin-overlay--hidden'}`} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
    </div>
  )
}
