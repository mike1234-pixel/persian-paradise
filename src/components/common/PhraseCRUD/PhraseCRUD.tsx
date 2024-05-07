import { Select, Input, Switch, Button, Form as AntForm, Drawer } from 'antd'
import { useModules } from 'hooks/useModules'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import styles from 'components/common/PhraseCRUD/PhraseCRUD.module.css'
import { PhraseSchema, type PhraseModel } from 'schemas/PhraseCRUD'
import { Formik, Form, Field, type FieldProps } from 'formik'

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

  const moduleOptions = modules
    ? modules?.map((module) => {
        return {
          value: module.title,
          label: module.title
        }
      })
    : []

  const initialValues: PhraseModel = {
    en: '',
    fa: [''],
    emoji: '',
    hint: ''
  }

  const handleSwitchRegisters = () => {
    setUseRegisters(!useRegisters)
  }

  const handleClose = () => {
    setOpen(false)
    setEditMode(false)
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PhraseSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Drawer
          title={editMode ? 'Edit Phrase' : 'Add Phrase'}
          onClose={handleClose}
          open={open}
          width="50%"
          destroyOnClose
          footer={
            <div className={styles.footerContent}>
              <AntForm.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </AntForm.Item>
              {editMode && (
                <AntForm.Item>
                  <Button type="default" danger htmlType="submit">
                    Delete
                  </Button>
                </AntForm.Item>
              )}
            </div>
          }
        >
          <AntForm labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <AntForm.Item label="Module" name="module">
              <Select
                options={moduleOptions}
                placeholder="Select Module"
                loading={modulesIsLoading}
              />
            </AntForm.Item>
            {/* integrate formik with antd form */}
            <Field name="en">
              {({ field, form }: FieldProps) => (
                <AntForm.Item label="Phrase In English">
                  <Input
                    {...field}
                    placeholder="Enter Word Or Phrase In English..."
                    onChange={(e) => {
                      form.handleChange(e)
                      console.log('en field changed:', e.target.value)
                    }}
                  />
                </AntForm.Item>
              )}
            </Field>

            <AntForm.Item
              label="Use Formal/Informal Registers"
              name="registers"
            >
              <Switch checked={useRegisters} onChange={handleSwitchRegisters} />
            </AntForm.Item>
            {useRegisters && (
              <>
                <AntForm.Item
                  label="Phrase In Farsi (Informal)"
                  name="phraseFarsiInformal"
                >
                  <Input placeholder="Enter Informal Word Or Phrase In Farsi..." />
                </AntForm.Item>
                <AntForm.Item
                  label="Phrase In Farsi (Formal)"
                  name="phraseFarsiFormal"
                >
                  <Input placeholder="Enter Formal Word Or Phrase In Farsi..." />
                </AntForm.Item>
              </>
            )}
            {!useRegisters && (
              <AntForm.List name="names">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key}>
                        <AntForm.Item
                          {...field}
                          label="Phrase In Farsi"
                          validateTrigger={['onChange', 'onBlur']}
                          className={styles.farsiVariation}
                        >
                          <Input placeholder="Phrase In Farsi..." />
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className={styles.farsiVariationRemove}
                              onClick={() => {
                                remove(field.name)
                              }}
                            />
                          )}
                        </AntForm.Item>
                      </div>
                    ))}
                    <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add()
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add Variation
                      </Button>
                      <AntForm.ErrorList errors={errors} />
                    </AntForm.Item>
                  </>
                )}
              </AntForm.List>
            )}
            <AntForm.Item label="Emoji" name="emoji">
              <Input placeholder="Enter An Emoji..." />
            </AntForm.Item>
            <AntForm.Item label="Hint" name="hint">
              <Input placeholder="Enter A Hint..." />
            </AntForm.Item>
          </AntForm>
        </Drawer>
      </Form>
    </Formik>
  )
}
