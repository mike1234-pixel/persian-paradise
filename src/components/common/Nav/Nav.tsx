import { useState } from 'react'
import { Button, Menu, type MenuProps, Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useModules } from 'hooks/useModules'
import { urlify } from 'utils/urlify'
import styles from 'components/common/Nav/Nav.module.css'

export const Nav = () => {
  const { modules } = useModules()

  const { Sider } = Layout

  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const items: MenuProps['items'] = modules
    ? modules.map((module) => {
        return {
          key: module.title,
          icon: <i>{module?.emoji}</i>,
          to: `/${urlify(module.title)}`,
          label: <Link to={`/${urlify(module.title)}`}>{module.title}</Link>
        }
      })
    : []

  return (
    <Sider
      style={{
        width: 270,
        background: 'none',
        backgroundColor: '#fff'
      }}
      collapsed={collapsed}
      data-testid="sidebar"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '7px 0 7px 15px'
        }}
      >
        <Button
          onClick={toggleCollapsed}
          type="text"
          className={styles.collapseButton}
          data-testid="collapseButton"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div style={{ maxHeight: 'calc(100vh - 48px)', overflow: 'auto' }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </div>
    </Sider>
  )
}
