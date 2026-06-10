import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { submitReservation } from '../services/reservations'
import Reservations from './Reservations'

vi.mock('../services/reservations', () => ({
  submitReservation: vi.fn(),
}))

function chooseReservationDetails() {
  const availableDay = screen
    .getAllByRole('button', { name: /^Wybierz \d/ })
    .find((button) => !button.disabled)

  fireEvent.click(availableDay)
  fireEvent.click(
    screen.getByRole('button', { name: 'Dalej: wybierz salę' }),
  )
  fireEvent.click(
    screen.getByRole('button', { name: 'Wybierz: Sala VIP' }),
  )
  fireEvent.click(
    screen.getByRole('button', { name: 'Dalej: twoje dane' }),
  )

  fireEvent.change(screen.getByLabelText('Imię i nazwisko'), {
    target: { value: 'Anna Kowalska' },
  })
  fireEvent.change(screen.getByLabelText('Telefon'), {
    target: { value: '+48 500 500 500' },
  })
  fireEvent.change(screen.getByLabelText('E-mail'), {
    target: { value: 'anna@example.com' },
  })
}

function renderPage() {
  return render(
    <MemoryRouter>
      <Reservations />
    </MemoryRouter>,
  )
}

describe('Reservations', () => {
  beforeEach(() => {
    submitReservation.mockReset()
  })

  it('shows success only after Firestore confirms the write', async () => {
    submitReservation.mockImplementation(async (fields) => ({
      ...fields,
      submissionId: 'submission-id',
      createdAt: {},
    }))
    renderPage()
    chooseReservationDetails()

    fireEvent.click(
      screen.getByRole('button', { name: 'Zarezerwuj stolik' }),
    )

    expect(
      await screen.findByText('Rezerwacja została zapisana'),
    ).toBeInTheDocument()
    expect(submitReservation).toHaveBeenCalledTimes(1)
  })

  it('keeps the user on the form when the write fails', async () => {
    submitReservation.mockRejectedValue({
      message: 'Kontrolowany błąd zapisu.',
      retryable: false,
    })
    renderPage()
    chooseReservationDetails()

    fireEvent.click(
      screen.getByRole('button', { name: 'Zarezerwuj stolik' }),
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Kontrolowany błąd zapisu.',
    )
    expect(
      screen.queryByText('Rezerwacja została zapisana'),
    ).not.toBeInTheDocument()
  })

  it('offers an idempotent retry after an ambiguous error', async () => {
    submitReservation
      .mockRejectedValueOnce({
        message: 'Brak jednoznacznego potwierdzenia.',
        retryable: true,
      })
      .mockImplementationOnce(async (fields) => ({
        ...fields,
        submissionId: 'same-submission-id',
        createdAt: {},
      }))
    renderPage()
    chooseReservationDetails()

    fireEvent.click(
      screen.getByRole('button', { name: 'Zarezerwuj stolik' }),
    )
    const retryButton = await screen.findByRole('button', {
      name: 'Ponów zapis',
    })
    fireEvent.click(retryButton)

    expect(
      await screen.findByText('Rezerwacja została zapisana'),
    ).toBeInTheDocument()
    expect(submitReservation).toHaveBeenCalledTimes(2)
    expect(submitReservation.mock.calls[1][0]).toEqual(
      submitReservation.mock.calls[0][0],
    )
  })
})
