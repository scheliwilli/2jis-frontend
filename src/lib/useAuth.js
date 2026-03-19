import { useEffect, useMemo, useState } from 'react'
import { getAuthState } from './auth'

export function useAuth() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const onAuth = () => setTick((t) => t + 1)
    window.addEventListener('trust:auth', onAuth)
    window.addEventListener('storage', onAuth)
    return () => {
      window.removeEventListener('trust:auth', onAuth)
      window.removeEventListener('storage', onAuth)
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getAuthState(), [tick])
}

