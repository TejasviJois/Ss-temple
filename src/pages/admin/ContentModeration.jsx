import { useState } from 'react'
import { FiCheck, FiX, FiMessageCircle, FiImage, FiMusic } from 'react-icons/fi'
import './Admin.css'

const mockTestimonials = [
  { id: 1, name: 'Ramesh K.', text: 'The Samrajya Lakshmi Puja transformed my life...', submitted: '2026-03-01', status: 'pending' },
  { id: 2, name: 'Priya N.', text: 'Guruji\'s guidance is truly divine...', submitted: '2026-02-28', status: 'approved' },
]

const mockMedia = [
  { id: 1, title: 'Festival photos — Maha Shivaratri', type: 'Gallery', uploadedBy: 'Volunteer', date: '2026-03-02', status: 'pending' },
  { id: 2, title: 'Temple construction progress', type: 'Gallery', uploadedBy: 'Admin', date: '2026-02-20', status: 'approved' },
]

const mockAudio = [
  { id: 1, title: 'Lalitha Sahasranama — Full chanting', uploadedBy: 'Devotee', duration: '42:15', date: '2026-03-03', status: 'pending' },
  { id: 2, title: 'Samrajya Lakshmi Stotram', uploadedBy: 'Temple', duration: '12:30', date: '2026-02-15', status: 'approved' },
]

export default function ContentModeration() {
  const [tab, setTab] = useState('testimonials')

  return (
    <div>
      <h2 className="admin-section-title">Content Moderation</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 24 }}>Approve or reject: Testimonials, Media uploads, Chanting audio.</p>

      <div className="admin-tabs">
        <button type="button" className={tab === 'testimonials' ? 'active' : ''} onClick={() => setTab('testimonials')}>Testimonials</button>
        <button type="button" className={tab === 'media' ? 'active' : ''} onClick={() => setTab('media')}>Media uploads</button>
        <button type="button" className={tab === 'audio' ? 'active' : ''} onClick={() => setTab('audio')}>Chanting audio</button>
      </div>

      {tab === 'testimonials' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FiMessageCircle /> Testimonials</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Content</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockTestimonials.map((t) => (
                  <tr key={t.id}>
                    <td><strong>{t.name}</strong></td>
                    <td style={{ maxWidth: 280 }}><span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{t.text.slice(0, 60)}...</span></td>
                    <td>{t.submitted}</td>
                    <td><span className={`admin-badge admin-badge--${t.status === 'approved' ? 'completed' : 'pending'}`}>{t.status}</span></td>
                    <td>
                      {t.status === 'pending' && (
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

      {tab === 'media' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FiImage /> Media uploads</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Uploaded by</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockMedia.map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.title}</strong></td>
                    <td>{m.type}</td>
                    <td>{m.uploadedBy}</td>
                    <td>{m.date}</td>
                    <td><span className={`admin-badge admin-badge--${m.status === 'approved' ? 'completed' : 'pending'}`}>{m.status}</span></td>
                    <td>
                      {m.status === 'pending' && (
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

      {tab === 'audio' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FiMusic /> Chanting audio</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Uploaded by</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockAudio.map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.title}</strong></td>
                    <td>{a.uploadedBy}</td>
                    <td>{a.duration}</td>
                    <td>{a.date}</td>
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
    </div>
  )
}
