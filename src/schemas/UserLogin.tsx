import { object, string } from 'zod'

export const UserLoginRequestSchema = object({
  email: string(),
  password: string()
})

export type UserLoginRequestModel = ReturnType<
  (typeof UserLoginRequestSchema)['parse']
>
