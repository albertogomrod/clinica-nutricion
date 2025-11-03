// ============================================
// DATOS DE EVOLUCIÓN
// ============================================

import type { TanitaMeasurement } from './user.types'

export type MeasurementFrequency =
  | 'semanal'
  | 'quincenal'
  | 'mensual'
  | 'personalizado'

export type ProgressStatus =
  | 'excelente' // Superando objetivos
  | 'bueno' // En camino a objetivos
  | 'moderado' // Progreso lento pero positivo
  | 'estancado' // Sin cambios significativos
  | 'retroceso' // Empeorando métricas

// ============================================
// REGISTRO DE EVOLUCIÓN
// ============================================

export interface EvolutionRecord {
  id: string
  clienteId: string

  // Tipo de registro
  tipo: EvolutionRecordType

  // Fecha del registro
  fecha: Date

  // Mediciones
  medicionTanita?: TanitaMeasurement
  medidasCorporales?: BodyMeasurements
  pesoManual?: number // Si no hay medición TANITA

  // Fotos de progreso
  fotos?: ProgressPhoto[]

  // Notas
  notasCliente?: string // Cómo se siente, cambios percibidos
  notasNutricionista?: string

  // Adherencia al plan
  adherenciaPlan?: number // 0-100%
  diasSeguidos?: number

  // Metadatos
  registradoPor: string // ID (puede ser cliente o empleado)
  esAutoreporte: boolean // Si lo registró el cliente

  fechaCreacion: Date
  ultimaModificacion?: Date
}

export type EvolutionRecordType =
  | 'medicion_completa' // Con TANITA
  | 'medicion_basica' // Solo peso/medidas
  | 'seguimiento' // Check-in regular
  | 'revision_plan' // Revisión programada

// ============================================
// MEDIDAS CORPORALES
// ============================================

export interface BodyMeasurements {
  // Circunferencias (cm)
  cuello?: number
  pecho?: number
  cintura: number
  cadera: number
  musloIzquierdo?: number
  musloDerecho?: number
  pantorrillaIzquierda?: number
  pantorrillaDerecha?: number
  brazoIzquierdo?: number
  brazoDerecho?: number

  // Ratios calculados
  ratioCinturaCadera?: number // WHR (Waist-Hip Ratio)
  ratioCinturaTalla?: number // WHtR (Waist-to-Height Ratio)

  // Pliegues cutáneos (mm) - si se miden
  pliegues?: {
    triceps?: number
    subescapular?: number
    suprailiaco?: number
    abdominal?: number
    muslo?: number
    pantorrilla?: number
  }
}

// ============================================
// FOTO DE PROGRESO
// ============================================

export interface ProgressPhoto {
  id: string
  url: string
  tipo: PhotoType
  fecha: Date
  notas?: string
  esPrivada: boolean // Solo visible para nutricionista
}

export type PhotoType = 'frontal' | 'lateral' | 'espalda' | 'detalle'

// ============================================
// ANÁLISIS DE PROGRESO
// ============================================

export interface ProgressAnalysis {
  id: string
  clienteId: string

  // Período analizado
  fechaInicio: Date
  fechaFin: Date

  // Cambios en métricas principales
  cambios: MetricChanges

  // Estadísticas
  estadisticas: ProgressStatistics

  // Evaluación general
  evaluacion: ProgressStatus

  // Comparación con objetivos
  cumplimientoObjetivos: GoalProgress[]

  // Recomendaciones
  recomendaciones: string[]

  // Gráficas y tendencias
  tendencias: Trend[]

  // Predicciones (opcional)
  predicciones?: Predictions

  // Metadatos
  generadoPor: string
  fechaGeneracion: Date
}

// ============================================
// CAMBIOS EN MÉTRICAS
// ============================================

export interface MetricChanges {
  // Peso
  pesoInicial: number
  pesoActual: number
  cambioPeso: number
  cambioPesoPercent: number

  // Grasa corporal
  grasaInicial?: number
  grasaActual?: number
  cambioGrasa?: number
  cambioGrasaPercent?: number

  // Masa muscular
  musculoInicial?: number
  musculoActual?: number
  cambioMusculo?: number
  cambioMusculoPercent?: number

  // IMC
  imcInicial: number
  imcActual: number
  cambioImc: number

  // Medidas
  cinturaInicial?: number
  cinturaActual?: number
  cambioCintura?: number

  // Grasa visceral
  visceralInicial?: number
  visceralActual?: number
  cambioVisceral?: number

  // Fase angular
  anguloFaseInicial?: number
  anguloFaseActual?: number
  cambioAnguloFase?: number
}

// ============================================
// ESTADÍSTICAS DE PROGRESO
// ============================================

export interface ProgressStatistics {
  // Resumen temporal
  totalDias: number
  totalMediciones: number
  frecuenciaMediaMediciones: number // días entre mediciones

  // Velocidad de cambio
  pesoSemana: number // kg/semana promedio
  grasaSemana?: number // kg grasa/semana
  musculoSemana?: number // kg músculo/semana

  // Adherencia
  adherenciaMedia: number // %
  diasSeguimientoPlan: number

  // Consistencia
  desviacionPeso: number // Desviación estándar del peso
  consistencia: 'alta' | 'media' | 'baja'
}

// ============================================
// PROGRESO HACIA OBJETIVOS
// ============================================

export interface GoalProgress {
  objetivo: string
  valorInicial: number
  valorObjetivo: number
  valorActual: number

  // Progreso
  progresoRealizado: number // unidades
  progresoRestante: number // unidades
  porcentajeCompletado: number // %

  // Estimación
  diasTranscurridos: number
  diasEstimadosRestantes?: number
  fechaEstimadaLogro?: Date

  // Estado
  enCamino: boolean
  superandoExpectativas: boolean
}

// ============================================
// TENDENCIA
// ============================================

export interface Trend {
  metrica: string // "peso", "grasa", "músculo", etc.
  direccion: 'ascendente' | 'descendente' | 'estable'
  velocidad: 'rapida' | 'moderada' | 'lenta'

  // Datos para gráfica
  puntos: DataPoint[]

  // Línea de tendencia
  lineaTendencia?: TrendLine
}

export interface DataPoint {
  fecha: Date
  valor: number
  etiqueta?: string
}

export interface TrendLine {
  tipo: 'lineal' | 'polinomial' | 'exponencial'
  ecuacion?: string
  r2?: number // Coeficiente de determinación
}

// ============================================
// PREDICCIONES
// ============================================

export interface Predictions {
  // Predicción de peso
  pesoEn30Dias?: number
  pesoEn60Dias?: number
  pesoEn90Dias?: number

  // Predicción de alcance de objetivo
  fechaObjetivoPeso?: Date
  probabilidadExito: number // %

  // Advertencias
  advertencias?: string[]

  // Confianza del modelo
  nivelConfianza: 'alta' | 'media' | 'baja'
  factoresConsiderados: string[]
}

// ============================================
// COMPARACIÓN PERIÓDICA
// ============================================

export interface PeriodComparison {
  id: string
  clienteId: string

  // Períodos a comparar
  periodoAnterior: {
    fechaInicio: Date
    fechaFin: Date
  }
  periodoActual: {
    fechaInicio: Date
    fechaFin: Date
  }

  // Métricas comparadas
  metricas: ComparativeMetric[]

  // Resumen
  mejoras: string[]
  retrocesos: string[]
  mantenciones: string[]

  // Evaluación
  evaluacionGeneral: ProgressStatus

  // Metadatos
  fechaGeneracion: Date
}

export interface ComparativeMetric {
  nombre: string
  valorAnterior: number
  valorActual: number
  cambio: number
  cambioPercent: number
  unidad: string
  mejora: boolean
}

// ============================================
// HITO O LOGRO
// ============================================

export interface Milestone {
  id: string
  clienteId: string

  // Información del hito
  titulo: string
  descripcion: string
  tipo: MilestoneType

  // Fecha de logro
  fechaLogro: Date

  // Métrica alcanzada
  metricaAsociada?: string
  valorAlcanzado?: number

  // Celebración
  celebrado: boolean
  mensajeMotivacional?: string

  // Icono/Badge
  icono?: string
  badge?: string

  // Compartido
  compartidoConNutricionista: boolean

  // Metadatos
  fechaCreacion: Date
}

export type MilestoneType =
  | 'peso_objetivo'
  | 'perdida_grasa'
  | 'ganancia_muscular'
  | 'mejora_composicion'
  | 'adherencia_plan'
  | 'habito_nuevo'
  | 'dias_consecutivos'
  | 'mejora_salud'
  | 'personalizado'

// ============================================
// REGISTRO DIARIO (DIARIO DEL CLIENTE)
// ============================================

export interface DailyLog {
  id: string
  clienteId: string
  fecha: Date

  // Comidas registradas
  comidasRealizadas: MealLog[]

  // Adherencia al plan
  siguioPlan: boolean
  porcentajeAdherencia: number

  // Agua consumida
  vasosAgua: number
  litrosAgua: number

  // Actividad física
  actividadFisica?: ActivityLog[]

  // Bienestar
  nivelEnergia: number // 1-10
  calidadSueno: number // 1-10
  horasSueno?: number
  nivelEstres: number // 1-10
  estadoAnimo: 'muy_malo' | 'malo' | 'neutral' | 'bueno' | 'muy_bueno'

  // Síntomas o notas
  sintomas?: string[]
  antojos?: string[]
  notas?: string

  // Peso del día (opcional)
  pesoDelDia?: number

  // Fotos de comidas
  fotosComidas?: string[]

  // Metadatos
  fechaCreacion: Date
  ultimaModificacion?: Date
}

export interface MealLog {
  tipo: 'desayuno' | 'media_mañana' | 'almuerzo' | 'merienda' | 'cena' | 'snack'
  hora: string
  alimentos: string[]
  siguioReceta: boolean
  recetaId?: string
  foto?: string
  notas?: string
}

export interface ActivityLog {
  tipo: string // "Correr", "Gimnasio", "Yoga", etc.
  duracion: number // minutos
  intensidad: 'baja' | 'media' | 'alta'
  caloriasQuemadas?: number
  notas?: string
}

// ============================================
// RESUMEN SEMANAL
// ============================================

export interface WeeklySummary {
  id: string
  clienteId: string

  // Semana
  numeroSemana: number
  fechaInicio: Date
  fechaFin: Date

  // Adherencia
  diasSeguimientoPlan: number // de 7
  porcentajeAdherencia: number

  // Peso y medidas
  pesoInicio: number
  pesoFin: number
  cambioPeso: number

  // Resumen de actividad
  diasConEjercicio: number
  minutosEjercicioTotal: number

  // Hidratación
  promedioLitrosAgua: number

  // Bienestar promedio
  promedioEnergia: number
  promedioSueno: number
  promedioEstres: number

  // Cumplimiento de comidas
  comidasCompletadas: number // de total esperado

  // Resumen cualitativo
  logros: string[]
  desafios: string[]
  observaciones?: string

  // Feedback del nutricionista
  feedbackNutricionista?: string
  recomendacionesSemana?: string[]

  // Metadatos
  fechaGeneracion: Date
  generadoPor?: string
}

// ============================================
// REPORTE MENSUAL
// ============================================

export interface MonthlyReport {
  id: string
  clienteId: string

  // Mes y año
  mes: number // 1-12
  año: number
  fechaInicio: Date
  fechaFin: Date

  // Cambios principales
  cambiosMensuales: MetricChanges

  // Resumen semanal
  resumenSemanas: WeeklySummary[]

  // Estadísticas del mes
  estadisticasMes: MonthlyStatistics

  // Evaluación
  evaluacionMes: ProgressStatus
  cumplimientoObjetivos: GoalProgress[]

  // Hitos alcanzados
  hitos: Milestone[]

  // Análisis comparativo
  comparacionMesAnterior?: ComparativeMetric[]

  // Gráficas de evolución
  graficaPeso: DataPoint[]
  graficaGrasa?: DataPoint[]
  graficaMusculo?: DataPoint[]
  graficaAdherencia: DataPoint[]

  // Recomendaciones
  recomendacionesProximoMes: string[]
  ajustesSugeridos?: string[]

  // Feedback
  feedbackCliente?: string
  feedbackNutricionista?: string

  // Metadatos
  fechaGeneracion: Date
  generadoPor: string
}

export interface MonthlyStatistics {
  // Días de seguimiento
  totalDias: number
  diasConRegistro: number
  porcentajeRegistro: number

  // Adherencia
  adherenciaPromedio: number
  mejorSemana: number // Número de semana
  peorSemana: number

  // Actividad física
  diasEjercicio: number
  minutosEjercicioTotal: number
  promedioMinutosDia: number

  // Hidratación
  promedioLitrosAgua: number
  diasCumplidosHidratacion: number

  // Bienestar
  promedioEnergia: number
  promedioSueno: number
  promedioHorasSueno: number
  promedioEstres: number

  // Consistencia
  diasConsecutivosPlan: number // Racha más larga
  rachaActual: number
}

// ============================================
// NOTIFICACIÓN DE PROGRESO
// ============================================

export interface ProgressNotification {
  id: string
  clienteId: string
  tipo: NotificationType

  // Contenido
  titulo: string
  mensaje: string

  // Metadatos
  fecha: Date
  leida: boolean
  fechaLeida?: Date

  // Acción asociada
  accionUrl?: string
  accionTexto?: string
}

export type NotificationType =
  | 'hito_alcanzado'
  | 'recordatorio_medicion'
  | 'mejora_detectada'
  | 'objetivo_cercano'
  | 'felicitacion'
  | 'advertencia_estancamiento'
  | 'sugerencia_ajuste'

// ============================================
// DTOs
// ============================================

export interface CreateEvolutionRecordDTO {
  clienteId: string
  tipo: EvolutionRecordType
  fecha: Date
  medicionTanitaId?: string
  medidasCorporales?: BodyMeasurements
  pesoManual?: number
  notasCliente?: string
  notasNutricionista?: string
  adherenciaPlan?: number
}

export interface UpdateEvolutionRecordDTO {
  medidasCorporales?: BodyMeasurements
  notasCliente?: string
  notasNutricionista?: string
  adherenciaPlan?: number
}

export interface CreateDailyLogDTO {
  fecha: Date
  comidasRealizadas: MealLog[]
  siguioPlan: boolean
  vasosAgua: number
  actividadFisica?: ActivityLog[]
  nivelEnergia: number
  calidadSueno: number
  horasSueno?: number
  nivelEstres: number
  estadoAnimo: 'muy_malo' | 'malo' | 'neutral' | 'bueno' | 'muy_bueno'
  sintomas?: string[]
  antojos?: string[]
  notas?: string
  pesoDelDia?: number
}

export interface GenerateProgressAnalysisDTO {
  clienteId: string
  fechaInicio: Date
  fechaFin: Date
  incluirPredicciones?: boolean
}

export interface GenerateReportDTO {
  clienteId: string
  tipo: 'semanal' | 'mensual' | 'personalizado'
  fechaInicio: Date
  fechaFin: Date
}

// ============================================
// FILTROS Y QUERIES
// ============================================

export interface EvolutionFilter {
  clienteId: string
  fechaDesde?: Date
  fechaHasta?: Date
  tipo?: EvolutionRecordType[]
  conMedicionTanita?: boolean
  ordenarPor?: 'fecha_asc' | 'fecha_desc'
  limite?: number
}

export interface ProgressAnalysisFilter {
  clienteId: string
  periodo?:
    | 'ultima_semana'
    | 'ultimo_mes'
    | 'ultimos_3_meses'
    | 'ultimo_año'
    | 'personalizado'
  fechaDesde?: Date
  fechaHasta?: Date
}
