import { Typography, Layout, Input, Form, Button } from "antd"
import { CourseModule } from "../../../types/Module"
import styles from "./Module.module.css"
import { useEffect, useState } from "react"
import { normalize } from "../../../utils/normalize"

interface ModuleProps {
  module: CourseModule
}

export const Module = ({ module }: ModuleProps) => {
  const { phrases } = module
  const { Title } = Typography
  const { Content } = Layout

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const resetState = (hardReset: boolean) => {
    hardReset
      ? setCurrentPhraseIndex(0)
      : setCurrentPhraseIndex((prevIndex) => prevIndex + 1)
    setInputValue("")
    setIsAnswerCorrect(false)
    setShowAnswer(false)
    setShowHint(false)
  }

  const handleNextPhrase = () => {
    if (isAnswerCorrect) {
      resetState(false)
    }
  }

  const currentPhrase = phrases[currentPhraseIndex]

  const checkAnswer = () => {
    if (typeof currentPhrase.fa === "string") {
      setIsAnswerCorrect(normalize(inputValue) === normalize(currentPhrase.fa))
    } else {
      setIsAnswerCorrect(
        normalize(inputValue) === normalize(currentPhrase.fa.formal) ||
          normalize(inputValue) === normalize(currentPhrase.fa.informal)
      )
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    checkAnswer()
  }, [inputValue])

  useEffect(() => {
    resetState(true)
  }, [module])

  return (
    <Content className={styles.content}>
      <Title>{module.title}</Title>
      {module.subtitle && <Title level={3}>{module.subtitle}</Title>}
      <div className={styles.phrase}>
        <Title level={5}>{currentPhrase.en}</Title>

        {currentPhrase.hint && (
          <>
            <Button onClick={() => setShowHint((prevState) => !prevState)}>
              Show Hint
            </Button>
            <div className={showHint ? styles.hint : styles.hidden}>
              {currentPhrase.hint}
            </div>
          </>
        )}

        <Button onClick={() => setShowAnswer((prevState) => !prevState)}>
          Answer
        </Button>
        <div className={showAnswer ? styles.answer : styles.hidden}>
          {typeof currentPhrase.fa === "string" ? (
            <p>{currentPhrase.fa}</p>
          ) : (
            <>
              <p>Formal: {currentPhrase.fa.formal}</p>
              <p>Informal: {currentPhrase.fa.informal}</p>
            </>
          )}
        </div>
        <div className={styles.emoji}>
          <i>{currentPhrase.emoji}</i>
        </div>

        <Form layout='vertical'>
          <Form.Item label='Answer in Persian' style={{ display: "block" }}>
            <Input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              className={isAnswerCorrect ? styles.successInput : styles.input}
            />
          </Form.Item>
        </Form>
        {isAnswerCorrect && (
          <Button onClick={handleNextPhrase}>Next Phrase</Button>
        )}
      </div>
    </Content>
  )
}
