import { Typography } from "antd"
import styles from "./Loading.module.css"

export const Loading = () => {
  const numBubbles = 10
  const bubbles = Array.from({ length: numBubbles }, (_, index) => (
    <span
      key={index}
      className={styles.bubbleContainer}
      style={{ "--i": index + 1 } as React.CSSProperties}
    >
      <span className={styles.bubble}></span>
    </span>
  ))

  return (
    <div className={styles.wrapper}>
      {bubbles}
      <Typography.Title level={1}>loading...</Typography.Title>
    </div>
  )
}
