import { useState } from 'react';

import imgAbout from '../assets/images/o-nas-glowne.png';
import imgChef from '../assets/images/szef-kuchni.png';
import galeria1 from '../assets/images/galeria1.png';
import galeria2 from '../assets/images/galeria2.png';
import galeria3 from '../assets/images/galeria3.png';
import galeria4 from '../assets/images/galeria4.png';
import galeria5 from '../assets/images/galeria5.png';
import galeria6 from '../assets/images/galeria6.png';

const zdjęciaGalerii = [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6];

function AboutPage() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  return (
    <div style={{ width: '100%', position: 'relative', background: 'linear-gradient(0deg, #FAF7F2 0%, #FAF7F2 100%), white', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      
      {/* kontener glowny */}
      <div style={{ width: '100%', maxWidth: '1278px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        
        {/* o nas */}
        <div style={{ width: '100%', maxWidth: '1152px', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '48px', flexWrap: 'wrap', boxSizing: 'border-box' }}>
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '22.70px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#D4A853', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '46.80px', wordWrap: 'break-word' }}>O Nas:</span>
              <span style={{ color: '#1E3A8A', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '46.80px', wordWrap: 'break-word' }}>Tradycja i Nowoczesność</span>
            </div>
            <div style={{ color: '#444651', fontSize: '18px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '28.80px', readyWrap: 'break-word' }}>
              Od ponad dekady Restauracja Smak definiuje na nowo kulinarną mapę miasta. Nasza filozofia opiera się na szacunku do lokalnych składników, które w rękach naszego zespołu zamieniają się w małe dzieła sztuki. Wierzymy, że jedzenie to nie tylko posiłek, ale i doświadczenie, które powinno angażować wszystkie zmysły w atmosferze niewymuszonej elegancji.
            </div>
            <div style={{ color: '#444651', fontSize: '18px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '28.80px', wordWrap: 'break-word' }}>
              Każde danie w naszym menu to opowieść, w której tradycyjne smaki spotykają się z nowoczesnymi technikami kulinarnymi. Zapraszamy do świata, gdzie czas płynie wolniej, a każdy kęs to celebracja chwili.
            </div>
          </div>
          <div style={{ flex: '1 1 450px', height: '500px', overflow: 'hidden', borderRadius: '4px', outline: '1px #FFDEA6 solid', outlineOffset: '-1px' }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={imgAbout} alt="Restauracja" />
          </div>
        </div>

        {/* szef kuchni*/}
        <div style={{ width: '100%', paddingLeft: '63px', paddingRight: '63px', paddingTop: '80px', paddingBottom: '80px', background: '#F4F3FA', borderTop: '1px rgba(212, 168, 83, 0.20) solid', borderBottom: '1px rgba(212, 168, 83, 0.20) solid', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
          <div style={{ width: '100%', maxWidth: '1152px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '448px', height: '600px', padding: '8px', background: '#FAF7F2', overflow: 'hidden', borderRadius: '2px', outline: '1px #FFDEA6 solid', outlineOffset: '-1px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={imgChef} alt="Szef Kuchni" />
              </div>
            </div>
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: '#1E3A8A', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '46.80px', wordWrap: 'break-word' }}>Szef Kuchni</div>
              <div style={{ color: '#7B5804', fontSize: '28px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '39.20px', wordWrap: 'break-word' }}>Jan Kowalski</div>
              <div style={{ color: '#444651', fontSize: '18px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '28.80px', wordWrap: 'break-word' }}>
                Pasja Jana do gotowania narodziła się w kuchni jego babci, a ukształtowała podczas staży w renomowanych restauracjach Michelin w Paryżu i Londynie. Jako Szef Kuchni w Restauracji Smak, Jan łączy francuską precyzję z miłością do polskich, sezonowych produktów.
              </div>
              <div style={{ color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontStyle: 'italic', fontWeight: 400, lineHeight: '25.60px', wordWrap: 'break-word' }}>
                "Gotowanie to dla mnie sztuka kompromisu między tym, co znane, a tym, co nieodkryte. W każdym daniu szukam idealnego balansu smaków, który zaskoczy i ucieszy naszych gości."
              </div>
            </div>
          </div>
        </div>

        {/* 2 wiersze × 3 kolumny */}
        <div style={{ width: '100%', maxWidth: '1200px', paddingTop: '79px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', flexDirection: 'column', gap: '48px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', textAlign: 'center' }}>
            <div>
              <span style={{ color: '#D4A853', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '46.80px', wordWrap: 'break-word' }}>Nasza </span>
              <span style={{ color: '#1E3A8A', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, wordWrap: 'break-word' }}>Galeria</span>
            </div>
            <div style={{ color: '#444651', fontSize: '18px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '28.80px', wordWrap: 'break-word' }}>
              Zajrzyj w nasze progi i poczuj atmosferę, zanim jeszcze nas odwiedzisz.
            </div>
          </div>

          {/* wymusza 3 kolumny, każda o szerokości makiety 366px */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '24px',
            width: '100%'
          }}>
            {zdjęciaGalerii.map((foto, index) => (
              <div 
                key={index} 
                onClick={() => setActivePhoto(foto)}
                style={{ 
                  width: '100%', 
                  height: '366px', 
                  overflow: 'hidden', 
                  borderRadius: '2px', 
                  outline: '1px #E3E1E9 solid', 
                  outlineOffset: '-1px',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={foto} alt={`Zdjęcie ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Kontakt i rezerwacje*/}
        <div style={{ width: '100%', paddingLeft: '39px', paddingRight: '39px', paddingTop: '79px', paddingBottom: '80px', background: 'white', borderTop: '1px rgba(212, 168, 83, 0.20) solid', borderBottom: '1px rgba(212, 168, 83, 0.20) solid', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', flexDirection: 'column', gap: '48px', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6.90px', textAlign: 'center' }}>
              <div>
                <span style={{ color: '#D4A853', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '46.80px', wordWrap: 'break-word' }}>Kontakt </span>
                <span style={{ color: '#1E3A8A', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, wordWrap: 'break-word' }}>i Rezerwacje</span>
              </div>
              <div style={{ color: '#444651', fontSize: '18px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '28.80px', wordWrap: 'break-word' }}>
                Jesteśmy do Państwa dyspozycji. Czekamy na kontakt, aby uczynić Państwa wizytę wyjątkową.
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '32px', flexWrap: 'wrap' }}>
              
              {/* Dane Adresowe i godziny otwarcia */}
              <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ padding: '32px', background: '#FAF7F2', borderRadius: '2px', outline: '1px #E3E1E9 solid', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '16px', height: '20px', background: '#D4A853', marginTop: '4px' }}></div>
                    <div>
                      <div style={{ color: '#1E3A8A', fontSize: '20px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '28px', wordWrap: 'break-word' }}>Adres</div>
                      <div style={{ color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '25.60px', wordWrap: 'break-word', marginTop: '4px' }}>ul. Kulinarna 15<br />00-001 Warszawa</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '18px', height: '18px', background: '#D4A853', marginTop: '4px' }}></div>
                    <div>
                      <div style={{ color: '#1E3A8A', fontSize: '20px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '28px', wordWrap: 'break-word' }}>Telefon</div>
                      <div style={{ color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '25.60px', wordWrap: 'break-word', marginTop: '4px' }}>+48 123 456 789</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '20px', height: '16px', background: '#D4A853', marginTop: '4px' }}></div>
                    <div>
                      <div style={{ color: '#1E3A8A', fontSize: '20px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '28px', wordWrap: 'break-word' }}>Email</div>
                      <div style={{ color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '25.60px', wordWrap: 'break-word', marginTop: '4px' }}>rezerwacje@restauracjasmak.pl</div>
                    </div>
                  </div>
                </div>

                {/* Godziny otwarcia */}
                <div style={{ padding: '32px', background: '#FAF7F2', borderRadius: '2px', outline: '1px #E3E1E9 solid', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', background: '#D4A853' }}></div>
                    <div style={{ color: '#1E3A8A', fontSize: '20px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '28px', wordWrap: 'break-word' }}>Godziny Otwarcia</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px rgba(212, 168, 83, 0.10) solid', paddingBottom: '6px', color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif" }}>
                      <span>Poniedziałek</span><span>Zamknięte</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px rgba(212, 168, 83, 0.10) solid', paddingBottom: '6px', color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif" }}>
                      <span>Wtorek - Czwartek</span><span>13:00 - 22:00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px rgba(212, 168, 83, 0.10) solid', paddingBottom: '6px', color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif" }}>
                      <span>Piątek - Sobota</span><span>13:00 - 23:00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif" }}>
                      <span>Niedziela</span><span>12:00 - 20:00</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Kolumna Prawa: Formularz kontaktowy i Wyświetlana Mapa pod spodem */}
              <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Formularz Rezerwacji i Kontaktu */}
                <form 
                style={{ padding: '31px 32px 32px 32px', background: '#FAF7F2', borderRadius: '2px', outline: '1px #E3E1E9 solid', display: 'flex', flexDirection: 'column', gap: '15px', boxSizing: 'border-box' }} 
                onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    
                    setTimeout(() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                    }, 4000);
                    }}
                    >
                    <div style={{ color: '#1E3A8A', fontSize: '28px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '39.20px', wordWrap: 'break-word', marginBottom: '5px' }}>
                        Napisz do nas
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ color: '#444651', fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: 500, lineHeight: '16.80px', letterSpacing: '0.70px' }}>Imię i nazwisko</label>
                        <input 
                        type="text" 
                        required
                        placeholder="Jan Kowalski" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        style={{ width: '100%', padding: '14px 12px', background: 'white', border: '1px #C5C5D3 solid', borderRadius: '2px', color: '#6B7280', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, boxSizing: 'border-box' }} 
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ color: '#444651', fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: 500, lineHeight: '16.80px', letterSpacing: '0.70px' }}>Email</label>
                        <input 
                        type="email" 
                        required
                        placeholder="jan@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        style={{ width: '100%', padding: '14px 12px', background: 'white', border: '1px #C5C5D3 solid', borderRadius: '2px', color: '#6B7280', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, boxSizing: 'border-box' }} 
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ color: '#444651', fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: 500, lineHeight: '16.80px', letterSpacing: '0.70px' }}>Temat</label>
                        <input 
                        type="text" 
                        required
                        placeholder="Temat wiadomości" 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        style={{ width: '100%', padding: '14px 12px', background: 'white', border: '1px #C5C5D3 solid', borderRadius: '2px', color: '#6B7280', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, boxSizing: 'border-box' }} 
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ color: '#444651', fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: 500, lineHeight: '16.80px', letterSpacing: '0.70px' }}>Wiadomość</label>
                        <textarea 
                        required
                        placeholder="Twoja wiadomość..." 
                        rows="4" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        style={{ width: '100%', padding: '11px 12px', background: 'white', border: '1px #C5C5D3 solid', borderRadius: '2px', color: '#6B7280', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '25.60px', resize: 'none', boxSizing: 'border-box' }}
                        ></textarea>
                    </div>

                    {/* DYNAMICZNY PASEK SUKCESU – PODŚWIETLA SIĘ TYLKO PO POPRAWNYM WYSŁANIU */}
                    {formSubmitted && (
                        <div style={{ 
                        width: '100%', 
                        padding: '12px', 
                        background: '#E6F4EA', 
                        border: '1px #137333 solid', 
                        borderRadius: '2px', 
                        color: '#137333', 
                        fontSize: '14px', 
                        fontFamily: "'Inter', sans-serif", 
                        fontWeight: 500, 
                        textAlign: 'center',
                        boxSizing: 'border-box',
                        animation: 'fadeIn 0.3s ease'
                        }}>
                        Wiadomość została wysłana pomyślnie! Dziękujemy.
                        </div>
                    )}

                    <button 
                        type="submit" 
                        style={{ width: '100%', padding: '13px 32px 12px 32px', background: '#1E3A8A', borderRadius: '2px', border: 'none', color: 'white', fontSize: '15px', fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: '15px', letterSpacing: '0.30px', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        Wyślij wiadomość
                    </button>
                    </form>

                {/* Mapa Google Maps dopasowana do makiety */}
                <div style={{ width: '100%', height: '320px', borderRadius: '2px', overflow: 'hidden', outline: '1px #E3E1E9 solid' }}>
                    <iframe 
                    title="Mapa dojazdu Restauracja Smak"
                    src="https://maps.google.com/maps?q=ul.%20Kulinarna%2015,%20Warszawa&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    ></iframe>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* powiekszenie zdjec galerii */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, cursor: 'zoom-out' }}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '85%' }} onClick={(e) => e.stopPropagation()}>
            <img src={activePhoto} alt="Podgląd" style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)' }} />
            <button onClick={() => setActivePhoto(null)} style={{ position: 'absolute', top: '-40px', right: '0px', background: 'none', border: 'none', color: 'white', fontSize: '32px', cursor: 'pointer' }}>×</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default AboutPage;