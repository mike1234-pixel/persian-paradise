import styles from "./Tick.module.css"

export const Tick = () => {
  return (
    <svg width='66.67' height='66.67'>
      <circle
        fill='none'
        stroke='#68E534'
        strokeWidth='3.33'
        cx='33.33'
        cy='33.33'
        r='31.67'
        className={styles.circle}
        strokeLinecap='round'
        transform='rotate(-90 33.33 33.33)'
      />
      <polyline
        fill='none'
        stroke='#68E534'
        strokeWidth='4'
        points='14.67,35.67 28.83,47.33 50.67,23'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={styles.tick}
      />
    </svg>
  )
}
