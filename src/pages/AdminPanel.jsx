import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import ReservationCard from '../components/ReservationCard'
import { db, firebaseConfigured } from '../firebase'
import { getWarsawDateKey } from '../utils/date'
import styles from './EmployeePages.module.css'

function AdminPanel() {
  const [today] = useState(() => getWarsawDateKey())
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadReservations = async () => {
      if (!firebaseConfigured) {
        setError('Brak konfiguracji Firebase.')
        setLoading(false)
        return
      }

      try {
        const reservationsQuery = query(
          collection(db, 'reservations'),
          where('serviceDate', '==', today),
          orderBy('time', 'asc'),
          limit(100),
        )
        const snapshot = await getDocs(reservationsQuery)

        if (active) {
          setReservations(
            snapshot.docs.map((reservationDocument) => ({
              id: reservationDocument.id,
              ...reservationDocument.data(),
            })),
          )
        }
      } catch {
        if (active) {
          setError(
            'Nie udało się pobrać dzisiejszych rezerwacji.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadReservations()

    return () => {
      active = false
    }
  }, [today])

  return (
    <section className={styles.page}>
      <div className={styles.admin}>
        <header className={styles.adminHeader}>
          <div>
            <p className={styles.eyebrow}>Panel pracownika</p>
            <h1 className={styles.title}>Dzisiejsze rezerwacje</h1>
          </div>
          <span className={styles.dateBadge}>{today}</span>
        </header>

        {loading && (
          <div className={styles.emptyState} aria-live="polite">
            Ładowanie rezerwacji…
          </div>
        )}

        {!loading && error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className={styles.emptyState}>
            Brak rezerwacji na dzisiaj.
          </div>
        )}

        {!loading && !error && reservations.length > 0 && (
          <div className={styles.reservationList}>
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminPanel
