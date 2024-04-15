import { Collapse, Tag } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { type Dispatch, type SetStateAction } from 'react'
import { type Phrase } from 'persian-paradise-shared-types'

interface AnswersProps {
  phrase: Phrase
  activeCollapseKeys: string[]
  setActiveCollapseKeys: Dispatch<SetStateAction<string[]>>
}

export const Answers = ({
  phrase,
  activeCollapseKeys,
  setActiveCollapseKeys
}: AnswersProps) => {
  const items = [
    {
      label: 'Show Answer 🙉',
      key: '1',
      children: Array.isArray(phrase?.fa) ? (
        phrase.fa.map((phrase, i) => {
          return <span key={i}>{phrase} 🙈</span>
        })
      ) : (
        <>
          <div style={{ marginBottom: 15 }}>
            <Tag color="purple">Informal</Tag> {phrase.fa.informal}
          </div>
          <div>
            <Tag color="blue">Formal</Tag> {phrase.fa.formal}
          </div>
        </>
      )
    }
  ]

  if (phrase.hint) {
    items.unshift({
      label: 'Show Hint 🙊',
      key: '2',
      children: <span>{phrase.hint}</span>
    })
  }

  return (
    <Collapse
      style={{ marginTop: 30, maxWidth: 300 }}
      expandIconPosition="end"
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      activeKey={activeCollapseKeys}
      onChange={(keys) => {
        setActiveCollapseKeys(keys as string[])
      }}
      items={items}
    />
  )
}
