export const EmpleadoDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Empleado</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Pacientes</h2>
          <p className="text-gray-600">Gestión de pacientes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Citas Hoy</h2>
          <p className="text-gray-600">Agenda del día</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Tareas Pendientes</h2>
          <p className="text-gray-600">Tus tareas por hacer</p>
        </div>
      </div>
    </div>
  )
}
