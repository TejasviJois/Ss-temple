import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Pages.css'
import './Auth.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="auth-page">
      <div className="page-banner">
        <h1>Reset Password</h1>
        <p>We'll send a reset link to your email</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="auth-container auth-container--wide">
            <div className="auth-form card">
              <div className="auth-logo">ॐ</div>
              <h2>Forgot Password</h2>
              {sent ? (
                <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: 20 }}>
                  If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                  <button type="submit" className="btn btn-maroon" style={{ width: '100%' }}>Send Reset Link</button>
                </form>
              )}
              <div className="auth-divider" style={{ marginTop: 24 }}><span></span></div>
              <Link to="/login" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>Back to Login</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
