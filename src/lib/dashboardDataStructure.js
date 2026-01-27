/**
 * ESTRUCTURA COMPLETA DE DATOS DEL DASHBOARD
 * Para guardar en Firebase y poder consultarlo después por cliente
 *
 * Esta estructura captura TODOS los análisis financieros y competitivos
 * que se generan en el Step 3 (Results)
 */

/**
 * Captura todos los datos del dashboard completo
 * @param {Object} resultado - Resultado del cálculo financiero
 * @param {Object} formData - Datos del formulario (cliente, crédito)
 * @param {Object} loteSeleccionado - Información del lote
 * @returns {Object} Estructura completa para guardar
 */
export const capturarDashboardCompleto = (resultado, formData, loteSeleccionado) => {
  return {
    // ============================================
    // 1. DATOS BÁSICOS (ya existentes)
    // ============================================
    cliente: {
      nombre: formData.nombre,
      rangoEdad: formData.rangoEdad,
      rangoIngresos: formData.rangoIngresos,
      tipoIngreso: formData.tipoIngreso,
    },
    terreno: {
      loteSeleccionado: loteSeleccionado?.id || formData.loteSeleccionado,
      precio: loteSeleccionado?.precio || 650000,
      area: loteSeleccionado?.area || 140,
      zona: loteSeleccionado?.zona || 'Premium',
      ubicacion: loteSeleccionado?.ubicacion || 'Tulancingo, Hidalgo',
    },
    credito: {
      plazoAnios: formData.plazoAnios,
      frecuenciaPago: formData.frecuenciaPago,
      tipoCredito: formData.tipoCredito,
      enganchePorcentaje: formData.enganchePorcentaje,
      montoEnganche: resultado.enganche,
      montoFinanciar: resultado.montoFinanciar,
    },

    // ============================================
    // 2. ANÁLISIS FINANCIERO COMPLETO (NUEVO)
    // ============================================
    analisisFinanciero: {
      // Resumen Ejecutivo
      resumenEjecutivo: {
        totalAPagar: resultado.totalAPagar,
        pagoMensual: resultado.pagoMensual,
        pagoQuincenal: resultado.pagoQuincenal,
        pagoSemanal: resultado.pagoSemanal,
        nivelRiesgo: resultado.nivelRiesgo,
        tasaInteres: resultado.tasaInteres,
        enganche: resultado.enganche,
        montoFinanciar: resultado.montoFinanciar,
        interesTotal: resultado.interesTotal,
        recomendacion: resultado.recomendacion,
      },

      // Métricas Clave
      metricasClave: {
        irr: resultado.irr, // Internal Rate of Return
        npv: resultado.npv, // Net Present Value
        dti: resultado.dti, // Debt-to-Income Ratio
        ltv: resultado.ltv, // Loan-to-Value Ratio
        cat: resultado.cat, // Costo Anual Total
        paybackPeriod: resultado.paybackPeriod, // Periodo de recuperación
      },

      // Equity Build-Up (Construcción de Capital)
      equityBuildUp: {
        equityYear1: resultado.equityYear1,
        equityYear3: resultado.equityYear3,
        equityYear5: resultado.equityYear5,
        equityPercentageYear1: resultado.equityPercentageYear1,
        equityPercentageYear3: resultado.equityPercentageYear3,
        equityPercentageYear5: resultado.equityPercentageYear5,
      },

      // Proyección de Valor del Terreno (Apreciación)
      proyeccionValor: {
        valorInicial: loteSeleccionado?.precio || 650000,
        apreciacionAnual: 10.8, // % de Rancho Nuevo
        valorYear1: resultado.valorTerrenoYear1,
        valorYear3: resultado.valorTerrenoYear3,
        valorYear5: resultado.valorTerrenoYear5,
        valorYear10: resultado.valorTerrenoYear10,
        gananciaYear5: resultado.gananciaYear5,
        gananciaYear10: resultado.gananciaYear10,
      },

      // Tabla de Amortización (primeros 12 meses)
      tablaAmortizacion: resultado.tablaAmortizacion?.slice(0, 12) || [],

      // Análisis de Sensibilidad (escenarios)
      escenarios: {
        optimista: resultado.escenarioOptimista,
        base: resultado.escenarioBase,
        pesimista: resultado.escenarioPesimista,
      },

      // Comparación Renta vs Compra
      rentaVsCompra: {
        costoRentaMensual: resultado.costoRentaMensual,
        ahorroMensual: resultado.ahorroMensual,
        ahorroAnual: resultado.ahorroAnual,
        ahorro5Years: resultado.ahorro5Years,
      },
    },

    // ============================================
    // 3. ANÁLISIS COMPETITIVO (NUEVO)
    // ============================================
    analisisCompetitivo: {
      // Datos de Rancho Nuevo
      ranchoNuevo: {
        nombre: 'Rancho Nuevo',
        precio: 650000, // Precio base comparación
        precioReal: loteSeleccionado?.precio || 695000,
        plusvaliaAnual: 10.8,
        amenidades: 7,
        area: loteSeleccionado?.area || 140,
        ubicacion: 'Tulancingo de Bravo, Hidalgo',
        tipo: 'Premium',
      },

      // Competidores
      competidores: [
        {
          nombre: 'La Reserva',
          precio: 700000,
          area: 172,
          plusvaliaAnual: 8.2,
          amenidades: 5,
          tipo: 'Intermedio',
        },
        {
          nombre: 'Residencial Terracota',
          precio: 838600,
          area: 140,
          plusvaliaAnual: 8.8,
          amenidades: 6,
          tipo: 'Premium',
        },
        {
          nombre: 'Residencial Platino',
          precio: 900000,
          area: 153,
          plusvaliaAnual: 9.1,
          amenidades: 5,
          tipo: 'Premium',
        },
        {
          nombre: 'La Toscana',
          precio: 900000,
          area: 120,
          plusvaliaAnual: 8.5,
          amenidades: 7,
          tipo: 'Premium Plus',
        },
        {
          nombre: 'Ciudad Vista del Valle',
          precio: 509250,
          area: 105,
          plusvaliaAnual: 7.8,
          amenidades: 3,
          tipo: 'Económico',
        },
        {
          nombre: 'Residencial La Quinta',
          precio: 793800,
          area: 126,
          plusvaliaAnual: 8.4,
          amenidades: 5,
          tipo: 'Premium',
        },
      ],

      // Promedio de Competencia
      promedioCompetencia: {
        plusvalia: 8.47, // Promedio
        precio: 650000, // Mismo precio base
        precioRealPromedio: 756925, // Promedio real
      },

      // ROI Comparativo a 5 años
      roiComparativo: {
        ranchoNuevo: resultado.roi5RanchoNuevo || 1082150, // Ejemplo
        competenciaPromedio: resultado.roi5Competencia || 962500,
        diferenciaAbsoluta: resultado.diferenciaRoi5 || 119650,
        diferenciaPorcentual: 12.4,
      },

      // Ventaja Competitiva en Pesos
      ventajaCompetitiva: {
        gananciaAnualRanchoNuevo: resultado.gananciaAnualRN || 70200,
        gananciaAnualCompetencia: resultado.gananciaAnualComp || 55055,
        diferenciaAnual: resultado.diferenciaAnual || 15145,
        diferencia5Years: resultado.diferencia5Years || 119650,
      },

      // Ranking de Plusvalía
      rankingPlusvalia: [
        { nombre: 'Rancho Nuevo', plusvalia: 10.8, ranking: 1 },
        { nombre: 'Residencial Platino', plusvalia: 9.1, ranking: 2 },
        { nombre: 'Residencial Terracota', plusvalia: 8.8, ranking: 3 },
        { nombre: 'La Toscana', plusvalia: 8.5, ranking: 4 },
        { nombre: 'Residencial La Quinta', plusvalia: 8.4, ranking: 5 },
        { nombre: 'La Reserva', plusvalia: 8.2, ranking: 6 },
        { nombre: 'Ciudad Vista del Valle', plusvalia: 7.8, ranking: 7 },
      ],
    },

    // ============================================
    // 4. METADATA (para Firebase)
    // ============================================
    metadata: {
      version: '1.0',
      fechaGeneracion: new Date().toISOString(),
      ultimaActualizacion: new Date().toISOString(),
      fuenteDatos: 'Estudio de Mercado Teseo Data - Octubre 2025',
      sistemaVersion: '5.1',
      generadoPor: 'Simulador Teseo Data Lab',
    },
  }
}

/**
 * EJEMPLO DE ESTRUCTURA FIREBASE
 *
 * /simulaciones/{simulacionId}
 *   - id: "abc123"
 *   - folioSimulacion: "SIM-2025-000123"
 *   - fecha: "2025-10-14T..."
 *   - status: "enviada"
 *   - cliente: {...}
 *   - terreno: {...}
 *   - credito: {...}
 *   - resultado: {...}
 *   - dashboardData: {
 *       analisisFinanciero: {...},
 *       analisisCompetitivo: {...},
 *       metadata: {...}
 *     }
 *
 * /clientes/{clienteId}/simulaciones/{simulacionId}
 *   - referencia a la simulación completa
 *
 * QUERIES ÚTILES:
 * - Por cliente: firestore.collection('simulaciones').where('cliente.nombre', '==', nombre)
 * - Por status: firestore.collection('simulaciones').where('status', '==', 'aprobada')
 * - Por fecha: firestore.collection('simulaciones').orderBy('fecha', 'desc').limit(10)
 * - Por folio: firestore.collection('simulaciones').where('folioSimulacion', '==', folio)
 */

export default {
  capturarDashboardCompleto,
}
