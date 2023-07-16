import { useState } from "react"
import { Button, Menu, MenuProps } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useModules } from "../../../hooks/useModules"
import Sider from "antd/es/layout/Sider"

export const Nav = () => {
  const { modules } = useModules()

  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const items: MenuProps["items"] = modules.map((module) => {
    return {
      key: module.title,
      icon: <i>{module?.emoji}</i>,
      to: `/${module.title.toLowerCase()}`,
      label: <Link to={`/${module.title.toLowerCase()}`}>{module.title}</Link>,
    }
  })

  return (
    <Sider style={{ width: 270, background: "none" }} collapsed={collapsed}>
      <Button onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode='inline'
        items={items}
      />
    </Sider>
  )
}
