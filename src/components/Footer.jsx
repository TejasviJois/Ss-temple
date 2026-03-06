import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__brand-row">
            <div className="footer__logo">
              <span className="footer__logo-icon">ॐ</span>
              <div>
                <h3>Shree Samrajya Lakshmi</h3>
                <span>Temple</span>
              </div>
            </div>
            <p className="footer__tagline">
              Embrace the divine legacy of Shree Samrajya Lakshmi and achieve holistic
              success that resonates across all facets of life.
            </p>
            <div className="footer__social">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"><FaXTwitter /></a>
            </div>
          </div>

          <div className="footer__columns">
            <div className="footer__col">
              <h4>About & Visit</h4>
              <Link to="/about/temple">About the Temple</Link>
              <Link to="/about/who-is-samrajya-lakshmi">Who is Shri Samrajya Lakshmi</Link>
              <Link to="/about/trustees">Trustees & Team</Link>
              <Link to="/about/maha-samsthanam">Visit / Pilgrim Info</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer__col">
              <h4>Participate & Community</h4>
              <Link to="/e-hundi">Donate</Link>
              <Link to="/puja-seva/book">Book Puja / Seva</Link>
              <Link to="/e-hundi">E-Hundi</Link>
              <Link to="/community/volunteer">Volunteer / Seva Signup</Link>
              <Link to="/community/testimonials">Devotee Contributions / Testimonials</Link>
            </div>

            <div className="footer__col">
              <h4>Learn & Media</h4>
              <Link to="/events/calendar">Events & Calendar</Link>
              <Link to="/media/gallery">Media Gallery</Link>
              <Link to="/media/publications">Publications & Teachings</Link>
              <Link to="/media/lalitha-audio">Lalitha Audio</Link>
              <Link to="/media/resources">Resources & How-to</Link>
            </div>

            <div className="footer__col">
              <h4>Legal & Compliance</h4>
              <Link to="/legal/terms">Terms & Conditions</Link>
              <Link to="/legal/privacy">Privacy Policy</Link>
              <Link to="/legal/refund">Refund Policy</Link>
              <Link to="/legal/80g-12a">80G / 12A Information</Link>
              <Link to="/legal/faq">FAQ</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Shree Samrajya Lakshmi Temple. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/legal/privacy">Privacy Policy</Link>
            <Link to="/legal/terms">Terms & Conditions</Link>
            <Link to="/legal/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
