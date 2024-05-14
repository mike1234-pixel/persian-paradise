import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { type Phrase } from 'persian-paradise-shared-types'
import { type IconType } from 'antd/es/notification/interface'

const apiUrl =
  process.env.REACT_APP_API_URL ??
  'https://persian-paradise-api-production.up.railway.app'

const addPhrase = async ({
  title,
  phrase
}: {
  title: string
  phrase: Phrase
}) => {
  const response = await axios.post(`${apiUrl}/api/modules/addPhrase`, {
    title,
    phrase
  })
  return response.data
}

export const useAddPhrase = (
  openNotification: (message: string, type: IconType) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(addPhrase, {
    onSuccess: async () => {
      openNotification('Successfully Added Phrase', 'success')
      await queryClient.invalidateQueries('modules')
    },
    onError: async () => {
      openNotification('Could Not Add Phrase', 'error')
      await queryClient.invalidateQueries('modules')
    }
  })
}
