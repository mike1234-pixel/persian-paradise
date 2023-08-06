import { Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import styles from "./Error.module.css"

interface ErrorProps {
  error: Error
}

export const Error = ({ error }: ErrorProps) => {
  return (
    <Content className={styles.root}>
      <Typography.Title level={1}>Error</Typography.Title>
      <p>{error.message}</p>
    </Content>
  )
}
