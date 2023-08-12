import { Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import styles from "./Guide.module.css"

export const Guide = () => {
  return (
    <Content className={styles.root}>
      <Typography.Title level={1} style={{ marginBottom: 40 }}>
        Guide
      </Typography.Title>
      <p>
        This course is designed with English speakers in mind. It therefore uses
        lessons where words are written phonetically in latin script. This
        simplified course enables English speakers to pick up some
        conversational Farsi before moving onto learning Arabic script.
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
