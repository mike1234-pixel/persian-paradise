import { useEffect, useState } from 'react'

export const useScreenResize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 767
      setIsSmallScreen(isSmall)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isSmallScreen, setIsSmallScreen }
}
