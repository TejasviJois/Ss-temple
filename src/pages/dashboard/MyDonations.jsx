import { Link } from 'react-router-dom'
import { FiDownload } from 'react-icons/fi'
import './Dashboard.css'

const mockDonations = [
  { id: 'D001', date: '2026-03-01', amount: 5100, cause: 'Temple Construction', receipt: true, eightyG: true },
  { id: 'D002', date: '2026-02-15', amount: 1100, cause: 'General Temple Fund', receipt: true, eightyG: true },
  { id: 'D003', date: '2026-02-01', amount: 2501, cause: 'Anna Danam', receipt: true, eightyG: true },
]

export default function MyDonations() {
  return (
    <div className="dashboard-section">
      <div className="dashboard-form card">
        <h3>Donation History & E-Hundi Contributions</h3>
        <p className="dashboard-form__desc">All your donations and E-Hundi contributions in one place. Download receipts and 80G certificates.</p>

        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Cause</th>
                <th>80G</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {mockDonations.map((d) => (
                <tr key={d.id}>
                  <td>{d.date}</td>
                  <td>{d.id}</td>
                  <td>₹{d.amount.toLocaleString()}</td>
                  <td>{d.cause}</td>
                  <td>{d.eightyG ? 'Yes' : '—'}</td>
                  <td>
                    <button type="button" className="dashboard-btn-icon" title="Download receipt">
                      <FiDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-form__block">
          <h4>80G Tax Exemption</h4>
          <p>Eligible donations are covered under Section 80G. Your PAN-linked receipts can be used while filing ITR. <Link to="/legal/80g-12a">View 80G / 12A Information</Link>.</p>
        </div>
      </div>
    </div>
  )
}
