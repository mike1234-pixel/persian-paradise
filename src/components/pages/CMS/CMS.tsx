import { Button } from 'antd'
import { PhraseCRUD } from 'components/common/PhraseCRUD'
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
      <h1>CMS</h1>
      <p>Add new modules, phrases and words here.</p>
      <p>
        If a word or phrase has formal/informal registers, select &apos;Use
        Formal/Informal Registers&apos;
      </p>
      <p>
        If a word or phrase has multiple variations in your language, click
        &apos;Add Variation&apos; to add more.
      </p>
      <Button className={styles.button}>Add Module</Button>
      <Button className={styles.button}>Edit Module</Button>
      <Button
        type="primary"
        onClick={() => {
          handleOpen(false)
        }}
        className={styles.button}
      >
        Add Phrase
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleOpen(true)
        }}
        className={styles.button}
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
