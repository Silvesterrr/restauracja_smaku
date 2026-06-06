import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import styles from './Navbar.module.css'

const NAVIGATION = [
  { path: '/menu', label: 'Menu' },
  { path: '/o-nas', label: 'O nas' },
  { path: '/rezerwacje', label: 'Rezerwacje' },
  { path: '/kontakt', label: 'Kontakt' },
  { path: '/galeria', label: 'Galeria' },
  { path: '/okazje', label: 'Okazje' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isStaff, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const linkClassName = (path) =>
    `${styles.link} ${
      location.pathname === path ? styles.linkActive : ''
    }`

  return (
    <nav className={styles.nav} aria-label="Główna nawigacja">
      <div className={styles.inner}>
        <Link className={styles.brand} to="/">
          Restauracja Smak
        </Link>

        <div className={styles.links}>
          {NAVIGATION.map((item) => (
            <Link
              className={linkClassName(item.path)}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
          {isStaff && (
            <Link className={linkClassName('/admin')} to="/admin">
              Panel
            </Link>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.reservationButton}
            type="button"
            onClick={() => navigate('/rezerwacje')}
          >
            Zarezerwuj stolik
          </button>
          {isStaff && (
            <button
              className={styles.logoutButton}
              type="button"
              onClick={handleLogout}
            >
              Wyloguj
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
