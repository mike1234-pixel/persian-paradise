import { Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import styles from "./Fundamentals.module.css"

export const Fundamentals = () => {
  return (
    <Content className={styles.root}>
      <Typography.Title level={1}>Fundamentals</Typography.Title>
    </Content>
  )
}
