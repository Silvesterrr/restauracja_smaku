import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Occasions from './pages/Occasions';
import Reservations from './pages/Reservations';

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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;