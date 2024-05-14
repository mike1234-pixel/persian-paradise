import { Button } from 'antd'
import { ModuleCRUD } from 'components/common/ModuleCRUD'
import { PhraseCRUD } from 'components/common/PhraseCRUD'
import styles from 'components/pages/CMS/CMS.module.css'
import { useState } from 'react'

export const CMS = () => {
  const [phraseCRUDOpen, setPhraseCRUDOpen] = useState<boolean>(false)
  const [moduleCRUDOpen, setModuleCRUDOpen] = useState<boolean>(false)
  const [phraseCRUDEditMode, setPhraseCRUDEditMode] = useState<boolean>(false)
  const [moduleCRUDEditMode, setModuleCRUDEditMode] = useState<boolean>(false)

  const handleOpenPhraseCRUD = (editMode: boolean) => {
    setPhraseCRUDOpen(true)
    setPhraseCRUDEditMode(editMode)
  }

  const handleOpenModuleCRUD = (editMode: boolean) => {
    setModuleCRUDOpen(true)
    setModuleCRUDEditMode(editMode)
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
      <Button
        className={styles.button}
        onClick={() => {
          handleOpenModuleCRUD(false)
        }}
      >
        Add Module
      </Button>
      <Button
        className={styles.button}
        onClick={() => {
          handleOpenModuleCRUD(true)
        }}
      >
        Edit Module
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleOpenPhraseCRUD(false)
        }}
        className={styles.button}
      >
        Add Phrase
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleOpenPhraseCRUD(true)
        }}
        className={styles.button}
      >
        Edit Phrase
      </Button>
      <PhraseCRUD
        open={phraseCRUDOpen}
        editMode={phraseCRUDEditMode}
        setOpen={setPhraseCRUDOpen}
        setEditMode={setPhraseCRUDEditMode}
      />
      <ModuleCRUD
        open={moduleCRUDOpen}
        editMode={moduleCRUDEditMode}
        setOpen={setModuleCRUDOpen}
        setEditMode={setModuleCRUDEditMode}
      />
    </div>
  )
}
