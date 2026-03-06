import { FiBell, FiBookOpen, FiCalendar, FiInfo } from 'react-icons/fi'
import './Dashboard.css'

const notifications = [
  { type: 'puja', title: 'Puja Reminder', text: 'Your Samrajya Lakshmi Puja is scheduled for Mar 15, 2026 at 9:00 AM.', time: '2 hours ago', icon: FiBookOpen },
  { type: 'event', title: 'Event Alert', text: 'Ugadi Celebrations — Mar 25, 2026. You are registered.', time: '1 day ago', icon: FiCalendar },
  { type: 'temple', title: 'Temple Announcement', text: 'Temple will remain closed on Mar 14 (Maha Shivaratri night program). Open from 4 AM on Mar 15.', time: '3 days ago', icon: FiInfo },
  { type: 'puja', title: 'Puja Reminder', text: 'Lalitha Sahasranama Parayana — Mar 22 at 6:00 AM.', time: '5 days ago', icon: FiBookOpen },
]

export default function Notifications() {
  return (
    <div className="dashboard-section">
      <div className="dashboard-form card">
        <h3>Notifications</h3>
        <p className="dashboard-form__desc">Puja reminders, event alerts, and temple announcements.</p>

        <ul className="dashboard-notifications">
          {notifications.map((n, i) => (
            <li key={i} className="dashboard-notification">
              <div className="dashboard-notification__icon">
                <n.icon />
              </div>
              <div className="dashboard-notification__body">
                <strong>{n.title}</strong>
                <p>{n.text}</p>
                <span className="dashboard-notification__time">{n.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
