import { useState } from "react"
import { Button, Menu, MenuProps, Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useModules } from "../../../hooks/useModules"
import { urlify } from "../../../utils/urlify"

export const Nav = () => {
  const { modules } = useModules()

  const { Sider } = Layout

  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const items: MenuProps["items"] = modules.map((module) => {
    return {
      key: module.title,
      icon: <i>{module?.emoji}</i>,
      to: `/${urlify(module.title)}`,
      label: <Link to={`/${urlify(module.title)}`}>{module.title}</Link>,
    }
  })

  return (
    <Sider
      style={{ width: 270, background: "none", height: "100vh" }}
      collapsed={collapsed}
    >
      <Button onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div style={{ height: "calc(100vh - 48px)", overflow: "auto" }}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode='inline'
          items={items}
        />
      </div>
    </Sider>
  )
}
