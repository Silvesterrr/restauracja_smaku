import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 — Nie znaleziono strony</h1>
      <p className={styles.text}>
        Strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <Link to="/" className={styles.link}>
        Powrót na stronę główną
      </Link>
    </div>
  );
}

export default NotFound;
