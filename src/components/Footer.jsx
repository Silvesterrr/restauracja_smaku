import React from 'react';

function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#FAF7F2',
      borderTop: '1px rgba(212, 168, 83, 0.20) solid',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#1E3A8A', fontSize: '20px', fontFamily: "'Liberation Serif', serif", fontStyle: 'italic', fontWeight: 400, lineHeight: '28px' }}>
            Restauracja Smak
          </div>
          <div style={{ color: '#64748B', fontSize: '12px', fontFamily: "'Liberation Serif', serif", fontWeight: 400, lineHeight: '16px', letterSpacing: '0.60px' }}>
            © 2024 Restauracja Smak. Elegancja w każdym kęsie.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={footerLinkStyle}>Godziny otwarcia</div>
          <div style={footerLinkStyle}>Polityka prywatności</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={footerLinkStyle}>Regulamin</div>
          <div style={footerLinkStyle}>Kontakt</div>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  color: '#64748B',
  fontSize: '12px',
  fontFamily: "'Liberation Serif', serif",
  fontWeight: 400,
  lineHeight: '16px',
  letterSpacing: '0.60px',
  cursor: 'pointer',
  opacity: 0.9
};

export default Footer;