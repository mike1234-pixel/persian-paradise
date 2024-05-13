import { type Dispatch, type SetStateAction } from 'react'
import { Drawer, Button, Form, Select, Input } from 'antd'
import styles from './ModuleCRUD.module.css'
import { useModules } from 'hooks/useModules'
import { Controller, useForm } from 'react-hook-form'
import { type CourseModuleCreateEditModel } from 'schemas/PhraseCRUD'

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
  const { modules, isLoading: modulesIsLoading } = useModules()

  const { control, reset } = useForm<CourseModuleCreateEditModel>({})

  const moduleOptions = modules
    ? modules?.map((module) => {
        return {
          value: module.title,
          label: module.title
        }
      })
    : []

  const handleClose = () => {
    reset()
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
      >
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => {
              return editMode ? (
                <Form.Item label="Module Title">
                  <Select
                    {...field}
                    options={moduleOptions}
                    placeholder="Select Module..."
                    loading={modulesIsLoading}
                    showSearch
                  />
                </Form.Item>
              ) : (
                <Form.Item label="Module Title">
                  <Input {...field} placeholder="Enter Module Title..." />
                </Form.Item>
              )
            }}
          />
        </Form>
      </Drawer>
    </div>
  )
}
