function MenuCard({ title, description, imageSrc }) {
  return (
    <div style={{
      flex: 1,
      background: '#FAF8FF',
      borderRadius: '4px',
      outline: '1px rgba(197, 197, 211, 0.30) solid',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer'
    }}>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <img 
          style={{ width: '100%', height: '286.50px', objectFit: 'cover' }} 
          src={imageSrc} 
          alt={title} 
        />
      </div>
      <div style={{
        padding: '23px 24px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <h3 style={{
          margin: 0,
          color: '#00236F',
          fontSize: '28px',
          fontFamily: "'Noto Serif', serif",
          fontWeight: 600,
          lineHeight: '39.20px',
          textAlign: 'center'
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0,
          color: '#444651',
          fontSize: '16px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          lineHeight: '25.60px',
          textAlign: 'center'
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default MenuCard;