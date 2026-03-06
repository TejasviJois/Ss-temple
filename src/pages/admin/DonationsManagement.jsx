import { FiDownload } from 'react-icons/fi'
import './Admin.css'

const mockDonations = [
  { id: 'D101', date: '2026-03-06', amount: 5100, cause: 'Temple Construction', donor: 'R***h K.' },
  { id: 'D100', date: '2026-03-06', amount: 1100, cause: 'General Fund', donor: 'P***a N.' },
  { id: 'D099', date: '2026-03-05', amount: 2501, cause: 'Anna Danam', donor: 'S***h R.' },
]

export default function DonationsManagement() {
  return (
    <div>
      <h2 className="admin-section-title">Donations & E-Hundi</h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: 20 }}>View only. Daily summary and export reports.</p>

      <div className="admin-card">
        <h3 style={{ marginBottom: 16 }}>Daily Summary — 6 Mar 2026</h3>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Today&apos;s total</span>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', margin: '4px 0 0' }}>₹8,702</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Transaction count</span>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', margin: '4px 0 0' }}>3</p>
          </div>
        </div>
        <div className="admin-toolbar">
          <button type="button" className="btn btn-maroon"><FiDownload /> Export reports</button>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: 16 }}>Recent Donations (View Only)</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Cause</th>
                <th>Donor</th>
              </tr>
            </thead>
            <tbody>
              {mockDonations.map((d) => (
                <tr key={d.id}>
                  <td><strong>{d.id}</strong></td>
                  <td>{d.date}</td>
                  <td>₹{d.amount.toLocaleString()}</td>
                  <td>{d.cause}</td>
                  <td>{d.donor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
