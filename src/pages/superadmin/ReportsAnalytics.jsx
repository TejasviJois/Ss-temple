import { useState } from 'react'
import { FiDownload, FiTrendingUp, FiUsers, FiCalendar, FiMapPin } from 'react-icons/fi'
import '../admin/Admin.css'

const donationTrends = [
  { month: 'Jan 2026', amount: 185000, count: 42 },
  { month: 'Feb 2026', amount: 242000, count: 58 },
  { month: 'Mar 2026', amount: 198000, count: 51 },
]

const eventParticipation = [
  { event: 'Maha Shivaratri Special Puja', date: '2026-03-14', registered: 120, attended: 98 },
  { event: 'Ugadi Celebrations', date: '2026-03-25', registered: 85, attended: 0 },
  { event: 'Lalitha Sahasranama Parayana', date: '2026-03-08', registered: 45, attended: 42 },
]

const volunteerEngagement = [
  { name: 'Temple Seva', active: 12, hours: 240 },
  { name: 'Event Management', active: 8, hours: 120 },
  { name: 'Anna Danam', active: 15, hours: 180 },
]

const locationWise = [
  { location: 'Bengaluru', members: 89, donations: 125000 },
  { location: 'Chennai', members: 45, donations: 78000 },
  { location: 'Hyderabad', members: 38, donations: 62000 },
  { location: 'Madhugiri / Tumkur', members: 52, donations: 45000 },
  { location: 'Mumbai', members: 24, donations: 95000 },
]

export default function ReportsAnalytics() {
  const [reportTab, setReportTab] = useState('donations')

  return (
    <div>
      <h2 className="admin-section-title">Reports & Analytics</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 24 }}>Donation trends, event participation, volunteer engagement, location-wise devotees.</p>

      <div className="admin-tabs">
        <button type="button" className={reportTab === 'donations' ? 'active' : ''} onClick={() => setReportTab('donations')}>Donation trends</button>
        <button type="button" className={reportTab === 'events' ? 'active' : ''} onClick={() => setReportTab('events')}>Event participation</button>
        <button type="button" className={reportTab === 'volunteers' ? 'active' : ''} onClick={() => setReportTab('volunteers')}>Volunteer engagement</button>
        <button type="button" className={reportTab === 'location' ? 'active' : ''} onClick={() => setReportTab('location')}>Location-wise devotees</button>
      </div>

      <div className="admin-toolbar">
        <button type="button" className="btn btn-maroon"><FiDownload /> Export report</button>
      </div>

      {reportTab === 'donations' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FiTrendingUp /> Donation trends</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Total amount</th>
                  <th>Transaction count</th>
                </tr>
              </thead>
              <tbody>
                {donationTrends.map((r) => (
                  <tr key={r.month}>
                    <td><strong>{r.month}</strong></td>
                    <td>₹{(r.amount / 1000).toFixed(0)}K</td>
                    <td>{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Summary: Last 3 months total ₹6.25L from 151 transactions.</p>
        </div>
      )}

      {reportTab === 'events' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FiCalendar /> Event participation</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Registered</th>
                  <th>Attended</th>
                </tr>
              </thead>
              <tbody>
                {eventParticipation.map((e) => (
                  <tr key={e.event}>
                    <td><strong>{e.event}</strong></td>
                    <td>{e.date}</td>
                    <td>{e.registered}</td>
                    <td>{e.attended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportTab === 'volunteers' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FiUsers /> Volunteer engagement</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Seva area</th>
                  <th>Active volunteers</th>
                  <th>Total hours (month)</th>
                </tr>
              </thead>
              <tbody>
                {volunteerEngagement.map((v) => (
                  <tr key={v.name}>
                    <td><strong>{v.name}</strong></td>
                    <td>{v.active}</td>
                    <td>{v.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportTab === 'location' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FiMapPin /> Location-wise devotees</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Members</th>
                  <th>Donations (total)</th>
                </tr>
              </thead>
              <tbody>
                {locationWise.map((l) => (
                  <tr key={l.location}>
                    <td><strong>{l.location}</strong></td>
                    <td>{l.members}</td>
                    <td>₹{(l.donations / 1000).toFixed(0)}K</td>
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
