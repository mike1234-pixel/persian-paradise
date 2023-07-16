import { Typography, Layout, Input, Form, Button } from "antd"
import { CourseModule } from "../../../types/Module"
import styles from "./Module.module.css"
import { useEffect, useState } from "react"
import { normalize } from "../../../utils/normalize"
import { Tick } from "../../common/Tick/Tick"

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
  const [moduleComplete, setModuleComplete] = useState(false)

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
    const finished = phrases.length - 1 === currentPhraseIndex
    if (finished) {
      setModuleComplete(true)
    }
    if (isAnswerCorrect && !finished) {
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

  if (moduleComplete)
    return (
      <Content className={styles.content}>
        <p>module complete!</p>
      </Content>
    )

  return (
    <Content className={styles.content}>
      <Title>{module.title}</Title>
      {module.subtitle && <Title level={3}>{module.subtitle}</Title>}
      <div className={styles.phrase}>
        <Title level={5}>{currentPhrase.en}</Title>

        {currentPhrase.hint && (
          <>
            <Button onClick={() => setShowHint((prevState) => !prevState)}>
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            <div className={showHint ? styles.hint : styles.hidden}>
              {currentPhrase.hint}
            </div>
          </>
        )}

        <Button onClick={() => setShowAnswer((prevState) => !prevState)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
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

        <div style={{ display: "flex" }}>
          <Form layout='vertical'>
            <Form.Item label='Answer in Persian'>
              <Input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                className={isAnswerCorrect ? styles.successInput : styles.input}
              />
            </Form.Item>
          </Form>
          {isAnswerCorrect && <Tick />}
        </div>
        {isAnswerCorrect && (
          <>
            <Button onClick={handleNextPhrase}>Next Phrase</Button>
          </>
        )}
      </div>
    </Content>
  )
}
