import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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


function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const hotjarId = import.meta.env.VITE_HOTJAR_ID;
    if (hotjarId && !window.hotjarInitialized) {
      const hjScript = document.createElement('script');
      hjScript.src = `https://t.contentsquare.net/uxa/${hotjarId}.js`;
      hjScript.async = true;
      document.head.appendChild(hjScript);
      window.hotjarInitialized = true; // Zabezpieczenie przed podwójnym ładowaniem
      console.log("Hotjar (Contentsquare) zainicjalizowany!");
    }

    // 2. Inicjalizacja Google Analytics (GA4)
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (gaId && !window.gaInitialized) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', gaId);
      window.gaInitialized = true; 
      console.log("Google Analytics zainicjalizowane!");
    }
  }, []);

  
  useEffect(() => {
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (gaId && window.gtag) {
      window.gtag('config', gaId, {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null; 
}


function App() {
  return (
    <Router>
      <AnalyticsTracker /> {/* Uruchamia analitykę wewnątrz kontekstu Routera */}
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