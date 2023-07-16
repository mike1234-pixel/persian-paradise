import { Typography } from "antd"
import { ModuleI } from "../../../types/Module"
import styles from "./Module.module.css"

interface ModuleProps {
  module: ModuleI
}
export const Module = ({ module }: ModuleProps) => {
  const { phrases } = module
  const { Title, Text } = Typography
  return (
    <>
      <Title>{module.title}</Title>
      {module.subtitle ?? <Title level={3}>{module.subtitle}</Title>}
      {phrases.map((phrase) => {
        return (
          <div className={styles.phrase}>
            <Title level={5}>{phrase.en}</Title>
            {typeof phrase.fa === "string" ? (
              <Text>{phrase.fa}</Text>
            ) : (
              <>
                <Text>Formal: {phrase.fa.formal}</Text>
                <br />
                <Text>Informal: {phrase.fa.informal}</Text>
              </>
            )}
          </div>
        )
      })}
    </>
  )
}
