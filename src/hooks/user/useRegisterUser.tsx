import { type IconType } from 'antd/es/notification/interface'
import axios from 'axios'
import { useMutation } from 'react-query'
import { type UserRegisterRequestModel } from 'schemas/UserRegister'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const registerUser = async ({
  username,
  email,
  password
}: UserRegisterRequestModel) => {
  const response = await axios.post(`${apiUrl}/api/user/register`, {
    username,
    email,
    password
  })
  return response.data
}

export const useRegisterUser = (
  openNotification: (message: string, type: IconType) => void
) => {
  return useMutation(registerUser, {
    onSuccess: async () => {
      openNotification('Successfully Registered. Please Log In', 'success')
    },
    onError: async () => {
      openNotification('Could Not Register User', 'error')
    }
  })
}
