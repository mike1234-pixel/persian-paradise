import { Typography, Collapse } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { type ModulesList } from '../../../types/Module'
import { Loading } from '../Loading/Loading'
import { Error } from '../Error/Error'
import { GlossaryTable } from '../../common/GlossaryTable/GlossaryTable'
import { CaretRightOutlined } from '@ant-design/icons'
import styles from './Glossary.module.css'

const { Panel } = Collapse

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
      >
        {modules?.map((module, index) => (
          <Panel
            key={index}
            style={{ overflowX: 'scroll' }}
            header={
              <Typography.Title
                level={5}
                style={{ display: 'inline-block', margin: 0 }}
              >{`${module.title} ${module.emoji}`}</Typography.Title>
            }
          >
            <GlossaryTable phrases={module.phrases} />
          </Panel>
        ))}
      </Collapse>
    </Content>
  )
}
