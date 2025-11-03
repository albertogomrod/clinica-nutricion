import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { AuthContextType, User } from '../types/auth.types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser) as User
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true)

      // TODO: Reemplazar con llamada real a la API
      // const response = await authApi.login(email, password)

      // Simulación de login con validación
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos')
      }

      // Simulación de delay de red
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: '1',
        nombre: 'Usuario Demo',
        email: email,
        rol: email.includes('empleado') ? 'empleado' : 'paciente',
      }

      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('token', 'mock-jwt-token')
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
