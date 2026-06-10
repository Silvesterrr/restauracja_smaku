import React, { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitReservation } from '../services/reservations';
import {
  addDaysToDateKey,
  buildDateKey,
  dateKeyParts,
  getWarsawDateKey,
  monthKey,
} from '../utils/date';
import {
  AVAILABLE_TIMES,
  buildReservationFields,
  HALLS,
  validateReservationFields,
} from '../utils/reservationForm';
import styles from './Reservations.module.css';

const MONTHS = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
];

const INITIAL_FORM_DATA = {
  selectedDay: null,
  selectedTime: '19:00',
  guests: '2',
  selectedHall: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
};

export default function Reservations() {
  const navigate = useNavigate();
  const [today] = useState(() => getWarsawDateKey());
  const [maximumDate] = useState(() => addDaysToDateKey(today, 180));
  const initialDate = useMemo(() => dateKeyParts(today), [today]);
  const [currentDate, setCurrentDate] = useState(
    () => new Date(initialDate.year, initialDate.monthIndex, 1),
  );
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [submissionError, setSubmissionError] = useState('');
  const [retryable, setRetryable] = useState(false);
  const [savedReservation, setSavedReservation] = useState(null);

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const firstDayIndex = firstWeekday === 0 ? 6 : firstWeekday - 1;
  
  const currentMonth = monthKey(year, monthIndex);
  const minimumMonth = today.slice(0, 7);
  const maximumMonth = maximumDate.slice(0, 7);
  const formLocked = submissionStatus === 'submitting' || retryable;

  const goToStep = (nextStep) => {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeMonth = (direction) => {
    const nextDate = new Date(year, monthIndex + direction, 1);
    const nextMonth = monthKey(nextDate.getFullYear(), nextDate.getMonth());

    if (nextMonth < minimumMonth || nextMonth > maximumMonth) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      selectedDay: null,
    }));
    setCurrentDate(nextDate);
  };

  const updateForm = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setSubmissionError('');
    setSubmissionStatus('idle');
  };

  const updateGuests = (difference) => {
    const guests = Math.min(
      20,
      Math.max(1, Number(formData.guests) + difference),
    );
    updateForm('guests', String(guests));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serviceDate = buildDateKey(year, monthIndex, formData.selectedDay);
    const fields = buildReservationFields(formData, serviceDate);
    const validationError = validateReservationFields(fields, today, maximumDate);

    if (validationError) {
      setSubmissionStatus('error');
      setSubmissionError(validationError);
      setRetryable(false);
      return;
    }

    setSubmissionStatus('submitting');
    setSubmissionError('');
    setRetryable(false);

    try {
      const savedPayload = await submitReservation(fields);
      setSavedReservation(savedPayload);
      setSubmissionStatus('success');
      goToStep(4);
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionError(error.message || 'Nie udało się zapisać rezerwacji.');
      setRetryable(Boolean(error.retryable));
    }
  };

  const renderStepper = () => {
    const stepsInfo = [
      { num: 1, label: 'Terminarz' },
      { num: 2, label: 'Sala' },
      { num: 3, label: 'Dane' },
      { num: 4, label: 'Potwierdzenie' },
    ];
    return (
      <div className={styles.stepper} aria-label="Etapy rezerwacji">
        {stepsInfo.map((s, index) => {
          const on = step >= s.num;
          return (
            <Fragment key={s.num}>
              <div
                className={`${styles.step} ${on ? styles.stepOn : styles.stepOff}`}
                aria-current={step === s.num ? 'step' : undefined}
              >
                <span className={`${styles.stepNum} ${on ? styles.stepNumOn : ''}`}>{s.num}</span>
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
              {index < stepsInfo.length - 1 && <div className={styles.stepConnector} aria-hidden="true" />}
            </Fragment>
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
        {/* Krok 1: Terminarz */}
        {step === 1 && (
          <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>Wybierz datę i liczbę gości</h2>
            <div className={styles.row40}>
              
              {/* Kalendarz */}
              <div className={styles.whiteCard}>
                <div className={styles.calHeader}>
                  <button
                    onClick={() => changeMonth(-1)}
                    className={styles.navBtn}
                    type="button"
                    disabled={currentMonth <= minimumMonth}
                    aria-label="Poprzedni miesiąc"
                  >
                    &lt;
                  </button>
                  <div className={styles.calMonth}>{MONTHS[monthIndex]} {year}</div>
                  <button
                    onClick={() => changeMonth(1)}
                    className={styles.navBtn}
                    type="button"
                    disabled={currentMonth >= maximumMonth}
                    aria-label="Następny miesiąc"
                  >
                    &gt;
                  </button>
                </div>

                <div className={styles.calGrid}>
                  {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map((d) => (
                    <div key={d} className={styles.calWeekday}>{d}</div>
                  ))}

                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const dateKey = buildDateKey(year, monthIndex, day);
                    const unavailable = dateKey < today || dateKey > maximumDate;
                    const selected = formData.selectedDay === day;
                    
                    const cls = unavailable
                      ? styles.dayPast
                      : selected
                      ? styles.daySelected
                      : styles.dayNormal;

                    return (
                      <div
                        key={day}
                        onClick={() => { if (!unavailable) updateForm('selectedDay', day); }}
                        className={`${styles.dayCell} ${cls}`}
                        role="button"
                        aria-label={`Wybierz ${day} ${MONTHS[monthIndex]} ${year}`}
                        aria-pressed={selected}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prawa kolumna (Liczba gości i godzina) */}
              <div className={styles.rightCol}>
                {formData.selectedDay ? (
                  <>
                    <div className={styles.whiteCard}>
                      <span className={styles.miniLabel}>Liczba gości</span>
                      <div className={styles.guestRow}>
                        <button
                          className={styles.counterBtn}
                          type="button"
                          onClick={() => updateGuests(-1)}
                          disabled={Number(formData.guests) <= 1}
                        >
                          -
                        </button>
                        <span className={styles.guestNum}>{formData.guests}</span>
                        <button
                          className={styles.counterBtn}
                          type="button"
                          onClick={() => updateGuests(1)}
                          disabled={Number(formData.guests) >= 20}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className={styles.whiteCard}>
                      <span className={styles.miniLabel}>Godzina</span>
                      <div className={styles.timeGrid}>
                        {AVAILABLE_TIMES.map((time) => {
                          const selected = formData.selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => updateForm('selectedTime', time)}
                              className={`${styles.timeSlot} ${selected ? styles.timeSlotSelected : ''}`}
                              aria-pressed={selected}
                            >
                              {time}
                            </button>
                          );
                        })}
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
                type="button"
                disabled={!formData.selectedDay}
                onClick={() => goToStep(2)}
              >
                Dalej: wybierz salę
              </button>
            </div>
          </div>
        )}

        {/* Krok 2: Wybór Sali */}
        {step === 2 && (
          <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>Wybierz salę</h2>
            <p className={styles.stepText}>Wybierz jedną z naszych trzech unikalnych stref, każda z niepowtarzalnym klimatem.</p>

            <div className={styles.hallRow}>
              {HALLS.map((hall) => {
                const isSelected = formData.selectedHall === hall.id;
                return (
                  <div key={hall.id} className={`${styles.hallCard} ${isSelected ? styles.hallCardSelected : ''}`}>
                    <div className={styles.hallThumb}>{hall.placeholder || 'Sala'}</div>
                    <div className={styles.hallBody}>
                      <h3 className={styles.hallTitle}>{hall.label}</h3>
                      <p className={styles.hallDesc}>{hall.description}</p>
                      <button
                        type="button"
                        onClick={() => updateForm('selectedHall', hall.id)}
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
                type="button"
                disabled={!formData.selectedHall}
                onClick={() => goToStep(3)}
              >
                Dalej: twoje dane
              </button>
            </div>
          </div>
        )}

        {/* Krok 3: Dane Osobowe */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className={styles.dataForm}>
            <div className={styles.stepContainer}>
              <h2 className={styles.stepTitle}>Twoje dane</h2>
              <div className={styles.dataGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Imię i nazwisko</label>
                  <input type="text" name="name" value={formData.name} onChange={(e) => updateForm(e.target.name, e.target.value)} className={styles.input} disabled={formLocked} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Telefon</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={(e) => updateForm(e.target.name, e.target.value)} className={styles.input} disabled={formLocked} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={(e) => updateForm(e.target.name, e.target.value)} className={styles.input} disabled={formLocked} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Liczba osób</label>
                  <input type="number" name="guests" value={formData.guests} onChange={(e) => updateForm(e.target.name, e.target.value)} className={styles.input} min="1" max="20" disabled={formLocked} required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Uwagi (opcjonalnie)</label>
                <textarea name="notes" value={formData.notes} onChange={(e) => updateForm(e.target.name, e.target.value)} className={`${styles.input} ${styles.textarea}`} maxLength={500} disabled={formLocked} />
              </div>

              {submissionError && (
                <div style={{ color: '#DC2626', marginBottom: '15px', fontWeight: '500' }} role="alert">
                  {submissionError}
                </div>
              )}

              <div className={styles.actionsGap}>
                <button type="button" onClick={() => goToStep(2)} className={`${styles.primaryBtn} ${styles.backBtn}`} disabled={formLocked}>WSTECZ</button>
                <button type="submit" className={styles.primaryBtn} disabled={submissionStatus === 'submitting'}>
                  {submissionStatus === 'submitting'
                    ? 'ZAPISYWANIE…'
                    : retryable
                    ? 'PONÓW ZAPIS'
                    : 'ZAREZERWUJ STOLIK'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Krok 4: Potwierdzenie */}
        {step === 4 && savedReservation && (
          <div className={styles.confirmationCard}>
            <div className={styles.checkCircle}>✓</div>
            <h2 className={styles.confTitle}>Rezerwacja została zapisana!</h2>
            <p className={styles.confText}>Dziękujemy. Restauracja otrzymała dane rezerwacji.</p>
            <div className={styles.summaryBox}>
              Data: {savedReservation.serviceDate} | Godzina: {savedReservation.time} | Osób: {savedReservation.guests} | Sala: {savedReservation.hall}
            </div>
            <button type="button" className={styles.primaryBtn} onClick={() => navigate('/')}>POWRÓT DO STRONY GŁÓWNEJ</button>
          </div>
        )}
      </div>
    </div>
  );
}