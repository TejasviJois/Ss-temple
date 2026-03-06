/**
 * Firebase config and exports.
 * Uses your project config; optionally move apiKey to .env (VITE_FIREBASE_API_KEY) for production.
 */
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyCeQzKlMReW7BninSJDzT_JevjpmG1v0K0",
  authDomain: "sstemple-be2a6.firebaseapp.com",
  databaseURL: "https://sstemple-be2a6-default-rtdb.firebaseio.com",
  projectId: "sstemple-be2a6",
  storageBucket: "sstemple-be2a6.firebasestorage.app",
  messagingSenderId: "686610442983",
  appId: "1:686610442983:web:7bc8a73b18c0aae885d042",
  measurementId: "G-SELSZRPFFJ"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

let analytics = null
try {
  if (typeof window !== 'undefined') analytics = getAnalytics(app)
} catch (_) {}
export { analytics }

export default app
