import { useRouter } from 'next/router'
import { useEffect, ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === null && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, user, router])

  return isAuthenticated ? children : null
}

export default ProtectedRoute
