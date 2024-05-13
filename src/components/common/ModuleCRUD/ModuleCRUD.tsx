import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { Drawer, Button, Form, Select, Input } from 'antd'
import styles from './ModuleCRUD.module.css'
import { useModules } from 'hooks/useModules'
import { Controller, useForm } from 'react-hook-form'
import { type CourseModuleCreateEditModel } from 'schemas/PhraseCRUD'
import { type CourseModule } from 'persian-paradise-shared-types'
import { getOptions } from 'utils/getOptions'

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

  const { control, reset, watch } = useForm<CourseModuleCreateEditModel>({
    defaultValues: {
      title: '',
      phrases: []
    }
  })

  const formValues = watch()

  const moduleOptions = modules
    ? getOptions<CourseModule>(modules, 'title', 'title')
    : []

  const handleClose = () => {
    reset()
    setOpen(false)
    setEditMode(false)
  }

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

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
          <Controller
            name="subtitle"
            control={control}
            render={({ field }) => (
              <Form.Item label="Module Subtitle">
                <Input
                  {...field}
                  placeholder="Enter Module Subtitle (optional)..."
                />
              </Form.Item>
            )}
          />
          <Controller
            name="emoji"
            control={control}
            render={({ field }) => (
              <Form.Item label="Module Emoji">
                <Input {...field} placeholder="Enter Module Emoji..." />
              </Form.Item>
            )}
          />
        </Form>
      </Drawer>
    </div>
  )
}
