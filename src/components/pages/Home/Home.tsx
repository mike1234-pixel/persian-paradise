import { Button } from "antd"
import { Link } from "react-router-dom"
import { MainTitle } from "../../common/MainTitle/MainTitle"
import styles from "./Home.module.css"

export const Home = () => {
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <MainTitle />
        <p>
          A platform designed to make learning Persian a delightful experience.
        </p>
        <Link to='/dashboard'>
          <Button size='large'>Start Learning</Button>
        </Link>
      </div>
    </div>
  )
}
