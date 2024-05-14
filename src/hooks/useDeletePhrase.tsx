import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { type IconType } from 'antd/es/notification/interface'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const deletePhrase = async ({
  moduleName,
  phraseName
}: {
  moduleName: string
  phraseName: string
}) => {
  const response = await axios.delete(`${apiUrl}/api/modules/deletePhrase`, {
    data: { moduleName, phraseName }
  })
  return response.data
}

export const useDeletePhrase = (
  openNotification: (message: string, type: IconType) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(deletePhrase, {
    onSuccess: async () => {
      openNotification('Successfully Deleted Phrase', 'success')
      await queryClient.invalidateQueries('modules')
    },
    onError: async () => {
      openNotification('Could Not Delete Phrase', 'error')
      await queryClient.invalidateQueries('modules')
    }
  })
}
