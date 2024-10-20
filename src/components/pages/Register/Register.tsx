import { Controller, useForm } from 'react-hook-form'
import styles from './Register.module.css'
import { type UserRegisterRequestModel } from 'schemas/UserRegister'
import { Button, Form, Input } from 'antd'
import { useRegisterUser } from 'hooks/user/useRegisterUser'
import { useNotifications } from 'hooks/ui/useNotifications'

export const Register = () => {
  const { openNotification, contextHolder } = useNotifications()
  const { mutate: registerUser } = useRegisterUser(openNotification)

  const { control, handleSubmit } = useForm<UserRegisterRequestModel>({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: UserRegisterRequestModel) => {
    registerUser(data)
  }

  return (
    <div className={styles.root}>
      <h1>Register</h1>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Form.Item label="Username">
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item label="Email">
              <Input {...field} type="email" />
            </Form.Item>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Form.Item label="Password">
              <Input {...field} type="password" />
            </Form.Item>
          )}
        />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={(e) => {
              handleSubmit(onSubmit)(e).catch((error) => {
                console.error('Error submitting the form:', error)
              })
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  )
}
