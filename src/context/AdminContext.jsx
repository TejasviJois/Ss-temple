import { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const auth = useAuth()
  const { loginWithEmail, logout, admin, isAdmin, isSuperAdmin } = auth

  const login = async (email, password) => {
    const result = await loginWithEmail(email, password)
    if (!result.admin) {
      await logout()
      throw new Error('Not authorized as admin.')
    }
    return result
  }

  return (
    <AdminContext.Provider value={{
      admin,
      login,
      logout,
      isAdmin,
      isSuperAdmin,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
