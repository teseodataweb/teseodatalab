// Modelo de Riesgo Crediticio para Terrenos en Tulancingo
// Versión JavaScript para el simulador web

// Factores de ponderación finales
const PONDERACIONES = {
  edad: {
    '18-22': 8,
    '23-27': 6,
    '28-32': 4,
    '33-37': 2,
    '38-42': 0,
    '43-47': 2,
    '48-52': 4,
    '53-57': 6,
    '58-62': 8,
    '63-67': 10,
    '68-72': 12,
    '73-77': 14,
    '75+': 16
  },
  
  rangoIngresos: {
    'Menos de 10K': 20,
    '10-15K': 16,
    '15-20K': 12,
    '20-25K': 8,
    '25-30K': 6,
    '30-35K': 4,
    '35-40K': 3,
    '40-45K': 2,
    '45-50K': 1,
    '50-55K': 0,
    '55-60K': 0,
    '60-65K': 0,
    '65-70K': 0,
    '70-75K': 0,
    'Más de 75K': 0
  },
  
  tipoIngreso: {
    'Comprobable 100%': 0,
    'Comprobable 75%': 3,
    'Comprobable 50%': 6,
    'Comprobable 25%': 9,
    'Informal': 12
  },
  
  plazoAnios: {
    'Menos de 1 año': 0,
    '1 año': 1,
    '2 años': 2,
    '3 años': 5,
    '4 años': 8,
    '5 años': 10
  },
  
  enganchePorcentaje: {
    10: 12,
    15: 8,
    20: 4,
    25: 3,
    30: 2,
    40: 1,
    50: 0
  },
  
  zonaLote: {
    'Premium': 0,
    'Intermedia': 1,
    'Estándar': 2
  },
  
  tipoCredito: {
    'FOVISSSTE': 0,
    'IMSS': 0,
    'INFONAVIT': 0,
    'Hipotecario': 4,
    'De la empresa': 0
  }
};

// Sistema de 5 niveles de riesgo
const UMBRALES_RIESGO = {
  'Riesgo Mínimo': {
    maxScore: 8,
    tasaBase: 0.08,
    engancheMinimo: 0.10,
    prestamoMaximo: 7000000,
    descripcion: 'Riesgo mínimo - Condiciones preferenciales',
    color: '#10b981'
  },
  'Riesgo Bajo': {
    maxScore: 16,
    tasaBase: 0.10,
    engancheMinimo: 0.12,
    prestamoMaximo: 6000000,
    descripcion: 'Riesgo bajo - Condiciones favorables',
    color: '#3b82f6'
  },
  'Riesgo Medio': {
    maxScore: 25,
    tasaBase: 0.12,
    engancheMinimo: 0.15,
    prestamoMaximo: 5000000,
    descripcion: 'Riesgo medio - Condiciones estándar',
    color: '#f59e0b'
  },
  'Riesgo Alto': {
    maxScore: 40,
    tasaBase: 0.15,
    engancheMinimo: 0.20,
    prestamoMaximo: 3000000,
    descripcion: 'Riesgo alto - Condiciones restrictivas',
    color: '#ef4444'
  },
  'Riesgo Crítico': {
    maxScore: 100,
    tasaBase: 0.18,
    engancheMinimo: 0.25,
    prestamoMaximo: 2000000,
    descripcion: 'Riesgo muy alto - Evaluación especial requerida',
    color: '#dc2626'
  }
};

export class ModeloRiesgoTerrenos {
  constructor() {
    this.ponderaciones = PONDERACIONES;
    this.umbrales = UMBRALES_RIESGO;
    this.version = "1.0 Final";
  }

  calcularPuntajeRiesgo(datos) {
    const puntajes = {};
    let puntajeTotal = 0;

    // Factor: Edad
    if (datos.rangoEdad && this.ponderaciones.edad[datos.rangoEdad] !== undefined) {
      puntajes.edad = this.ponderaciones.edad[datos.rangoEdad];
      puntajeTotal += puntajes.edad;
    } else {
      puntajes.edad = 0;
    }

    // Factor: Rango de Ingresos
    if (datos.rangoIngresos && this.ponderaciones.rangoIngresos[datos.rangoIngresos] !== undefined) {
      puntajes.rangoIngresos = this.ponderaciones.rangoIngresos[datos.rangoIngresos];
      puntajeTotal += puntajes.rangoIngresos;
    } else {
      puntajes.rangoIngresos = 0;
    }

    // Factor: Tipo de Ingreso
    if (datos.tipoIngreso && this.ponderaciones.tipoIngreso[datos.tipoIngreso] !== undefined) {
      puntajes.tipoIngreso = this.ponderaciones.tipoIngreso[datos.tipoIngreso];
      puntajeTotal += puntajes.tipoIngreso;
    } else {
      puntajes.tipoIngreso = 0;
    }

    // Factor: Plazo del Crédito
    const plazoKey = `${datos.plazoAnios} años`;
    if (this.ponderaciones.plazoAnios[plazoKey] !== undefined) {
      puntajes.plazoAnios = this.ponderaciones.plazoAnios[plazoKey];
      puntajeTotal += puntajes.plazoAnios;
    } else {
      puntajes.plazoAnios = 0;
    }

    // Factor: Porcentaje de Enganche
    const enganche = datos.enganchePorcentaje || 15;
    const enganchesDisponibles = Object.keys(this.ponderaciones.enganchePorcentaje).map(Number);
    const engancheCercano = enganchesDisponibles.reduce((prev, curr) => 
      Math.abs(curr - enganche) < Math.abs(prev - enganche) ? curr : prev
    );
    puntajes.enganchePorcentaje = this.ponderaciones.enganchePorcentaje[engancheCercano];
    puntajeTotal += puntajes.enganchePorcentaje;

    // Factor: Zona del Lote
    if (datos.zonaLote && this.ponderaciones.zonaLote[datos.zonaLote] !== undefined) {
      puntajes.zonaLote = this.ponderaciones.zonaLote[datos.zonaLote];
      puntajeTotal += puntajes.zonaLote;
    } else {
      puntajes.zonaLote = 0;
    }

    // Factor: Tipo de Crédito
    if (datos.tipoCredito && this.ponderaciones.tipoCredito[datos.tipoCredito] !== undefined) {
      puntajes.tipoCredito = this.ponderaciones.tipoCredito[datos.tipoCredito];
      puntajeTotal += puntajes.tipoCredito;
    } else {
      puntajes.tipoCredito = 0;
    }

    // Factor: Código Postal (valor por defecto)
    puntajes.codigoPostal = 3;
    puntajeTotal += puntajes.codigoPostal;

    return {
      puntajeTotal,
      desglose: puntajes
    };
  }

  determinarNivelRiesgo(puntaje) {
    for (const [nivel, config] of Object.entries(this.umbrales)) {
      if (puntaje <= config.maxScore) {
        return nivel;
      }
    }
    return 'Riesgo Crítico';
  }

  calcularTasaInteres(nivelRiesgo, puntaje) {
    const tasaBase = this.umbrales[nivelRiesgo].tasaBase;
    
    // Ajuste mínimo basado en posición dentro del rango
    const niveles = Object.keys(this.umbrales);
    const nivelIndex = niveles.indexOf(nivelRiesgo);
    
    let rangoMin = 0;
    if (nivelIndex > 0) {
      rangoMin = this.umbrales[niveles[nivelIndex - 1]].maxScore;
    }
    
    const rangoMax = this.umbrales[nivelRiesgo].maxScore;
    
    let posicionRelativa = 0;
    if (rangoMax - rangoMin > 0) {
      posicionRelativa = (puntaje - rangoMin) / (rangoMax - rangoMin);
    }
    
    // Ajuste adicional máximo de 0.5%
    const ajusteAdicional = posicionRelativa * 0.005;
    
    return tasaBase + ajusteAdicional;
  }

  calcularMensualidad(montoPrestamo, tasaAnual, plazoAnios, frecuenciaPago = 'Mensual') {
    let tasaPeriodica, numPagos;
    
    if (frecuenciaPago === 'Mensual') {
      tasaPeriodica = tasaAnual / 12;
      numPagos = plazoAnios * 12;
    } else if (frecuenciaPago === 'Bimestral') {
      tasaPeriodica = tasaAnual / 6;
      numPagos = plazoAnios * 6;
    } else { // Anual
      tasaPeriodica = tasaAnual;
      numPagos = plazoAnios;
    }

    if (tasaPeriodica > 0 && numPagos > 0) {
      const mensualidad = montoPrestamo * (tasaPeriodica * Math.pow(1 + tasaPeriodica, numPagos)) / 
                         (Math.pow(1 + tasaPeriodica, numPagos) - 1);
      return mensualidad;
    } else {
      return montoPrestamo / Math.max(numPagos, 1);
    }
  }

  calcularROI(datos, resultado) {
    /**
     * Calcula el ROI y análisis de inversión del terreno
     */
    const precioTerreno = datos.precioFinal || 1000000;
    const totalPagado = resultado.calculoFinanciero.totalPagado;
    const plusvaliaAnual = 0.128; // 12.8% anual
    const añosAnalisis = [1, 3, 5, 10];
    
    // Cálculo de plusvalía año por año
    const proyeccionPlusvalia = [];
    
    añosAnalisis.forEach(años => {
      const valorTerreno = precioTerreno * Math.pow(1 + plusvaliaAnual, años);
      const gananciaTotal = valorTerreno - precioTerreno;
      const roiPorcentaje = ((valorTerreno - precioTerreno) / precioTerreno) * 100;
      const plusvaliaAcumulada = ((valorTerreno / precioTerreno) - 1) * 100;
      
      proyeccionPlusvalia.push({
        años,
        valorTerreno: Math.round(valorTerreno),
        valorInicial: precioTerreno,
        gananciaTotal: Math.round(gananciaTotal),
        roiPorcentaje: Math.round(roiPorcentaje * 100) / 100,
        plusvaliaAcumulada: Math.round(plusvaliaAcumulada * 100) / 100,
        plusvaliaAnualPromedio: Math.round((plusvaliaAcumulada / años) * 100) / 100
      });
    });
    
    // Cálculos adicionales
    const valorProyectado10años = proyeccionPlusvalia[3].valorTerreno;
    const ganancia10años = proyeccionPlusvalia[3].gananciaTotal;
    const promedioMensualPlusvalia = Math.round((ganancia10años / (10 * 12)) * 100) / 100;
    const promedioMensualValor = Math.round(((valorProyectado10años - precioTerreno) / (10 * 12)) * 100) / 100;
    
    // Comparación con el costo del crédito
    const costoCredito = resultado.calculoFinanciero.totalIntereses;
    const gananciaVsCosto = ganancia10años / costoCredito;
    
    return {
      proyeccionPlusvalia,
      metricas: {
        plusvaliaAnualPorcentaje: plusvaliaAnual * 100,
        promedioMensualPlusvalia,
        promedioMensualValor,
        gananciaVsCosto: Math.round(gananciaVsCosto * 100) / 100,
        multiplicadorInversion: Math.round((valorProyectado10años / totalPagado) * 100) / 100,
        roiAnualPromedio: Math.round((ganancia10años / precioTerreno / 10) * 100 * 100) / 100
      },
      resumen: {
        inversionInicial: resultado.condicionesCredito.valorEnganche,
        totalPagado,
        costoCredito,
        valorActual: precioTerreno,
        valorProyectado10años,
        ganancia10años
      }
    };
  }

  simularCreditoCompleto(datos) {
    // Cálculo de riesgo
    const resultadoPuntaje = this.calcularPuntajeRiesgo(datos);
    const puntajeRiesgo = resultadoPuntaje.puntajeTotal;
    const desglosePuntaje = resultadoPuntaje.desglose;
    
    const nivelRiesgo = this.determinarNivelRiesgo(puntajeRiesgo);
    const tasaInteres = this.calcularTasaInteres(nivelRiesgo, puntajeRiesgo);
    
    // Parámetros del nivel de riesgo
    const configRiesgo = this.umbrales[nivelRiesgo];
    const engancheMinimo = configRiesgo.engancheMinimo;
    const prestamoMaximo = configRiesgo.prestamoMaximo;
    
    // Cálculos financieros
    const precioTerreno = datos.precioFinal || 1000000;
    const porcentajeEnganche = (datos.enganchePorcentaje || 15) / 100;
    const valorEnganche = precioTerreno * porcentajeEnganche;
    let montoPrestamo = precioTerreno - valorEnganche;
    
    // Validaciones
    const mensajes = [];
    if (porcentajeEnganche < engancheMinimo) {
      mensajes.push(`Enganche mínimo requerido para riesgo ${nivelRiesgo}: ${(engancheMinimo * 100).toFixed(0)}%`);
    }
    
    if (montoPrestamo > prestamoMaximo) {
      mensajes.push(`Monto máximo de préstamo para riesgo ${nivelRiesgo}: $${prestamoMaximo.toLocaleString()}`);
      montoPrestamo = Math.min(montoPrestamo, prestamoMaximo);
    }
    
    // Cálculo de mensualidad
    const plazoAnios = datos.plazoAnios || 3;
    const frecuencia = datos.frecuenciaPago || 'Mensual';
    const pagoPeriodicoPrincipal = this.calcularMensualidad(montoPrestamo, tasaInteres, plazoAnios, frecuencia);
    
    // Cálculo de totales
    let numeroPagos;
    if (frecuencia === 'Mensual') {
      numeroPagos = plazoAnios * 12;
    } else if (frecuencia === 'Bimestral') {
      numeroPagos = plazoAnios * 6;
    } else {
      numeroPagos = plazoAnios;
    }
    
    const totalPagado = valorEnganche + (pagoPeriodicoPrincipal * numeroPagos);
    const totalIntereses = (pagoPeriodicoPrincipal * numeroPagos) - montoPrestamo;
    const costoCredito = montoPrestamo > 0 ? totalIntereses / montoPrestamo : 0;
    
    return {
      evaluacionRiesgo: {
        puntajeTotal: puntajeRiesgo,
        desglosePuntaje,
        nivelRiesgo,
        descripcionRiesgo: configRiesgo.descripcion,
        colorRiesgo: configRiesgo.color,
        tasaInteres
      },
      condicionesCredito: {
        engancheMinimo,
        prestamoMaximo,
        precioTerreno,
        porcentajeEnganche,
        valorEnganche,
        montoPrestamo,
        plazoAnios,
        frecuenciaPago: frecuencia
      },
      calculoFinanciero: {
        pagoPeriodicoPrincipal,
        numeroPagos: Math.round(numeroPagos),
        totalPagado,
        totalIntereses,
        costoCredito,
        frecuenciaPago: frecuencia
      },
      mensajes,
      fechaSimulacion: new Date().toLocaleString('es-MX'),
      versionModelo: this.version
    };
  }

  simularCreditoConROI(datos) {
    /**
     * Realiza simulación completa incluyendo análisis de ROI
     */
    const resultadoCredito = this.simularCreditoCompleto(datos);
    const analisisROI = this.calcularROI(datos, resultadoCredito);
    
    return {
      ...resultadoCredito,
      analisisROI
    };
  }
}

// Función de utilidad para uso directo
export function simularCreditoTerreno(datos) {
  const modelo = new ModeloRiesgoTerrenos();
  return modelo.simularCreditoCompleto(datos);
}

// Exportar constantes para uso en componentes
export { PONDERACIONES, UMBRALES_RIESGO };

