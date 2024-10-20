import axios from 'axios'
import { useMutation } from 'react-query'
import { type UserLoginRequestModel } from 'schemas/UserLogin'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const loginUser = async ({ email, password }: UserLoginRequestModel) => {
  const response = await axios.post(`${apiUrl}/api/user/login`, {
    email,
    password
  })

  return response.data
}

// TODO: handle jwt token in response (cookies) and use in subsequent requests

export const useLoginUser = () => {
  return useMutation(loginUser)
}
