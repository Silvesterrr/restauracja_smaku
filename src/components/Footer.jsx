import { Link } from 'react-router-dom';

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
            © 2026 Restauracja Smak. Elegancja w każdym kęsie.
          </div>
        </div>

        {/* Zamieniamy divy na komponenty Link i dodajemy reset domyślnego wyglądu linku  */}     
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/kontakt" style={footerLinkStyle}>Godziny otwarcia</Link>
          <span style={{ ...footerLinkStyle, cursor: 'default' }}>Polityka prywatności</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ ...footerLinkStyle, cursor: 'default' }}>Regulamin</span>
          <Link to="/kontakt" style={{ ...footerLinkStyle, color: '#D4A853' }}>Kontakt</Link>
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
  opacity: 0.9,
  textDecoration: 'none' 
};

export default Footer;