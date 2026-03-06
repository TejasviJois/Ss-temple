import { useState } from 'react'
import { FiCheck, FiX, FiUserCheck } from 'react-icons/fi'
import './Admin.css'

const mockApplications = [
  { id: 1, name: 'Venkatesh Iyer', email: 'venkat@email.com', phone: '9876543214', city: 'Tumkur', sevaArea: 'Temple Seva', availability: 'Weekends', applied: '2026-03-01', status: 'pending' },
  { id: 2, name: 'Anita Rao', email: 'anita@email.com', phone: '9876543215', city: 'Bengaluru', sevaArea: 'Event Management', availability: 'Flexible', applied: '2026-02-28', status: 'pending' },
  { id: 3, name: 'Kumar S.', email: 'kumar@email.com', phone: '9876543216', city: 'Madhugiri', sevaArea: 'Anna Danam', availability: 'Full-time', applied: '2026-02-25', status: 'approved' },
]

const sevaOptions = ['Temple Seva', 'Event Management', 'Education & Outreach', 'Construction Support', 'Media & Digital', 'Hospitality & Anna Danam']

export default function VolunteerManagement() {
  const [tab, setTab] = useState('applications')

  return (
    <div>
      <h2 className="admin-section-title">Volunteer Management</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 24 }}>Review applications, approve/reject, assign seva.</p>

      <div className="admin-tabs">
        <button type="button" className={tab === 'applications' ? 'active' : ''} onClick={() => setTab('applications')}>Review applications</button>
        <button type="button" className={tab === 'assign' ? 'active' : ''} onClick={() => setTab('assign')}>Assign seva</button>
      </div>

      {tab === 'applications' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>Volunteer applications</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th>Seva area</th>
                  <th>Availability</th>
                  <th>Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockApplications.map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.name}</strong></td>
                    <td>{a.email}<br /><small>{a.phone}</small></td>
                    <td>{a.city}</td>
                    <td>{a.sevaArea}</td>
                    <td>{a.availability}</td>
                    <td>{a.applied}</td>
                    <td><span className={`admin-badge admin-badge--${a.status === 'approved' ? 'completed' : 'pending'}`}>{a.status}</span></td>
                    <td>
                      {a.status === 'pending' && (
                        <>
                          <button type="button" className="btn btn-maroon btn--sm" style={{ marginRight: 6 }}><FiCheck /> Approve</button>
                          <button type="button" className="btn btn-secondary btn--sm" style={{ color: '#c0392b' }}><FiX /> Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'assign' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>Assign seva</h3>
          <p style={{ marginBottom: 16, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Assign approved volunteers to specific seva areas or events.</p>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Volunteer</th>
                  <th>Current seva</th>
                  <th>Assign to</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockApplications.filter((a) => a.status === 'approved').map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.name}</strong><br /><small>{a.email}</small></td>
                    <td>{a.sevaArea}</td>
                    <td>
                      <select style={{ padding: '6px 10px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                        {sevaOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td><button type="button" className="btn btn-maroon btn--sm"><FiUserCheck /> Update</button></td>
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
