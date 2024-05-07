import { Button } from 'antd'
import { PhraseCRUD } from 'components/common/PhraseCRUD/PhraseCRUD'
import styles from 'components/pages/CMS/CMS.module.css'
import { useState } from 'react'

export const CMS = () => {
  const [phraseCRUDOpen, setPhraseCRUDOpen] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <Button
        type="primary"
        onClick={() => {
          setPhraseCRUDOpen(true)
        }}
      >
        Add Phrase
      </Button>
      <PhraseCRUD
        editMode={false}
        open={phraseCRUDOpen}
        setOpen={setPhraseCRUDOpen}
      />
    </div>
  )
}
