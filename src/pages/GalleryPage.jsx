import { useState } from 'react';
import styles from './GalleryPage.module.css';

import galeria1 from '../assets/images/galeria1.png';
import galeria2 from '../assets/images/galeria2.png';
import galeria3 from '../assets/images/galeria3.png';
import galeria4 from '../assets/images/galeria4.png';
import galeria5 from '../assets/images/galeria5.png';
import galeria6 from '../assets/images/galeria6.png';
import wnetrze from '../assets/images/wnetrze.png';
import stek from '../assets/images/stek.png';
import glowne from '../assets/images/glowne.png';
import przystawka from '../assets/images/przystawka.png';
import deser from '../assets/images/deser.png';

const TABS = [
  { key: 'wnetrza', label: 'Wnętrza', images: [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6, wnetrze] },
  { key: 'dania', label: 'Dania', images: [stek, glowne, przystawka, deser, stek, glowne, przystawka, deser, deser] },
];

function GalleryPage() {
  const [activeTab, setActiveTab] = useState('wnetrza');
  const [lightbox, setLightbox] = useState(null);

  const current = TABS.find((t) => t.key === activeTab);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Galeria</h1>
          <p className={styles.subtitle}>
            Zanurz się w atmosferze naszej restauracji.
            Odkryj wnętrza i smaki, które tworzą niezapomniane chwile.
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : styles.tabInactive}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {current.images.map((img, i) => (
            <div
              key={`${activeTab}-${i}`}
              className={styles.tile}
              onClick={() => setLightbox(img)}
            >
              <img src={img} alt={`${current.label} ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <img className={styles.lightboxImg} src={lightbox} alt="Podgląd" />
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
