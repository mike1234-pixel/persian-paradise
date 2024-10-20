import { object, string } from 'zod'

export const UserRegisterRequestSchema = object({
  username: string(),
  email: string(),
  password: string()
})

export type UserRegisterRequestModel = ReturnType<
  (typeof UserRegisterRequestSchema)['parse']
>
