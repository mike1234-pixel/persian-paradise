import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { type CourseModule } from 'persian-paradise-shared-types'
import { type IconType } from 'antd/es/notification/interface'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const addModule = async (module: CourseModule) => {
  const response = await axios.post(`${apiUrl}/api/module/add`, module)
  return response.data
}

export const useAddModule = (
  openNotification: (message: string, type: IconType) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(addModule, {
    onSuccess: async () => {
      openNotification('Successfully Added Module', 'success')
      await queryClient.invalidateQueries('modules')
    },
    onError: async () => {
      openNotification('Could Not Add Module', 'error')
      await queryClient.invalidateQueries('modules')
    }
  })
}
