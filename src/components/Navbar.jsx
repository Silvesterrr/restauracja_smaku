import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const linkDefault = {
    textDecoration: 'none',
    color: '#475569',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    textTransform: 'uppercase',
    lineHeight: '20px',
    letterSpacing: '0.35px',
    transition: 'color 0.2s ease',
    paddingBottom: '4px',
    borderBottom: '2px transparent solid'
  };

  // Style dla aktywnego linku
  const linkActive = {
    textDecoration: 'none',
    color: '#1E3A8A',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    textTransform: 'uppercase',
    lineHeight: '20px',
    letterSpacing: '0.35px',
    paddingBottom: '4px',
    borderBottom: '2px #D4A853 solid'
  };

  return (
    <nav style={{ width: '100%', background: '#FAF7F2', borderBottom: '1px rgba(212, 168, 83, 0.20) solid', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* nazwa restauracji*/}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#1E3A8A', fontSize: '24px', fontFamily: "'Inter', sans-serif", fontWeight: 700, textTransform: 'uppercase', lineHeight: '32px', letterSpacing: '0.35px' }}>
            RESTAURACJA SMAK
          </span>
        </Link>

        {/* nawigacja dynamiczna*/}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/menu" style={location.pathname === '/menu' ? linkActive : linkDefault}>MENU</Link>
          <Link to="/o-nas" style={location.pathname === '/o-nas' ? linkActive : linkDefault}>O NAS</Link>
          <Link to="/rezerwacje" style={location.pathname === '/rezerwacje' ? linkActive : linkDefault}>REZERWACJE</Link>
          <Link to="/kontakt" style={location.pathname === '/kontakt' ? linkActive : linkDefault}>KONTAKT</Link>
          <Link to="/galeria" style={location.pathname === '/galeria' ? linkActive : linkDefault}>GALERIA</Link>
          <Link to="/okazje" style={location.pathname === '/okazje' ? linkActive : linkDefault}>OKAZJE</Link>
        </div>

        {/*przyciski */}
        <button onClick={() => navigate('/rezerwacje')} style={{ padding: '12px 24px', background: '#1E3A8A', borderRadius: '2px', border: 'none', color: 'white', fontSize: '15px', fontFamily: "'Inter', sans-serif", fontWeight: 600, textTransform: 'uppercase', lineHeight: '15px', letterSpacing: '0.75px', cursor: 'pointer' }}>
          ZAREZERWUJ STOLIK
        </button>

      </div>
    </nav>
  );
}

export default Navbar;