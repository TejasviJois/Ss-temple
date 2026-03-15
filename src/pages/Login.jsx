import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiSmartphone, FiMail } from 'react-icons/fi'
import './Pages.css'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginWithEmail, loginWithOtp, verifyOtp } = useAuth()
  const [method, setMethod] = useState('mobile')
  const [step, setStep] = useState('input')
  const [form, setForm] = useState({
    mobile: '',
    otp: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }))

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!form.mobile || form.mobile.length < 10) return
    setError('')
    setLoading(true)
    try {
      await loginWithOtp(form.mobile)
      setStep('otp')
    } catch (err) {
      setError(err?.message || 'Failed to send OTP. Ensure phone auth is configured in Supabase.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!form.otp || form.otp.length < 4) return
    setError('')
    setLoading(true)
    try {
      await verifyOtp(form.mobile, form.otp)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Invalid or expired OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return
    setError('')
    setLoading(true)
    try {
      await loginWithEmail(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="page-banner">
        <h1>Member Login</h1>
        <p>Devotee & Volunteer — Sign in to your account</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="auth-container auth-container--wide">
            <div className="auth-form card auth-form--tabs">
              <div className="auth-logo"><img src="/logo.png" alt="SHREE SAMRAJYALAKSHMI TEMPLE" /></div>
              <h2>Sign In</h2>
              {error && <div className="auth-error" role="alert">{error}</div>}

              <div className="auth-tabs">
                <button
                  type="button"
                  className={`auth-tab ${method === 'mobile' ? 'auth-tab--active' : ''}`}
                  onClick={() => { setMethod('mobile'); setStep('input'); update('otp', ''); setError('') }}
                >
                  <FiSmartphone /> Mobile + OTP
                </button>
                <button
                  type="button"
                  className={`auth-tab ${method === 'email' ? 'auth-tab--active' : ''}`}
                  onClick={() => { setMethod('email'); setError('') }}
                >
                  <FiMail /> Email + Password
                </button>
              </div>

              {method === 'mobile' && (
                <>
                  {step === 'input' ? (
                    <form onSubmit={handleSendOtp}>
                      <div className="form-group">
                        <label>Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={form.mobile}
                          onChange={(e) => update('mobile', e.target.value.replace(/\D/g, ''))}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      <button type="submit" className="btn btn-maroon" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Sending…' : 'Send OTP'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp}>
                      <div className="form-group">
                        <label>Enter OTP sent to ******{form.mobile.slice(-4)}</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={form.otp}
                          onChange={(e) => update('otp', e.target.value.replace(/\D/g, ''))}
                          placeholder="6-digit OTP"
                        />
                      </div>
                      <button type="submit" className="btn btn-maroon" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Verifying…' : 'Verify & Sign In'}
                      </button>
                      <button
                        type="button"
                        className="auth-back-otp"
                        onClick={() => setStep('input')}
                      >
                        Change number
                      </button>
                    </form>
                  )}
                </>
              )}

              {method === 'email' && (
                <form onSubmit={handleEmailLogin}>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="auth-forgot">
                    <Link to="/login/forgot-password">Forgot password?</Link>
                  </div>
                  <button type="submit" className="btn btn-maroon" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                  </button>
                </form>
              )}

              <div className="auth-divider">
                <span>New here?</span>
              </div>
              <Link to="/register" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                Register as Member
              </Link>
              <Link to="/" className="auth-guest">
                Continue as Guest
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
