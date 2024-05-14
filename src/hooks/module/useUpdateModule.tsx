import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { type IconType } from 'antd/es/notification/interface'
import { type CourseModuleCreateEditModel } from 'schemas/ModuleCRUD'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const updateModule = async (module: CourseModuleCreateEditModel) => {
  const response = await axios.put(`${apiUrl}/api/module/update`, module)
  return response.data
}

export const useUpdateModule = (
  openNotification: (message: string, type: IconType) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(updateModule, {
    onSuccess: async () => {
      openNotification('Successfully Updated Module', 'success')
      await queryClient.invalidateQueries('modules')
    },
    onError: async () => {
      openNotification('Could Not Update Module', 'error')
      await queryClient.invalidateQueries('modules')
    }
  })
}
