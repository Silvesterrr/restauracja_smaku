import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/menu', label: 'MENU' },
  { to: '/o-nas', label: 'O NAS' },
  { to: '/rezerwacje', label: 'REZERWACJE' },
  { to: '/kontakt', label: 'KONTAKT' },
  { to: '/galeria', label: 'GALERIA' },
  { to: '/okazje', label: 'OKAZJE' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isStaff, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={styles.nav} aria-label="Główna nawigacja">
      <div className={styles.inner}>
        <Link to="/" className={styles.brandLink}>
          <span className={styles.brand}>RESTAURACJA SMAK</span>
        </Link>

        <div className={styles.links}>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          
          {/* Panel Admina widoczny tylko dla zalogowanej obsługi */}
          {isStaff && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              PANEL
            </NavLink>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button className={styles.cta} type="button" onClick={() => navigate('/rezerwacje')}>
            ZAREZERWUJ STOLIK
          </button>
          
          {/* Przycisk wylogowania widoczny tylko dla zalogowanych */}
          {isStaff && (
            <button
              className={styles.logoutButton || styles.cta} // Zabezpieczenie na wypadek braku klasy w module
              type="button"
              onClick={handleLogout}
              style={{ background: '#DC2626', borderColor: '#DC2626' }} // Czerwony kolor dla wylogowania
            >
              WYLOGUJ
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;