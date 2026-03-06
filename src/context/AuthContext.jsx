import { createContext, useContext, useState, useEffect, useRef } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [member, setMember] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const phoneConfirmationRef = useRef(null)

  // Firebase Auth persists session per browser (JWT) — multiple users can be logged in on different devices
  async function fetchProfiles(uid) {
    if (!uid) {
      setMember(null)
      setAdmin(null)
      return { member: null, admin: null }
    }
    try {
      const [memberSnap, adminSnap] = await Promise.all([
        getDoc(doc(db, 'members', uid)),
        getDoc(doc(db, 'adminRoles', uid)),
      ])
      const m = memberSnap.exists() ? { id: memberSnap.id, ...memberSnap.data() } : null
      const a = adminSnap.exists() ? { id: adminSnap.id, ...adminSnap.data() } : null
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
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await fetchProfiles(firebaseUser.uid)
      } else {
        setMember(null)
        setAdmin(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const loginWithEmail = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password)
    const { member: m, admin: a } = await fetchProfiles(userCred.user.uid)
    return { user: userCred.user, session: userCred.user, member: m, admin: a }
  }

  const loginWithOtp = async (phone) => {
    const normalized = phone.replace(/\D/g, '')
    const phoneNumber = normalized.length >= 10 ? `+91${normalized}` : phone
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      })
    }
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    phoneConfirmationRef.current = confirmationResult
    return {}
  }

  const verifyOtp = async (phone, token) => {
    const confirmationResult = phoneConfirmationRef.current
    if (!confirmationResult) throw new Error('Please request OTP again.')
    const userCred = await confirmationResult.confirm(token.trim())
    phoneConfirmationRef.current = null
    const { member: m, admin: a } = await fetchProfiles(userCred.user.uid)
    return { user: userCred.user, session: userCred.user, member: m, admin: a }
  }

  const signUp = async (email, password, metadata = {}) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    return { data: { user: userCred.user } }
  }

  const createMemberProfile = async (uid, profile) => {
    const memberId = 'MBR' + Date.now().toString(36).toUpperCase()
    const data = {
      member_id: memberId,
      full_name: profile.fullName || '',
      mobile: profile.mobile || '',
      email: profile.email || null,
      city: profile.city || null,
      state: profile.state || null,
      member_since: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    }
    await setDoc(doc(db, 'members', uid), data, { merge: true })
    await fetchProfiles(uid)
    return { id: uid, ...data }
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
    const ref = doc(db, 'members', user.uid)
    await updateDoc(ref, payload)
    const updated = { ...member, ...payload }
    setMember(updated)
    return updated
  }

  const updateProfile = async (profile) => {
    return updateMemberProfile(profile)
  }

  const logout = async () => {
    await firebaseSignOut(auth)
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
