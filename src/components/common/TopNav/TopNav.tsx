import { Link } from "react-router-dom"
import { MenuProps, Menu } from "antd"
import { useState } from "react"
import styles from "./TopNav.module.css"

const items: MenuProps["items"] = [
  {
    key: "home",
    label: <Link to={`/`}>Home</Link>,
  },
  {
    key: "dashboard",
    label: <Link to={`/dashboard`}>Dashboard</Link>,
  },
]

export const TopNav = () => {
  const [current, setCurrent] = useState("mail")

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e)
    setCurrent(e.key)
  }
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
      className={styles.root}
    />
  )
}
