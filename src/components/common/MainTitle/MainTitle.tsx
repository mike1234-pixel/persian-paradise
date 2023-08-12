import { Phrase, Char } from "animatedtxt"
import { useScreenResize } from "../../../hooks/useScreenResize"
import styles from "./MainTitle.module.css"

export const MainTitle = () => {
  const { isSmallScreen } = useScreenResize()

  return (
    <div className={styles.root}>
      <Phrase size={isSmallScreen ? 20 : 40}>
        <Char char='P' duration={1} color='#89CFF0' delay={0.2} />
        <Char char='E' duration={3} color='#6495ED' />
        <Char char='R' duration={2} delay={0.4} color='#87CEFA' />
        <Char char='S' duration={1} color='#00BFFF' />
        <Char char='I' duration={1} delay={0.2} color='#6495ED' />
        <Char char='A' duration={2} color='#89CFF0' />
        <Char char='N' duration={2} delay={0.2} color='#6495ED' />
      </Phrase>

      <Phrase size={isSmallScreen ? 30 : 60}>
        <Char char='P' duration={1} color='#FF844D' />
        <Char char='A' duration={3} color='#E65C00' />
        <Char char='R' duration={2} color='#CC5200' />
        <Char char='A' duration={1} color='#FF6600' />
        <Char char='D' duration={3} color='#FF844D' />
        <Char char='I' duration={2} color='#E65C00' />
        <Char char='S' duration={1} color='#CC5200' />
        <Char char='E' duration={3} color='#FF6600' />
      </Phrase>
    </div>
  )
}
