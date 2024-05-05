import Lottie from 'lottie-react'
import { Content } from 'antd/es/layout/layout'
import completeAnimation from 'assets/animations/completeAnimation.json'
import styles from 'components/pages/Complete/Complete.module.css'

export const Complete = () => {
  return (
    <Content className={styles.root}>
      <h1>Module Complete</h1>
      <div className={styles.animation}>
        <Lottie animationData={completeAnimation} loop={false} />
      </div>
    </Content>
  )
}
