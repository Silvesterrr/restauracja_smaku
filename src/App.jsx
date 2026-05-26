import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Occasions from './pages/Occasions';
import Reservations from './pages/Reservations';

function App() {
  return (
    <Router>
  
      <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
        <Navbar />
        <main className="flex-grow">
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