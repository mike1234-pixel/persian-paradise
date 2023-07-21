import { Typography, Layout, Input, Form, Button, Collapse } from "antd"
import { CourseModule } from "../../../types/Module"
import { useContext, useEffect, useState } from "react"
import { normalize } from "../../../utils/normalize"
import { CheckCircleTwoTone, QuestionCircleTwoTone } from "@ant-design/icons"
import { ConfettiAnimationContext } from "../../../context/ConfettiAnimationContext"
import { Flip } from "react-reveal"
import styles from "./Module.module.css"
import { Complete } from "../Complete/Complete"

interface ModuleProps {
  module: CourseModule
}

// TODO:
// - make responsive
// - when relocating, reset the state
// - add back button

export const Module = ({ module }: ModuleProps) => {
  const { phrases } = module
  const { Title } = Typography
  const { Content } = Layout
  const { Panel } = Collapse

  const { releaseTheConfetti } = useContext(ConfettiAnimationContext)

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [moduleComplete, setModuleComplete] = useState(false)
  const [animationKey, setAnimationKey] = useState<number>(0)

  const resetState = (hardReset: boolean) => {
    hardReset
      ? setCurrentPhraseIndex(0)
      : setCurrentPhraseIndex((prevIndex) => prevIndex + 1)
    setInputValue("")
    setIsAnswerCorrect(false)
    setAnimationKey((prevKey) => prevKey + 1)
  }

  const handleNextPhrase = () => {
    const finished = phrases.length - 1 === currentPhraseIndex
    if (finished) {
      releaseTheConfetti()
      setModuleComplete(true)
    }
    if (isAnswerCorrect && !finished) {
      resetState(false)
    }
  }

  const currentPhrase = phrases[currentPhraseIndex]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
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

  if (moduleComplete) return <Complete />

  return (
    <Content className={styles.root}>
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
            <p>{currentPhrase.hint}</p>
          </Panel>
        )}
        <Panel header='Show Answer 🙉' key='1'>
          {Array.isArray(currentPhrase.fa) ? (
            currentPhrase.fa.map((phrase, i) => {
              return <p key={i}>{phrase} 🙈</p>
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
      ;
    </Content>
  )
}
