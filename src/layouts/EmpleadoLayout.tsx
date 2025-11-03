import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const EmpleadoLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    void navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Panel de Empleado
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{user?.nombre}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <Link
              to="/empleado"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500"
            >
              Dashboard
            </Link>
            <Link
              to="/empleado/pacientes"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500"
            >
              Pacientes
            </Link>
            <Link
              to="/empleado/citas"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500"
            >
              Citas
            </Link>
            <Link
              to="/empleado/tareas"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500"
            >
              Tareas
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
