import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { Nav } from "./components/common/Nav/Nav"
import { Home } from "./components/pages/Home/Home"
import { Dashboard } from "./components/pages/Dashboard/Dashboard"
import { Module } from "./components/pages/Module/Module"
import { useModules } from "./hooks/useModules"
import { ConfigProvider, Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { urlify } from "./utils/urlify"
import { TopNav } from "./components/common/TopNav/TopNav"
import { ConfettiAnimationContextProvider } from "./context/ConfettiAnimationContext"
import { ConfettiEffect } from "./components/common/Confetti/Confetti"

const Router = () => {
  const location = useLocation()

  const { modules } = useModules()

  return (
    <Routes location={location}>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {modules.map((module) => {
        const path = `/${urlify(module.title)}`
        return (
          <Route
            path={path}
            element={<Module module={module} />}
            key={module.title}
          />
        )
      })}
    </Routes>
  )
}

const App = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Plus Jakarta Sans",
          },
        }}
      >
        <ConfettiAnimationContextProvider>
          <BrowserRouter>
            <Layout hasSider>
              <ConfettiEffect />
              <Nav />

              <Content>
                <TopNav />
                <Router />
              </Content>
            </Layout>
          </BrowserRouter>
        </ConfettiAnimationContextProvider>
      </ConfigProvider>
    </div>
  )
}

export default App
