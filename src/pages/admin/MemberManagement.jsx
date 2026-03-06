import { useState } from 'react'
import { FiSearch, FiEdit2, FiUserPlus } from 'react-icons/fi'
import './Admin.css'

const mockMembers = [
  { id: 'MBR9X2K', name: 'Ramesh Kumar', mobile: '9876543210', email: 'ramesh@email.com', city: 'Bengaluru', joined: '2026-02-15' },
  { id: 'MBR8W1J', name: 'Priya Nair', mobile: '9876543211', email: 'priya@email.com', city: 'Chennai', joined: '2026-02-14' },
  { id: 'MBR7V0H', name: 'Suresh Reddy', mobile: '9876543212', email: 'suresh@email.com', city: 'Hyderabad', joined: '2026-02-12' },
  { id: 'MBR6U9G', name: 'Lakshmi Devi', mobile: '9876543213', email: '', city: 'Madhugiri', joined: '2026-02-10' },
]

export default function MemberManagement() {
  const [tab, setTab] = useState('view')
  const [search, setSearch] = useState('')

  return (
    <div>
      <h2 className="admin-section-title">Member Management</h2>

      <div className="admin-tabs">
        <button type="button" className={tab === 'view' ? 'active' : ''} onClick={() => setTab('view')}>View Members</button>
        <button type="button" className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Register or Edit Members</button>
      </div>

      {tab === 'view' && (
        <div className="admin-card">
          <div className="admin-toolbar">
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input type="text" placeholder="Search by name, mobile, ID..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 36, width: '100%', padding: '8px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockMembers.map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.id}</strong></td>
                    <td>{m.name}</td>
                    <td>{m.mobile}</td>
                    <td>{m.email || '—'}</td>
                    <td>{m.city}</td>
                    <td>{m.joined}</td>
                    <td><button type="button" className="btn btn-secondary btn--sm"><FiEdit2 /> Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'register' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 20 }}>Register or Edit Member</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 560 }}>
            <div className="form-grid" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Full name" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div className="form-group">
                <label>Mobile *</label>
                <input type="tel" placeholder="10-digit mobile" maxLength={10} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@example.com" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div className="form-group">
                <label>City / State</label>
                <input type="text" placeholder="City, State" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
              </div>
            </div>
            <button type="submit" className="btn btn-maroon"><FiUserPlus /> Save Member</button>
          </form>
        </div>
      )}
    </div>
  )
}
