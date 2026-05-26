import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      width: '100%',
      background: '#FAF7F2',
      borderBottom: '1px rgba(212, 168, 83, 0.20) solid',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* nazwa restaurqacji*/}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{
            color: '#1E3A8A',
            fontSize: '24px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: '32px',
            letterSpacing: '0.35px'
          }}>
            RESTAURACJA SMAK
          </span>
        </Link>

        {/* Linki */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/menu" style={linkStyle}>MENU</Link>
          <Link to="/o-nas" style={linkStyle}>O NAS</Link>
          <Link to="/rezerwanie" style={linkStyle}>REZERWACJE</Link>
          <Link to="/kontakt" style={linkStyle}>KONTAKT</Link>
          
          {/* Wyróżniony link z makiety*/}
          <Link to="/galeria" style={{
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
          }}>
            GALERIA
          </Link>
          
          <Link to="/okazje" style={linkStyle}>OKAZJE</Link>
        </div>

        {/*przycisk*/}
        <button style={{
          padding: '12px 24px',
          background: '#1E3A8A',
          borderRadius: '2px',
          border: 'none',
          color: 'white',
          fontSize: '15px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          textTransform: 'uppercase',
          lineHeight: '15px',
          letterSpacing: '0.75px',
          cursor: 'pointer'
        }}>
          ZAREZERWUJ STOLIK
        </button>
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: '#475569',
  fontSize: '14px',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  textTransform: 'uppercase',
  lineHeight: '20px',
  letterSpacing: '0.35px'
};

export default Navbar;