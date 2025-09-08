import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  email: string
  pseudo: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token')
    if (storedToken) {
      try {
        const decodedUser: User = jwtDecode(storedToken)
        setUser(decodedUser)
        setToken(storedToken)
      } catch (error) {
        console.error('Failed to decode token:', error)
        localStorage.removeItem('access_token')
      }
    }
  }, [])

  const login = (newToken: string) => {
    try {
      const decodedUser: User = jwtDecode(newToken)
      localStorage.setItem('access_token', newToken)
      setUser(decodedUser)
      setToken(newToken)
    } catch (error) {
      console.error('Failed to decode token on login:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
