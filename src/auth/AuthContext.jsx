import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, firebaseConfigured } from '../firebase'
import AuthContext from './authContextValue'

function configurationError() {
  const error = new Error('Brak konfiguracji Firebase.')
  error.code = 'app/firebase-not-configured'
  return error
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isStaff, setIsStaff] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authorizationError, setAuthorizationError] = useState('')
  const verificationId = useRef(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      const currentVerification = verificationId.current + 1
      verificationId.current = currentVerification
      setLoading(true)
      setUser(nextUser)
      setIsStaff(false)
      setAuthorizationError('')

      if (!nextUser) {
        setLoading(false)
        return
      }

      if (!firebaseConfigured) {
        setAuthorizationError(
          'Nie skonfigurowano połączenia z Firebase.',
        )
        setLoading(false)
        return
      }

      try {
        const staffSnapshot = await getDoc(
          doc(db, 'staff', nextUser.uid),
        )

        if (verificationId.current === currentVerification) {
          setIsStaff(staffSnapshot.exists())
        }
      } catch {
        if (verificationId.current === currentVerification) {
          setAuthorizationError(
            'Nie udało się zweryfikować uprawnień pracownika.',
          )
          setIsStaff(false)
        }
      } finally {
        if (verificationId.current === currentVerification) {
          setLoading(false)
        }
      }
    })

    return unsubscribe
  }, [])

  const login = useCallback(async (email, password) => {
    if (!firebaseConfigured) {
      throw configurationError()
    }

    return signInWithEmailAndPassword(auth, email, password)
  }, [])

  const logout = useCallback(() => signOut(auth), [])

  const value = useMemo(
    () => ({
      user,
      isStaff,
      loading,
      authorizationError,
      login,
      logout,
    }),
    [authorizationError, isStaff, loading, login, logout, user],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
