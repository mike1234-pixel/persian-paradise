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
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
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
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
