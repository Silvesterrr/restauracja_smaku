import { Link, NavLink, useNavigate } from 'react-router-dom';
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

  return (
    <nav className={styles.nav}>
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
        </div>

        <button className={styles.cta} onClick={() => navigate('/rezerwacje')}>
          ZAREZERWUJ STOLIK
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
