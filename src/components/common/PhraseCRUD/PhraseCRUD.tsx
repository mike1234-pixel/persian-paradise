import { Select, Input, Switch, Button, Form, Drawer, Space, List } from 'antd'
import { useModules } from 'hooks/useModules'
import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type PhraseCreateEditModel } from 'schemas/PhraseCRUD'
import styles from 'components/common/PhraseCRUD/PhraseCRUD.module.css'
import { type Registers } from 'persian-paradise-shared-types'

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

  // const formValues = watch()
  const faValue = watch('fa')
  const enValue = watch('en')
  const inputValue = watch('faHoldingValue')
  const faIsArray = Array.isArray(faValue) && inputValue !== undefined
  const phraseNotSelectedInEditMode = editMode && !enValue

  const handleSwitchRegisters = () => {
    setUseRegisters(!useRegisters)
  }

  const handleAddToFarsiArray = () => {
    if (faIsArray) {
      setValue('fa', [...faValue, inputValue])
    }

    setValue('faHoldingValue', '')
  }

  const handleRemoveFromFarsiArray = (variation: string) => {
    if (faIsArray) {
      const updatedItems = faValue.filter((item) => item !== variation)
      setValue('fa', updatedItems)
    }
  }

  const handleClose = () => {
    reset()
    setOpen(false)
    setEditMode(false)
  }

  // useEffect(() => {
  //   console.log(formValues)
  // }, [formValues])

  useEffect(() => {
    // PREPOPULATE FORM IN EDIT MODE
    if (editMode) {
      // find existing phrase data for selected phrase option
      const selectedPhrase = selectedModule
        ? selectedModule?.phrases.filter((phrase) => phrase.en === enValue)[0]
        : null

      const selectedPhraseIsArray = Array.isArray(selectedPhrase?.fa)

      // if existing farsi data in phrase is array, toggle form displayed to array form, otherwise use registers form
      selectedPhraseIsArray ? setUseRegisters(false) : setUseRegisters(true)

      if (selectedPhrase) {
        if (useRegisters) {
          // prepopulate farsi registers form if phrase already uses registers
          setValue('fa.formal', (selectedPhrase?.fa as Registers).formal)
          setValue('fa.informal', (selectedPhrase?.fa as Registers).informal)
        } else {
          // prepopulate farsi array form if phrase already uses array
          setValue('fa', selectedPhrase?.fa)
        }
        setValue('hint', selectedPhrase?.hint)
        setValue('emoji', selectedPhrase?.emoji)
      }
    }
  }, [enValue, editMode, useRegisters])

  useEffect(() => {
    if (!editMode) {
      // CLEAR FIELDS AND RESET FORM IN ADD MODE, when registers is toggled
      useRegisters
        ? setValue('fa', { formal: '', informal: '' })
        : setValue('fa', [])
    }
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={phraseNotSelectedInEditMode}
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
                disabled={phraseNotSelectedInEditMode}
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
          <Switch
            disabled={editMode}
            checked={useRegisters}
            onChange={handleSwitchRegisters}
          />
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
                      renderItem={(variation, i) => (
                        <List.Item
                          actions={[
                            <Button
                              key={i}
                              size="small"
                              onClick={() => {
                                handleRemoveFromFarsiArray(String(variation))
                              }}
                              danger
                            >
                              delete
                            </Button>
                          ]}
                        >
                          {variation}
                        </List.Item>
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
