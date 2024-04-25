import Lottie from 'lottie-react'
import { Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import loadingAnimation from '../../../assets/animations/loadingAnimation.json'
import styles from './Loading.module.css'

export const Loading = () => {
  return (
    <Content>
      <div className={styles.wrapper}>
        <Lottie animationData={loadingAnimation} loop={true} />
        <Typography.Title level={1}>loading...</Typography.Title>
      </div>
    </Content>
  )
}
