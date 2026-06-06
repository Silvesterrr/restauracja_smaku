import {
  getOrCreateReservationAttempt,
  RESERVATION_ATTEMPT_KEY,
  ReservationAttemptExpiredError,
} from './reservationAttempt'

function createStorage() {
  const values = new Map()

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
}

describe('reservation attempt', () => {
  it('reuses the same submission id and timestamp for a retry', () => {
    const storage = createStorage()
    const payload = { customerName: 'Jan Kowalski' }
    const firstAttempt = getOrCreateReservationAttempt(payload, {
      storage,
      now: 1_000,
      randomUUID: () => 'first-submission-id',
    })
    const retryAttempt = getOrCreateReservationAttempt(payload, {
      storage,
      now: 20_000,
      randomUUID: () => 'second-submission-id',
    })

    expect(retryAttempt).toEqual(firstAttempt)
    expect(retryAttempt.submissionId).toBe('first-submission-id')
    expect(retryAttempt.createdAtMs).toBe(1_000)
  })

  it('starts a new attempt when the payload changes', () => {
    const storage = createStorage()

    getOrCreateReservationAttempt(
      { customerName: 'Jan Kowalski' },
      {
        storage,
        now: 1_000,
        randomUUID: () => 'first-submission-id',
      },
    )
    const changedAttempt = getOrCreateReservationAttempt(
      { customerName: 'Anna Kowalska' },
      {
        storage,
        now: 2_000,
        randomUUID: () => 'second-submission-id',
      },
    )

    expect(changedAttempt.submissionId).toBe('second-submission-id')
  })

  it('blocks an unsafe retry after five minutes', () => {
    const storage = createStorage()
    const payload = { customerName: 'Jan Kowalski' }

    getOrCreateReservationAttempt(payload, {
      storage,
      now: 1_000,
      randomUUID: () => 'first-submission-id',
    })

    expect(() =>
      getOrCreateReservationAttempt(payload, {
        storage,
        now: 302_000,
      }),
    ).toThrow(ReservationAttemptExpiredError)
    expect(storage.getItem(RESERVATION_ATTEMPT_KEY)).toBeNull()
  })
})
