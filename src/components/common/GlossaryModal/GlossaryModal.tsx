import { Modal, Button, FloatButton, Typography } from 'antd'
import { useState } from 'react'
import { type Phrase } from 'persian-paradise-shared-types'
import { GlossaryTable } from 'components/common/GlossaryTable'
import styles from 'components/common/GlossaryModal/GlossaryModal.module.css'

interface GlossaryModalProps {
  phrases: Phrase[] | undefined
}

export const GlossaryModal = ({ phrases }: GlossaryModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  return (
    <>
      <Modal
        open={modalIsOpen}
        onCancel={() => {
          setModalIsOpen(false)
        }}
        footer={
          <Button
            onClick={() => {
              setModalIsOpen(false)
            }}
          >
            Cancel
          </Button>
        }
        className={styles.root}
        destroyOnClose
      >
        <Typography.Title>Glossary</Typography.Title>
        <GlossaryTable phrases={phrases} />
      </Modal>
      <FloatButton
        data-testid="glossary-modal-float-button"
        tooltip="glossary"
        onClick={() => {
          setModalIsOpen(true)
        }}
        badge={{ count: phrases?.length, overflowCount: 999 }}
      />
    </>
  )
}
