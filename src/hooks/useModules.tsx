import { useQuery } from "react-query"
import { ModulesList } from "../types/Module"

export const useModules = () => {
  const {
    data: modules,
    isLoading,
    error,
    refetch: refetchModules,
  } = useQuery<ModulesList, Error>("modules", () =>
    fetch(
      `https://persian-paradise-api-production.up.railway.app/api/modules`
    ).then((response) => response.json())
  )

  return { modules, isLoading, error, refetchModules }
}
