// ============================================
// TAREAS
// ============================================

export type TaskType =
  | 'seguimiento_cliente'
  | 'revision_plan'
  | 'llamada_telefonica'
  | 'enviar_email'
  | 'preparar_informe'
  | 'analizar_resultados'
  | 'actualizar_historial'
  | 'administrativa'
  | 'otro'

export type TaskPriority = 'baja' | 'media' | 'alta' | 'urgente'

export type TaskStatus =
  | 'pendiente'
  | 'en_progreso'
  | 'completada'
  | 'cancelada'
  | 'pausada'

export type TaskRecurrence =
  | 'ninguna'
  | 'diaria'
  | 'semanal'
  | 'quincenal'
  | 'mensual'

// ============================================
// TAREA
// ============================================

export interface Task {
  id: string

  // Información básica
  titulo: string
  descripcion?: string
  tipo: TaskType

  // Asignación
  asignadoA: string // ID del empleado
  creadoPor: string // ID del empleado que creó la tarea

  // Relaciones opcionales
  clienteId?: string // Si la tarea está relacionada con un cliente
  citaId?: string // Si está relacionada con una cita
  planId?: string // Si está relacionada con un plan

  // Estado y prioridad
  estado: TaskStatus
  prioridad: TaskPriority

  // Fechas
  fechaCreacion: Date
  fechaVencimiento: Date
  fechaInicio?: Date
  fechaCompletada?: Date

  // Recordatorios
  recordatorio: boolean
  fechaRecordatorio?: Date
  recordatorioEnviado?: boolean

  // Recurrencia
  esRecurrente: boolean
  recurrencia?: TaskRecurrence
  tareaRecurrenteId?: string // ID de la tarea padre si es recurrente

  // Estimación de tiempo
  tiempoEstimado?: number // minutos
  tiempoReal?: number // minutos (cuando se completa)

  // Subtareas o checklist
  checklist?: ChecklistItem[]

  // Notas y seguimiento
  notas?: string
  progreso?: number // 0-100%

  // Archivos adjuntos
  archivosAdjuntos?: string[] // URLs o IDs de archivos

  // Etiquetas
  etiquetas?: string[]

  // Metadatos
  ultimaModificacion: Date
  modificadoPor?: string
}

// ============================================
// ITEM DE CHECKLIST
// ============================================

export interface ChecklistItem {
  id: string
  texto: string
  completado: boolean
  orden: number
  fechaCompletado?: Date
}

// ============================================
// COMENTARIO EN TAREA
// ============================================

export interface TaskComment {
  id: string
  tareaId: string
  empleadoId: string
  texto: string
  fechaCreacion: Date
  editado: boolean
  fechaEdicion?: Date
}

// ============================================
// PLANTILLA DE TAREA
// ============================================

export interface TaskTemplate {
  id: string
  nombre: string
  descripcion?: string
  tipo: TaskType
  prioridad: TaskPriority
  tiempoEstimado?: number
  checklist?: Omit<ChecklistItem, 'id' | 'completado' | 'fechaCompletado'>[]
  etiquetas?: string[]

  // Metadatos
  creadoPor: string
  fechaCreacion: Date
  vecesUtilizada: number
}

// ============================================
// DTOs
// ============================================

export interface CreateTaskDTO {
  titulo: string
  descripcion?: string
  tipo: TaskType
  asignadoA: string
  clienteId?: string
  citaId?: string
  planId?: string
  prioridad: TaskPriority
  fechaVencimiento: Date
  recordatorio?: boolean
  fechaRecordatorio?: Date
  esRecurrente?: boolean
  recurrencia?: TaskRecurrence
  tiempoEstimado?: number
  checklist?: Omit<ChecklistItem, 'id' | 'completado' | 'fechaCompletado'>[]
  etiquetas?: string[]
}

export interface UpdateTaskDTO {
  titulo?: string
  descripcion?: string
  tipo?: TaskType
  asignadoA?: string
  estado?: TaskStatus
  prioridad?: TaskPriority
  fechaVencimiento?: Date
  fechaInicio?: Date
  recordatorio?: boolean
  fechaRecordatorio?: Date
  tiempoReal?: number
  notas?: string
  progreso?: number
  etiquetas?: string[]
}

export interface CompleteTaskDTO {
  tiempoReal?: number
  notas?: string
}
