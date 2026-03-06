import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiSmartphone, FiMail } from 'react-icons/fi'
import './Pages.css'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const { user, signUp, createMemberProfile, loginWithOtp, verifyOtp } = useAuth()
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState('mobile')
  const [otpStep, setOtpStep] = useState('send')
  const [form, setForm] = useState({
    mobile: '',
    otp: '',
    email: '',
    password: '',
    fullName: '',
    city: '',
    state: '',
    terms: false,
    privacy: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }))

  const canProceedProfile = (method === 'mobile' && form.mobile.length >= 10) || (method === 'email' && form.email && form.password)
  const canProceedConsent = form.fullName.trim() && form.mobile.length >= 10 && (form.city?.trim() || form.state?.trim()) && form.terms && form.privacy

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (form.mobile.length < 10) return
    setError('')
    setLoading(true)
    try {
      await loginWithOtp(form.mobile)
      setOtpStep('verify')
    } catch (err) {
      setError(err?.message || 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyAndNext = async (e) => {
    e.preventDefault()
    if (method === 'mobile' && (!form.otp || form.otp.length < 4)) return
    if (method === 'mobile') {
      setError('')
      setLoading(true)
      try {
        await verifyOtp(form.mobile, form.otp)
        setStep(2)
      } catch (err) {
        setError(err?.message || 'Invalid or expired OTP.')
      } finally {
        setLoading(false)
      }
    } else {
      setStep(2)
    }
  }

  const handleProfileNext = (e) => {
    e.preventDefault()
    if (!canProceedConsent) return
    setStep(3)
  }

  const handleConsentSubmit = async (e) => {
    e.preventDefault()
    if (!form.terms || !form.privacy) return
    setError('')
    setLoading(true)
    try {
      if (method === 'email') {
        const { data } = await signUp(form.email, form.password)
        const uid = data.user?.uid
        if (!uid) throw new Error('Sign up did not return user.')
        await createMemberProfile(uid, {
          fullName: form.fullName,
          mobile: form.mobile,
          email: form.email,
          city: form.city,
          state: form.state,
        })
      } else {
        const uid = user?.uid
        if (!uid) throw new Error('Session expired. Please complete mobile verification again.')
        await createMemberProfile(uid, {
          fullName: form.fullName,
          mobile: form.mobile,
          email: form.email || null,
          city: form.city,
          state: form.state,
        })
      }
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err?.message || 'Could not create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="page-banner">
        <h1>Member Registration</h1>
        <p>Devotee / Volunteer — Create your account</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="auth-container auth-container--wide">
            <div className="auth-form card auth-form--tabs">
              <div className="auth-logo">ॐ</div>
              <h2>Register</h2>
              {error && <div className="auth-error" role="alert">{error}</div>}

              <div className="register-steps">
                <div className={`register-step ${step >= 1 ? (step === 1 ? 'register-step--active' : 'register-step--done') : ''}`}>
                  <span className="register-step__num">1</span>
                  <span>Account</span>
                </div>
                <div className={`register-step ${step >= 2 ? (step === 2 ? 'register-step--active' : 'register-step--done') : ''}`}>
                  <span className="register-step__num">2</span>
                  <span>Profile</span>
                </div>
                <div className={`register-step ${step >= 3 ? 'register-step--active' : ''}`}>
                  <span className="register-step__num">3</span>
                  <span>Consent</span>
                </div>
              </div>

              {step === 1 && (
                <>
                  <div className="auth-tabs">
                    <button type="button" className={`auth-tab ${method === 'mobile' ? 'auth-tab--active' : ''}`} onClick={() => { setMethod('mobile'); setOtpStep('send'); update('otp', ''); setError('') }}>
                      <FiSmartphone /> Mobile + OTP
                    </button>
                    <button type="button" className={`auth-tab ${method === 'email' ? 'auth-tab--active' : ''}`} onClick={() => setMethod('email'); setError('')}>
                      <FiMail /> Email + Password
                    </button>
                  </div>

                  {method === 'mobile' && (
                    otpStep === 'send' ? (
                      <form onSubmit={handleSendOtp}>
                        <div className="form-group">
                          <label>Mobile Number *</label>
                          <input type="tel" required maxLength={10} value={form.mobile} onChange={(e) => update('mobile', e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile" />
                        </div>
                        <button type="submit" className="btn btn-maroon" style={{ width: '100%' }} disabled={loading}>{loading ? 'Sending…' : 'Send OTP'}</button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyAndNext}>
                        <div className="form-group">
                          <label>Enter OTP *</label>
                          <input type="text" required maxLength={6} value={form.otp} onChange={(e) => update('otp', e.target.value.replace(/\D/g, ''))} placeholder="6-digit OTP" />
                        </div>
                        <button type="submit" className="btn btn-maroon" style={{ width: '100%' }} disabled={loading}>{loading ? 'Verifying…' : 'Verify & Continue'}</button>
                        <button type="button" className="auth-back-otp" onClick={() => setOtpStep('send')}>Change number</button>
                      </form>
                    )
                  )}

                  {method === 'email' && (
                    <form onSubmit={handleVerifyAndNext}>
                      <div className="form-group">
                        <label>Email *</label>
                        <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="your@email.com" />
                      </div>
                      <div className="form-group">
                        <label>Password *</label>
                        <input type="password" required minLength={6} value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Min 6 characters" />
                      </div>
                      <button type="submit" className="btn btn-maroon" style={{ width: '100%' }}>Continue</button>
                    </form>
                  )}

                  {method === 'mobile' && otpStep === 'verify' && (
                    <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: 8 }} onClick={() => setStep(2)}>Skip to Profile</button>
                  )}
                </>
              )}

              {step === 2 && (
                <form onSubmit={handleProfileNext}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input type="tel" required maxLength={10} value={form.mobile} onChange={(e) => update('mobile', e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile" />
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>City *</label>
                      <input type="text" required value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="City" />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input type="text" required value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="State" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-maroon" style={{ width: '100%' }} disabled={!form.fullName.trim() || form.mobile.length < 10}>Continue to Consent</button>
                  <button type="button" className="auth-back-otp" onClick={() => setStep(1)}>Back</button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleConsentSubmit}>
                  <div className="consent-box">
                    <label>
                      <input type="checkbox" required checked={form.terms} onChange={(e) => update('terms', e.target.checked)} />
                      <span>I agree to the <Link to="/legal/terms" target="_blank">Terms & Conditions</Link> of Shree Samrajya Lakshmi Temple.</span>
                    </label>
                  </div>
                  <div className="consent-box">
                    <label>
                      <input type="checkbox" required checked={form.privacy} onChange={(e) => update('privacy', e.target.checked)} />
                      <span>I have read and agree to the <Link to="/legal/privacy" target="_blank">Privacy Policy</Link>.</span>
                    </label>
                  </div>
                  <button type="submit" className="btn btn-maroon" style={{ width: '100%' }} disabled={loading}>{loading ? 'Creating account…' : 'Create Account'}</button>
                  <button type="button" className="auth-back-otp" onClick={() => setStep(2)}>Back</button>
                </form>
              )}

              <div className="auth-divider" style={{ marginTop: 24 }}>
                <span>Already a member?</span>
              </div>
              <Link to="/login" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
