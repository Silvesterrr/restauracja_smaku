import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
        {/* Nawigacja na gorze*/}
        <Navbar />

        {/* Dynamiczna treść strony */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/o-nas" element={<AboutPage />} />
          </Routes>
        </main>

        {/*stopka na dole */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;