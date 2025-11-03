import { Link } from 'react-router-dom'

export const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">403</h1>
        <p className="text-xl text-gray-600 mt-4">
          No tienes permisos para acceder
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Volver al login
        </Link>
      </div>
    </div>
  )
}
