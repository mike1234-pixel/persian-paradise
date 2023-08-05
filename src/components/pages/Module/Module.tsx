import {
  Typography,
  Layout,
  Input,
  Form,
  Button,
  Collapse,
  Progress,
} from "antd"
import { CourseModule } from "../../../types/Module"
import { useContext, useEffect, useState } from "react"
import { normalize } from "../../../utils/normalize"
import { CheckCircleTwoTone, QuestionCircleTwoTone } from "@ant-design/icons"
import { ConfettiAnimationContext } from "../../../context/ConfettiAnimationContext"
import { Flip } from "react-reveal"
import { Complete } from "../Complete/Complete"
import { useLocation } from "react-router-dom"
import styles from "./Module.module.css"

interface ModuleProps {
  module: CourseModule
}

// TODO:
// - add next module button to complete screen
// - bug - when you complete a module and select another module, it errors out - this may have something to do with the sound or confetti

// ADD INFORMATION PAGES THAT CONTAIN EXPLANATIONS

export const Module = ({ module }: ModuleProps) => {
  const { phrases } = module
  const { Title } = Typography
  const { Content } = Layout
  const { Panel } = Collapse

  const { releaseTheConfetti } = useContext(ConfettiAnimationContext)

  const passSFX = new Audio(
    "https://persian-paradise.s3.eu-west-2.amazonaws.com/pass.mp3"
  )
  const successSFX = new Audio(
    "https://persian-paradise.s3.eu-west-2.amazonaws.com/success.mp3"
  )

  const location = useLocation()

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>("")
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [moduleComplete, setModuleComplete] = useState(false)
  const [animationKey, setAnimationKey] = useState<number>(0)
  const [progressPercent, setProgressPercent] = useState<number>(0)

  const resetState = (hardReset: boolean) => {
    hardReset
      ? setCurrentPhraseIndex(0)
      : setCurrentPhraseIndex((prevIndex) => prevIndex + 1)
    hardReset && setProgressPercent(0)
    hardReset && setModuleComplete(false)
    setInputValue("")
    setIsAnswerCorrect(false)
    setAnimationKey((prevKey) => prevKey + 1)
  }

  const handleNextPhrase = () => {
    const finished = phrases.length - 1 === currentPhraseIndex
    if (finished) {
      releaseTheConfetti()
      setModuleComplete(true)
      successSFX.play()
    }
    if (isAnswerCorrect && !finished) {
      resetState(false)
      const newProgressPercent = Math.ceil(
        ((currentPhraseIndex + 1) / phrases.length) * 100
      )
      setProgressPercent(newProgressPercent)
      passSFX.play()
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
      setInputValue("")
    }
  }

  useEffect(() => {
    const checkAnswer = () => {
      if (Array.isArray(currentPhrase.fa)) {
        currentPhrase.fa.map((phrase) => {
          return setIsAnswerCorrect(normalize(inputValue) === normalize(phrase))
        })
      } else {
        setIsAnswerCorrect(
          normalize(inputValue) === normalize(currentPhrase.fa.formal) ||
            normalize(inputValue) === normalize(currentPhrase.fa.informal)
        )
      }
    }

    checkAnswer()
  }, [inputValue, currentPhrase.fa])

  useEffect(() => {
    resetState(true)
  }, [module])

  useEffect(() => {
    resetState(true)
  }, [location])

  if (moduleComplete) return <Complete />

  return (
    <Content className={styles.root}>
      <Progress
        percent={progressPercent}
        strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
      />
      <Title>{module.title}</Title>
      {module.subtitle && <Title level={3}>{module.subtitle}</Title>}
      <div className={styles.phrase}>
        <div className={styles.phraseEnglish}>
          <Flip key={animationKey} left cascade>
            {currentPhrase.en}
          </Flip>
          <i>{currentPhrase.emoji}</i>
        </div>

        <div>
          <Form layout='vertical' className={styles.form}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                className={isAnswerCorrect ? styles.successInput : styles.input}
                size='large'
                placeholder='Answer in Persian'
                spellCheck={false}
                suffix={
                  isAnswerCorrect ? (
                    <CheckCircleTwoTone twoToneColor='#52c41a' />
                  ) : (
                    <QuestionCircleTwoTone twoToneColor='#52c41a' />
                  )
                }
              />
            </Form.Item>
            {isAnswerCorrect && (
              <Button onClick={handleNextPhrase} size='large'>
                Next Phrase 👉
              </Button>
            )}
          </Form>
        </div>
      </div>
      <Collapse style={{ marginTop: 30, maxWidth: 300 }}>
        {currentPhrase.hint && (
          <Panel header='Show Hint 🙊' key='2'>
            <span>{currentPhrase.hint}</span>
          </Panel>
        )}
        <Panel header='Show Answer 🙉' key='1'>
          {Array.isArray(currentPhrase?.fa) ? (
            currentPhrase.fa.map((phrase, i) => {
              return <span key={i}>{phrase} 🙈</span>
            })
          ) : (
            <>
              <span style={{ marginRight: 20 }}>
                Formal: {currentPhrase.fa.formal}
              </span>
              <span>Informal: {currentPhrase.fa.informal}</span>
              🙈
            </>
          )}
        </Panel>
      </Collapse>
      {currentPhraseIndex !== 0 && (
        <Button onClick={goBack} size='large' style={{ marginTop: 30 }}>
          Go Back 👈
        </Button>
      )}
    </Content>
  )
}

// shalvar mipoosham - for sentences like this add 'man shalvar mipoosham' as an option

// man aab jo doost daràm - i like beer

// Man ab jo doost nàdaràm - I do not like beer
// daram - i have
// nedoram - i dont have

// i like him - màn oo ra doost daràm
// ra - the reason of something

// che/chi - what
// chera - why (for what reason)

// man to ra doost daram - i like you

// man sagha ra doost daram - i like dogs

// need to add 'ra' to all the sentence with transitive verbs i.e those with an object
// e.g. man aab jo ra minoosham
// - ra acts as the
// i am drinking the beer
// without it is correct also - i am drinking beer
