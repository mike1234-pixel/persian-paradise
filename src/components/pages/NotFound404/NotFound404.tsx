import { Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import styles from "./NotFound404.module.css"

export const NotFound404 = () => {
  return (
    <Content className={styles.root}>
      <Typography.Title>404</Typography.Title>
    </Content>
  )
}
