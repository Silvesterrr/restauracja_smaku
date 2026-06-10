import { render, screen } from '@testing-library/react'
import {
  getDocs,
  limit,
  where,
} from 'firebase/firestore'
import AdminPanel from './AdminPanel'

vi.mock('../firebase', () => ({
  db: {},
  firebaseConfigured: true,
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => 'reservations-collection'),
  getDocs: vi.fn(),
  limit: vi.fn((value) => ({ limit: value })),
  orderBy: vi.fn(() => 'time-order'),
  query: vi.fn((...parts) => parts),
  where: vi.fn((...parts) => parts),
}))

describe('AdminPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading and then an empty state', async () => {
    getDocs.mockResolvedValue({ docs: [] })

    render(<AdminPanel />)

    expect(screen.getByText('Ładowanie rezerwacji…')).toBeInTheDocument()
    expect(
      await screen.findByText('Brak rezerwacji na dzisiaj.'),
    ).toBeInTheDocument()
    expect(where).toHaveBeenCalledWith(
      'serviceDate',
      '==',
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    )
    expect(limit).toHaveBeenCalledWith(100)
  })

  it('shows a read error', async () => {
    getDocs.mockRejectedValue(new Error('Firestore unavailable'))

    render(<AdminPanel />)

    expect(
      await screen.findByRole('alert'),
    ).toHaveTextContent(
      'Nie udało się pobrać dzisiejszych rezerwacji.',
    )
  })

  it('renders reservations returned by Firestore', async () => {
    getDocs.mockResolvedValue({
      docs: [
        {
          id: 'reservation-1',
          data: () => ({
            customerName: 'Anna Kowalska',
            customerPhone: '+48 500 500 500',
            customerEmail: 'anna@example.com',
            time: '18:30',
            guests: 3,
            hall: 'Sala VIP',
            notes: 'Stolik przy oknie',
          }),
        },
      ],
    })

    render(<AdminPanel />)

    expect(
      await screen.findByText('Anna Kowalska'),
    ).toBeInTheDocument()
    expect(screen.getByText('18:30')).toBeInTheDocument()
    expect(screen.getByText('Stolik przy oknie')).toBeInTheDocument()
  })
})
