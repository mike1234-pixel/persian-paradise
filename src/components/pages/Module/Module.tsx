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
  const [showAnswer, setShowAnser] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleNextPhrase = () => {
    if (isAnswerCorrect) {
      setInputValue("")
      setIsAnswerCorrect(false)
      setCurrentPhraseIndex((prevIndex) => prevIndex + 1)
      setShowAnser(false)
      setShowHint(false)
    }
  }

  const currentPhrase = phrases[currentPhraseIndex]

  const checkAnswer = () => {
    if (typeof currentPhrase.fa === "string") {
      setIsAnswerCorrect(normalize(inputValue) === normalize(currentPhrase.fa))
    } else {
      console.log(normalize(inputValue), normalize(currentPhrase.fa.informal))
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

  return (
    <Content className={styles.content}>
      <Title>{module.title}</Title>
      {module.subtitle ?? <Title level={3}>{module.subtitle}</Title>}
      <div className={styles.phrase}>
        <Title level={5}>{currentPhrase.en}</Title>

        {currentPhrase.hint && (
          <>
            <Button onClick={() => setShowHint(true)}>Show Hint</Button>
            <div className={showHint ? styles.hint : styles.hidden}>
              {currentPhrase.hint}
            </div>
          </>
        )}

        <Button onClick={() => setShowAnser(true)}>Show Answer</Button>
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

        <Form.Item label='Answer in Persian'>
          <Input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            className={isAnswerCorrect ? styles.successInput : styles.input}
          />
        </Form.Item>

        {isAnswerCorrect && (
          <Button onClick={handleNextPhrase}>Next Phrase</Button>
        )}
      </div>
    </Content>
  )
}
