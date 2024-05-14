import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { type IconType } from 'antd/es/notification/interface'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const deleteModule = async (title: string) => {
  const response = await axios.delete(`${apiUrl}/api/module/delete`, {
    data: { title }
  })
  return response.data
}

export const useDeleteModule = (
  openNotification: (message: string, type: IconType) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(deleteModule, {
    onSuccess: async () => {
      openNotification('Successfully Deleted Module', 'success')
      await queryClient.invalidateQueries('modules')
    },
    onError: async () => {
      openNotification('Could Not Delete Module', 'error')
      await queryClient.invalidateQueries('modules')
    }
  })
}
