import { Typography, Layout, Input, Form, Button, Progress } from 'antd';
import { CourseModule } from '../../../types/Module';
import { useContext, useEffect, useState } from 'react';
import { normalize } from '../../../utils/normalize';
import { CheckCircleTwoTone, QuestionCircleTwoTone } from '@ant-design/icons';
import { ConfettiAnimationContext } from '../../../context/ConfettiAnimationContext';
import { Flip } from 'react-reveal';
import { Complete } from '../Complete/Complete';
import { useLocation } from 'react-router-dom';
import { GlossaryModal } from '../../common/GlossaryModal/GlossaryModal';
import { Loading } from '../Loading/Loading';
import { Error } from '../Error/Error';
import { Answers } from '../../common/Answers/Answers';
import { useScreenResize } from '../../../hooks/useScreenResize';
import styles from './Module.module.css';

interface ModuleProps {
  module: CourseModule | undefined;
  moduleLoading: boolean;
  errorLoadingModule: Error | null;
}

export const Module = ({
  module,
  moduleLoading,
  errorLoadingModule
}: ModuleProps) => {
  const { phrases } = module ?? { phrases: [] };
  const { Title } = Typography;
  const { Content } = Layout;

  const { releaseTheConfetti } = useContext(ConfettiAnimationContext);

  const passSFX = new Audio(
    'https://persian-paradise.s3.eu-west-2.amazonaws.com/pass.mp3'
  );
  const successSFX = new Audio(
    'https://persian-paradise.s3.eu-west-2.amazonaws.com/success.mp3'
  );

  const location = useLocation();

  const { isSmallScreen } = useScreenResize();

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [moduleComplete, setModuleComplete] = useState(false);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [activeCollapseKeys, setActiveCollapseKeys] = useState<string[]>([]);

  const resetState = (hardReset: boolean) => {
    hardReset
      ? setCurrentPhraseIndex(0)
      : setCurrentPhraseIndex((prevIndex) => prevIndex + 1);
    hardReset && setProgressPercent(0);
    hardReset && setModuleComplete(false);
    setInputValue('');
    setIsAnswerCorrect(false);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleNextPhrase = () => {
    const finished = phrases.length - 1 === currentPhraseIndex;
    if (finished) {
      releaseTheConfetti();
      setModuleComplete(true);
      successSFX.play();
    }
    if (isAnswerCorrect && !finished) {
      resetState(false);
      const newProgressPercent = Math.ceil(
        ((currentPhraseIndex + 1) / phrases.length) * 100
      );
      setProgressPercent(newProgressPercent);
      passSFX.play();
      setActiveCollapseKeys([]);
    }
  };

  const currentPhrase = phrases[currentPhraseIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const goBack = () => {
    if (currentPhraseIndex !== 0) {
      setCurrentPhraseIndex((prevIndex) => prevIndex - 1);
      const newProgressPercent = Math.ceil(
        ((currentPhraseIndex - 1) / phrases.length) * 100
      );
      setProgressPercent(newProgressPercent);
      setInputValue('');
    }
  };

  useEffect(() => {
    const checkAnswer = () => {
      if (Array.isArray(currentPhrase.fa)) {
        const anyMatch = currentPhrase.fa.some(
          (phrase) => normalize(inputValue) === normalize(phrase)
        );
        setIsAnswerCorrect(anyMatch);
      } else {
        setIsAnswerCorrect(
          normalize(inputValue) === normalize(currentPhrase.fa.formal) ||
            normalize(inputValue) === normalize(currentPhrase.fa.informal)
        );
      }
    };

    checkAnswer();
  }, [inputValue, currentPhrase.fa]);

  useEffect(() => {
    resetState(true);
  }, [module]);

  useEffect(() => {
    resetState(true);
  }, [location]);

  if (moduleComplete) return <Complete />;

  if (errorLoadingModule) return <Error error={errorLoadingModule} />;

  if (moduleLoading) return <Loading />;

  return (
    <Content className={styles.root}>
      {module && (
        <>
          <Progress
            percent={progressPercent}
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
          />
          <Title>{module.title}</Title>
          {module.subtitle && <Title level={3}>{module.subtitle}</Title>}
          <div className={styles.phrase}>
            <div className={styles.phraseEnglish}>
              {isSmallScreen ? (
                <span>{currentPhrase.en}</span>
              ) : (
                <Flip key={animationKey} left cascade>
                  {currentPhrase.en}
                </Flip>
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
                  <Button onClick={handleNextPhrase} size="large">
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
    </Content>
  );
};

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
