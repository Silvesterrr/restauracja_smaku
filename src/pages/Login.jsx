import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import styles from './EmployeePages.module.css'

function Login() {
  const { user, isStaff, loading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (loading || !user) {
      return
    }

    if (isStaff) {
      navigate(location.state?.from || '/admin', { replace: true })
    } else {
      navigate('/brak-dostepu', { replace: true })
    }
  }, [isStaff, loading, location.state, navigate, user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await login(email.trim(), password)
    } catch (loginError) {
      if (loginError.code === 'app/firebase-not-configured') {
        setError(
          'Brak konfiguracji Firebase. Uzupełnij lokalny plik .env.',
        )
      } else {
        setError(
          'Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.',
        )
      }
      setSubmitting(false)
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.narrow}>
        <p className={styles.eyebrow}>Strefa pracownika</p>
        <h1 className={styles.title}>Logowanie</h1>
        <p className={styles.description}>
          Panel jest przeznaczony wyłącznie dla pracowników restauracji.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>E-mail</span>
            <input
              className={styles.input}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Hasło</span>
            <input
              className={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button
            className={styles.button}
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Logowanie…' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login
