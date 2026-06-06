import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import styles from '../pages/EmployeePages.module.css'

function PrivateRoute({ children }) {
  const { user, isStaff, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <section className={styles.statePage} aria-live="polite">
        <div className={styles.spinner} aria-hidden="true" />
        <p>Sprawdzamy uprawnienia…</p>
      </section>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  if (!isStaff) {
    return <Navigate to="/brak-dostepu" replace />
  }

  return children
}

export default PrivateRoute
