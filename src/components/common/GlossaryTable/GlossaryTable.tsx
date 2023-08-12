import { Table, Tag } from "antd"
import { Phrase } from "../../../types/Module"

interface GlossaryTableProps {
  phrases: Phrase[] | undefined
}

export const GlossaryTable = ({ phrases }: GlossaryTableProps) => {
  const dataSource =
    phrases &&
    phrases.map((phrase, i) => {
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
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 5,
      }}
    />
  )
}
