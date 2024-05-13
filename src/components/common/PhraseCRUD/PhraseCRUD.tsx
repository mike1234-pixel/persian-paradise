import { Select, Input, Switch, Button, Form, Drawer, Space, List } from 'antd'
import { useModules } from 'hooks/useModules'
import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'
import styles from 'components/common/PhraseCRUD/PhraseCRUD.module.css'
import { Controller, useForm } from 'react-hook-form'
import { type PhraseCreateEditModel } from 'schemas/PhraseCRUD'

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

  const [useRegisters, setUseRegisters] = useState<boolean>(false)

  const { control, watch, setValue, reset } = useForm<PhraseCreateEditModel>({
    defaultValues: {
      faHoldingValue: '',
      module: '',
      en: '',
      fa: useRegisters
        ? {
            informal: '',
            formal: ''
          }
        : []
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
  const faValue = watch('fa')
  const inputValue = watch('faHoldingValue')
  const faIsArray = Array.isArray(faValue) && inputValue !== undefined

  const handleSwitchRegisters = () => {
    setUseRegisters(!useRegisters)
    setValue('fa', [])
  }

  const handleAddToFarsiArray = () => {
    if (faIsArray) {
      setValue('fa', [...faValue, inputValue])
    }

    setValue('faHoldingValue', '')
  }

  const handleClose = () => {
    reset()
    setOpen(false)
    setEditMode(false)
  }

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  useEffect(() => {
    useRegisters
      ? setValue('fa', { formal: '', informal: '' })
      : setValue('fa', [])
  }, [useRegisters])

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
        <Controller
          name="en"
          control={control}
          render={({ field }) => {
            return editMode ? (
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
            ) : (
              <Form.Item label="Phrase In English">
                <Input
                  {...field}
                  placeholder="Enter Word Or Phrase In English..."
                />
              </Form.Item>
            )
          }}
        />

        <Form.Item label="Use Formal/Informal Registers" name="registers">
          <Switch checked={useRegisters} onChange={handleSwitchRegisters} />
        </Form.Item>

        {useRegisters && (
          <>
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
          </>
        )}

        {!useRegisters && (
          <>
            <Controller
              name="faHoldingValue"
              control={control}
              render={({ field }) => (
                <Form.Item label="Phrase In Farsi">
                  <Space.Compact className={styles.farsiInputContainer}>
                    <Input {...field} placeholder="Enter Phrase In Farsi..." />
                    <Button onClick={handleAddToFarsiArray}>Add</Button>
                  </Space.Compact>
                  {faIsArray && (
                    <List
                      size="small"
                      bordered
                      dataSource={faValue}
                      renderItem={(variation) => (
                        <List.Item>{variation}</List.Item>
                      )}
                    />
                  )}
                </Form.Item>
              )}
            />
          </>
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
