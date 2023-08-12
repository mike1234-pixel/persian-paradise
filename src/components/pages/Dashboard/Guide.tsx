import { Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import styles from "./Guide.module.css"

export const Guide = () => {
  return (
    <Content className={styles.root}>
      <Typography.Title level={1} style={{ marginBottom: 40 }}>
        User Guide
      </Typography.Title>
      <p>
        This course is designed with English speakers in mind. It therefore uses
        lessons where words are written phonetically in latin script. This
        simplified course enables English speakers to pick up some
        conversational Farsi before moving onto learning Arabic script.
      </p>
      <p>
        Many of the Farsi learning resources teach based off the Arabic script.
        This course enables new learners to quickly pick up new words and
        phrases without the requirement to learn a new alphabet and writing
        system.
      </p>
      <Typography.Title>Course Modules</Typography.Title>
      <p>
        This course is split into modules which cover different areas of basic
        conversational Farsi.
      </p>
      <p>
        It's recommended to rote learn the words for each module using the{" "}
        <b>glossary</b> first. There is also a <b>glossary button </b> in each
        module's test for reference in the bottom right of the screen.
      </p>

      <p>
        Once you have familiarised yourself with the words in the glossary, you
        can test your knowledge using the tests in each module.
      </p>
      <p>
        Each module is displayed in the navigation on the left of the screen.
      </p>
      <p>
        The approach to learning taken in this course is learning through
        repetition. It's advised that you test yourself regularly in order to
        revise and cememnt the knowledge you have gained.
      </p>
      <Typography.Title>Short and Long a</Typography.Title>
      <p>
        If you see an accented <b>à</b>, pronounce this like the English{" "}
        <b>'a'</b>
      </p>
      <p>
        If you see an unaccented <b>a</b>, prounounce this like the English{" "}
        <b>'ar'</b>
      </p>
    </Content>
  )
}
