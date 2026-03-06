import { useState } from 'react'
import { FiUserPlus, FiTrash2, FiUserX } from 'react-icons/fi'
import '../admin/Admin.css'

const mockManagers = [
  { id: 'M1', email: 'manager1@temple.org', name: 'Office Manager 1', role: 'manager', status: 'active', created: '2026-01-15' },
  { id: 'M2', email: 'manager2@temple.org', name: 'Office Manager 2', role: 'manager', status: 'active', created: '2026-02-01' },
]

const mockAccounts = [
  { id: 'MBR9X2K', name: 'Ramesh Kumar', email: 'ramesh@email.com', type: 'member', status: 'active' },
  { id: 'M1', name: 'Office Manager 1', email: 'manager1@temple.org', type: 'manager', status: 'active' },
  { id: 'MBR8W1J', name: 'Priya Nair', email: 'priya@email.com', type: 'member', status: 'suspended' },
]

export default function UserRoleControl() {
  const [tab, setTab] = useState('managers')
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ email: '', name: '', password: '' })

  return (
    <div>
      <h2 className="admin-section-title">User & Role Control</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 24 }}>Create or remove managers / Secondary Admin. Suspend accounts.</p>

      <div className="admin-tabs">
        <button type="button" className={tab === 'managers' ? 'active' : ''} onClick={() => setTab('managers')}>Managers / Secondary Admin</button>
        <button type="button" className={tab === 'suspend' ? 'active' : ''} onClick={() => setTab('suspend')}>Suspend Accounts</button>
      </div>

      {tab === 'managers' && (
        <div className="admin-card">
          <div className="admin-toolbar">
            <button type="button" className="btn btn-maroon" onClick={() => setShowCreate(true)}><FiUserPlus /> Create Manager / Secondary Admin</button>
          </div>

          {showCreate && (
            <form onSubmit={(e) => e.preventDefault()} className="admin-card" style={{ marginBottom: 24, background: 'var(--color-cream)' }}>
              <h3 style={{ marginBottom: 16 }}>Create New Manager</h3>
              <div className="form-grid" style={{ marginBottom: 16 }}>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="manager@temple.org" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
                </div>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Display name" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
                </div>
                <div className="form-group">
                  <label>Temporary Password *</label>
                  <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="••••••••" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }} />
                </div>
              </div>
              <button type="submit" className="btn btn-maroon">Create Manager</button>
              <button type="button" className="btn btn-secondary" style={{ marginLeft: 8 }} onClick={() => setShowCreate(false)}>Cancel</button>
            </form>
          )}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockManagers.map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong></td>
                    <td>{m.email}</td>
                    <td>Manager</td>
                    <td><span className="admin-badge admin-badge--completed">{m.status}</span></td>
                    <td>{m.created}</td>
                    <td><button type="button" className="btn btn-secondary btn--sm" style={{ color: '#c0392b' }}><FiTrash2 /> Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'suspend' && (
        <div className="admin-card">
          <p style={{ marginBottom: 16, color: 'var(--color-text-light)' }}>Suspend or restore member and manager accounts. Suspended users cannot log in.</p>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockAccounts.map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.id}</strong></td>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.type}</td>
                    <td><span className={`admin-badge ${a.status === 'active' ? 'admin-badge--completed' : 'admin-badge--cancelled'}`}>{a.status}</span></td>
                    <td>
                      {a.status === 'active' ? (
                        <button type="button" className="btn btn-secondary btn--sm" style={{ color: '#c0392b' }}><FiUserX /> Suspend</button>
                      ) : (
                        <button type="button" className="btn btn-maroon btn--sm">Restore</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
