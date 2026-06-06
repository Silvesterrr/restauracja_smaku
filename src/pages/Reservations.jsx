import { Fragment, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitReservation } from '../services/reservations'
import {
  addDaysToDateKey,
  buildDateKey,
  dateKeyParts,
  getWarsawDateKey,
  monthKey,
} from '../utils/date'
import {
  AVAILABLE_TIMES,
  buildReservationFields,
  HALLS,
  validateReservationFields,
} from '../utils/reservationForm'
import styles from './Reservations.module.css'

const MONTHS = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
]

const INITIAL_FORM_DATA = {
  selectedDay: null,
  selectedTime: '19:00',
  guests: '2',
  selectedHall: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
}

function Reservations() {
  const navigate = useNavigate()
  const [today] = useState(() => getWarsawDateKey())
  const [maximumDate] = useState(() => addDaysToDateKey(today, 180))
  const initialDate = useMemo(() => dateKeyParts(today), [today])
  const [currentDate, setCurrentDate] = useState(
    () => new Date(initialDate.year, initialDate.monthIndex, 1),
  )
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [submissionStatus, setSubmissionStatus] = useState('idle')
  const [submissionError, setSubmissionError] = useState('')
  const [retryable, setRetryable] = useState(false)
  const [savedReservation, setSavedReservation] = useState(null)

  const year = currentDate.getFullYear()
  const monthIndex = currentDate.getMonth()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstWeekday = new Date(year, monthIndex, 1).getDay()
  const firstDayIndex = firstWeekday === 0 ? 6 : firstWeekday - 1
  const currentMonth = monthKey(year, monthIndex)
  const minimumMonth = today.slice(0, 7)
  const maximumMonth = maximumDate.slice(0, 7)
  const formLocked = submissionStatus === 'submitting' || retryable

  const goToStep = (nextStep) => {
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const changeMonth = (direction) => {
    const nextDate = new Date(year, monthIndex + direction, 1)
    const nextMonth = monthKey(
      nextDate.getFullYear(),
      nextDate.getMonth(),
    )

    if (nextMonth < minimumMonth || nextMonth > maximumMonth) {
      return
    }

    setFormData((previous) => ({
      ...previous,
      selectedDay: null,
    }))
    setCurrentDate(nextDate)
  }

  const updateForm = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
    setSubmissionError('')
    setSubmissionStatus('idle')
  }

  const updateGuests = (difference) => {
    const guests = Math.min(
      20,
      Math.max(1, Number(formData.guests) + difference),
    )
    updateForm('guests', String(guests))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const serviceDate = buildDateKey(
      year,
      monthIndex,
      formData.selectedDay,
    )
    const fields = buildReservationFields(formData, serviceDate)
    const validationError = validateReservationFields(
      fields,
      today,
      maximumDate,
    )

    if (validationError) {
      setSubmissionStatus('error')
      setSubmissionError(validationError)
      setRetryable(false)
      return
    }

    setSubmissionStatus('submitting')
    setSubmissionError('')
    setRetryable(false)

    try {
      const savedPayload = await submitReservation(fields)
      setSavedReservation(savedPayload)
      setSubmissionStatus('success')
      goToStep(4)
    } catch (error) {
      setSubmissionStatus('error')
      setSubmissionError(
        error.message || 'Nie udało się zapisać rezerwacji.',
      )
      setRetryable(Boolean(error.retryable))
    }
  }

  const renderStepper = () => {
    const steps = [
      { number: 1, label: 'Terminarz' },
      { number: 2, label: 'Sala' },
      { number: 3, label: 'Dane' },
      { number: 4, label: 'Gotowe' },
    ]

    return (
      <div className={styles.stepper} aria-label="Etapy rezerwacji">
        {steps.map((item, index) => {
          const active = step >= item.number

          return (
            <Fragment key={item.number}>
              <div
                className={`${styles.step} ${
                  active ? styles.stepActive : ''
                }`}
                aria-current={step === item.number ? 'step' : undefined}
              >
                <span className={styles.stepNumber}>
                  {item.number}
                </span>
                <span>{item.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.stepLine} aria-hidden="true" />
              )}
            </Fragment>
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {step < 4 && (
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Rezerwacja stolika</h1>
          <p className={styles.heroText}>
            Wybierz dogodny termin, salę oraz podaj dane potrzebne do
            przygotowania stolika.
          </p>
        </section>
      )}

      {renderStepper()}

      <div className={styles.content}>
        {step === 1 && (
          <section className={styles.panel}>
            <h2 className={styles.stepTitle}>
              Wybierz datę i liczbę gości
            </h2>

            <div className={styles.schedule}>
              <div className={styles.card}>
                <div className={styles.calendarHeader}>
                  <button
                    className={styles.monthButton}
                    type="button"
                    onClick={() => changeMonth(-1)}
                    disabled={currentMonth <= minimumMonth}
                    aria-label="Poprzedni miesiąc"
                  >
                    ‹
                  </button>
                  <span>
                    {MONTHS[monthIndex]} {year}
                  </span>
                  <button
                    className={styles.monthButton}
                    type="button"
                    onClick={() => changeMonth(1)}
                    disabled={currentMonth >= maximumMonth}
                    aria-label="Następny miesiąc"
                  >
                    ›
                  </button>
                </div>

                <div className={styles.calendar}>
                  {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(
                    (weekday) => (
                      <div className={styles.weekday} key={weekday}>
                        {weekday}
                      </div>
                    ),
                  )}

                  {Array.from({ length: firstDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} />
                  ))}

                  {Array.from(
                    { length: daysInMonth },
                    (_, index) => index + 1,
                  ).map((day) => {
                    const dateKey = buildDateKey(year, monthIndex, day)
                    const unavailable =
                      dateKey < today || dateKey > maximumDate
                    const selected = formData.selectedDay === day

                    return (
                      <button
                        className={`${styles.day} ${
                          selected ? styles.daySelected : ''
                        }`}
                        key={day}
                        type="button"
                        disabled={unavailable}
                        onClick={() => updateForm('selectedDay', day)}
                        aria-label={`Wybierz ${day} ${
                          MONTHS[monthIndex]
                        } ${year}`}
                        aria-pressed={selected}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className={styles.choices}>
                {formData.selectedDay ? (
                  <>
                    <div className={styles.card}>
                      <span className={styles.miniLabel}>
                        Liczba gości
                      </span>
                      <div className={styles.counter}>
                        <button
                          className={styles.counterButton}
                          type="button"
                          onClick={() => updateGuests(-1)}
                          disabled={Number(formData.guests) <= 1}
                          aria-label="Zmniejsz liczbę gości"
                        >
                          −
                        </button>
                        <span className={styles.counterValue}>
                          {formData.guests}
                        </span>
                        <button
                          className={styles.counterButton}
                          type="button"
                          onClick={() => updateGuests(1)}
                          disabled={Number(formData.guests) >= 20}
                          aria-label="Zwiększ liczbę gości"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className={styles.card}>
                      <span className={styles.miniLabel}>Godzina</span>
                      <div className={styles.times}>
                        {AVAILABLE_TIMES.map((time) => {
                          const selected =
                            formData.selectedTime === time

                          return (
                            <button
                              className={`${styles.timeButton} ${
                                selected ? styles.timeSelected : ''
                              }`}
                              key={time}
                              type="button"
                              onClick={() =>
                                updateForm('selectedTime', time)
                              }
                              aria-pressed={selected}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={styles.hint}>
                    Wybierz dzień w kalendarzu, aby ustawić godzinę i
                    liczbę gości.
                  </div>
                )}
              </div>
            </div>

            <div className={styles.actions}>
              <span />
              <button
                className={styles.primaryButton}
                type="button"
                disabled={!formData.selectedDay}
                onClick={() => goToStep(2)}
              >
                Dalej: wybierz salę
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className={styles.panel}>
            <h2 className={styles.stepTitle}>Wybierz salę</h2>
            <p className={styles.stepIntro}>
              Wybierz jedną z trzech stref restauracji.
            </p>

            <div className={styles.halls}>
              {HALLS.map((hall) => {
                const selected = formData.selectedHall === hall.id

                return (
                  <article
                    className={`${styles.hall} ${
                      selected ? styles.hallSelected : ''
                    }`}
                    key={hall.id}
                  >
                    <div className={styles.hallImage}>
                      {hall.placeholder}
                    </div>
                    <h3 className={styles.hallTitle}>{hall.label}</h3>
                    <p className={styles.hallDescription}>
                      {hall.description}
                    </p>
                    <button
                      className={styles.hallButton}
                      type="button"
                      onClick={() =>
                        updateForm('selectedHall', hall.id)
                      }
                      aria-pressed={selected}
                    >
                      {selected
                        ? `Wybrano: ${hall.label}`
                        : `Wybierz: ${hall.label}`}
                    </button>
                  </article>
                )
              })}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => goToStep(1)}
              >
                Wstecz
              </button>
              <button
                className={styles.primaryButton}
                type="button"
                disabled={!formData.selectedHall}
                onClick={() => goToStep(3)}
              >
                Dalej: twoje dane
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.stepTitle}>Twoje dane</h2>

            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span className={styles.label}>Imię i nazwisko</span>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(event) =>
                    updateForm(event.target.name, event.target.value)
                  }
                  minLength={2}
                  maxLength={100}
                  disabled={formLocked}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Telefon</span>
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(event) =>
                    updateForm(event.target.name, event.target.value)
                  }
                  minLength={7}
                  maxLength={20}
                  disabled={formLocked}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>E-mail</span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(event) =>
                    updateForm(event.target.name, event.target.value)
                  }
                  minLength={5}
                  maxLength={254}
                  disabled={formLocked}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Liczba osób</span>
                <input
                  className={styles.input}
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={(event) =>
                    updateForm(event.target.name, event.target.value)
                  }
                  min="1"
                  max="20"
                  disabled={formLocked}
                  required
                />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Uwagi (opcjonalnie)</span>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                name="notes"
                value={formData.notes}
                onChange={(event) =>
                  updateForm(event.target.name, event.target.value)
                }
                maxLength={500}
                disabled={formLocked}
              />
            </label>

            {submissionError && (
              <div className={styles.retry}>
                <p className={styles.error} role="alert">
                  {submissionError}
                </p>
              </div>
            )}

            <div className={styles.actions}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => goToStep(2)}
                disabled={formLocked}
              >
                Wstecz
              </button>
              <button
                className={styles.primaryButton}
                type="submit"
                disabled={submissionStatus === 'submitting'}
              >
                {submissionStatus === 'submitting'
                  ? 'Zapisywanie…'
                  : retryable
                    ? 'Ponów zapis'
                    : 'Zarezerwuj stolik'}
              </button>
            </div>
          </form>
        )}

        {step === 4 && savedReservation && (
          <section className={styles.confirmation}>
            <div className={styles.check} aria-hidden="true">
              ✓
            </div>
            <h2 className={styles.confirmationTitle}>
              Rezerwacja została zapisana
            </h2>
            <p className={styles.confirmationText}>
              Dziękujemy. Restauracja otrzymała dane rezerwacji.
            </p>
            <div className={styles.summary}>
              Data: {savedReservation.serviceDate} | Godzina:{' '}
              {savedReservation.time} | Osób: {savedReservation.guests}
              {' | '}
              Sala: {savedReservation.hall}
            </div>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => navigate('/')}
            >
              Powrót do strony głównej
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

export default Reservations
