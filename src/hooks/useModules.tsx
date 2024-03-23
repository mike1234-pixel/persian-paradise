import { useQuery } from 'react-query'
import { type ModulesList } from 'persian-paradise-shared-types'

export const useModules = () => {
  const apiUrl =
    process.env.REACT_APP_API_URL ??
    'https://persian-paradise-api-production.up.railway.app'

  const {
    data: modules,
    isLoading,
    error,
    refetch: refetchModules
  } = useQuery<ModulesList, Error>(
    'modules',
    async () =>
      await fetch(`${apiUrl}/api/modules`).then(
        async (response) => await response.json()
      )
  )

  return { modules, isLoading, error, refetchModules }
}
