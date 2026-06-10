import { Link, useNavigate } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import styles from './HomePage.module.css';

import imageStek from '../assets/images/stek.png';
import imageWnetrze from '../assets/images/wnetrze.png';
import imagePrzystawka from '../assets/images/przystawka.png';
import imageGlowne from '../assets/images/glowne.png';
import imageDeser from '../assets/images/deser.png';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Restauracja Smak</h1>
            <p className={styles.heroLead}>
              Kuchnia polska z nowoczesnym akcentem. Odkryj harmonię tradycyjnych smaków podanych
              w eleganckiej, współczesnej formie.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary} onClick={() => navigate('/rezerwacje')}>
                Zarezerwuj stolik
              </button>
              <button className={styles.btnOutline} onClick={() => navigate('/menu')}>
                Zobacz Menu
              </button>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <img className={styles.heroImage} src={imageStek} alt="Danie Sezonu" />
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeText}>DANIE SEZONU</span>
            </div>
          </div>
        </div>
      </section>

      {/* Teaser section */}
      <section className={styles.teaser}>
        <div className={styles.teaserInner}>
          <div className={styles.teaserText}>
            <h2 className={styles.sectionTitle}>Tradycja spotyka nowoczesność</h2>
            <p className={styles.bodyText}>
              W Restauracji Smak wierzymy, że prawdziwa kulinarna podróż zaczyna się od szacunku do
              lokalnych składników. Nasi szefowie kuchni czerpią inspirację z klasycznych polskich
              receptur, nadając im lekkość i nowoczesny wyraz. Każde danie to starannie skomponowana
              symfonia smaków, podana w minimalistycznej oprawie, która pozwala składnikom mówić
              samym za siebie.
            </p>
            <Link to="/o-nas" className={styles.moreLink}>
              <span className={styles.moreLinkText}>Dowiedz się więcej</span>
              <div className={styles.moreArrow}></div>
            </Link>
          </div>
          <div className={styles.teaserImageWrap}>
            <img className={styles.teaserImage} src={imageWnetrze} alt="Wnętrze Restauracji" />
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className={styles.categories}>
        <div className={styles.categoriesInner}>
          <div className={styles.categoriesHead}>
            <h2 className={styles.sectionTitle}>Nasze Menu</h2>
            <p className={styles.categoriesSub}>Odkryj wybrane kompozycje z naszej karty</p>
          </div>
          <div className={styles.cards}>
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
