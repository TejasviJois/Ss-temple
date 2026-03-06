import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAdmin } from '../context/AdminContext'

export default function ProtectedAdminRoute({ children }) {
  const { loading } = useAuth()
  const { isAdmin } = useAdmin()
  const location = useLocation()

  if (loading) {
    return <div className="auth-loading" style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>
  }
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
