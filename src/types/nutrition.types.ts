// ============================================
// PLAN DE NUTRICIÓN
// ============================================

export type MealType =
  | 'desayuno'
  | 'media_mañana'
  | 'almuerzo'
  | 'merienda'
  | 'cena'
  | 'post_entreno'

export type DayOfWeek =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo'

export type PlanStatus =
  | 'borrador'
  | 'activo'
  | 'completado'
  | 'cancelado'
  | 'pausado'

export type MeasurementUnit =
  | 'gramos'
  | 'kilogramos'
  | 'mililitros'
  | 'litros'
  | 'unidad'
  | 'taza'
  | 'cucharada'
  | 'cucharadita'
  | 'pizca'

// ============================================
// MACRONUTRIENTES Y CALORÍAS
// ============================================

export interface MacroNutrients {
  calorias: number // kcal
  proteinas: number // gramos
  carbohidratos: number // gramos
  grasas: number // gramos
  fibra: number // gramos
  azucares?: number // gramos
  grasasSaturadas?: number // gramos
  sodio?: number // mg
}

// ============================================
// ALIMENTO/INGREDIENTE
// ============================================

export interface FoodItem {
  id: string
  nombre: string
  categoria: FoodCategory

  // Información nutricional por 100g/100ml
  macronutrientes: MacroNutrients

  // Información adicional
  alergenos: string[]
  esVegetariano: boolean
  esVegano: boolean
  esSinGluten: boolean
  esSinLactosa: boolean

  // Metadatos
  imagen?: string
  descripcion?: string
  temporada?: string[]
}

export type FoodCategory =
  | 'carnes'
  | 'pescados'
  | 'huevos'
  | 'lacteos'
  | 'cereales'
  | 'legumbres'
  | 'verduras'
  | 'frutas'
  | 'frutos_secos'
  | 'aceites'
  | 'condimentos'
  | 'bebidas'
  | 'otros'

// ============================================
// INGREDIENTE CON CANTIDAD
// ============================================

export interface Ingredient {
  alimento: FoodItem | string // FoodItem completo o solo ID
  cantidad: number
  unidad: MeasurementUnit
  notas?: string

  // Calculado
  macronutrientesTotales?: MacroNutrients
}

// ============================================
// RECETA
// ============================================

export interface Recipe {
  id: string
  nombre: string
  descripcion?: string

  // Ingredientes
  ingredientes: Ingredient[]

  // Preparación
  pasos: string[]
  tiempoPreparacion: number // minutos
  tiempoCoccion: number // minutos
  tiempoTotal: number // minutos (calculado)

  // Porciones
  porciones: number

  // Información nutricional total
  macronutrientesPorPorcion: MacroNutrients
  macronutrientesTotales: MacroNutrients

  // Clasificación
  categoria: MealType[] // Para qué comidas es adecuada
  dificultad: 'facil' | 'media' | 'dificil'

  // Etiquetas y restricciones
  tags: string[]
  alergenos: string[]
  esVegetariana: boolean
  esVegana: boolean
  esSinGluten: boolean
  esSinLactosa: boolean

  // Media
  imagenes?: string[]
  videoUrl?: string

  // Metadatos
  creadoPor: string // ID del empleado
  fechaCreacion: Date
  ultimaModificacion: Date

  // Popularidad
  vecesUtilizada?: number
  valoracionPromedio?: number
}

// ============================================
// COMIDA (MEAL) EN UN PLAN
// ============================================

export interface Meal {
  id: string
  tipo: MealType
  hora?: string // Hora sugerida "08:00"

  // Opciones de comida (puede tener alternativas)
  opciones: MealOption[]

  // Notas para el cliente
  instrucciones?: string

  // Totales nutricionales de la opción seleccionada
  macronutrientes: MacroNutrients
}

export interface MealOption {
  id: string
  nombre: string

  // Puede ser una receta o una lista de alimentos simples
  esReceta: boolean
  receta?: Recipe | string // Recipe completo o solo ID
  alimentosSimples?: Ingredient[]

  // Información nutricional
  macronutrientes: MacroNutrients

  // Metadatos
  esPredeterminada: boolean // Opción recomendada por defecto
}

// ============================================
// DÍA DEL PLAN
// ============================================

export interface DayPlan {
  dia: DayOfWeek
  comidas: Meal[]

  // Totales del día
  totalCalorias: number
  totalProteinas: number
  totalCarbohidratos: number
  totalGrasas: number
  totalFibra: number

  // Distribución de macros en porcentaje
  distribucionMacros: {
    proteinasPercent: number
    carbohidratosPercent: number
    grasasPercent: number
  }

  // Hidratación recomendada
  aguaRecomendada?: number // litros

  // Notas generales del día
  notas?: string
}

// ============================================
// OBJETIVOS NUTRICIONALES DEL PLAN
// ============================================

export interface NutritionalTargets {
  // Objetivos calóricos
  caloriasDiarias: number

  // Objetivos de macronutrientes (gramos)
  proteinasDiarias: number
  carbohidratosDiarios: number
  grasasDiarias: number
  fibraDiaria: number

  // Objetivos en porcentaje
  proteinasPercent: number // % del total calórico
  carbohidratosPercent: number
  grasasPercent: number

  // Hidratación
  aguaDiaria: number // litros

  // Distribución de comidas
  numeroComidas: number
  distribucionCalorias?: {
    // % de calorías por comida
    desayuno: number
    media_mañana: number
    almuerzo: number
    merienda: number
    cena: number
    post_entreno?: number
  }
}

// ============================================
// PLAN DE NUTRICIÓN COMPLETO
// ============================================

export interface NutritionPlan {
  id: string
  nombre: string
  descripcion?: string

  // Relaciones
  clienteId: string
  nutricionistaId: string

  // Estado y fechas
  estado: PlanStatus
  fechaInicio: Date
  fechaFin: Date
  duracionSemanas: number

  // Objetivos
  objetivos: NutritionalTargets
  objetivoGeneral: string // "Pérdida de peso saludable", etc.

  // Plan semanal
  planSemanal: DayPlan[]

  // Suplementación (opcional)
  suplementos?: Supplement[]

  // Recomendaciones generales
  recomendaciones: string[]
  restricciones: string[]

  // Lista de compras generada
  listaCompras?: ShoppingList

  // Seguimiento
  adherencia?: number // % de seguimiento del cliente
  diasCompletados?: number

  // Ajustes y versiones
  version: number
  planAnteriorId?: string // Si es una revisión de otro plan
  motivoRevision?: string

  // Metadatos
  fechaCreacion: Date
  ultimaModificacion: Date
  modificadoPor?: string

  // Notas privadas del nutricionista
  notasPrivadas?: string
}

// ============================================
// SUPLEMENTO
// ============================================

export interface Supplement {
  id: string
  nombre: string
  marca?: string
  tipo: SupplementType

  // Dosificación
  dosis: string
  frecuencia: string
  momento: string[] // ["desayuno", "post_entreno"]

  // Duración
  fechaInicio: Date
  fechaFin?: Date

  // Propósito
  objetivo: string

  // Notas
  instrucciones?: string
  efectosSecundarios?: string[]
}

export type SupplementType =
  | 'proteina'
  | 'vitaminas'
  | 'minerales'
  | 'omega3'
  | 'pre_entreno'
  | 'post_entreno'
  | 'creatina'
  | 'bcaa'
  | 'otro'

// ============================================
// LISTA DE COMPRAS
// ============================================

export interface ShoppingList {
  id: string
  planId: string
  semana: number

  items: ShoppingItem[]

  // Totales
  totalItems: number
  precioEstimado?: number

  // Metadatos
  fechaGeneracion: Date
}

export interface ShoppingItem {
  alimento: FoodItem | string
  cantidad: number
  unidad: MeasurementUnit
  categoria: FoodCategory

  // Opcionales
  precioEstimado?: number
  comprado?: boolean
  notas?: string
}

// ============================================
// DTOs
// ============================================

export interface CreateNutritionPlanDTO {
  clienteId: string
  nombre: string
  descripcion?: string
  fechaInicio: Date
  duracionSemanas: number
  objetivoGeneral: string
  objetivos: NutritionalTargets
  recomendaciones: string[]
  restricciones: string[]
}

export interface UpdateNutritionPlanDTO {
  nombre?: string
  descripcion?: string
  fechaFin?: Date
  estado?: PlanStatus
  planSemanal?: DayPlan[]
  suplementos?: Supplement[]
  recomendaciones?: string[]
  restricciones?: string[]
  notasPrivadas?: string
}

export interface CreateRecipeDTO {
  nombre: string
  descripcion?: string
  ingredientes: Ingredient[]
  pasos: string[]
  tiempoPreparacion: number
  tiempoCoccion: number
  porciones: number
  categoria: MealType[]
  dificultad: 'facil' | 'media' | 'dificil'
  tags: string[]
}
