import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Occasions from './pages/Occasions';
import Reservations from './pages/Reservations';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className={styles.app}>
          <Navbar />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/o-nas" element={<AboutPage />} />
              <Route path="/okazje" element={<Occasions />} />
              <Route path="/rezerwacje" element={<Reservations />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/kontakt" element={<ContactPage />} />
              <Route path="/galeria" element={<GalleryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/brak-dostepu" element={<AccessDenied />} />
              <Route
                path="/admin"
                element={(
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                )}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
