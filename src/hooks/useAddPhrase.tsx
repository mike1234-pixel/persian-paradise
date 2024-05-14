import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { type Phrase } from 'persian-paradise-shared-types'

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

export const useAddPhrase = () => {
  const queryClient = useQueryClient()

  return useMutation(addPhrase, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('modules')
    }
  })
}
