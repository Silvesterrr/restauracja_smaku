import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>Restauracja Smak</div>
          <div className={styles.copyright}>
            © 2026 Restauracja Smak. Elegancja w każdym kęsie.
          </div>
        </div>

        <div className={styles.col}>
          <Link to="/kontakt" className={styles.link}>Godziny otwarcia</Link>
          <span className={`${styles.link} ${styles.linkStatic}`}>Polityka prywatności</span>
        </div>

        <div className={styles.col}>
          <span className={`${styles.link} ${styles.linkStatic}`}>Regulamin</span>
          <Link to="/kontakt" className={`${styles.link} ${styles.linkAccent}`}>Kontakt</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
