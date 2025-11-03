// ============================================
// CONSTANTES DE EVOLUCIÓN
// ============================================

export const MEASUREMENT_FREQUENCIES = {
  SEMANAL: 'semanal',
  QUINCENAL: 'quincenal',
  MENSUAL: 'mensual',
  PERSONALIZADO: 'personalizado',
} as const

export const PROGRESS_STATUS = {
  EXCELENTE: 'excelente',
  BUENO: 'bueno',
  MODERADO: 'moderado',
  ESTANCADO: 'estancado',
  RETROCESO: 'retroceso',
} as const

// Rangos saludables de cambio de peso por semana
export const HEALTHY_WEIGHT_LOSS_RANGE = {
  MIN: 0.25, // kg/semana
  MAX: 1.0, // kg/semana
  IDEAL: 0.5, // kg/semana
} as const

export const HEALTHY_WEIGHT_GAIN_RANGE = {
  MIN: 0.25, // kg/semana
  MAX: 0.5, // kg/semana
  IDEAL: 0.35, // kg/semana
} as const

// Rangos de referencia para ratios corporales
export const BODY_RATIOS = {
  WAIST_HIP_RATIO: {
    MALE: {
      BAJO_RIESGO: { max: 0.9 },
      RIESGO_MODERADO: { min: 0.9, max: 0.99 },
      ALTO_RIESGO: { min: 1.0 },
    },
    FEMALE: {
      BAJO_RIESGO: { max: 0.8 },
      RIESGO_MODERADO: { min: 0.8, max: 0.84 },
      ALTO_RIESGO: { min: 0.85 },
    },
  },
  WAIST_HEIGHT_RATIO: {
    SALUDABLE: { max: 0.5 },
    SOBREPESO: { min: 0.5, max: 0.6 },
    OBESIDAD: { min: 0.6 },
  },
} as const

// Mensajes motivacionales según progreso
export const MOTIVATIONAL_MESSAGES = {
  EXCELENTE: [
    '¡Increíble trabajo! Estás superando tus objetivos',
    '¡Excelente progreso! Sigue así',
    '¡Resultados extraordinarios! Tu esfuerzo está dando frutos',
  ],
  BUENO: [
    '¡Buen trabajo! Vas por el camino correcto',
    'Progreso sólido, mantén el ritmo',
    'Estás haciendo un gran esfuerzo',
  ],
  MODERADO: [
    'Progreso constante, cada paso cuenta',
    'El cambio lleva tiempo, vas bien',
    'Mantén la constancia, los resultados llegarán',
  ],
  ESTANCADO: [
    'No te desanimes, a veces el cuerpo necesita tiempo para adaptarse',
    'Podemos revisar tu plan juntos para optimizarlo',
    'El estancamiento es temporal, sigamos trabajando',
  ],
  RETROCESO: [
    'No pasa nada, volvamos al camino juntos',
    'Analicemos qué podemos ajustar en tu plan',
    'Los contratiempos son parte del proceso, sigamos adelante',
  ],
} as const

// Umbrales para detectar cambios significativos
export const SIGNIFICANT_CHANGE_THRESHOLDS = {
  PESO: 0.5, // kg
  GRASA: 0.3, // kg
  MUSCULO: 0.2, // kg
  CINTURA: 1, // cm
  VISCERAL: 1, // nivel
  ANGULO_FASE: 0.2, // grados
} as const

// Configuración de gráficas por defecto
export const CHART_CONFIGS = {
  PUNTOS_MINIMOS: 2,
  PUNTOS_IDEALES: 10,
  COLORES: {
    PESO: '#3B82F6',
    GRASA: '#EF4444',
    MUSCULO: '#10B981',
    IMC: '#8B5CF6',
    AGUA: '#06B6D4',
    ADHERENCIA: '#F59E0B',
  },
} as const
