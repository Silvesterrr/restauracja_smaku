import { useState } from 'react';
import styles from './ContactPage.module.css';

const HOURS = [
  { day: 'Poniedziałek', time: 'Nieczynne' },
  { day: 'Wtorek - Czwartek', time: '12:00 - 22:00' },
  { day: 'Piątek - Sobota', time: '12:00 - 23:00' },
  { day: 'Niedziela', time: '12:00 - 21:00' },
];

function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.title}>Kontakt</h1>
          <hr className={styles.divider} />
          <p className={styles.subtitle}>
            Masz pytania, chcesz zorganizować przyjęcie lub po prostu się przywitać?
            Jesteśmy do Twojej dyspozycji.
          </p>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Left column */}
          <div className={styles.leftCol}>
            {/* Contact details */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Dane kontaktowe</h2>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>Adres</div>
                <div className={styles.contactValue}>
                  ul. Kulinarna 15<br />00-001 Warszawa
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>Telefon</div>
                <div className={styles.contactValue}>+48 123 456 789</div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactValue}>kontakt@restauracjasmak.pl</div>
              </div>
            </div>

            {/* Opening hours */}
            <div className={styles.card}>
              <h2 className={styles.hoursTitle}>
                <svg className={styles.clockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                Godziny otwarcia
              </h2>
              {HOURS.map((row) => (
                <div key={row.day} className={styles.hoursRow}>
                  <span className={styles.hoursDay}>{row.day}</span>
                  <span className={styles.hoursTime}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Wyślij wiadomość</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Imię i nazwisko</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Jan Kowalski"
                    required
                    value={form.name}
                    onChange={set('name')}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Adres email</label>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="jan@example.com"
                    required
                    value={form.email}
                    onChange={set('email')}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Temat</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Rezerwacja / Pytanie"
                  required
                  value={form.subject}
                  onChange={set('subject')}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Wiadomość</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Twoja wiadomość..."
                  required
                  value={form.message}
                  onChange={set('message')}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>Wyślij →</button>
              {formSubmitted && (
                <div className={styles.successMsg}>
                  Wiadomość została wysłana pomyślnie! Dziękujemy.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Map */}
        <div className={styles.mapWrapper}>
          <iframe
            title="Mapa Restauracja Smak"
            src="https://maps.google.com/maps?q=ul.%20Kulinarna%2015,%20Warszawa&t=&z=15&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
