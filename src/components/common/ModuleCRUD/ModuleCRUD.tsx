import { type Dispatch, type SetStateAction } from 'react'
import { Drawer, Button, Form } from 'antd'
import styles from './ModuleCRUD.module.css'

interface ModuleCRUDProps {
  open: boolean
  editMode: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export const ModuleCRUD = ({
  open,
  editMode,
  setOpen,
  setEditMode
}: ModuleCRUDProps) => {
  const handleClose = () => {
    // reset()
    setOpen(false)
    setEditMode(false)
  }

  return (
    <div className={styles.root}>
      <Drawer
        title={editMode ? 'Edit Module' : 'Add Module'}
        onClose={handleClose}
        open={open}
        width="50%"
        destroyOnClose
        footer={
          <div className={styles.footerContent}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
            {editMode && (
              <Form.Item>
                <Button type="default" danger htmlType="submit">
                  Delete
                </Button>
              </Form.Item>
            )}
          </div>
        }
      ></Drawer>
    </div>
  )
}
