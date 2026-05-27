import { useState } from 'react';
import styles from './AboutPage.module.css';

import imgAbout from '../assets/images/o-nas-glowne.png';
import imgChef from '../assets/images/szef-kuchni.png';
import galeria1 from '../assets/images/galeria1.png';
import galeria2 from '../assets/images/galeria2.png';
import galeria3 from '../assets/images/galeria3.png';
import galeria4 from '../assets/images/galeria4.png';
import galeria5 from '../assets/images/galeria5.png';
import galeria6 from '../assets/images/galeria6.png';

const zdjeciaGalerii = [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6];

function AboutPage() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* O nas */}
        <div className={styles.aboutSection}>
          <div className={styles.aboutText}>
            <div className={styles.aboutHeading}>
              <span className={styles.headingGold}>O Nas:</span>
              <span className={styles.headingNavy}>Tradycja i Nowoczesność</span>
            </div>
            <div className={styles.paragraph}>
              Od ponad dekady Restauracja Smak definiuje na nowo kulinarną mapę miasta. Nasza filozofia
              opiera się na szacunku do lokalnych składników, które w rękach naszego zespołu zamieniają
              się w małe dzieła sztuki. Wierzymy, że jedzenie to nie tylko posiłek, ale i doświadczenie,
              które powinno angażować wszystkie zmysły w atmosferze niewymuszonej elegancji.
            </div>
            <div className={styles.paragraph}>
              Każde danie w naszym menu to opowieść, w której tradycyjne smaki spotykają się z
              nowoczesnymi technikami kulinarnymi. Zapraszamy do świata, gdzie czas płynie wolniej, a
              każdy kęs to celebracja chwili.
            </div>
          </div>
          <div className={styles.aboutImageWrap}>
            <img className={styles.coverImage} src={imgAbout} alt="Restauracja" />
          </div>
        </div>

        {/* Szef kuchni */}
        <div className={styles.chefSection}>
          <div className={styles.chefInner}>
            <div className={styles.chefImageCol}>
              <div className={styles.chefImageCard}>
                <img className={styles.coverImage} src={imgChef} alt="Szef Kuchni" />
              </div>
            </div>
            <div className={styles.chefText}>
              <div className={styles.chefTitle}>Szef Kuchni</div>
              <div className={styles.chefName}>Jan Kowalski</div>
              <div className={styles.chefBio}>
                Pasja Jana do gotowania narodziła się w kuchni jego babci, a ukształtowała podczas staży
                w renomowanych restauracjach Michelin w Paryżu i Londynie. Jako Szef Kuchni w Restauracji
                Smak, Jan łączy francuską precyzję z miłością do polskich, sezonowych produktów.
              </div>
              <div className={styles.chefQuote}>
                "Gotowanie to dla mnie sztuka kompromisu między tym, co znane, a tym, co nieodkryte. W
                każdym daniu szukam idealnego balansu smaków, który zaskoczy i ucieszy naszych gości."
              </div>
            </div>
          </div>
        </div>

        {/* Galeria */}
        <div className={styles.gallerySection}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.headingGold}>Nasza </span>
              <span className={styles.headingNavy}>Galeria</span>
            </div>
            <div className={styles.sectionSubtitle}>
              Zajrzyj w nasze progi i poczuj atmosferę, zanim jeszcze nas odwiedzisz.
            </div>
          </div>

          <div className={styles.galleryGrid}>
            {zdjeciaGalerii.map((foto, index) => (
              <div
                key={index}
                className={styles.galleryTile}
                onClick={() => setActivePhoto(foto)}
              >
                <img className={styles.galleryImage} src={foto} alt={`Zdjęcie ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Kontakt i rezerwacje */}
        <div className={styles.contactSection}>
          <div className={styles.contactInner}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.headingGold}>Kontakt </span>
                <span className={styles.headingNavy}>i Rezerwacje</span>
              </div>
              <div className={styles.sectionSubtitle}>
                Jesteśmy do Państwa dyspozycji. Czekamy na kontakt, aby uczynić Państwa wizytę wyjątkową.
              </div>
            </div>

            <div className={styles.contactRow}>
              {/* Dane adresowe + godziny */}
              <div className={styles.contactCol}>
                <div className={styles.infoCard}>
                  <div className={styles.infoItem}>
                    <div className={`${styles.iconSquare} ${styles.iconAddr}`}></div>
                    <div>
                      <div className={styles.infoLabel}>Adres</div>
                      <div className={styles.infoValue}>ul. Kulinarna 15<br />00-001 Warszawa</div>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={`${styles.iconSquare} ${styles.iconPhone}`}></div>
                    <div>
                      <div className={styles.infoLabel}>Telefon</div>
                      <div className={styles.infoValue}>+48 123 456 789</div>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={`${styles.iconSquare} ${styles.iconEmail}`}></div>
                    <div>
                      <div className={styles.infoLabel}>Email</div>
                      <div className={styles.infoValue}>rezerwacje@restauracjasmak.pl</div>
                    </div>
                  </div>
                </div>

                <div className={styles.hoursCard}>
                  <div className={styles.hoursHeader}>
                    <div className={styles.iconClock}></div>
                    <div className={styles.infoLabel}>Godziny Otwarcia</div>
                  </div>
                  <div className={styles.hoursList}>
                    <div className={`${styles.hoursRow} ${styles.hoursRowBordered}`}>
                      <span>Poniedziałek</span><span>Zamknięte</span>
                    </div>
                    <div className={`${styles.hoursRow} ${styles.hoursRowBordered}`}>
                      <span>Wtorek - Czwartek</span><span>13:00 - 22:00</span>
                    </div>
                    <div className={`${styles.hoursRow} ${styles.hoursRowBordered}`}>
                      <span>Piątek - Sobota</span><span>13:00 - 23:00</span>
                    </div>
                    <div className={styles.hoursRow}>
                      <span>Niedziela</span><span>12:00 - 20:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formularz + mapa */}
              <div className={styles.contactCol}>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formTitle}>Napisz do nas</div>

                  <div className={styles.field}>
                    <label className={styles.label}>Imię i nazwisko</label>
                    <input
                      type="text"
                      required
                      placeholder="Jan Kowalski"
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jan@example.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Temat</label>
                    <input
                      type="text"
                      required
                      placeholder="Temat wiadomości"
                      className={styles.input}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Wiadomość</label>
                    <textarea
                      required
                      placeholder="Twoja wiadomość..."
                      rows="4"
                      className={`${styles.input} ${styles.textarea}`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  {formSubmitted && (
                    <div className={styles.successMsg}>
                      Wiadomość została wysłana pomyślnie! Dziękujemy.
                    </div>
                  )}

                  <button type="submit" className={styles.submitBtn}>
                    Wyślij wiadomość
                  </button>
                </form>

                <div className={styles.mapWrap}>
                  <iframe
                    title="Mapa dojazdu Restauracja Smak"
                    src="https://maps.google.com/maps?q=ul.%20Kulinarna%2015,%20Warszawa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div className={styles.lightbox} onClick={() => setActivePhoto(null)}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <img className={styles.lightboxImg} src={activePhoto} alt="Podgląd" />
            <button className={styles.lightboxClose} onClick={() => setActivePhoto(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutPage;
