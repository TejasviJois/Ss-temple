import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiChevronDown, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    children: [
      { label: 'Who is Shree Samrajya Lakshmi', path: '/about/who-is-samrajya-lakshmi' },
      { label: 'About the Temple', path: '/about/temple' },
      { label: 'Trustees & Team', path: '/about/trustees' },
      { label: 'Shree Samrajyalakshmi Maha Samsthanam', path: '/about/maha-samsthanam' },
    ],
  },
  {
    label: 'Darshan',
    children: [
      { label: 'Temple Construction Live', path: '/darshan/live' },
    ],
  },
  {
    label: 'Pujas & Seva',
    children: [
      { label: 'Book Puja / Seva', path: '/puja-seva/book' },
      { label: 'Special Rituals & Packages', path: '/puja-seva/rituals' },
      { label: 'Prasadam & Offerings', path: '/puja-seva/prasadam' },
    ],
  },
  {
    label: 'Events',
    children: [
      { label: 'Temple Calendar', path: '/events/calendar' },
      { label: 'Register / Buy Tickets', path: '/events/register' },
    ],
  },
  { label: 'Store', path: '/store' },
  { label: 'E-Hundi', path: '/e-hundi' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()
  const navRef = useRef()

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} ref={navRef}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="ಶ್ರೀ ಸಾಮ್ರಾಜಲಕ್ಷ್ಮಿ ದೇವಾಲಯ" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">ಶ್ರೀ ಸಾಮ್ರಾಜಲಕ್ಷ್ಮಿ ದೇವಾಲಯ</span>
            <span className="navbar__logo-sub">SHREE SAMRAJYALAKSHMI TEMPLE</span>
          </div>
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`}>
          {navItems.map((item) =>
            item.children ? (
              <div
                className={`navbar__dropdown ${openDropdown === item.label ? 'navbar__dropdown--open' : ''}`}
                key={item.label}
                onMouseEnter={() => window.innerWidth > 960 && setOpenDropdown(item.label)}
                onMouseLeave={() => window.innerWidth > 960 && setOpenDropdown(null)}
              >
                <button
                  className="navbar__link navbar__link--dropdown"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label} <FiChevronDown className="navbar__chevron" />
                </button>
                <div className="navbar__dropdown-menu">
                  {item.children.map((child) => (
                    <Link key={child.path} to={child.path} className="navbar__dropdown-item">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar__link ${location.pathname === item.path ? 'navbar__link--active' : ''}`}
              >
                {item.label}
              </Link>
            )
          )}

          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="navbar__login">
                <FiUser /> Dashboard
              </Link>
              <button type="button" className="navbar__login navbar__logout" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar__login">
              <FiUser /> Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
