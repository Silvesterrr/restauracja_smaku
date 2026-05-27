import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Reservations() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // aktualna data
  const todayDate = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  // stan rezerwacji
  const [formData, setFormData] = useState({
    selectedDay: null, 
    selectedTime: '19:00',
    guests: '2',
    selectedHall: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();

  // generowanie dni dla wybranego miesiąca
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  let firstDayIndex = new Date(year, monthIndex, 1).getDay() - 1;
  if (firstDayIndex === -1) firstDayIndex = 6; 

  // lista godizn co pół godziny
  const availableTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', 
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const handlePrevMonth = () => {
    setFormData(p => ({ ...p, selectedDay: null }));
    setCurrentDate(new Date(year, monthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setFormData(p => ({ ...p, selectedDay: null }));
    setCurrentDate(new Date(year, monthIndex + 1, 1));
  };

  const goToStep = (nextStep) => {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToStep(4);
  };

  // postęp rezerwacji
  const renderStepper = () => {
    const stepsInfo = [
      { num: 1, label: 'Terminarz' },
      { num: 2, label: 'Sala' },
      { num: 3, label: 'Dane' },
      { num: 4, label: 'Potwierdzenie' }
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', margin: '40px auto 40px auto', maxWidth: '900px', padding: '0 20px' }}>
        {stepsInfo.map((s, index) => {
          const isCompleted = step > s.num;
          const isActive = step === s.num;
          return (
            <React.Fragment key={s.num}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                background: isCompleted || isActive ? '#16A34A' : '#E5E7EB',
                borderRadius: '30px',
                color: isCompleted || isActive ? 'white' : '#9CA3AF',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                flex: 1,
                justifyContent: 'center'
              }}>
                <span style={{ width: '20px', height: '20px', background: isCompleted || isActive ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{s.num}</span>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</span>
              </div>
              {index < stepsInfo.length - 1 && <div style={{ height: '2px', background: '#E5E7EB', flex: '0 0 10px' }} />}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ width: '100%', background: 'white', minHeight: '80vh', padding: '1px 0 100px 0', boxSizing: 'border-box' }}>
      
      {/* nagłówek */}
      {step < 4 && (
        <section style={{ textAlign: 'center', padding: '60px 20px 30px 20px', background: 'white' }}>
          <h1 style={{ margin: '0 0 16px 0', color: '#1E3A8A', fontSize: '42px', fontFamily: "'Noto Serif', serif", fontWeight: 700 }}>
            Rezerwacja Stolika
          </h1>
          <p style={{ margin: '0 auto', color: '#64748B', fontSize: '16px', fontFamily: "'Inter', sans-serif", maxWidth: '650px', lineHeight: '26px' }}>
            Zapraszamy do rezerwacji online. Wybierz dogodny termin, salę oraz podaj niezbędne dane, abyśmy mogli przygotować dla Ciebie idealne miejsce.
          </p>
        </section>
      )}

      {renderStepper()}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* 1: terminarz */}
        {step === 1 && (
          <div style={stepContainerStyle}>
            <h2 style={stepTitleStyle}>Wybierz datę i liczbę gości</h2>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              
              {/* lewa strona - kalendarz */}
              <div style={whiteCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <button onClick={handlePrevMonth} style={navBtnStyle}>&lt;</button>
                  <div style={{ fontWeight: 'bold', color: '#1E3A8A', fontSize: '16px' }}>
                    {months[monthIndex]} {year}
                  </div>
                  <button onClick={handleNextMonth} style={navBtnStyle}>&gt;</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                  {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => <div key={d} style={{ fontWeight: 600, fontSize: '14px', paddingBottom: '10px', textAlign: 'center', color: '#1F2937' }}>{d}</div>)}
                  
                  {Array.from({ length: firstDayIndex }).map((_, i) => <div key={`empty-${i}`} />)}
                  
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const isPast = new Date(year, monthIndex, day) < new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
                    
                    return (
                      <div 
                        key={day} 
                        onClick={() => { if (!isPast) setFormData(p => ({ ...p, selectedDay: day })); }} 
                        style={{
                          padding: '10px',
                          background: formData.selectedDay === day ? '#1E3A8A' : 'transparent',
                          color: isPast ? '#CBD5E1' : (formData.selectedDay === day ? 'white' : '#444651'),
                          borderRadius: '4px', 
                          cursor: isPast ? 'not-allowed' : 'pointer', 
                          fontSize: '14px', 
                          textAlign: 'center',
                          fontWeight: formData.selectedDay === day ? 'bold' : 'normal',
                          opacity: isPast ? 0.5 : 1
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* prawa strona - ukrywana */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {formData.selectedDay ? (
                  <>
                    {/* liczba gości */}
                    <div style={whiteCardStyle}>
                      <label style={miniLabelStyle}>Liczba gości</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button style={btnCounterStyle} onClick={() => setFormData(p => ({ ...p, guests: Math.max(1, parseInt(p.guests) - 1).toString() }))}>-</button>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{formData.guests}</span>
                        <button style={btnCounterStyle} onClick={() => setFormData(p => ({ ...p, guests: (parseInt(p.guests) + 1).toString() }))}>+</button>
                      </div>
                    </div>
                    
                    {/* godziny przewijane */}
                    <div style={whiteCardStyle}>
                      <label style={miniLabelStyle}>Godzina</label>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '10px',
                        maxHeight: '160px',       
                        overflowY: 'auto',        
                        paddingRight: '6px' 
                      }}>
                        {availableTimes.map(t => (
                          <div key={t} onClick={() => setFormData(p => ({ ...p, selectedTime: t }))} style={{
                            padding: '12px', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', fontSize: '14px',
                            border: formData.selectedTime === t ? '2px solid #1E3A8A' : '1px solid #E5E7EB',
                            background: formData.selectedTime === t ? '#EEF2FF' : 'white',
                            color: '#1E3A8A',
                            fontWeight: formData.selectedTime === t ? 'bold' : 500
                          }}>{t}</div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ ...whiteCardStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#7B5804', fontStyle: 'italic', textAlign: 'center', padding: '40px', border: '1px dashed #D4A853', background: '#FFFDF9' }}>
                    Wybierz najpierw dzień w kalendarzu, aby wyświetlić wybór liczby gości oraz godzinę.
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
              <button 
                style={{ ...primaryBtnStyle, opacity: formData.selectedDay ? 1 : 0.5 }} 
                disabled={!formData.selectedDay} 
                onClick={() => goToStep(2)}
              >
                DALEJ: WYBIERZ SALĘ →
              </button>
            </div>
          </div>
        )}

        {/* 2: wybór sali */}
        {step === 2 && (
          <div style={stepContainerStyle}>
            <h2 style={stepTitleStyle}>Wybierz salę</h2>
            <p style={{ color: '#444651', marginTop: '-15px', marginBottom: '30px', fontSize: '15px' }}>Wybierz jedną z naszych trzech unikalnych stref, każda z niepowtarzalnym klimatem.</p>
            
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {[
                { id: 'Sala Główna', placeholderText: 'Interior', desc: 'Przeszklona sala z eleganckim wykończeniem. Idealna na kolacje i spotkania rodzinne.' },
                { id: 'Sala VIP', placeholderText: 'VIP', desc: 'Kameralna przestrzeń z ekskluzywnym wystrojem. Wyposażona w sprzęt AV.' },
                { id: 'Ogródek Letni', placeholderText: 'Garden', desc: 'Ciągnąca się na zewnątrz strefa z widokiem na ogród. Doskonała na ciepłe wieczory.' }
              ].map(hall => {
                const isSelected = formData.selectedHall === hall.id;
                return (
                  <div key={hall.id} style={{
                    flex: 1, minWidth: '300px', background: 'white', borderRadius: '12px', overflow: 'hidden',
                    border: isSelected ? '2px solid #1E3A8A' : '1px solid #D4A853',
                    display: 'flex', flexDirection: 'column', boxSizing: 'border-box', padding: '16px'
                  }}>
                    <div style={{
                      width: '100%', height: '200px', background: '#FAF7F2', borderRadius: '8px',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      color: '#D4A853', fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 500
                    }}>
                      {hall.placeholderText}
                    </div>

                    <div style={{ padding: '20px 4px 4px 4px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                      <h3 style={{ margin: 0, color: '#1E3A8A', fontFamily: "'Noto Serif', serif", fontSize: '22px', fontWeight: 600 }}>{hall.id}</h3>
                      <p style={{ margin: 0, color: '#444651', fontSize: '14px', lineHeight: '22px' }}>{hall.desc}</p>
                      
                      <button 
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, selectedHall: hall.id }))}
                        style={{
                          marginTop: 'auto', padding: '14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600,
                          fontSize: '14px', fontFamily: "'Inter', sans-serif", width: '100%',
                          background: isSelected ? '#1E3A8A' : '#FAF7F2',
                          color: isSelected ? 'white' : '#7B5804',
                          border: isSelected ? '1px solid #1E3A8A' : '1px solid rgba(212, 168, 83, 0.3)'
                        }}
                      >
                        {isSelected ? 'WYBRANO SALĘ' : 'Wybierz tę salę'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
              <button type="button" onClick={() => goToStep(1)} style={{ ...primaryBtnStyle, background: '#64748B' }}>WSTECZ</button>
              <button 
                style={{ ...primaryBtnStyle, opacity: formData.selectedHall ? 1 : 0.5 }} 
                disabled={!formData.selectedHall} 
                onClick={() => goToStep(3)}
              >
                DALEJ: TWOJE DANE →
              </button>
            </div>
          </div>
        )}

        {/* 3: dane */}
        {step === 3 && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={stepTitleStyle}>Twoje dane</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={formGroupStyle}><label style={labelStyle}>Imię i nazwisko</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} style={inputStyle} required /></div>
              <div style={formGroupStyle}><label style={labelStyle}>Telefon</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={inputStyle} required /></div>
              <div style={formGroupStyle}><label style={labelStyle}>E-mail</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyle} required /></div>
              <div style={formGroupStyle}><label style={labelStyle}>Liczba osób</label><input type="number" name="guests" value={formData.guests} onChange={handleInputChange} style={inputStyle} required /></div>
            </div>
            <div style={formGroupStyle}><label style={labelStyle}>Uwagi (opcjonalnie)</label><textarea name="notes" value={formData.notes} onChange={handleInputChange} style={{ ...inputStyle, height: '120px', resize: 'vertical' }} /></div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button type="button" onClick={() => goToStep(2)} style={{ ...primaryBtnStyle, background: '#64748B' }}>WSTECZ</button>
              <button type="submit" style={primaryBtnStyle}>ZAREZERWUJ STOLIK</button>
            </div>
          </form>
        )}

        {/* 4: potwierdzenie */}
        {step === 4 && (
          <div style={confirmationCardStyle}>
            <div style={{ width: '80px', height: '80px', background: '#16A34A', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '40px', marginBottom: '10px' }}>✓</div>
            <h2 style={{ color: '#16A34A', fontSize: '32px', fontFamily: "'Noto Serif', serif", margin: 0 }}>Rezerwacja potwierdzona!</h2>
            <p style={{ color: '#64748B', margin: 0, fontSize: '16px' }}>Wysłaliśmy potwierdzenie na Twój e-mail: <strong>{formData.email}</strong></p>
            <div style={summaryBoxStyle}>
              Data: {formData.selectedDay} {months[monthIndex]} {year} | Godzina: {formData.selectedTime} | Osób: {formData.guests} | Sala: {formData.selectedHall}
            </div>
            <button style={primaryBtnStyle} onClick={() => navigate('/')}>POWRÓT DO STRONY GŁÓWNEJ</button>
          </div>
        )}

      </div>
    </div>
  );
}

const stepContainerStyle = { background: '#FAF7F2', padding: '40px', borderRadius: '8px', border: '1px solid rgba(212, 168, 83, 0.20)', fontFamily: "'Inter', sans-serif" };
const stepTitleStyle = { margin: '0 0 24px 0', color: '#1E3A8A', fontSize: '28px', fontFamily: "'Noto Serif', serif", fontWeight: 600 };
const whiteCardStyle = { flex: 1, background: 'white', padding: '24px', borderRadius: '4px', border: '1px solid #E5E7EB', boxSizing: 'border-box' };
const miniLabelStyle = { display: 'block', color: '#64748B', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' };
const btnCounterStyle = { width: '36px', height: '36px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', color: '#1E3A8A' };
const primaryBtnStyle = { padding: '16px 32px', background: '#1E3A8A', color: 'white', border: 'none', borderRadius: '2px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.5px' };
const navBtnStyle = { background: 'none', border: 'none', color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '0 10px' };
const formGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { color: '#444651', fontSize: '14px', fontWeight: 500 };
const inputStyle = { width: '100%', padding: '14px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '15px', boxSizing: 'border-box', outline: 'none', color: '#1F2937' };
const confirmationCardStyle = { maxWidth: '800px', margin: '40px auto', border: '2px solid #16A34A', borderRadius: '16px', padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' };
const summaryBoxStyle = { background: '#F0FDF4', width: '100%', padding: '24px', borderRadius: '8px', color: '#16A34A', fontWeight: 'bold', fontSize: '16px', border: '1px solid #16A34A' };

export default Reservations;