import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import './Admin.css'

export default function NotificationsManagement() {
  const [audience, setAudience] = useState('devotees')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTitle('')
    setMessage('')
  }

  return (
    <div>
      <h2 className="admin-section-title">Notifications</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 24 }}>Send announcements to devotees, volunteers, or event participants.</p>

      {sent && (
        <div className="admin-card" style={{ background: 'rgba(46, 125, 50, 0.08)', borderColor: 'var(--color-success)' }}>
          <p style={{ color: 'var(--color-success)', fontWeight: 600 }}>Announcement sent successfully.</p>
        </div>
      )}

      <div className="admin-card">
        <h3 style={{ marginBottom: 20 }}>Send Announcement</h3>
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Send to *</label>
            <select value={audience} onChange={(e) => setAudience(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <option value="devotees">Devotees (all members)</option>
              <option value="volunteers">Volunteers</option>
              <option value="event_participants">Event participants (select event)</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Title *</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Message *</label>
            <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your announcement..." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
          </div>
          <button type="submit" className="btn btn-maroon"><FiSend /> Send Announcement</button>
        </form>
      </div>
    </div>
  )
}
