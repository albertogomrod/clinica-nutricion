export type UserRole = 'paciente' | 'empleado'

export interface User {
  id: string
  nombre: string
  email: string
  rol: UserRole
  avatar?: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
