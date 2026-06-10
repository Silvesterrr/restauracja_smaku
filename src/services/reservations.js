import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'
import {
  clearReservationAttempt,
  getOrCreateReservationAttempt,
  ReservationAttemptExpiredError,
} from '../utils/reservationAttempt'

const WRITE_TIMEOUT_MS = 12_000
const AMBIGUOUS_ERROR_CODES = new Set([
  'aborted',
  'deadline-exceeded',
  'internal',
  'unavailable',
  'unknown',
  'firestore/aborted',
  'firestore/deadline-exceeded',
  'firestore/internal',
  'firestore/unavailable',
  'firestore/unknown',
  'app/write-timeout',
])

export class ReservationSubmissionError extends Error {
  constructor(message, retryable = false) {
    super(message)
    this.name = 'ReservationSubmissionError'
    this.retryable = retryable
  }
}

function withTimeout(promise) {
  let timeoutId
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error('Przekroczono czas zapisu.')
      error.code = 'app/write-timeout'
      reject(error)
    }, WRITE_TIMEOUT_MS)
  })

  return Promise.race([promise, timeout]).finally(() => {
    clearTimeout(timeoutId)
  })
}

export async function submitReservation(fields) {
  if (!firebaseConfigured) {
    clearReservationAttempt()
    throw new ReservationSubmissionError(
      'Brak konfiguracji Firebase. Formularz działa tylko po skonfigurowaniu środowiska deweloperskiego.',
    )
  }

  let attempt

  try {
    attempt = getOrCreateReservationAttempt(fields)
  } catch (error) {
    if (error instanceof ReservationAttemptExpiredError) {
      throw new ReservationSubmissionError(error.message)
    }
    throw error
  }

  const payload = {
    ...attempt.payload,
    submissionId: attempt.submissionId,
    createdAt: Timestamp.fromMillis(attempt.createdAtMs),
  }

  try {
    await withTimeout(
      setDoc(
        doc(db, 'reservations', attempt.submissionId),
        payload,
      ),
    )
    clearReservationAttempt()
    return payload
  } catch (error) {
    const retryable = AMBIGUOUS_ERROR_CODES.has(error.code)

    if (!retryable) {
      clearReservationAttempt()
    }

    throw new ReservationSubmissionError(
      retryable
        ? 'Nie otrzymaliśmy jednoznacznego potwierdzenia zapisu. Ponów próbę w ciągu 5 minut, aby użyć tego samego identyfikatora.'
        : 'Nie udało się zapisać rezerwacji. Sprawdź dane i spróbuj ponownie.',
      retryable,
    )
  }
}
