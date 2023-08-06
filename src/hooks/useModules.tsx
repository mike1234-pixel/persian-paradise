import { useQuery } from "react-query"
import { ModulesList } from "../types/Module"

export const useModules = () => {
  const apiUrl =
    process.env.REACT_APP_API_URL ||
    "https://persian-paradise-api-production.up.railway.app"

  const {
    data: modules,
    isLoading,
    error,
    refetch: refetchModules,
  } = useQuery<ModulesList, Error>("modules", () =>
    fetch(`${apiUrl}/api/modules`).then((response) => response.json())
  )

  return { modules, isLoading, error, refetchModules }
}
