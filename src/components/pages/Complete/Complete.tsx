import { Content } from 'antd/es/layout/layout'
import styles from './Complete.module.css'

export const Complete = () => {
  return (
    <Content className={styles.root}>
      <h1>Module Complete</h1>
      <i className={styles.emoji}>🥳</i>
    </Content>
  )
}
