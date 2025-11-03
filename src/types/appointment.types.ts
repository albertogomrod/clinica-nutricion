// ============================================
// CITAS
// ============================================

export type AppointmentType =
  | 'primera_consulta'
  | 'seguimiento'
  | 'revision_plan'
  | 'analisis_tanita'
  | 'consulta_express'
  | 'consulta_online'
  | 'otro'

export type AppointmentStatus =
  | 'pendiente'
  | 'confirmada'
  | 'en_curso'
  | 'completada'
  | 'cancelada'
  | 'no_asistio'
  | 'reagendada'

export type PaymentStatus = 'pendiente' | 'pagado' | 'parcial' | 'reembolsado'

export type AppointmentDuration = 30 | 45 | 60 | 90 | 120 // minutos

// ============================================
// CITA
// ============================================

export interface Appointment {
  id: string

  // Relaciones
  clienteId: string
  empleadoId: string // Nutricionista asignado

  // Información básica
  tipo: AppointmentType
  titulo: string
  descripcion?: string

  // Fecha y hora
  fechaHora: Date
  duracion: AppointmentDuration // minutos
  fechaHoraFin: Date // Calculado: fechaHora + duracion

  // Estado
  estado: AppointmentStatus

  // Ubicación
  modalidad: 'presencial' | 'online'
  sala?: string // Si es presencial
  urlVideoconferencia?: string // Si es online

  // Recordatorios
  recordatorioEnviado: boolean
  fechaRecordatorio?: Date

  // Notas pre-consulta
  motivoConsulta?: string
  notasCliente?: string // Notas que el cliente puede añadir

  // Notas post-consulta
  notasConsulta?: string // Notas del nutricionista durante/después
  resumenConsulta?: string

  // Mediciones realizadas
  medicionTanitaId?: string
  pesoRegistrado?: number

  // Seguimiento
  proximaCitaSugerida?: Date
  requiereSeguimiento: boolean

  // Archivos adjuntos
  documentosAdjuntos?: Document[]

  // Facturación
  precio?: number
  estadoPago: PaymentStatus
  metodoPago?: string
  facturaId?: string

  // Cancelación/Reagendamiento
  motivoCancelacion?: string
  fechaCancelacion?: Date
  canceladoPor?: string // ID del usuario que canceló
  citaReagendadaId?: string // ID de la nueva cita si fue reagendada

  // Metadatos
  fechaCreacion: Date
  ultimaModificacion: Date
  creadoPor: string
  modificadoPor?: string
}

// ============================================
// DOCUMENTO ADJUNTO
// ============================================

export interface Document {
  id: string
  nombre: string
  tipo: DocumentType
  url: string
  tamaño: number // bytes
  mimeType: string

  // Metadatos
  fechaSubida: Date
  subidoPor: string
  descripcion?: string
}

export type DocumentType =
  | 'analisis_sangre'
  | 'analisis_orina'
  | 'informe_medico'
  | 'receta_medica'
  | 'consentimiento'
  | 'otro'

// ============================================
// DISPONIBILIDAD DEL EMPLEADO
// ============================================

export interface EmployeeAvailability {
  empleadoId: string
  fecha: Date

  // Bloques disponibles
  bloquesDisponibles: TimeSlot[]

  // Bloques ocupados (citas existentes)
  bloquesOcupados: TimeSlot[]

  // Bloques bloqueados (descanso, almuerzo, etc.)
  bloquesBloqueados: BlockedSlot[]
}

export interface TimeSlot {
  inicio: string // "09:00"
  fin: string // "10:00"
  disponible: boolean
  citaId?: string // Si está ocupado
}

export interface BlockedSlot extends TimeSlot {
  motivo: string // "Almuerzo", "Reunión", etc.
}

// ============================================
// CONFIGURACIÓN DE CITAS
// ============================================

export interface AppointmentSettings {
  // Duración por tipo de cita
  duraciones: Record<AppointmentType, AppointmentDuration>

  // Precios por tipo de cita
  precios: Record<AppointmentType, number>

  // Configuración de recordatorios
  enviarRecordatorios: boolean
  horasAnticipacionRecordatorio: number

  // Cancelaciones
  horasMinimaCancelacion: number
  permiteCancelacionCliente: boolean
  permiteReagendamientoCliente: boolean

  // Configuración general
  intervaloEntreConsultas: number // minutos de descanso entre citas
  maximoCitasPorDia: number
  diasAnticipacionMaxima: number // Cuántos días adelante se puede agendar
}

// ============================================
// DTOs
// ============================================

export interface CreateAppointmentDTO {
  clienteId: string
  empleadoId: string
  tipo: AppointmentType
  titulo: string
  descripcion?: string
  fechaHora: Date
  duracion: AppointmentDuration
  modalidad: 'presencial' | 'online'
  sala?: string
  motivoConsulta?: string
  precio?: number
}

export interface UpdateAppointmentDTO {
  tipo?: AppointmentType
  titulo?: string
  descripcion?: string
  fechaHora?: Date
  duracion?: AppointmentDuration
  estado?: AppointmentStatus
  modalidad?: 'presencial' | 'online'
  sala?: string
  urlVideoconferencia?: string
  notasConsulta?: string
  resumenConsulta?: string
  requiereSeguimiento?: boolean
  proximaCitaSugerida?: Date
}

export interface CancelAppointmentDTO {
  motivoCancelacion: string
  canceladoPor: string
  reembolsar?: boolean
}

export interface RescheduleAppointmentDTO {
  nuevaFechaHora: Date
  motivo?: string
}
