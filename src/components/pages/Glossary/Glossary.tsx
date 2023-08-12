import { Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import { ModulesList } from "../../../types/Module"
import styles from "./Glossary.module.css"

interface GlossaryProps {
  modules: ModulesList | undefined
  modulesLoading: boolean
  errorLoadingModules: Error | null
}

export const Glossary = ({ modules }: GlossaryProps) => {
  return (
    <Content className={styles.root}>
      <Typography.Title>Glossary</Typography.Title>
    </Content>
  )
}
