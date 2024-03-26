import { Modal, Button, FloatButton, Typography } from 'antd'
import { useState } from 'react'
import { type Phrase } from 'persian-paradise-shared-types'
import { GlossaryTable } from '../GlossaryTable/GlossaryTable'
import styles from './GlossaryModal.module.css'

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
