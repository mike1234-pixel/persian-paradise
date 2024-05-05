import { Button, Form, Input, Select, Switch } from 'antd'
import styles from 'components/pages/CMS/CMS.module.css'
import { useModules } from 'hooks/useModules'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const CMS = () => {
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

  return (
    <div className={styles.root}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
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
                      style={{ position: 'relative' }}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input phrase in Farsi...'
                        }
                      ]}
                    >
                      <Input placeholder="Phrase In Farsi..." />
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          style={{
                            position: 'absolute',
                            top: 9,
                            right: -5,
                            background: '#fff'
                          }}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      )}
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Farsi Phrase
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        )}
      </Form>
    </div>
  )
}
