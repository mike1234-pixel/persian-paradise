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
    key: "guide",
    label: <Link to={`/guide`}>User Guide</Link>,
  },
  {
    key: "glossary",
    label: <Link to={`/glossary`}>Glossary</Link>,
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
