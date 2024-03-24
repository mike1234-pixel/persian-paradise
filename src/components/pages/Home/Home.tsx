import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

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
      </div>
    </div>
  )
}
