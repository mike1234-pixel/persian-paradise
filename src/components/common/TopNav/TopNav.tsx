import { Link } from "react-router-dom"
import { Menu } from "antd"
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from "react"
import styles from "./TopNav.module.css"

const items = [
  {
    key: "guide",
    label: "User Guide",
    to: "/guide",
  },
  {
    key: "glossary",
    label: "Glossary",
    to: "/glossary",
  },
]

export const TopNav = () => {
  const [current, setCurrent] = useState("")
  const location = useLocation()

  useEffect(() => {
    const isOnMenuPage = items.some((item) =>
      location.pathname.startsWith(item.to)
    )
    setCurrent(isOnMenuPage ? location.pathname.replace("/", "") : "")
  }, [location])

  const onClick = (e: any) => {
    setCurrent(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      className={styles.root}
    >
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          className={current === item.key ? styles["active-link"] : ""}
        >
          <Link to={item.to}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}
