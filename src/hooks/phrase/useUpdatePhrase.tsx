import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { type IconType } from 'antd/es/notification/interface'
import { type Phrase } from 'persian-paradise-shared-types'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const updatePhrase = async ({
  moduleName,
  newPhrase
}: {
  moduleName: string
  newPhrase: Phrase
}) => {
  const response = await axios.put(`${apiUrl}/api/module/phrase/update`, {
    moduleName,
    newPhrase
  })
  return response.data
}

export const useUpdatePhrase = (
  openNotification: (message: string, type: IconType) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(updatePhrase, {
    onSuccess: async () => {
      openNotification('Successfully Updated Phrase', 'success')
      await queryClient.invalidateQueries('modules')
    },
    onError: async () => {
      openNotification('Could Not Update Phrase', 'error')
      await queryClient.invalidateQueries('modules')
    }
  })
}
