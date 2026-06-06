import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import styles from './EmployeePages.module.css'

function AccessDenied() {
  const { authorizationError, logout } = useAuth()
  const navigate = useNavigate()
  const message =
    authorizationError ||
    'To konto nie ma przypisanego dostępu pracownika.'

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <section className={styles.page}>
      <div className={styles.narrow}>
        <p className={styles.eyebrow}>Strefa pracownika</p>
        <h1 className={styles.title}>Brak dostępu</h1>
        <p className={styles.description}>{message}</p>
        <p className={styles.description}>
          Poproś administratora projektu o sprawdzenie dokumentu
          {' '}
          <code>staff/&#123;uid&#125;</code>.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.button}
            type="button"
            onClick={handleLogout}
          >
            Wyloguj
          </button>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => navigate('/')}
          >
            Strona główna
          </button>
        </div>
      </div>
    </section>
  )
}

export default AccessDenied
