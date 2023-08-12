import { Collapse, Tag } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"
import { Dispatch, SetStateAction } from "react"
import { Phrase } from "../../../types/Module"

interface AnswersProps {
  phrase: Phrase
  activeCollapseKeys: string[]
  setActiveCollapseKeys: Dispatch<SetStateAction<string[]>>
}

export const Answers = ({
  phrase,
  activeCollapseKeys,
  setActiveCollapseKeys,
}: AnswersProps) => {
  const { Panel } = Collapse

  return (
    <Collapse
      style={{ marginTop: 30, maxWidth: 300 }}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      activeKey={activeCollapseKeys}
      onChange={(keys) => setActiveCollapseKeys(keys as string[])}
    >
      {phrase.hint && (
        <Panel header='Show Hint 🙊' key='2'>
          <span>{phrase.hint}</span>
        </Panel>
      )}
      <Panel header='Show Answer 🙉' key='1'>
        {Array.isArray(phrase?.fa) ? (
          phrase.fa.map((phrase, i) => {
            return <span key={i}>{phrase} 🙈</span>
          })
        ) : (
          <>
            <div style={{ marginBottom: 15 }}>
              <Tag color='purple'>Informal</Tag> {phrase.fa.informal}
            </div>
            <div>
              <Tag color='blue'>Formal</Tag> {phrase.fa.formal}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
