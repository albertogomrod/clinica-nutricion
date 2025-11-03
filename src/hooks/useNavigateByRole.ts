import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const useNavigateByRole = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const navigateToHome = () => {
    if (user?.rol === 'paciente') {
      void navigate('/paciente')
    } else if (user?.rol === 'empleado') {
      void navigate('/empleado')
    } else {
      void navigate('/login')
    }
  }

  return { navigateToHome }
}
