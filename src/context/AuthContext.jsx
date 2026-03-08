import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

// Supabase user has .id (UUID); expose as .uid for compatibility with code that expected Firebase
function toAuthUser(supabaseUser) {
  if (!supabaseUser) return null
  return { ...supabaseUser, uid: supabaseUser.id }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [member, setMember] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const phoneConfirmationRef = useRef(null)

  async function fetchProfiles(userId) {
    if (!userId) {
      setMember(null)
      setAdmin(null)
      return { member: null, admin: null }
    }
    try {
      const [memberRes, adminRes] = await Promise.all([
        supabase.from('members').select('*').eq('id', userId).maybeSingle(),
        supabase.from('admin_roles').select('*').eq('id', userId).maybeSingle(),
      ])
      const m = memberRes.data ? { id: memberRes.data.id, ...memberRes.data } : null
      const a = adminRes.data ? { id: adminRes.data.id, ...adminRes.data } : null
      setMember(m)
      setAdmin(a)
      return { member: m, admin: a }
    } catch (_) {
      setMember(null)
      setAdmin(null)
      return { member: null, admin: null }
    }
  }

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const authUser = session?.user ? toAuthUser(session.user) : null
      setUser(authUser)
      if (authUser) {
        await fetchProfiles(authUser.id)
      } else {
        setMember(null)
        setAdmin(null)
      }
      setLoading(false)
    })

    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const authUser = session?.user ? toAuthUser(session.user) : null
      setUser(authUser)
      if (authUser) {
        fetchProfiles(authUser.id).then(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const authUser = toAuthUser(data.user)
    const { member: m, admin: a } = await fetchProfiles(authUser.id)
    return { user: authUser, session: authUser, member: m, admin: a }
  }

  const loginWithOtp = async (phone) => {
    const normalized = phone.replace(/\D/g, '')
    const phoneNumber = normalized.length >= 10 ? `+91${normalized}` : phone
    const { data, error } = await supabase.auth.signInWithOtp({ phone: phoneNumber })
    if (error) throw error
    phoneConfirmationRef.current = { phone: phoneNumber }
    return {}
  }

  const verifyOtp = async (phone, token) => {
    const normalized = phone.replace(/\D/g, '')
    const phoneNumber = normalized.length >= 10 ? `+91${normalized}` : phone
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: token.trim(),
      type: 'sms',
    })
    if (error) throw error
    phoneConfirmationRef.current = null
    const authUser = toAuthUser(data.user)
    const { member: m, admin: a } = await fetchProfiles(authUser.id)
    return { user: authUser, session: authUser, member: m, admin: a }
  }

  const signUp = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: metadata } })
    if (error) throw error
    const authUser = data.user ? toAuthUser(data.user) : null
    return { data: { user: authUser } }
  }

  const createMemberProfile = async (uid, profile) => {
    const memberId = 'MBR' + Date.now().toString(36).toUpperCase()
    const row = {
      id: uid,
      member_id: memberId,
      full_name: profile.fullName || '',
      mobile: profile.mobile || '',
      email: profile.email || null,
      city: profile.city || null,
      state: profile.state || null,
      member_since: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase.from('members').upsert(row, { onConflict: 'id' })
    if (error) throw error
    await fetchProfiles(uid)
    return { id: uid, ...row }
  }

  const updateMemberProfile = async (updates) => {
    if (!user) return
    const payload = {
      full_name: updates.fullName ?? updates.full_name,
      mobile: updates.mobile,
      email: updates.email ?? null,
      dob: updates.dob || null,
      gender: updates.gender || null,
      gotra: updates.gotra || null,
      nakshatra: updates.nakshatra || null,
      address: updates.address || null,
      city: updates.city || null,
      state: updates.state || null,
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase.from('members').update(payload).eq('id', user.id)
    if (error) throw error
    const updated = { ...member, ...payload }
    setMember(updated)
    return updated
  }

  const updateProfile = async (profile) => {
    return updateMemberProfile(profile)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMember(null)
    setAdmin(null)
  }

  const session = user
  const isLoggedIn = !!user
  const isAdmin = !!admin
  const isSuperAdmin = !!admin && admin.role === 'super'

  const value = {
    user,
    session,
    member,
    admin,
    loading,
    isLoggedIn,
    isAdmin,
    isSuperAdmin,
    loginWithEmail,
    loginWithOtp,
    verifyOtp,
    signUp,
    createMemberProfile,
    updateMemberProfile,
    updateProfile,
    logout,
    fetchProfiles,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
