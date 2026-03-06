import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { FiUsers, FiBarChart2, FiLogOut, FiChevronLeft, FiMenu, FiArrowLeft } from 'react-icons/fi'
import './SuperAdminLayout.css'

const menuItems = [
  { to: '/super-admin', end: true, icon: FiBarChart2, label: 'Reports & Analytics' },
  { to: '/super-admin/users', end: true, icon: FiUsers, label: 'User & Role Control' },
]

export default function SuperAdminLayout() {
  const { admin, logout } = useAdmin()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="super-admin-layout">
      <aside className={`super-admin-sidebar ${sidebarOpen ? 'super-admin-sidebar--open' : ''}`}>
        <div className="super-admin-sidebar__header">
          <span className="super-admin-sidebar__logo">⚙</span>
          <span className="super-admin-sidebar__title">Super Admin</span>
          <button type="button" className="super-admin-sidebar__toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            <FiChevronLeft className={sidebarOpen ? '' : 'super-admin-sidebar__toggle--closed'} />
          </button>
        </div>
        <nav className="super-admin-sidebar__nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `super-admin-sidebar__item ${isActive ? 'super-admin-sidebar__item--active' : ''}`}
            >
              <item.icon className="super-admin-sidebar__icon" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="super-admin-sidebar__footer">
          <a href="/admin" className="super-admin-sidebar__back">
            <FiArrowLeft />
            {sidebarOpen && <span>Back to Admin</span>}
          </a>
          {sidebarOpen && <span className="super-admin-sidebar__user">{admin?.display_name || 'Super Admin'}</span>}
          <button type="button" className="super-admin-sidebar__logout" onClick={handleLogout}>
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="super-admin-main">
        <header className="super-admin-header">
          <button type="button" className="super-admin-header__menu" onClick={() => setSidebarOpen((o) => !o)} aria-label="Menu">
            <FiMenu />
          </button>
          <h1 className="super-admin-header__title">Control & Governance</h1>
        </header>
        <div className="super-admin-content">
          <Outlet />
        </div>
      </div>

      <div className={`super-admin-overlay ${sidebarOpen ? '' : 'super-admin-overlay--hidden'}`} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
    </div>
  )
}
