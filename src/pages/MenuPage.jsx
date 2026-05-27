import { useState, useMemo } from 'react';
import styles from './MenuPage.module.css';

import imgGlowne from '../assets/images/glowne.png';
import imgStek from '../assets/images/stek.png';
import imgPrzystawka from '../assets/images/przystawka.png';
import imgDeser from '../assets/images/deser.png';

const DISHES = [
  {
    name: 'Filet z łososia',
    price: '68 zł',
    desc: 'Pieczony filet z dzikiego łososia, szparagi na parze, purée z kalafiora, sos cytrynowo-koperkowy.',
    weight: '320 g',
    category: 'Dania Główne',
    image: imgGlowne,
    tags: ['Bezglutenowe'],
  },
  {
    name: 'Polędwica Wołowa',
    price: '120 zł',
    desc: 'Sezonowana polędwica, gratin ziemniaczane, pieczone warzywa korzeniowe, emulsja truflowa.',
    weight: '400 g',
    category: 'Dania Główne',
    image: imgStek,
    tags: [],
  },
  {
    name: 'Sałatka Burrata',
    price: '45 zł',
    desc: 'Włoska burrata, pomidorki koktajlowe, świeża bazylia, oliwa truflowa, redukcja balsamiczna.',
    weight: '250 g',
    category: 'Przystawki',
    image: imgPrzystawka,
    tags: ['Wegetariańskie', 'Bezglutenowe'],
  },
  {
    name: 'Crème Brûlée',
    price: '32 zł',
    desc: 'Klasyczny francuski deser waniliowy z chrupiącą karmelową skórką, podawany z świeżymi owocami.',
    weight: '180 g',
    category: 'Desery',
    image: imgDeser,
    tags: ['Wegetariańskie'],
  },
  {
    name: 'Tiramisu',
    price: '28 zł',
    desc: 'Włoski klasyk — warstwy biszkoptu nasączonego espresso, mascarpone i kakao.',
    weight: '200 g',
    category: 'Desery',
    image: imgDeser,
    tags: ['Wegetariańskie'],
  },
  {
    name: 'Tatar z łososia',
    price: '52 zł',
    desc: 'Świeży łosoś, kapary, czerwona cebula, cytryna, podawany z grzankami żytnimi.',
    weight: '220 g',
    category: 'Przystawki',
    image: imgGlowne,
    tags: [],
  },
  {
    name: 'Espresso',
    price: '14 zł',
    desc: 'Podwójne espresso z palonych ziaren Arabica, intensywny aromat i gęsta cremą.',
    weight: '60 ml',
    category: 'Napoje',
    image: imgDeser,
    tags: ['Bezglutenowe', 'Wegetariańskie'],
  },
  {
    name: 'Lemoniada domowa',
    price: '18 zł',
    desc: 'Świeża lemoniada z cytryny, limonki, mięty i odrobiną miodu akacjowego.',
    weight: '400 ml',
    category: 'Napoje',
    image: imgDeser,
    tags: ['Bezglutenowe', 'Wegetariańskie'],
  },
];

const CATEGORIES = ['Wszystkie', 'Przystawki', 'Dania Główne', 'Desery', 'Napoje'];

function MenuPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Wszystkie');
  const [veg, setVeg] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);

  const filtered = useMemo(() => {
    return DISHES.filter((d) => {
      if (category !== 'Wszystkie' && d.category !== category) return false;
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (veg && !d.tags.includes('Wegetariańskie')) return false;
      if (glutenFree && !d.tags.includes('Bezglutenowe')) return false;
      return true;
    });
  }, [search, category, veg, glutenFree]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Nasze Menu</h1>
          <p className={styles.subtitle}>
            Odkryj kompozycję smaków, gdzie tradycja spotyka się z nowoczesną kulinarną precyzją.
            Wszystkie dania przygotowywane są ze starannie wyselekcjonowanych, lokalnych składników.
          </p>
        </div>

        {/* Search + diet filters */}
        <div className={styles.filtersBar}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Szukaj dania..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.dietFilters}>
            <label className={styles.dietLabel}>
              <input
                type="checkbox"
                className={styles.dietCheckbox}
                checked={veg}
                onChange={(e) => setVeg(e.target.checked)}
              />
              Wegetariańskie
            </label>
            <label className={styles.dietLabel}>
              <input
                type="checkbox"
                className={styles.dietCheckbox}
                checked={glutenFree}
                onChange={(e) => setGlutenFree(e.target.checked)}
              />
              Bezglutenowe
            </label>
          </div>
        </div>

        {/* Category tabs */}
        <div className={styles.tabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${category === cat ? styles.tabActive : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        <div className={styles.grid}>
          {filtered.length > 0 ? (
            filtered.map((dish) => (
              <div key={dish.name} className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={dish.image} alt={dish.name} />
                  {dish.tags.length > 0 && (
                    <div className={styles.badges}>
                      {dish.tags.map((tag) => (
                        <span key={tag} className={styles.badge} title={tag}>
                          {tag === 'Wegetariańskie' ? 'V' : 'GF'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardName}>{dish.name}</h3>
                    <span className={styles.cardPrice}>{dish.price}</span>
                  </div>
                  <p className={styles.cardDesc}>{dish.desc}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardWeight}>{dish.weight}</span>
                    <button className={styles.addButton}>+</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>Brak dań pasujących do kryteriów wyszukiwania.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
