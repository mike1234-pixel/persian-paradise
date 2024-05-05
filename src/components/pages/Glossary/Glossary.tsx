import { Typography, Collapse } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { type ModulesList } from 'persian-paradise-shared-types'
import { Loading } from 'components/pages/Loading'
import { Error } from 'components/pages/Error'
import { GlossaryTable } from 'components/common/GlossaryTable'
import { CaretRightOutlined } from '@ant-design/icons'
import styles from 'components/pages/Glossary/Glossary.module.css'

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
        expandIconPosition="end"
        bordered={false}
        accordion
        items={modules?.map((module, index) => {
          return {
            key: index,
            label: (
              <span className={styles.accordionLabel}>
                <i>{module.emoji}</i>
                {module.title}
              </span>
            ),
            children: <GlossaryTable phrases={module.phrases} />
          }
        })}
      />
    </Content>
  )
}
