import { useContext } from 'react'
import {
  ConfettiAnimationContext,
  type ConfettiAnimationI
} from 'context/ConfettiAnimationContext'
import Confetti from 'react-confetti'
import styles from 'components/common/Confetti/Confetti.module.css'

export const ConfettiEffect = () => {
  const { renderConfetti, confettiPieces } = useContext<ConfettiAnimationI>(
    ConfettiAnimationContext
  )

  const width = window.innerWidth
  const height = window.innerHeight

  if (!renderConfetti) return null

  return (
    <div className={styles.root}>
      <Confetti
        numberOfPieces={confettiPieces}
        width={width}
        height={height}
        data-testid={confettiPieces}
      />
    </div>
  )
}
