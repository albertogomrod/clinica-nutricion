export const PacienteDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Paciente</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Mis Datos</h2>
          <p className="text-gray-600">Resumen de tus datos personales</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Plan Actual</h2>
          <p className="text-gray-600">Tu plan de nutrición</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Próximas Citas</h2>
          <p className="text-gray-600">Tus citas agendadas</p>
        </div>
      </div>
    </div>
  )
}
