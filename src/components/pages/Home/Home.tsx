import { Button, Typography } from "antd"
import { Link } from "react-router-dom"
import styles from "./Home.module.css"

export const Home = () => {
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <Typography.Title>Persian Paradise</Typography.Title>
        <Link to='/dashboard'>
          <Button>Start Learning Persian</Button>
        </Link>
      </div>
    </div>
  )
}
