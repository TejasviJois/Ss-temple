import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import './Admin.css'

export default function AdminLogin() {
  const { login } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Enter email')
      return
    }
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Invalid credentials or not authorized as admin.')
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-login-logo">ॐ</span>
          <h1>Admin</h1>
          <p>Temple / Office Manager</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@temple.org" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="btn btn-maroon" style={{ width: '100%' }}>Sign In</button>
        </form>
        <p className="admin-login-hint">Sign in with an account that has a row in the <code>admin_roles</code> table. Use <strong>super</strong> role for Super Admin.</p>
      </div>
    </div>
  )
}
