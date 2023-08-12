import { Phrase, Char } from "animatedtxt"
import { Content } from "antd/es/layout/layout"
import { useScreenResize } from "../../../hooks/useScreenResize"
import styles from "./Complete.module.css"

export const Complete = () => {
  const { isSmallScreen } = useScreenResize()

  return (
    <Content className={styles.root}>
      <Phrase size={isSmallScreen ? 20 : 40}>
        <Char char='M' duration={1} color='#89CFF0' delay={0.2} />
        <Char char='O' duration={3} color='#6495ED' />
        <Char char='D' duration={2} delay={0.4} color='#87CEFA' />
        <Char char='U' duration={1} color='#00BFFF' />
        <Char char='L' duration={1} delay={0.2} color='#6495ED' />
        <Char char='E' duration={2} color='#89CFF0' />
      </Phrase>

      <Phrase size={isSmallScreen ? 30 : 60}>
        <Char char='C' duration={1} color='#FF844D' />
        <Char char='O' duration={3} color='#E65C00' />
        <Char char='M' duration={2} color='#CC5200' />
        <Char char='P' duration={1} color='#FF6600' />
        <Char char='L' duration={3} color='#FF844D' />
        <Char char='E' duration={2} color='#E65C00' />
        <Char char='T' duration={1} color='#CC5200' />
        <Char char='E' duration={3} color='#FF6600' />
      </Phrase>
      <i className={styles.emoji}>🥳</i>
    </Content>
  )
}
