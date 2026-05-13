import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//tu beda importowane widoki z figmy
const Home = () => <div style={{padding: "20px"}}><h1>Strona Główna Restauracji</h1><p>Tu wstawimy menu z Figmy</p></div>;
const Kontakt = () => <div style={{padding: "20px"}}><h1>Kontakt</h1><p>Adres i telefon</p></div>;

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#f4f4f4", display: "flex", gap: "15px" }}>
        <Link to="/">Główna</Link>
        <Link to="/kontakt">Kontakt</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
    </Router>
  );
}

export default App;