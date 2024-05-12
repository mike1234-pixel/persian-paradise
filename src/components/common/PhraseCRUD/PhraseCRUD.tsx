import { Select, Input, Switch, Button, Form, Drawer } from 'antd'
import { useModules } from 'hooks/useModules'
import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'
import styles from 'components/common/PhraseCRUD/PhraseCRUD.module.css'
import { Controller, useForm } from 'react-hook-form'
import { type PhraseCreateModel } from 'schemas/PhraseCRUD'

interface PhraseCRUDProps {
  open: boolean
  editMode: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export const PhraseCRUD = ({
  open,
  editMode,
  setOpen,
  setEditMode
}: PhraseCRUDProps) => {
  const { modules, isLoading: modulesIsLoading } = useModules()

  const { control, watch, unregister } = useForm<PhraseCreateModel>({
    defaultValues: {
      module: '',
      en: '',
      fa: {
        // TODO: if no formal field added by user, send phrase to BE in array
        informal: ''
      }
    }
  })

  const selectedModuleTitle = watch('module')

  const moduleOptions = modules
    ? modules?.map((module) => {
        return {
          value: module.title,
          label: module.title
        }
      })
    : []

  const selectedModule =
    selectedModuleTitle &&
    modules?.filter((module) => module.title === selectedModuleTitle)[0]

  const phraseOptions = selectedModule
    ? selectedModule?.phrases?.map((phrase) => {
        return {
          value: phrase.en,
          label: phrase.en
        }
      })
    : []

  const formValues = watch()

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  const [useRegisters, setUseRegisters] = useState<boolean>(false)

  const handleSwitchRegisters = () => {
    setUseRegisters(!useRegisters)
    unregister('fa.formal')
  }

  const handleClose = () => {
    setOpen(false)
    setEditMode(false)
  }

  return (
    <Drawer
      title={editMode ? 'Edit Phrase' : 'Add Phrase'}
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
          name="module"
          control={control}
          render={({ field }) => (
            <Form.Item label="Module">
              <Select
                {...field}
                options={moduleOptions}
                placeholder="Select Module"
                loading={modulesIsLoading}
              />
            </Form.Item>
          )}
        />

        {editMode ? (
          <Controller
            name="en"
            control={control}
            render={({ field }) => (
              <Form.Item label="Phrase In English">
                <Select
                  {...field}
                  options={phraseOptions}
                  placeholder="Select Phrase..."
                  loading={modulesIsLoading}
                  showSearch
                  disabled={!selectedModule}
                />
              </Form.Item>
            )}
          />
        ) : (
          <Controller
            name="en"
            control={control}
            render={({ field }) => (
              <Form.Item label="Phrase In English">
                <Input
                  {...field}
                  placeholder="Enter Word Or Phrase In English..."
                />
              </Form.Item>
            )}
          />
        )}

        <Controller
          name="en"
          control={control}
          render={({ field }) => (
            <Form.Item label="Phrase In English">
              <Input
                {...field}
                placeholder="Enter Word Or Phrase In English..."
              />
            </Form.Item>
          )}
        />

        <Form.Item label="Use Formal/Informal Registers" name="registers">
          <Switch checked={useRegisters} onChange={handleSwitchRegisters} />
        </Form.Item>

        <Controller
          name="fa.informal"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={`Phrase In Farsi ${useRegisters ? '(Informal)' : ''}`}
            >
              <Input
                {...field}
                placeholder={`Enter ${useRegisters ? 'Informal' : ''} Word Or Phrase In Farsi...`}
              />
            </Form.Item>
          )}
        />
        {useRegisters && (
          <Controller
            name="fa.formal"
            control={control}
            render={({ field }) => (
              <Form.Item label="Phrase In Farsi (Formal)">
                <Input
                  {...field}
                  placeholder="Enter Formal Word Or Phrase In Farsi..."
                />
              </Form.Item>
            )}
          />
        )}

        <Controller
          name="hint"
          control={control}
          render={({ field }) => (
            <Form.Item label="Add Hint">
              <Input
                {...field}
                placeholder="Enter A Hint To Help The User..."
              />
            </Form.Item>
          )}
        />

        <Controller
          name="emoji"
          control={control}
          render={({ field }) => (
            <Form.Item label="Add Emoji">
              <Input
                {...field}
                placeholder="Add A Prompt For Visual Learners..."
              />
            </Form.Item>
          )}
        />
      </Form>
    </Drawer>
  )
}
