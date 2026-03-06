import { useState } from 'react'
import { FiPlus, FiCheck, FiUpload } from 'react-icons/fi'
import './Admin.css'

const mockBookings = [
  { id: 'PJ-1024', devotee: 'Ramesh Kumar', puja: 'Samrajya Lakshmi Puja', date: '2026-03-18', time: '9:00 AM', status: 'pending' },
  { id: 'PJ-1023', devotee: 'Priya Nair', puja: 'Lalitha Sahasranama', date: '2026-03-15', time: '6:00 AM', status: 'completed' },
  { id: 'PJ-1022', devotee: 'Suresh Reddy', puja: 'Lakshmi Narayana Puja', date: '2026-03-12', time: '10:00 AM', status: 'completed' },
]

export default function PujaSevaManagement() {
  const [tab, setTab] = useState('bookings')

  return (
    <div>
      <h2 className="admin-section-title">Puja & Seva Management</h2>

      <div className="admin-tabs">
        <button type="button" className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}>View Bookings</button>
        <button type="button" className={tab === 'create' ? 'active' : ''} onClick={() => setTab('create')}>Create New Booking / Pooja List</button>
      </div>

      {tab === 'bookings' && (
        <div className="admin-card">
          <div className="admin-toolbar">
            <button type="button" className="btn btn-maroon"><FiPlus /> New Booking</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Devotee</th>
                  <th>Puja / Seva</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockBookings.map((b) => (
                  <tr key={b.id}>
                    <td><strong>{b.id}</strong></td>
                    <td>{b.devotee}</td>
                    <td>{b.puja}</td>
                    <td>{b.date} • {b.time}</td>
                    <td><span className={`admin-badge admin-badge--${b.status}`}>{b.status}</span></td>
                    <td>
                      {b.status === 'pending' && (
                        <>
                          <button type="button" className="btn btn-maroon btn--sm" style={{ marginRight: 6 }}><FiCheck /> Mark completed</button>
                          <button type="button" className="btn btn-secondary btn--sm"><FiUpload /> Upload proof</button>
                        </>
                      )}
                      {b.status === 'completed' && <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Proof uploaded</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'create' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 20 }}>Create New Booking or Pooja / Seva List</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 560 }}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Devotee (Name or Member ID) *</label>
              <input type="text" placeholder="Search or enter name" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Puja / Seva Type *</label>
              <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                <option>Samrajya Lakshmi Puja</option>
                <option>Lalitha Sahasranama Parayana</option>
                <option>Lakshmi Narayana Puja</option>
                <option>Special Archana</option>
              </select>
            </div>
            <div className="form-grid" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Date *</label>
                <input type="date" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div className="form-group">
                <label>Time Slot *</label>
                <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>6:00 PM</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-maroon"><FiPlus /> Create Booking</button>
          </form>
        </div>
      )}
    </div>
  )
}
