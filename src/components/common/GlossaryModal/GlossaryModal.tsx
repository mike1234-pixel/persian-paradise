import { Modal, Button, FloatButton, Table, Typography, Tag } from "antd"
import { useState } from "react"
import { Phrase } from "../../../types/Module"
import styles from "./GlossaryModal.module.css"

interface GlossaryModalProps {
  phrases: Phrase[]
}

export const GlossaryModal = ({ phrases }: GlossaryModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const dataSource = phrases.map((phrase, i) => {
    return {
      key: i,
      en: phrase.en,
      fa: phrase.fa,
      emoji: phrase.emoji,
    }
  })

  const columns = [
    {
      title: "English",
      dataIndex: "en",
      key: "English",
    },
    {
      title: "Persian",
      dataIndex: "fa",
      key: "Persian",
      render: (record: Phrase["fa"]) => {
        if (Array.isArray(record)) {
          return <>{record.join(", ")}</>
        }

        return (
          <>
            <Tag color='purple'>Informal</Tag>
            <span style={{ display: "inline-block", marginRight: 15 }}>
              {record.informal}
            </span>
            <Tag color='blue'>Formal</Tag>
            <span>{record.formal}</span>
          </>
        )
      },
    },
    {
      dataIndex: "emoji",
      key: "Emoji",
      width: "40px",
    },
  ]

  return (
    <>
      <Modal
        open={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        footer={<Button onClick={() => setModalIsOpen(false)}>Cancel</Button>}
        className={styles.root}
      >
        <Typography.Title>Glossary</Typography.Title>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
        />
        ;
      </Modal>
      <FloatButton tooltip='glossary' onClick={() => setModalIsOpen(true)} />
    </>
  )
}
