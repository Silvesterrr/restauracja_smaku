import { useState, useRef } from 'react';
import styles from './Occasions.module.css';

function Occasions() {
  const [isSent, setIsSent] = useState(false);
  const [eventType, setEventType] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const formRef = useRef(null);

  const handleAskClick = (typeText) => {
    setEventType(typeText);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className={styles.page}>
      {/* nagłówek */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Okazje</h1>
          <p className={styles.intro}>
            Organizujemy spotkania biznesowe i imprezy okolicznościowe w niepowtarzalnej atmosferze.
          </p>
        </div>
      </section>

      {/* karty */}
      <section className={styles.cardsSection}>
        <div className={styles.cardsInner}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Spotkania Biznesowe</h2>
              <p className={styles.cardDesc}>
                Sala VIP z pełnym wyposażeniem, catering firmowy i profesjonalna obsługa. Idealne
                miejsce na prezentacje, szkolenia i negocjacje.
              </p>
            </div>
            <button className={styles.cardButton} onClick={() => handleAskClick('Spotkanie Biznesowe')}>
              ZAPYTAJ O SPOTKANIE
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Imprezy Okolicznościowe</h2>
              <p className={styles.cardDesc}>
                Urodziny, rocznice, chrzciny i przyjęcia. Dedykowane menu, dekoracje i niezapomniana
                atmosfera. Zadbamy o każdy detal Twojego święta.
              </p>
            </div>
            <button className={styles.cardButton} onClick={() => handleAskClick('Impreza Okolicznościowa')}>
              ZAPYTAJ O IMPREZĘ
            </button>
          </div>
        </div>
      </section>

      {/* formularz zapytania */}
      <section ref={formRef} className={styles.formSection}>
        <div className={styles.formInner}>
          <h2 className={styles.formTitle}>Formularz Zapytania</h2>

          {isSent ? (
            <div className={styles.success}>
              ✓ Dziękujemy! Twoje zapytanie zostało pomyślnie wysłane. Skontaktujemy się z Tobą wkrótce.
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Typ imprezy</label>
                <input
                  type="text"
                  placeholder="np. Konferencja, Urodziny"
                  className={styles.input}
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Planowana data</label>
                <input type="date" className={styles.input} min={today} required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Liczba gości</label>
                <input type="number" placeholder="np. 25" className={styles.input} required min="1" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Dodatkowe uwagi</label>
                <textarea placeholder="Twoja wiadomość..." className={`${styles.input} ${styles.textarea}`} />
              </div>

              <button type="submit" className={styles.submit}>
                Wyślij zapytanie
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Occasions;
