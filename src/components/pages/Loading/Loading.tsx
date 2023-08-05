import { Content } from "antd/es/layout/layout"
import { Skeleton } from "antd"
import styles from "./Loading.module.css"

export const Loading = () => {
  return (
    <Content className={styles.root}>
      <Skeleton active />
    </Content>
  )
}
