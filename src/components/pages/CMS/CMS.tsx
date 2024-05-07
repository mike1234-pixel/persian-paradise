import { Button } from 'antd'
import { PhraseCRUD } from 'components/common/PhraseCRUD/PhraseCRUD'
import styles from 'components/pages/CMS/CMS.module.css'
import { useState } from 'react'

export const CMS = () => {
  const [phraseCRUDOpen, setPhraseCRUDOpen] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleOpen = (editMode: boolean) => {
    setPhraseCRUDOpen(true)
    editMode && setEditMode(true)
  }

  return (
    <div className={styles.root}>
      <Button
        type="primary"
        onClick={() => {
          handleOpen(false)
        }}
      >
        Add Phrase
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleOpen(true)
        }}
      >
        Edit Phrase
      </Button>
      <PhraseCRUD
        open={phraseCRUDOpen}
        editMode={editMode}
        setOpen={setPhraseCRUDOpen}
        setEditMode={setEditMode}
      />
    </div>
  )
}
