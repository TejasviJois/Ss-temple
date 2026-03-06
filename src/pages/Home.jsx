import { Link } from 'react-router-dom'
import { FiCalendar, FiHeart, FiBookOpen, FiGift, FiStar, FiPlay } from 'react-icons/fi'
import './Home.css'

const services = [
  { icon: <FiBookOpen />, title: 'Book Puja / Seva', desc: 'Schedule personalized pujas with detailed sankalpa options.', link: '/puja-seva/book' },
  { icon: <FiStar />, title: 'Special Rituals', desc: 'Explore our sacred rituals and exclusive spiritual packages.', link: '/puja-seva/rituals' },
  { icon: <FiPlay />, title: 'Live Darshan', desc: 'Watch the temple construction progress in real-time.', link: '/darshan/live' },
  { icon: <FiCalendar />, title: 'Temple Events', desc: 'Stay updated with our spiritual calendar and events.', link: '/events/calendar' },
  { icon: <FiGift />, title: 'Prasadam', desc: 'Receive sacred prasadam and divine offerings at your doorstep.', link: '/puja-seva/prasadam' },
  { icon: <FiHeart />, title: 'E-Hundi', desc: 'Make secure online donations to support the temple.', link: '/e-hundi' },
]

const lakshmiForms = [
  { name: 'Adi Lakshmi', desc: 'The primeval form, source of all creation' },
  { name: 'Dhairya Lakshmi', desc: 'Bestower of courage and inner strength' },
  { name: 'Gaja Lakshmi', desc: 'Grantor of power, royalty, and prosperity' },
  { name: 'Samrajya Lakshmi', desc: 'The supreme form for divine leadership' },
]

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__pre">|| श्री समराज्य लक्ष्म्यै नमः ||</p>
          <h1 className="hero__title">Shree Samrajya Lakshmi Temple</h1>
          <p className="hero__subtitle">
            Embrace the path of divine leadership and achieve holistic success
            through the blessings of the highest form of Lakshmi
          </p>
          <div className="hero__actions">
            <Link to="/puja-seva/book" className="btn btn-primary">Book a Puja</Link>
            <Link to="/about/who-is-samrajya-lakshmi" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll to explore</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <blockquote className="quote">
            <span className="quote__mark">"</span>
            <p>
              Greatest kings and rulers of this land have been secretly worshipping
              Samrajya Lakshmi for their own individual success and that of the people
              they lead. Great rulers like Lord Rama, Janaka Maharaja, Krishnadevaraya,
              Raja Raja Chozha, and Sri Chatrapati Shivaji Maharaja have all worshipped
              this mysterious yet very powerful and highest form of Lakshmi.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Temple Services</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Experience divine grace through our comprehensive spiritual services
          </p>
          <div className="services-grid">
            {services.map((s) => (
              <Link to={s.link} key={s.title} className="service-card card">
                <div className="service-card__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section lakshmi-section">
        <div className="container">
          <h2 className="section-title">Forms of Lakshmi</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Discover the divine manifestations of Goddess Lakshmi
          </p>
          <div className="lakshmi-grid">
            {lakshmiForms.map((f) => (
              <div key={f.name} className="lakshmi-card">
                <div className="lakshmi-card__icon">ॐ</div>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Seek the Blessings of Shree Samrajya Lakshmi</h2>
            <p>
              Join thousands of devotees in experiencing the divine grace.
              Book a puja, attend an event, or contribute to the temple construction.
            </p>
            <div className="cta-actions">
              <Link to="/puja-seva/book" className="btn btn-primary">Book Puja Now</Link>
              <Link to="/e-hundi" className="btn btn-secondary">Donate via E-Hundi</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
