import { Typography, Collapse } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { type ModulesList } from 'persian-paradise-shared-types'
import { Loading } from '../Loading/Loading'
import { Error } from '../Error/Error'
import { GlossaryTable } from '../../common/GlossaryTable/GlossaryTable'
import { CaretRightOutlined } from '@ant-design/icons'
import styles from './Glossary.module.css'

interface GlossaryProps {
  modules: ModulesList | undefined
  modulesLoading: boolean
  errorLoadingModules: Error | null
}
export const Glossary = ({
  modules,
  modulesLoading,
  errorLoadingModules
}: GlossaryProps) => {
  if (modulesLoading) return <Loading />

  if (errorLoadingModules) return <Error error={errorLoadingModules} />
  return (
    <Content className={styles.root}>
      <Typography.Title>Glossary</Typography.Title>
      <Collapse
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        accordion
        items={modules?.map((module, index) => {
          return {
            key: index,
            label: `${module.title} ${module.emoji}`,
            children: <GlossaryTable phrases={module.phrases} />
          }
        })}
      />
    </Content>
  )
}
