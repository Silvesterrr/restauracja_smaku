import { render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { useAuth } from './useAuth'
import PrivateRoute from './PrivateRoute'

vi.mock('./useAuth', () => ({
  useAuth: vi.fn(),
}))

function renderRoute() {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route
          path="/admin"
          element={(
            <PrivateRoute>
              <div>Panel chroniony</div>
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<div>Logowanie</div>} />
        <Route
          path="/brak-dostepu"
          element={<div>Brak dostępu</div>}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PrivateRoute', () => {
  it('shows a loading state while authentication is checked', () => {
    useAuth.mockReturnValue({
      user: null,
      isStaff: false,
      loading: true,
    })

    renderRoute()

    expect(
      screen.getByText('Sprawdzamy uprawnienia…'),
    ).toBeInTheDocument()
  })

  it('redirects unauthenticated users to login', () => {
    useAuth.mockReturnValue({
      user: null,
      isStaff: false,
      loading: false,
    })

    renderRoute()

    expect(screen.getByText('Logowanie')).toBeInTheDocument()
  })

  it('redirects users without staff access', () => {
    useAuth.mockReturnValue({
      user: { uid: 'regular-user' },
      isStaff: false,
      loading: false,
    })

    renderRoute()

    expect(screen.getByText('Brak dostępu')).toBeInTheDocument()
  })

  it('renders the protected page for staff', () => {
    useAuth.mockReturnValue({
      user: { uid: 'staff-user' },
      isStaff: true,
      loading: false,
    })

    renderRoute()

    expect(screen.getByText('Panel chroniony')).toBeInTheDocument()
  })
})
