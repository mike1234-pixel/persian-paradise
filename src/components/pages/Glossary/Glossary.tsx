import { ModulesList } from "../../../types/Module"
import styles from "./Glossary.module.css"

interface GlossaryProps {
  modules: ModulesList | undefined
  modulesLoading: boolean
  errorLoadingModules: Error | null
}

export const Glossary = ({ modules }: GlossaryProps) => {
  return <p>glossasry</p>
}
