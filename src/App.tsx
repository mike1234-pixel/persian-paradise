import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from 'components/common/Nav'
import { Home } from 'components/pages/Home'
import { Guide } from 'components/pages/Guide'
import { Module } from 'components/pages/Module'
import { useModules } from 'hooks/module/useModules'
import { ConfigProvider, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { urlify } from 'utils/urlify'
import { TopNav } from 'components/common/TopNav'
import { ConfettiAnimationContextProvider } from 'context/ConfettiAnimationContext'
import { ConfettiEffect } from 'components/common/Confetti'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Loading } from 'components/pages/Loading'
import { Error } from 'components/pages/Error'
import { NotFound404 } from 'components/pages/NotFound404'
import { Glossary } from 'components/pages/Glossary'
import { CMS } from 'components/pages/CMS'

export const Router = () => {
  const location = useLocation()

  const { modules, isLoading, error } = useModules()

  if (error) return <Error error={error} />

  if (isLoading) return <Loading />

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/guide" element={<Guide />} />
      <Route
        path="/glossary"
        element={
          <Glossary
            modules={modules}
            modulesLoading={isLoading}
            errorLoadingModules={error}
          />
        }
      />
      <Route path="/cms" element={<CMS />} />

      {modules?.map((module) => {
        const path = `/${urlify(module.title)}`
        return (
          <Route
            path={path}
            element={
              <Module
                module={module}
                moduleLoading={isLoading}
                errorLoadingModule={error}
              />
            }
            key={module.title}
          />
        )
      })}
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Tilt Neon'
          }
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
    </QueryClientProvider>
  )
}

export default App
