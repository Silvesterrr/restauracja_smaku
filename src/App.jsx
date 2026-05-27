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

function App() {
  return (
    <Router>
  
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;