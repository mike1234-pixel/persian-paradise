import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { Drawer, Button, Form, Select, Input } from 'antd'
import { useModules } from 'hooks/useModules'
import { Controller, useForm } from 'react-hook-form'
import { type CourseModuleCreateEditModel } from 'schemas/PhraseCRUD'
import { type CourseModule } from 'persian-paradise-shared-types'
import { getOptions } from 'utils/getOptions'
import { useAddModule } from 'hooks/useAddModule'
import { useNotifications } from 'hooks/useNotifications'
import { useUpdateModule } from 'hooks/useUpdateModule'
import styles from './ModuleCRUD.module.css'
import { useDeleteModule } from 'hooks/useDeleteModule'

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
  const { openNotification, contextHolder } = useNotifications()

  const { mutate: addModule } = useAddModule(openNotification)
  const { mutate: updateModule } = useUpdateModule(openNotification)
  const { mutate: deleteModule } = useDeleteModule(openNotification)

  const { control, reset, watch, setValue, handleSubmit } =
    useForm<CourseModuleCreateEditModel>({
      defaultValues: {
        title: '',
        phrases: []
      }
    })

  const moduleValue = watch('title')

  const moduleOptions = modules
    ? getOptions<CourseModule>(modules, 'title', 'title')
    : []

  const handleClose = () => {
    reset()
    setOpen(false)
    setEditMode(false)
  }

  const handleDelete = () => {
    moduleValue && deleteModule(moduleValue)

    handleClose()
  }

  const onSubmit = (data: CourseModuleCreateEditModel) => {
    const { title, subtitle, emoji, phrases } = data

    const moduleCreate = {
      title,
      subtitle,
      emoji,
      phrases
    }

    const moduleUpdate = {
      title,
      subtitle,
      emoji
    }

    editMode ? updateModule(moduleUpdate) : addModule(moduleCreate)
    handleClose()
  }

  useEffect(() => {
    // PREPOPULATE FORM IN EDIT MODE
    const selectedModule = modules?.filter(
      (module) => module.title === moduleValue
    )[0]

    setValue('subtitle', selectedModule?.subtitle)
    setValue('emoji', selectedModule?.emoji)
  }, [moduleValue])

  return (
    <>
      <Drawer
        title={editMode ? 'Edit Module' : 'Add Module'}
        onClose={handleClose}
        open={open}
        width="50%"
        destroyOnClose
        footer={
          <div className={styles.footerContent}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => {
                  handleSubmit(onSubmit)(e).catch((error) => {
                    console.error('Error submitting the form:', error)
                  })
                }}
              >
                Save
              </Button>
            </Form.Item>
            {editMode && (
              <Form.Item>
                <Button
                  type="default"
                  danger
                  htmlType="submit"
                  onClick={handleDelete}
                >
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
      {contextHolder}
    </>
  )
}
