import { Empty } from 'antd'
import styles from './NoContent.module.css'

interface NoContentProps {
  message: string
}

export const NoContent = ({ message }: NoContentProps) => {
  return (
    <div className={styles.root}>
      <Empty description={message} />
    </div>
  )
}
