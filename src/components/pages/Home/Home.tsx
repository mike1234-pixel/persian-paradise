import Lottie from 'lottie-react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import learningAnimation from 'assets/animations/learningAnimation.json'
import styles from 'components/pages/Home/Home.module.css'

export const Home = () => {
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h1>Persian Paradise</h1>
        <p className={styles.subText}>
          A simple entry point into learning Farsi for English speakers
        </p>
        <Link to="/guide">
          <Button size="large">Start Learning</Button>
        </Link>
        <div className={styles.animation}>
          <Lottie animationData={learningAnimation} loop={true} />
        </div>
      </div>
    </div>
  )
}
