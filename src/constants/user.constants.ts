import type { EmpleadoPermisos, EmpleadoRole } from '../types/user.types'

export const USER_ROLES = {
  CLIENTE: 'cliente',
  EMPLEADO: 'empleado',
  ADMIN: 'admin',
} as const

export const ACTIVITY_LEVELS = {
  SEDENTARIO: 'sedentario',
  LIGERO: 'ligero',
  MODERADO: 'moderado',
  ACTIVO: 'activo',
  MUY_ACTIVO: 'muy_activo',
} as const

export const NUTRITIONAL_GOALS = {
  PERDIDA_PESO: 'perdida_peso',
  GANANCIA_PESO: 'ganancia_peso',
  MANTENIMIENTO: 'mantenimiento',
  GANANCIA_MUSCULAR: 'ganancia_muscular',
  MEJORA_SALUD: 'mejora_salud',
} as const

export const EMPLEADO_ROLES = {
  NUTRICIONISTA: 'nutricionista',
  RECEPCIONISTA: 'recepcionista',
  ADMINISTRADOR: 'administrador',
  SUPERVISOR: 'supervisor',
} as const

// Rangos de referencia según TANITA
export const TANITA_REFERENCE_RANGES = {
  BODY_FAT: {
    MALE: {
      BAJO: { min: 0, max: 10 },
      NORMAL: { min: 10, max: 20 },
      ALTO: { min: 20, max: 25 },
      MUY_ALTO: { min: 25, max: 100 },
    },
    FEMALE: {
      BAJO: { min: 0, max: 20 },
      NORMAL: { min: 20, max: 30 },
      ALTO: { min: 30, max: 35 },
      MUY_ALTO: { min: 35, max: 100 },
    },
  },
  VISCERAL_FAT: {
    NORMAL: { min: 1, max: 12 },
    ALTO: { min: 13, max: 59 },
  },
  PHASE_ANGLE: {
    MALE: {
      BAJO: { min: 0, max: 5.5 },
      NORMAL: { min: 5.5, max: 7.5 },
      ALTO: { min: 7.5, max: 10 },
    },
    FEMALE: {
      BAJO: { min: 0, max: 5.0 },
      NORMAL: { min: 5.0, max: 7.0 },
      ALTO: { min: 7.0, max: 10 },
    },
  },
} as const

// Permisos por defecto según rol de empleado
export const DEFAULT_PERMISSIONS: Record<EmpleadoRole, EmpleadoPermisos> = {
  nutricionista: {
    verClientes: true,
    crearClientes: true,
    editarClientes: true,
    eliminarClientes: false,
    verCitas: true,
    crearCitas: true,
    editarCitas: true,
    cancelarCitas: true,
    verPlanes: true,
    crearPlanes: true,
    editarPlanes: true,
    eliminarPlanes: false,
    realizarAnalisisTanita: true,
    verHistorialAnalisis: true,
    verEmpleados: false,
    crearEmpleados: false,
    editarEmpleados: false,
    eliminarEmpleados: false,
    verReportes: true,
    exportarDatos: true,
    verFacturacion: false,
    gestionarFacturacion: false,
  },
  recepcionista: {
    verClientes: true,
    crearClientes: true,
    editarClientes: true,
    eliminarClientes: false,
    verCitas: true,
    crearCitas: true,
    editarCitas: true,
    cancelarCitas: true,
    verPlanes: false,
    crearPlanes: false,
    editarPlanes: false,
    eliminarPlanes: false,
    realizarAnalisisTanita: false,
    verHistorialAnalisis: false,
    verEmpleados: false,
    crearEmpleados: false,
    editarEmpleados: false,
    eliminarEmpleados: false,
    verReportes: false,
    exportarDatos: false,
    verFacturacion: true,
    gestionarFacturacion: true,
  },
  administrador: {
    verClientes: true,
    crearClientes: true,
    editarClientes: true,
    eliminarClientes: true,
    verCitas: true,
    crearCitas: true,
    editarCitas: true,
    cancelarCitas: true,
    verPlanes: true,
    crearPlanes: true,
    editarPlanes: true,
    eliminarPlanes: true,
    realizarAnalisisTanita: true,
    verHistorialAnalisis: true,
    verEmpleados: true,
    crearEmpleados: true,
    editarEmpleados: true,
    eliminarEmpleados: true,
    verReportes: true,
    exportarDatos: true,
    verFacturacion: true,
    gestionarFacturacion: true,
  },
  supervisor: {
    verClientes: true,
    crearClientes: true,
    editarClientes: true,
    eliminarClientes: false,
    verCitas: true,
    crearCitas: true,
    editarCitas: true,
    cancelarCitas: true,
    verPlanes: true,
    crearPlanes: true,
    editarPlanes: true,
    eliminarPlanes: false,
    realizarAnalisisTanita: true,
    verHistorialAnalisis: true,
    verEmpleados: true,
    crearEmpleados: false,
    editarEmpleados: true,
    eliminarEmpleados: false,
    verReportes: true,
    exportarDatos: true,
    verFacturacion: true,
    gestionarFacturacion: false,
  },
}
