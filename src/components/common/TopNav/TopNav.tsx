import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useState, useEffect } from 'react'
import styles from 'components/common/TopNav/TopNav.module.css'

const items = [
  {
    key: 'guide',
    label: <Link to="/guide">Guide</Link>,
    to: '/guide'
  },
  {
    key: 'glossary',
    label: <Link to="/glossary">Glossary</Link>,
    to: '/glossary'
  }
]

export const TopNav = () => {
  const [current, setCurrent] = useState('')
  const location = useLocation()

  useEffect(() => {
    const isOnMenuPage = items.some((item) =>
      location.pathname.startsWith(item.to)
    )
    setCurrent(isOnMenuPage ? location.pathname.replace('/', '') : '')
  }, [location])

  const onClick = (e: { key: string }) => {
    setCurrent(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      className={styles.root}
      items={items}
    />
  )
}
