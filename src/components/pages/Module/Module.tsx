import Lottie from 'lottie-react'
import { Typography, Layout, Input, Form, Button, Progress } from 'antd'
import { type CourseModule } from 'persian-paradise-shared-types'
import { useContext, useEffect, useState } from 'react'
import { normalize } from 'utils/normalize'
import { CheckCircleTwoTone, QuestionCircleTwoTone } from '@ant-design/icons'
import { ConfettiAnimationContext } from 'context/ConfettiAnimationContext'
import { Fade } from 'react-awesome-reveal'
import { Complete } from 'components/pages/Complete'
import { useLocation } from 'react-router-dom'
import { GlossaryModal } from 'components/common/GlossaryModal'
import { Loading } from 'components/pages/Loading'
import { Error } from 'components/pages/Error'
import { Answers } from 'components/common/Answers'
import { useScreenResize } from 'hooks/useScreenResize'
import thinkingAnimation from 'assets/animations/thinkingAnimation.json'
import styles from 'components/pages/Module/Module.module.css'

interface ModuleProps {
  module: CourseModule | undefined
  moduleLoading: boolean
  errorLoadingModule: Error | null
}

export const Module = ({
  module,
  moduleLoading,
  errorLoadingModule
}: ModuleProps) => {
  const { phrases } = module ?? { phrases: [] }
  const { Title } = Typography
  const { Content } = Layout

  const { releaseTheConfetti } = useContext(ConfettiAnimationContext)

  const passSFX = new Audio(
    'https://persian-paradise.s3.eu-west-2.amazonaws.com/pass.mp3'
  )
  const successSFX = new Audio(
    'https://persian-paradise.s3.eu-west-2.amazonaws.com/success.mp3'
  )

  const location = useLocation()

  const { isSmallScreen } = useScreenResize()

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
  const [moduleComplete, setModuleComplete] = useState<boolean>(false)
  const [animationKey, setAnimationKey] = useState<number>(0)
  const [progressPercent, setProgressPercent] = useState<number>(0)
  const [activeCollapseKeys, setActiveCollapseKeys] = useState<string[]>([])

  const resetState = (hardReset: boolean) => {
    hardReset
      ? setCurrentPhraseIndex(0)
      : setCurrentPhraseIndex((prevIndex) => prevIndex + 1)
    hardReset && setProgressPercent(0)
    hardReset && setModuleComplete(false)
    setInputValue('')
    setIsAnswerCorrect(false)
    setAnimationKey((prevKey) => prevKey + 1)
  }

  const handleNextPhrase = () => {
    const finished = phrases.length - 1 === currentPhraseIndex
    if (finished) {
      releaseTheConfetti()
      setModuleComplete(true)
      const playPromise = successSFX.play()
      if (
        playPromise !== undefined &&
        typeof playPromise.catch === 'function'
      ) {
        playPromise.catch((error) => {
          console.error('Error playing success sound:', error)
        })
      }
    } else if (isAnswerCorrect) {
      resetState(false)
      const newProgressPercent = Math.ceil(
        ((currentPhraseIndex + 1) / phrases.length) * 100
      )
      setProgressPercent(newProgressPercent)
      passSFX.play().catch((error) => {
        console.error('Error playing pass sound:', error)
      })
      setActiveCollapseKeys([])
    }
  }

  const currentPhrase = phrases[currentPhraseIndex]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const goBack = () => {
    if (currentPhraseIndex !== 0) {
      setCurrentPhraseIndex((prevIndex) => prevIndex - 1)
      const newProgressPercent = Math.ceil(
        ((currentPhraseIndex - 1) / phrases.length) * 100
      )
      setProgressPercent(newProgressPercent)
      setInputValue('')
    }
  }

  useEffect(() => {
    const checkAnswer = () => {
      if (currentPhrase?.fa) {
        if (Array.isArray(currentPhrase.fa)) {
          const anyMatch = currentPhrase.fa.some(
            (phrase) => normalize(inputValue) === normalize(phrase)
          )
          setIsAnswerCorrect(anyMatch)
        } else {
          setIsAnswerCorrect(
            normalize(inputValue) === normalize(currentPhrase.fa.formal) ||
              normalize(inputValue) === normalize(currentPhrase.fa.informal)
          )
        }
      }
    }

    checkAnswer()
  }, [inputValue, currentPhrase?.fa])

  useEffect(() => {
    resetState(true)
  }, [module])

  useEffect(() => {
    resetState(true)
  }, [location])

  if (moduleComplete) return <Complete />

  if (errorLoadingModule) return <Error error={errorLoadingModule} />

  if (moduleLoading) return <Loading />

  return (
    <Content className={styles.root}>
      <Progress
        percent={progressPercent}
        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
      />
      <div className={styles.module}>
        <div className={styles.leftContent}>
          {module && (
            <>
              <Title>{module.title}</Title>
              {module.subtitle && <Title level={3}>{module.subtitle}</Title>}
              <div className={styles.phrase}>
                <div className={styles.phraseEnglish}>
                  {isSmallScreen ? (
                    <span>{currentPhrase.en}</span>
                  ) : (
                    <Fade key={animationKey} cascade duration={100}>
                      {currentPhrase.en}
                    </Fade>
                  )}

                  <i>{currentPhrase.emoji}</i>
                </div>

                <div>
                  <Form layout="vertical" className={styles.form}>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={
                          isAnswerCorrect ? styles.successInput : styles.input
                        }
                        size="large"
                        placeholder="Answer in Persian"
                        spellCheck={false}
                        suffix={
                          isAnswerCorrect ? (
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                          ) : (
                            <QuestionCircleTwoTone twoToneColor="#52c41a" />
                          )
                        }
                      />
                    </Form.Item>
                    {isAnswerCorrect && (
                      <Button
                        onClick={() => {
                          handleNextPhrase()
                        }}
                        size="large"
                      >
                        Next Phrase 👉
                      </Button>
                    )}
                  </Form>
                </div>
              </div>
              <Answers
                phrase={currentPhrase}
                activeCollapseKeys={activeCollapseKeys}
                setActiveCollapseKeys={setActiveCollapseKeys}
              />
              {currentPhraseIndex !== 0 && (
                <Button onClick={goBack} size="large" style={{ marginTop: 30 }}>
                  Go Back 👈
                </Button>
              )}
              <GlossaryModal phrases={phrases} />
            </>
          )}
        </div>
        <div className={styles.rightContent}>
          <div className={styles.animation}>
            <Lottie animationData={thinkingAnimation} loop={false} />
          </div>
        </div>
      </div>
    </Content>
  )
}

// Pashmam - shocked (pasm = hair, am = my) (pronounced pashmarm)
// àmma or vàli - but
// Man inja neshasteam = I am sitting here
// to inja neshaste’ ee= you are sitting here

// man hamishe scrabble ra mibaram - i always win scrabble
// to hamishe scrabble ra mibari - you always win scrabble

// Man hamishe scrabble ra mibazam - i always lose scrabble
// To hamishe scrabble ra mibazi - you always lose scrabble

// man be majarestan safar mikonam - I am travelling to Hungary
// To be majarestan safar mikoni - You are travelling to Hungary
