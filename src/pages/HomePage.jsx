import React from 'react';
import MenuCard from '../components/MenuCard';

import imageStek from '../assets/images/stek.png';
import imageWnetrze from '../assets/images/wnetrze.png';
import imagePrzystawka from '../assets/images/przystawka.png';
import imageGlowne from '../assets/images/glowne.png';
import imageDeser from '../assets/images/deser.png';

function HomePage() {
  return (
    <div style={{ width: '100%', background: 'white' }}>
      
      {/* Hero section */}
      <section style={{ width: '100%', background: '#FAF8FF', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1 style={{ margin: 0, color: '#00236F', fontSize: '48px', fontFamily: "'Noto Serif', serif", fontWeight: 700, lineHeight: '57.60px' }}>
              Restauracja Smak
            </h1>
            <p style={{ margin: 0, color: '#444651', fontSize: '18px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '28.80px' }}>
              Kuchnia polska z nowoczesnym akcentem. Odkryj harmonię tradycyjnych smaków podanych w eleganckiej, współczesnej formie.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              <button style={{ padding: '17px 32px', background: '#00236F', color: 'white', border: 'none', borderRadius: '2px', fontSize: '15px', fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: '15px', letterSpacing: '0.30px', cursor: 'pointer', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}>
                Zarezerwuj stolik
              </button>
              <button style={{ padding: '16px 32px', background: 'transparent', color: '#7B5804', borderRadius: '2px', border: '1px #7B5804 solid', fontSize: '15px', fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: '15px', letterSpacing: '0.30px', cursor: 'pointer' }}>
                Zobacz Menu
              </button>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', outline: '1px rgba(197, 197, 211, 0.30) solid', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}>
            <img style={{ width: '100%', height: '574px', objectFit: 'cover', display: 'block' }} src={imageStek} alt="Danie Sezonu" />
            <div style={{ padding: '8px 16px', position: 'absolute', left: '24px', top: '25px', background: 'rgba(250, 248, 255, 0.90)', borderRadius: '12px', outline: '1px rgba(123, 88, 4, 0.30) solid', backdropFilter: 'blur(2px)' }}>
              <span style={{ color: '#7B5804', fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: 500, textTransform: 'uppercase', lineHeight: '16.80px', letterSpacing: '0.70px' }}>
                DANIE SEZONU
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Teaser section*/}
      <section style={{ width: '100%', background: '#F4F3FA', padding: '80px 0', borderTop: '1px rgba(197, 197, 211, 0.20) solid', borderBottom: '1px rgba(197, 197, 211, 0.20) solid' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ margin: 0, color: '#00236F', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '46.80px' }}>
              Tradycja spotyka nowoczesność
            </h2>
            <p style={{ margin: 0, color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '25.60px' }}>
              W Restauracji Smak wierzymy, że prawdziwa kulinarna podróż zaczyna się od szacunku do lokalnych składników. Nasi szefowie kuchni czerpią inspirację z klasycznych polskich receptur, nadając im lekkość i nowoczesny wyraz. Każde danie to starannie skomponowana symfonia smaków, podana w minimalistycznej oprawie, która pozwala składnikom mówić samym za siebie.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', cursor: 'pointer' }}>
              <span style={{ color: '#7B5804', fontSize: '15px', fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: '15px', letterSpacing: '0.30px' }}>
                Dowiedz się więcej
              </span>
              <div style={{ width: '16px', height: '16px', background: '#7B5804', clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
            </div>
          </div>
          <div style={{ flex: 1, borderRadius: '4px', overflow: 'hidden', outline: '1px rgba(197, 197, 211, 0.30) solid' }}>
            <img style={{ width: '100%', height: '450px', objectFit: 'cover', display: 'block' }} src={imageWnetrze} alt="Wnętrze Restauracji" />
          </div>
        </div>
      </section>

      {/* categories sectiopn */}
      <section style={{ width: '100%', background: '#FAF8FF', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <h2 style={{ margin: 0, color: '#00236F', fontSize: '36px', fontFamily: "'Noto Serif', serif", fontWeight: 600, lineHeight: '46.80px' }}>
              Nasze Menu
            </h2>
            <p style={{ margin: 0, color: '#444651', fontSize: '16px', fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: '25.60px' }}>
              Odkryj wybrane kompozycje z naszej karty
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <MenuCard 
              title="Przystawki" 
              description="Lekkie i wyrafinowane kompozycje na pobudzenie apetytu." 
              imageSrc={imagePrzystawka} 
            />
            <MenuCard 
              title="Dania Główne" 
              description="Esencja smaku w autorskich interpretacjach klasyków." 
              imageSrc={imageGlowne} 
            />
            <MenuCard 
              title="Desery" 
              description="Słodkie zwieńczenie doskonałego kulinarnego doświadczenia." 
              imageSrc={imageDeser} 
            />
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;