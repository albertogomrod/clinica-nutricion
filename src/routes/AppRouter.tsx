import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { EmpleadoLayout } from '../layouts/EmpleadoLayout'
import { PacienteLayout } from '../layouts/PacienteLayout'
import { ProtectedRoute } from './ProtectedRoute'

// Auth
import { LoginPage } from '../pages/auth/LoginPage'

// paciente
import { PacienteDashboard } from '../pages/paciente/PacienteDashboard'

// Empleado
import { EmpleadoDashboard } from '../pages/empleado/EmpleadoDashboard'

// Error pages
import { NotFound } from '../pages/NotFound'
import { Unauthorized } from '../pages/Unauthorized'

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rutas protegidas - paciente */}
      <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
        <Route element={<PacienteLayout />}>
          <Route path="/paciente" element={<PacienteDashboard />} />
          {/* <Route path="/paciente/perfil" element={<MiPerfil />} />
          <Route path="/paciente/plan" element={<PlanNutricion />} />
          <Route path="/paciente/evolucion" element={<Evolucion />} />
          <Route path="/paciente/citas" element={<MisCitas />} /> */}
        </Route>
      </Route>

      {/* Rutas protegidas - Empleado */}
      <Route element={<ProtectedRoute allowedRoles={['empleado']} />}>
        <Route element={<EmpleadoLayout />}>
          <Route path="/empleado" element={<EmpleadoDashboard />} />
          {/* <Route path="/empleado/pacientes" element={<GestionPacientes />} /> */}
          {/* <Route path="/empleado/pacientes/:id" element={<FichaPaciente />} /> */}
          {/* <Route path="/empleado/citas" element={<GestionCitas />} /> */}
          {/* <Route path="/empleado/tareas" element={<Tareas />} /> */}
        </Route>
      </Route>

      {/* Rutas de error */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
