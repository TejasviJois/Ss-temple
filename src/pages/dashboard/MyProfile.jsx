import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import './Dashboard.css'

export default function MyProfile() {
  const { member, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('personal')
  const [form, setForm] = useState({
    fullName: member?.full_name ?? member?.fullName ?? '',
    dob: member?.dob || '',
    gender: member?.gender || '',
    gotra: member?.gotra || '',
    nakshatra: member?.nakshatra || '',
    mobile: member?.mobile || '',
    email: member?.email || '',
    address: member?.address || '',
    familyMembers: member?.familyMembers || [],
  })
  const [newMember, setNewMember] = useState({ name: '', relation: '' })
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    updateProfile(form)
  }

  const addFamilyMember = () => {
    if (!newMember.name.trim()) return
    update('familyMembers', [...form.familyMembers, { ...newMember }])
    setNewMember({ name: '', relation: '' })
  }

  const removeFamilyMember = (i) => {
    update('familyMembers', form.familyMembers.filter((_, idx) => idx !== i))
  }

  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Moola', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati']

  return (
    <div className="dashboard-section">
      <div className="dashboard-tabs">
        <button type="button" className={activeTab === 'personal' ? 'dashboard-tabs--active' : ''} onClick={() => setActiveTab('personal')}>Personal Info</button>
        <button type="button" className={activeTab === 'membership' ? 'dashboard-tabs--active' : ''} onClick={() => setActiveTab('membership')}>Membership Details</button>
        <button type="button" className={activeTab === 'password' ? 'dashboard-tabs--active' : ''} onClick={() => setActiveTab('password')}>Change Password</button>
      </div>

      {activeTab === 'personal' && (
        <form className="dashboard-form card" onSubmit={handleSave}>
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gotra</label>
              <input type="text" value={form.gotra} onChange={(e) => update('gotra', e.target.value)} placeholder="e.g. Bharadwaja" />
            </div>
            <div className="form-group">
              <label>Nakshatra</label>
              <select value={form.nakshatra} onChange={(e) => update('nakshatra', e.target.value)}>
                <option value="">Select</option>
                {nakshatras.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Mobile *</label>
              <input type="tel" required value={form.mobile} onChange={(e) => update('mobile', e.target.value)} maxLength={10} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            </div>
          </div>
          <div className="form-group form-group--full">
            <label>Address (for prasadam delivery)</label>
            <textarea rows={3} value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Full address" />
          </div>

          <div className="dashboard-form__family">
            <h4>Family Members</h4>
            {form.familyMembers.map((fm, i) => (
              <div key={i} className="family-row">
                <span>{fm.name}</span>
                <span className="family-row__relation">{fm.relation}</span>
                <button type="button" className="btn-icon btn-icon--danger" onClick={() => removeFamilyMember(i)}><FiTrash2 /></button>
              </div>
            ))}
            <div className="family-row family-row--add">
              <input type="text" placeholder="Name" value={newMember.name} onChange={(e) => setNewMember((p) => ({ ...p, name: e.target.value }))} />
              <input type="text" placeholder="Relation" value={newMember.relation} onChange={(e) => setNewMember((p) => ({ ...p, relation: e.target.value }))} />
              <button type="button" className="btn btn-maroon" onClick={addFamilyMember}><FiPlus /> Add</button>
            </div>
          </div>

          <button type="submit" className="btn btn-maroon">Save Changes</button>
        </form>
      )}

      {activeTab === 'membership' && (
        <div className="dashboard-form card">
          <h3>Membership Details</h3>
          <div className="membership-card">
            <div className="membership-card__badge">ॐ</div>
            <h4>Shree Samrajya Lakshmi Temple — Member</h4>
            <p>Member ID: <strong>{member?.member_id ?? member?.memberId}</strong></p>
            <p>Member since: <strong>{member?.member_since ?? member?.memberSince}</strong></p>
            <button type="button" className="btn btn-secondary">Download Digital Certificate</button>
          </div>
          <p className="dashboard-form__note">Not a member yet? <Link to="/register">Become a Member</Link> to get your digital membership certificate and exclusive benefits.</p>
        </div>
      )}

      {activeTab === 'password' && (
        <form className="dashboard-form card" onSubmit={(e) => e.preventDefault()}>
          <h3>Change or Reset Password</h3>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Min 6 characters" />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" />
          </div>
          <button type="submit" className="btn btn-maroon">Update Password</button>
          <p className="dashboard-form__note">Forgot password? <Link to="/login/forgot-password">Reset via email</Link></p>
        </form>
      )}
    </div>
  )
}
