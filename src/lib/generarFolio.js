/**
 * Utilidades para generar folios únicos de simulaciones
 * Formato: SIM-YYYY-NNNNNN
 * Ejemplo: SIM-2025-001234
 */

/**
 * Genera un folio único para una nueva simulación
 * @returns {string} Folio en formato SIM-YYYY-NNNNNN
 */
export function generarFolioSimulacion() {
  const año = new Date().getFullYear()
  const numeroAleatorio = Math.floor(Math.random() * 900000) + 100000 // 6 dígitos
  return `SIM-${año}-${numeroAleatorio}`
}

/**
 * Valida si un folio tiene el formato correcto
 * @param {string} folio - Folio a validar
 * @returns {boolean} true si el formato es válido
 */
export function validarFolioSimulacion(folio) {
  const regex = /^SIM-\d{4}-\d{6}$/
  return regex.test(folio)
}

/**
 * Extrae el año de un folio
 * @param {string} folio - Folio de simulación
 * @returns {number|null} Año extraído o null si no es válido
 */
export function extraerAñoFolio(folio) {
  if (!validarFolioSimulacion(folio)) return null
  const partes = folio.split('-')
  return parseInt(partes[1], 10)
}

/**
 * Calcula la fecha de vigencia (30 días desde la fecha dada)
 * @param {Date} fechaCreacion - Fecha de creación de la simulación
 * @returns {Date} Fecha de vigencia
 */
export function calcularFechaVigencia(fechaCreacion = new Date()) {
  const vigencia = new Date(fechaCreacion)
  vigencia.setDate(vigencia.getDate() + 30)
  return vigencia
}

/**
 * Verifica si una simulación está expirada
 * @param {Date} fechaVigencia - Fecha de vigencia de la simulación
 * @returns {boolean} true si está expirada
 */
export function estaExpirada(fechaVigencia) {
  return new Date() > new Date(fechaVigencia)
}

/**
 * Calcula días restantes hasta la expiración
 * @param {Date} fechaVigencia - Fecha de vigencia
 * @returns {number} Días restantes (negativo si ya expiró)
 */
export function diasRestantes(fechaVigencia) {
  const hoy = new Date()
  const vigencia = new Date(fechaVigencia)
  const diferencia = vigencia - hoy
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
}
