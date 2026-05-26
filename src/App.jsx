import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Occasions from './pages/Occasions';
import Reservations from './pages/Reservations';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/okazje" element={<Occasions />} />
        <Route path="/rezerwacje" element={<Reservations />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;