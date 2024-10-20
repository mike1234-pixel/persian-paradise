import { Controller, useForm } from 'react-hook-form'
import styles from './Login.module.css'
import { type UserLoginRequestModel } from 'schemas/UserLogin'
import { Button, Form, Input } from 'antd'
import { useLoginUser } from 'hooks/user/useLoginUser'

export const Login = () => {
  const { mutate: loginUser } = useLoginUser()

  const { control, handleSubmit } = useForm<UserLoginRequestModel>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: UserLoginRequestModel) => {
    loginUser(data)
  }

  return (
    <div className={styles.root}>
      <h1>Login</h1>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
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
    </div>
  )
}
