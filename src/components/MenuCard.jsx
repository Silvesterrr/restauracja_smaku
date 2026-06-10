import styles from './MenuCard.module.css';

function MenuCard({ title, description, imageSrc }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={imageSrc} alt={title} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
}

export default MenuCard;
