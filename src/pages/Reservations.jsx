import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Reservations.module.css';

function Reservations() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const todayDate = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [formData, setFormData] = useState({
    selectedDay: null,
    selectedTime: '19:00',
    guests: '2',
    selectedHall: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
  ];

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  let firstDayIndex = new Date(year, monthIndex, 1).getDay() - 1;
  if (firstDayIndex === -1) firstDayIndex = 6;

  const availableTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00',
  ];

  const handlePrevMonth = () => {
    setFormData((p) => ({ ...p, selectedDay: null }));
    setCurrentDate(new Date(year, monthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setFormData((p) => ({ ...p, selectedDay: null }));
    setCurrentDate(new Date(year, monthIndex + 1, 1));
  };

  const goToStep = (nextStep) => {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToStep(4);
  };

  const renderStepper = () => {
    const stepsInfo = [
      { num: 1, label: 'Terminarz' },
      { num: 2, label: 'Sala' },
      { num: 3, label: 'Dane' },
      { num: 4, label: 'Potwierdzenie' },
    ];

    return (
      <div className={styles.stepper}>
        {stepsInfo.map((s, index) => {
          const on = step >= s.num;
          return (
            <React.Fragment key={s.num}>
              <div className={`${styles.step} ${on ? styles.stepOn : styles.stepOff}`}>
                <span className={`${styles.stepNum} ${on ? styles.stepNumOn : ''}`}>{s.num}</span>
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
              {index < stepsInfo.length - 1 && <div className={styles.stepConnector} />}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.page}>
      {step < 4 && (
        <section className={styles.header}>
          <h1 className={styles.headerTitle}>Rezerwacja Stolika</h1>
          <p className={styles.headerSubtitle}>
            Zapraszamy do rezerwacji online. Wybierz dogodny termin, salę oraz podaj niezbędne dane,
            abyśmy mogli przygotować dla Ciebie idealne miejsce.
          </p>
        </section>
      )}

      {renderStepper()}

      <div className={styles.inner}>
        {/* 1: terminarz */}
        {step === 1 && (
          <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>Wybierz datę i liczbę gości</h2>
            <div className={styles.row40}>
              {/* kalendarz */}
              <div className={styles.whiteCard}>
                <div className={styles.calHeader}>
                  <button onClick={handlePrevMonth} className={styles.navBtn}>&lt;</button>
                  <div className={styles.calMonth}>{months[monthIndex]} {year}</div>
                  <button onClick={handleNextMonth} className={styles.navBtn}>&gt;</button>
                </div>

                <div className={styles.calGrid}>
                  {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map((d) => (
                    <div key={d} className={styles.calWeekday}>{d}</div>
                  ))}

                  {Array.from({ length: firstDayIndex }).map((_, i) => <div key={`empty-${i}`} />)}

                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const isPast =
                      new Date(year, monthIndex, day) <
                      new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
                    const selected = formData.selectedDay === day;
                    const cls = isPast
                      ? styles.dayPast
                      : selected
                      ? styles.daySelected
                      : styles.dayNormal;

                    return (
                      <div
                        key={day}
                        onClick={() => { if (!isPast) setFormData((p) => ({ ...p, selectedDay: day })); }}
                        className={`${styles.dayCell} ${cls}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* prawa strona */}
              <div className={styles.rightCol}>
                {formData.selectedDay ? (
                  <>
                    <div className={styles.whiteCard}>
                      <label className={styles.miniLabel}>Liczba gości</label>
                      <div className={styles.guestRow}>
                        <button className={styles.counterBtn} onClick={() => setFormData((p) => ({ ...p, guests: Math.max(1, parseInt(p.guests) - 1).toString() }))}>-</button>
                        <span className={styles.guestNum}>{formData.guests}</span>
                        <button className={styles.counterBtn} onClick={() => setFormData((p) => ({ ...p, guests: (parseInt(p.guests) + 1).toString() }))}>+</button>
                      </div>
                    </div>

                    <div className={styles.whiteCard}>
                      <label className={styles.miniLabel}>Godzina</label>
                      <div className={styles.timeGrid}>
                        {availableTimes.map((t) => (
                          <div
                            key={t}
                            onClick={() => setFormData((p) => ({ ...p, selectedTime: t }))}
                            className={`${styles.timeSlot} ${formData.selectedTime === t ? styles.timeSlotSelected : ''}`}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={styles.placeholder}>
                    Wybierz najpierw dzień w kalendarzu, aby wyświetlić wybór liczby gości oraz godzinę.
                  </div>
                )}
              </div>
            </div>

            <div className={styles.actionsEnd}>
              <button
                className={`${styles.primaryBtn} ${formData.selectedDay ? '' : styles.dimmed}`}
                disabled={!formData.selectedDay}
                onClick={() => goToStep(2)}
              >
                DALEJ: WYBIERZ SALĘ →
              </button>
            </div>
          </div>
        )}

        {/* 2: wybór sali */}
        {step === 2 && (
          <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>Wybierz salę</h2>
            <p className={styles.stepText}>Wybierz jedną z naszych trzech unikalnych stref, każda z niepowtarzalnym klimatem.</p>

            <div className={styles.hallRow}>
              {[
                { id: 'Sala Główna', placeholderText: 'Interior', desc: 'Przeszklona sala z eleganckim wykończeniem. Idealna na kolacje i spotkania rodzinne.' },
                { id: 'Sala VIP', placeholderText: 'VIP', desc: 'Kameralna przestrzeń z ekskluzywnym wystrojem. Wyposażona w sprzęt AV.' },
                { id: 'Ogródek Letni', placeholderText: 'Garden', desc: 'Ciągnąca się na zewnątrz strefa z widokiem na ogród. Doskonała na ciepłe wieczory.' },
              ].map((hall) => {
                const isSelected = formData.selectedHall === hall.id;
                return (
                  <div key={hall.id} className={`${styles.hallCard} ${isSelected ? styles.hallCardSelected : ''}`}>
                    <div className={styles.hallThumb}>{hall.placeholderText}</div>
                    <div className={styles.hallBody}>
                      <h3 className={styles.hallTitle}>{hall.id}</h3>
                      <p className={styles.hallDesc}>{hall.desc}</p>
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, selectedHall: hall.id }))}
                        className={`${styles.hallBtn} ${isSelected ? styles.hallBtnSelected : ''}`}
                      >
                        {isSelected ? 'WYBRANO SALĘ' : 'Wybierz tę salę'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.actionsBetween}>
              <button type="button" onClick={() => goToStep(1)} className={`${styles.primaryBtn} ${styles.backBtn}`}>WSTECZ</button>
              <button
                className={`${styles.primaryBtn} ${formData.selectedHall ? '' : styles.dimmed}`}
                disabled={!formData.selectedHall}
                onClick={() => goToStep(3)}
              >
                DALEJ: TWOJE DANE →
              </button>
            </div>
          </div>
        )}

        {/* 3: dane */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className={styles.dataForm}>
            <h2 className={styles.stepTitle}>Twoje dane</h2>
            <div className={styles.dataGrid}>
              <div className={styles.formGroup}><label className={styles.label}>Imię i nazwisko</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className={styles.input} required /></div>
              <div className={styles.formGroup}><label className={styles.label}>Telefon</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={styles.input} required /></div>
              <div className={styles.formGroup}><label className={styles.label}>E-mail</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} required /></div>
              <div className={styles.formGroup}><label className={styles.label}>Liczba osób</label><input type="number" name="guests" value={formData.guests} onChange={handleInputChange} className={styles.input} required /></div>
            </div>
            <div className={styles.formGroup}><label className={styles.label}>Uwagi (opcjonalnie)</label><textarea name="notes" value={formData.notes} onChange={handleInputChange} className={`${styles.input} ${styles.textarea}`} /></div>
            <div className={styles.actionsGap}>
              <button type="button" onClick={() => goToStep(2)} className={`${styles.primaryBtn} ${styles.backBtn}`}>WSTECZ</button>
              <button type="submit" className={styles.primaryBtn}>ZAREZERWUJ STOLIK</button>
            </div>
          </form>
        )}

        {/* 4: potwierdzenie */}
        {step === 4 && (
          <div className={styles.confirmationCard}>
            <div className={styles.checkCircle}>✓</div>
            <h2 className={styles.confTitle}>Rezerwacja potwierdzona!</h2>
            <p className={styles.confText}>Wysłaliśmy potwierdzenie na Twój e-mail: <strong>{formData.email}</strong></p>
            <div className={styles.summaryBox}>
              Data: {formData.selectedDay} {months[monthIndex]} {year} | Godzina: {formData.selectedTime} | Osób: {formData.guests} | Sala: {formData.selectedHall}
            </div>
            <button className={styles.primaryBtn} onClick={() => navigate('/')}>POWRÓT DO STRONY GŁÓWNEJ</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservations;
