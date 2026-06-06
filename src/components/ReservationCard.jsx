import styles from './ReservationCard.module.css'

function ReservationCard({ reservation }) {
  return (
    <article className={styles.card}>
      <time className={styles.time}>{reservation.time}</time>
      <div>
        <h2 className={styles.name}>{reservation.customerName}</h2>
        <p className={styles.details}>
          <a href={`tel:${reservation.customerPhone}`}>
            {reservation.customerPhone}
          </a>
          <a href={`mailto:${reservation.customerEmail}`}>
            {reservation.customerEmail}
          </a>
          <span>{reservation.guests} os.</span>
          <span>{reservation.hall}</span>
        </p>
        {reservation.notes && (
          <p className={styles.notes}>
            <strong>Uwagi:</strong> {reservation.notes}
          </p>
        )}
      </div>
    </article>
  )
}

export default ReservationCard
