// ============================================
// ENUMS Y TIPOS BASE
// ============================================

export type UserRole = 'cliente' | 'empleado' | 'admin'

export type Gender = 'masculino' | 'femenino' | 'otro'

export type ActivityLevel =
  | 'sedentario' // Poco o ningún ejercicio
  | 'ligero' // Ejercicio ligero 1-3 días/semana
  | 'moderado' // Ejercicio moderado 3-5 días/semana
  | 'activo' // Ejercicio intenso 6-7 días/semana
  | 'muy_activo' // Ejercicio muy intenso, trabajo físico

export type UserStatus = 'activo' | 'inactivo' | 'suspendido'

export type AthleteMode = 'standard' | 'athlete'

// ============================================
// DATOS DE MEDICIÓN TANITA
// ============================================

export interface TanitaMeasurement {
  id: string
  userId: string
  fecha: Date

  // Datos básicos
  peso: number // kg
  altura: number // cm
  imc: number // Índice de Masa Corporal

  // Composición corporal
  porcentajeGrasa: number // %
  masaGrasa: number // kg
  masaLibreGrasa: number // kg (FFM)
  masaMuscular: number // kg
  masaMuscularEsqueletica: number // kg
  masaOsea: number // kg

  // Agua corporal
  aguaCorporalTotal: number // kg (TBW)
  aguaIntracelular: number // kg (ICW)
  aguaExtracelular: number // kg (ECW)
  porcentajeAguaCorporal: number // %

  // Grasa visceral
  nivelGrasaVisceral: number // nivel (1-59)

  // Metabolismo
  tasaMetabolicaBasal: number // kcal
  edadMetabolica: number // años

  // Índices y marcadores
  indiceMasaLibreGrasa: number // FFMI
  indiceSarcopenia: number // Sarcopenia Index
  anguloFase: number // Phase Angle (grados)

  // Análisis segmental de músculo (brazos y piernas)
  musculoBrazoDerecho: number // kg
  musculoBrazoIzquierdo: number // kg
  musculoPiernaDerecha: number // kg
  musculoPiernaIzquierda: number // kg
  musculoTronco: number // kg

  // Análisis segmental de grasa
  grasaBrazoDerecho: number // %
  grasaBrazoIzquierdo: number // %
  grasaPiernaDerecha: number // %
  grasaPiernaIzquierda: number // %
  grasaTronco: number // %

  // Evaluación de piernas
  evaluacionMusculoPiernas: 'bajo' | 'normal' | 'alto'

  // Tipo físico (físico rating)
  tipoFisico: number // 1-9 según matriz grasa/músculo

  // Metadatos
  modoAtleta: AthleteMode
  notas?: string
  realizadaPor?: string // ID del empleado que realizó la medición
}

// ============================================
// DATOS MÉDICOS Y DE SALUD
// ============================================

export interface MedicalData {
  // Alergias y restricciones
  alergias: string[]
  intolerancias: string[]
  restriccionesDieteticas: string[]

  // Condiciones médicas
  condicionesMedicas: string[]
  medicamentosActuales: string[]
  cirugiasPrevias?: string[]

  // Antecedentes familiares
  antecedentesFamiliares?: string[]

  // Hábitos
  fuma: boolean
  consumeAlcohol: boolean
  frecuenciaAlcohol?: 'nunca' | 'ocasional' | 'semanal' | 'diario'

  // Sueño y estrés
  horasSuenoDiarias?: number
  nivelEstres?: 'bajo' | 'medio' | 'alto'

  // Observaciones
  observaciones?: string

  // Metadatos
  ultimaActualizacion: Date
  actualizadoPor?: string
}

// ============================================
// OBJETIVOS NUTRICIONALES
// ============================================

export interface NutritionalGoals {
  objetivo:
    | 'perdida_peso'
    | 'ganancia_peso'
    | 'mantenimiento'
    | 'ganancia_muscular'
    | 'mejora_salud'
  pesoObjetivo?: number // kg
  fechaObjetivo?: Date

  // Métricas objetivo
  porcentajeGrasaObjetivo?: number
  masaMuscularObjetivo?: number

  // Detalles
  motivacion?: string
  expectativas?: string

  // Progreso
  fechaInicio: Date
  estado: 'en_progreso' | 'completado' | 'pausado' | 'cancelado'
}

// ============================================
// DATOS DE CONTACTO Y EMERGENCIA
// ============================================

export interface ContactInfo {
  telefono: string
  telefonoAlternativo?: string
  email: string
  direccion: {
    calle: string
    numero: string
    piso?: string
    codigoPostal: string
    ciudad: string
    provincia: string
    pais: string
  }

  // Contacto de emergencia
  contactoEmergencia?: {
    nombre: string
    relacion: string
    telefono: string
  }
}

// ============================================
// DATOS BÁSICOS DEL USUARIO
// ============================================

export interface UserBase {
  id: string
  rol: UserRole
  estado: UserStatus

  // Datos personales
  nombre: string
  apellidos: string
  nombreCompleto: string // Calculado: nombre + apellidos
  fechaNacimiento: Date
  edad: number // Calculado
  genero: Gender
  avatar?: string // URL o base64

  // Datos de contacto
  contacto: ContactInfo

  // Autenticación
  email: string
  emailVerificado: boolean
  ultimoAcceso?: Date

  // Metadatos
  fechaRegistro: Date
  fechaActualizacion: Date
  creadoPor?: string // ID del empleado que creó el registro
}

// ============================================
// CLIENTE (hereda de UserBase)
// ============================================

export interface Cliente extends UserBase {
  rol: 'cliente'

  // Datos físicos actuales
  altura: number // cm
  pesoActual: number // kg
  imcActual: number // Calculado

  // Nivel de actividad
  nivelActividad: ActivityLevel
  actividadesDeportivas?: string[]

  // Datos médicos y de salud
  datosMedicos: MedicalData

  // Objetivos
  objetivos: NutritionalGoals

  // Relación con empleado
  nutricionistaAsignado?: string // ID del empleado

  // Historial de mediciones TANITA
  ultimaMedicion?: TanitaMeasurement

  // Plan actual
  planActualId?: string

  // Configuración de análisis
  preferenciasModoAtleta: AthleteMode

  // Consentimientos
  consentimientoTratamientoDatos: boolean
  consentimientoAnalisisTanita: boolean
  fechaConsentimiento: Date

  // Notas del nutricionista
  notasNutricionista?: string
}

// ============================================
// EMPLEADO (hereda de UserBase)
// ============================================

export type EmpleadoRole =
  | 'nutricionista'
  | 'recepcionista'
  | 'administrador'
  | 'supervisor'

export interface Empleado extends UserBase {
  rol: 'empleado'

  // Información profesional
  rolEmpleado: EmpleadoRole
  numeroColeguiado?: string // Número de colegiado profesional
  especialidades: string[]

  // Horarios y disponibilidad
  horarioTrabajo?: {
    lunes?: { inicio: string; fin: string }
    martes?: { inicio: string; fin: string }
    miercoles?: { inicio: string; fin: string }
    jueves?: { inicio: string; fin: string }
    viernes?: { inicio: string; fin: string }
    sabado?: { inicio: string; fin: string }
    domingo?: { inicio: string; fin: string }
  }

  // Clientes asignados
  clientesAsignados: string[] // Array de IDs de clientes

  // Permisos
  permisos: EmpleadoPermisos

  // Datos laborales
  fechaContratacion: Date
  departamento?: string
  salario?: number // Opcional, sensible

  // Bio profesional
  biografia?: string
  educacion?: string[]
  certificaciones?: string[]
  añosExperiencia?: number
}

// ============================================
// PERMISOS DE EMPLEADO
// ============================================

export interface EmpleadoPermisos {
  // Gestión de clientes
  verClientes: boolean
  crearClientes: boolean
  editarClientes: boolean
  eliminarClientes: boolean

  // Gestión de citas
  verCitas: boolean
  crearCitas: boolean
  editarCitas: boolean
  cancelarCitas: boolean

  // Gestión de planes nutricionales
  verPlanes: boolean
  crearPlanes: boolean
  editarPlanes: boolean
  eliminarPlanes: boolean

  // Análisis TANITA
  realizarAnalisisTanita: boolean
  verHistorialAnalisis: boolean

  // Gestión de empleados (solo admin/supervisor)
  verEmpleados: boolean
  crearEmpleados: boolean
  editarEmpleados: boolean
  eliminarEmpleados: boolean

  // Reportes y estadísticas
  verReportes: boolean
  exportarDatos: boolean

  // Facturación (opcional)
  verFacturacion: boolean
  gestionarFacturacion: boolean
}

// ============================================
// TIPO UNION PARA USUARIO
// ============================================

export type User = Cliente | Empleado

// ============================================
// HELPERS Y TYPE GUARDS
// ============================================

export function isCliente(user: User): user is Cliente {
  return user.rol === 'cliente'
}

export function isEmpleado(user: User): user is Empleado {
  return user.rol === 'empleado'
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

// Para crear un nuevo cliente
export interface CreateClienteDTO {
  nombre: string
  apellidos: string
  fechaNacimiento: Date
  genero: Gender
  email: string
  telefono: string
  direccion: ContactInfo['direccion']
  altura: number
  pesoActual: number
  nivelActividad: ActivityLevel
  objetivo: NutritionalGoals['objetivo']
  alergias?: string[]
  intolerancias?: string[]
  restriccionesDieteticas?: string[]
  condicionesMedicas?: string[]
  nutricionistaAsignado?: string
}

// Para crear un nuevo empleado
export interface CreateEmpleadoDTO {
  nombre: string
  apellidos: string
  fechaNacimiento: Date
  genero: Gender
  email: string
  telefono: string
  rolEmpleado: EmpleadoRole
  numeroColeguiado?: string
  especialidades: string[]
  fechaContratacion: Date
}

// Para actualizar perfil de cliente
export interface UpdateClienteDTO {
  nombre?: string
  apellidos?: string
  telefono?: string
  direccion?: Partial<ContactInfo['direccion']>
  altura?: number
  pesoActual?: number
  nivelActividad?: ActivityLevel
  actividadesDeportivas?: string[]
  avatar?: string
}

// Para actualizar datos médicos
export interface UpdateMedicalDataDTO {
  alergias?: string[]
  intolerancias?: string[]
  restriccionesDieteticas?: string[]
  condicionesMedicas?: string[]
  medicamentosActuales?: string[]
  fuma?: boolean
  consumeAlcohol?: boolean
  horasSuenoDiarias?: number
  nivelEstres?: 'bajo' | 'medio' | 'alto'
  observaciones?: string
}
