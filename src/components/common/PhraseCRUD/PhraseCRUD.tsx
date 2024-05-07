import { Select, Input, Switch, Button, Form, Drawer } from 'antd'
import { useModules } from 'hooks/useModules'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import styles from 'components/common/PhraseCRUD/PhraseCRUD.module.css'

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

  const moduleOptions = modules
    ? modules?.map((module) => {
        return {
          value: module.title,
          label: module.title
        }
      })
    : []

  const [useRegisters, setUseRegisters] = useState<boolean>(false)

  const handleSwitchRegisters = () => {
    setUseRegisters(!useRegisters)
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
    >
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Module" name="module">
          <Select
            options={moduleOptions}
            placeholder="Select Module"
            loading={modulesIsLoading}
          />
        </Form.Item>
        <Form.Item label="Phrase In English" name="phraseEnglish">
          <Input placeholder="Enter Word Or Phrase In English..." />
        </Form.Item>
        <Form.Item label="Use Formal/Informal Registers" name="registers">
          <Switch checked={useRegisters} onChange={handleSwitchRegisters} />
        </Form.Item>
        {useRegisters && (
          <>
            <Form.Item
              label="Phrase In Farsi (Informal)"
              name="phraseFarsiInformal"
            >
              <Input placeholder="Enter Informal Word Or Phrase In Farsi..." />
            </Form.Item>
            <Form.Item
              label="Phrase In Farsi (Formal)"
              name="phraseFarsiFormal"
            >
              <Input placeholder="Enter Formal Word Or Phrase In Farsi..." />
            </Form.Item>
          </>
        )}
        {!useRegisters && (
          <Form.List name="names">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Form.Item
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
                    </Form.Item>
                  </div>
                ))}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Variation
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
        {editMode && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="default" danger htmlType="submit">
              Delete
            </Button>
          </Form.Item>
        )}
      </Form>
    </Drawer>
  )
}
