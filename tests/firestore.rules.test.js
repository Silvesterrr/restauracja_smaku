import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore'

const PROJECT_ID = 'demo-restauracja-smaku'

let testEnvironment

function reservation(overrides = {}) {
  const submissionId = overrides.submissionId ?? crypto.randomUUID()

  return {
    customerName: 'Jan Kowalski',
    customerPhone: '+48 500 600 700',
    customerEmail: 'jan@example.com',
    serviceDate: '2026-06-20',
    time: '18:30',
    guests: 4,
    hall: 'Sala Główna',
    notes: '',
    status: 'pending',
    createdAt: Timestamp.now(),
    ...overrides,
    submissionId,
  }
}

async function seedStaffAndReservation() {
  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    const database = context.firestore()
    await setDoc(doc(database, 'staff', 'staff-user'), {
      email: 'staff@example.com',
      displayName: 'Pracownik',
      createdAt: Timestamp.now(),
    })
    await setDoc(doc(database, 'reservations', 'seed-reservation'), {
      ...reservation({ submissionId: 'seed-reservation-00000000000000000' }),
      submissionId: 'seed-reservation-00000000000000000',
    })
  })
}

beforeAll(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync(resolve('firestore.rules'), 'utf8'),
    },
  })
})

afterEach(async () => {
  await testEnvironment.clearFirestore()
})

afterAll(async () => {
  await testEnvironment.cleanup()
})

describe('public reservation writes', () => {
  it('allows a valid reservation without authentication', async () => {
    const database = testEnvironment.unauthenticatedContext().firestore()
    const payload = reservation()

    await assertSucceeds(
      setDoc(doc(database, 'reservations', payload.submissionId), payload),
    )
  })

  it('rejects unknown fields, invalid values and stale timestamps', async () => {
    const database = testEnvironment.unauthenticatedContext().firestore()
    const invalidPayloads = [
      reservation({ unexpected: true }),
      reservation({ guests: 21 }),
      reservation({ status: 'confirmed' }),
      reservation({ time: '21:00' }),
      reservation({ createdAt: Timestamp.fromMillis(Date.now() - 360_000) }),
    ]

    for (const payload of invalidPayloads) {
      await assertFails(
        setDoc(doc(database, 'reservations', payload.submissionId), payload),
      )
    }
  })

  it('allows only an identical idempotent retry', async () => {
    const database = testEnvironment.unauthenticatedContext().firestore()
    const payload = reservation()
    const reference = doc(database, 'reservations', payload.submissionId)

    await assertSucceeds(setDoc(reference, payload))
    await assertSucceeds(setDoc(reference, payload))
    await assertFails(setDoc(reference, { ...payload, notes: 'Zmienione' }))
    await assertFails(deleteDoc(reference))
  })
})

describe('reservation reads', () => {
  beforeEach(seedStaffAndReservation)

  it('rejects guests and authenticated users without a staff document', async () => {
    const guestDatabase =
      testEnvironment.unauthenticatedContext().firestore()
    const userDatabase =
      testEnvironment.authenticatedContext('regular-user').firestore()

    await assertFails(
      getDoc(doc(guestDatabase, 'reservations', 'seed-reservation')),
    )
    await assertFails(
      getDoc(doc(userDatabase, 'reservations', 'seed-reservation')),
    )
  })

  it('allows staff to get and list at most 100 reservations', async () => {
    const database =
      testEnvironment.authenticatedContext('staff-user').firestore()

    await assertSucceeds(
      getDoc(doc(database, 'reservations', 'seed-reservation')),
    )
    await assertSucceeds(
      getDocs(query(collection(database, 'reservations'), limit(100))),
    )
    await assertFails(getDocs(collection(database, 'reservations')))
  })
})

describe('staff documents', () => {
  it('allows users to read only their own staff document', async () => {
    await seedStaffAndReservation()
    const staffDatabase =
      testEnvironment.authenticatedContext('staff-user').firestore()
    const otherDatabase =
      testEnvironment.authenticatedContext('other-user').firestore()

    await assertSucceeds(getDoc(doc(staffDatabase, 'staff', 'staff-user')))
    await assertFails(getDoc(doc(otherDatabase, 'staff', 'staff-user')))
  })

  it('rejects client-side staff creation and updates', async () => {
    await seedStaffAndReservation()
    const database =
      testEnvironment.authenticatedContext('staff-user').firestore()

    await assertFails(
      setDoc(doc(database, 'staff', 'new-user'), {
        email: 'new@example.com',
        displayName: 'Nowy',
        createdAt: Timestamp.now(),
      }),
    )
    await assertFails(
      setDoc(doc(database, 'staff', 'staff-user'), {
        email: 'changed@example.com',
        displayName: 'Pracownik',
        createdAt: Timestamp.now(),
      }),
    )
  })
})
