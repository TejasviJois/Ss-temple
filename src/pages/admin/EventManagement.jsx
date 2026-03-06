import { useState } from 'react'
import { FiCalendar, FiEdit2, FiUsers, FiCheck, FiUpload } from 'react-icons/fi'
import './Admin.css'

const mockEvents = [
  { id: 1, title: 'Maha Shivaratri Special Puja', date: '2026-03-14', type: 'Festival', participants: 120 },
  { id: 2, title: 'Ugadi Celebrations', date: '2026-03-25', type: 'Festival', participants: 85 },
  { id: 3, title: 'Sri Rama Navami', date: '2026-04-02', type: 'Festival', participants: 0 },
]

const mockRegistrations = [
  { id: 1, name: 'Ramesh Kumar', email: 'ramesh@email.com', event: 'Maha Shivaratri Special Puja', attended: true },
  { id: 2, name: 'Priya Nair', email: 'priya@email.com', event: 'Maha Shivaratri Special Puja', attended: false },
]

export default function EventManagement() {
  const [tab, setTab] = useState('calendar')

  return (
    <div>
      <h2 className="admin-section-title">Event Management</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 24 }}>Temple calendar, create/edit events, manage registrations, attendance, upload media.</p>

      <div className="admin-tabs">
        <button type="button" className={tab === 'calendar' ? 'active' : ''} onClick={() => setTab('calendar')}>Temple Calendar</button>
        <button type="button" className={tab === 'create' ? 'active' : ''} onClick={() => setTab('create')}>Create / Edit events</button>
        <button type="button" className={tab === 'registrations' ? 'active' : ''} onClick={() => setTab('registrations')}>Manage registrations</button>
        <button type="button" className={tab === 'attendance' ? 'active' : ''} onClick={() => setTab('attendance')}>Attendance marking</button>
        <button type="button" className={tab === 'media' ? 'active' : ''} onClick={() => setTab('media')}>Upload media</button>
      </div>

      {tab === 'calendar' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>Temple Calendar</h3>
          <div className="admin-toolbar">
            <button type="button" className="btn btn-maroon"><FiCalendar /> Add Event</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Registered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockEvents.map((e) => (
                  <tr key={e.id}>
                    <td><strong>{e.title}</strong></td>
                    <td>{e.date}</td>
                    <td>{e.type}</td>
                    <td>{e.participants}</td>
                    <td><button type="button" className="btn btn-secondary btn--sm"><FiEdit2 /> Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'create' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>Create / Edit event</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 560 }}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Event title *</label>
              <input type="text" placeholder="e.g. Maha Shivaratri Special Puja" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
            </div>
            <div className="form-grid" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Date *</label>
                <input type="date" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                  <option>Festival</option>
                  <option>Regular</option>
                  <option>Special</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Description</label>
              <textarea rows={3} placeholder="Event description" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
            </div>
            <button type="submit" className="btn btn-maroon">Save event</button>
          </form>
        </div>
      )}

      {tab === 'registrations' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>Manage registrations</h3>
          <div className="form-group" style={{ marginBottom: 16, maxWidth: 300 }}>
            <label>Select event</label>
            <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <option>Maha Shivaratri Special Puja — Mar 14</option>
              <option>Ugadi Celebrations — Mar 25</option>
            </select>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Registered on</th>
                </tr>
              </thead>
              <tbody>
                {mockRegistrations.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.email}</td>
                    <td>{r.event}</td>
                    <td>2026-03-01</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'attendance' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>Attendance marking</h3>
          <div className="form-group" style={{ marginBottom: 16, maxWidth: 300 }}>
            <label>Select event</label>
            <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <option>Maha Shivaratri Special Puja — Mar 14</option>
            </select>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Attended</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockRegistrations.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.email}</td>
                    <td>{r.attended ? <span className="admin-badge admin-badge--completed">Yes</span> : <span className="admin-badge admin-badge--pending">No</span>}</td>
                    <td><button type="button" className="btn btn-maroon btn--sm"><FiCheck /> Mark present</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'media' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>Upload media</h3>
          <div className="form-group" style={{ marginBottom: 16, maxWidth: 300 }}>
            <label>Select event</label>
            <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <option>Maha Shivaratri Special Puja</option>
              <option>Ugadi Celebrations</option>
            </select>
          </div>
          <div style={{ border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)', padding: '40px', textAlign: 'center', marginBottom: 16 }}>
            <FiUpload style={{ fontSize: '2rem', color: 'var(--color-text-light)', marginBottom: 8 }} />
            <p style={{ color: 'var(--color-text-light)', marginBottom: 12 }}>Drag and drop photos/videos here or click to upload</p>
            <button type="button" className="btn btn-secondary">Choose files</button>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Uploaded media will appear in the event gallery and Media Gallery on the website.</p>
        </div>
      )}
    </div>
  )
}
