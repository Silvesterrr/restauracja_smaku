export const RESERVATION_ATTEMPT_KEY = 'reservationSubmissionAttempt'
export const RESERVATION_ATTEMPT_MAX_AGE_MS = 5 * 60 * 1000

export class ReservationAttemptExpiredError extends Error {
  constructor() {
    super(
      'Minęło zbyt dużo czasu, aby bezpiecznie ponowić ten zapis. Sprawdź rezerwację z restauracją przed ponownym wysłaniem.',
    )
    this.name = 'ReservationAttemptExpiredError'
  }
}

function readAttempt(storage) {
  try {
    const value = storage.getItem(RESERVATION_ATTEMPT_KEY)
    return value ? JSON.parse(value) : null
  } catch {
    storage.removeItem(RESERVATION_ATTEMPT_KEY)
    return null
  }
}

function fingerprint(payload) {
  return JSON.stringify(payload)
}

export function getOrCreateReservationAttempt(
  payload,
  {
    storage = sessionStorage,
    now = Date.now(),
    randomUUID = () => crypto.randomUUID(),
  } = {},
) {
  const existingAttempt = readAttempt(storage)
  const payloadFingerprint = fingerprint(payload)

  if (existingAttempt?.payloadFingerprint === payloadFingerprint) {
    const age = now - existingAttempt.createdAtMs

    if (
      age >= -60_000 &&
      age <= RESERVATION_ATTEMPT_MAX_AGE_MS
    ) {
      return existingAttempt
    }

    storage.removeItem(RESERVATION_ATTEMPT_KEY)
    throw new ReservationAttemptExpiredError()
  }

  if (existingAttempt) {
    storage.removeItem(RESERVATION_ATTEMPT_KEY)
  }

  const attempt = {
    submissionId: randomUUID(),
    createdAtMs: now,
    payload,
    payloadFingerprint,
  }

  storage.setItem(RESERVATION_ATTEMPT_KEY, JSON.stringify(attempt))
  return attempt
}

export function clearReservationAttempt(storage = sessionStorage) {
  storage.removeItem(RESERVATION_ATTEMPT_KEY)
}
