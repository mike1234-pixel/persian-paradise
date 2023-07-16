import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { Nav } from "./components/common/Nav/Nav"
import { Home } from "./components/pages/Home/Home"
import { Dashboard } from "./components/pages/Dashboard/Dashboard"
import { Module } from "./components/pages/Module/Module"
import { useModules } from "./hooks/useModules"
import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { ModuleI } from "./types/Module"
import "./App.css"

const Router = () => {
  const location = useLocation()

  const { modules } = useModules()

  console.log(modules)

  return (
    <Routes location={location}>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {modules.map((module) => {
        const path = `/${module.title.toLowerCase()}`
        return <Route path={path} element={<Module module={module} />} />
      })}
    </Routes>
  )
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout hasSider>
          <Nav />
          <Content>
            <Router />
          </Content>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
