import React, { useState, useRef } from 'react'; 

function Occasions() {
  const [isSent, setIsSent] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  
  const [eventType, setEventType] = useState('');

  const formRef = useRef(null);

  const handleAskClick = (typeText) => {
    setEventType(typeText); 
    
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div style={{ width: '100%', background: 'white' }}>
      
      {/* nagłówek */}
      <section style={{ width: '100%', background: '#FAF7F2', padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ margin: '0 0 12px 0', color: '#1E3A8A', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600 }}>
            Okazje
          </h1>
          <p style={{ margin: 0, color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '24px' }}>
            Organizujemy spotkania biznesowe i imprezy okolicznościowe w niepowtarzalnej atmosferze.
          </p>
        </div>
      </section>

      <section style={{ width: '100%', padding: '60px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '32px' }}>
          
          {/* spotkania biznesowe */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={cardTitleStyle}>Spotkania Biznesowe</h2>
              <p style={cardDescriptionStyle}>
                Sala VIP z pełnym wyposażeniem, catering firmowy i profesjonalna obsługa. Idealne miejsce na prezentacje, szkolenia i negocjacje.
              </p>
            </div>
            <button 
              style={cardButtonStyle} 
              onClick={() => handleAskClick('Spotkanie Biznesowe')}
            >
              ZAPYTAJ O SPOTKANIE
            </button>
          </div>

          {/* imprezy okolicznościowe */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={cardTitleStyle}>Imprezy Okolicznościowe</h2>
              <p style={cardDescriptionStyle}>
                Urodziny, rocznice, chrzciny i przyjęcia. Dedykowane menu, dekoracje i niezapomniana atmosfera. Zadbamy o każdy detal Twojego święta.
              </p>
            </div>
            {/* klik - przewija w dół i wpisuje tekst */}
            <button 
              style={cardButtonStyle} 
              onClick={() => handleAskClick('Impreza Okolicznościowa')}
            >
              ZAPYTAJ O IMPREZĘ
            </button>
          </div>

        </div>
      </section>

      {/* formularz zapytania */}
      <section ref={formRef} style={{ width: '100%', padding: '0 0 80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ margin: '0 0 32px 0', color: '#1E3A8A', fontSize: '24px', fontFamily: "'Noto Serif', serif", fontWeight: 600 }}>
            Formularz Zapytania
          </h2>
          
          {isSent ? (
            <div style={{
              padding: '24px',
              background: '#F0FDF4',
              border: '1px solid #16A34A',
              borderRadius: '4px',
              color: '#16A34A',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              maxWidth: '800px',
              fontSize: '16px'
            }}>
              ✓ Dziękujemy! Twoje zapytanie zostało pomyślnie wysłane. Skontaktujemy się z Tobą wkrótce.
            </div>
          ) : (
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }} onSubmit={handleSubmit}>
              
              <div style={formGroupStyle}>
                <label style={labelStyle}>Typ imprezy</label>
                <input 
                  type="text" 
                  placeholder="np. Konferencja, Urodziny" 
                  style={inputStyle} 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  required 
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Planowana data</label>
                <input type="date" style={inputStyle} min={today} required />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Liczba gości</label>
                <input type="number" placeholder="np. 25" style={inputStyle} required min="1" />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Dodatkowe uwagi</label>
                <textarea placeholder="Twoja wiadomość..." style={{ ...inputStyle, height: '120px', resize: 'vertical' }} />
              </div>

              <button type="submit" style={{
                alignSelf: 'flex-start',
                padding: '16px 32px',
                background: '#1E3A8A',
                color: 'white',
                border: 'none',
                borderRadius: '2px',
                fontSize: '15px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer'
              }}>
                Wyślij zapytanie
              </button>

            </form>
          )}
        </div>
      </section>

    </div>
  );
}

const cardStyle = { flex: 1, background: '#FAF7F2', borderRadius: '4px', border: '1px solid rgba(212, 168, 83, 0.40)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px', boxSizing: 'border-box' };
const cardTitleStyle = { margin: 0, color: '#1E3A8A', fontSize: '24px', fontFamily: "'Noto Serif', serif", fontWeight: 600 };
const cardDescriptionStyle = { margin: 0, color: '#444651', fontSize: '15px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '24px' };
const cardButtonStyle = { padding: '12px 24px', background: '#1E3A8A', color: 'white', border: 'none', borderRadius: '2px', fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer' };
const formGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { color: '#444651', fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: 500 };
const inputStyle = { width: '100%', padding: '12px 16px', background: '#FFFFFF', border: '1px solid rgba(197, 197, 211, 0.5)', borderRadius: '4px', fontSize: '15px', fontFamily: "'Inter', sans-serif", color: '#444651', boxSizing: 'border-box', outline: 'none' };

export default Occasions;