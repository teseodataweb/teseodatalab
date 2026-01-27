import ServicioGuideTemplate from './ServicioGuideTemplate'
import { Factory } from 'lucide-react'

/**
 * TeseoMercadoIndustrialGuide - Análisis de Mercado Industrial
 * Basado en casos reales: Mercado del Acero y Concreto en México
 */

const TeseoMercadoIndustrialGuide = () => {

  const steps = [
    {
      titulo: 'Kick-off y Definición de Industria',
      descripcion: 'Definimos la industria objetivo, productos/segmentos específicos, geografía de interés, horizonte temporal del análisis y KPIs clave a analizar.',
      timing: '2-3 días',
      tips: [
        'Define claramente el sector industrial (ej: acero, concreto, automotriz)',
        'Especifica productos/segmentos de interés',
        'Determina alcance geográfico (nacional, regional, estatal)',
        'Establece horizon time: 3, 5 o 10 años'
      ],
      icon: 'FileText',
      color: 'warning'
    },
    {
      titulo: 'Recopilación Masiva de Datos',
      descripcion: 'Integramos +3M puntos de datos de 50+ fuentes: INEGI, asociaciones industriales, Bloomberg, BBVA Research, datos propietarios. Procesamos producción, comercio, precios, capacidad instalada.',
      timing: '6-8 días',
      tips: [
        'Datos de producción: volúmenes, capacidad, utilización',
        'Datos de comercio: importaciones, exportaciones, balanza',
        'Datos de precios: históricos, spot, forward, spreads',
        'Datos macroeconómicos: PMI, PIB, inversión, empleo'
      ],
      icon: 'Database',
      color: 'tech'
    },
    {
      titulo: 'Análisis de Oferta y Demanda',
      descripcion: 'Modelamos balance oferta-demanda con elasticidades sectoriales. Evaluamos capacidad instalada, utilización, productores clave, concentración de mercado y dinámica competitiva.',
      timing: '5-7 días',
      tips: [
        'Análisis de demanda por sector usuario (construcción, automotriz, etc.)',
        'Evaluación de oferta: capacidad, utilización, flexibilidad',
        'Concentración de mercado: HHI, market share top players',
        'Proyección de balance con modelos econométricos'
      ],
      icon: 'TrendingUp',
      color: 'warning'
    },
    {
      titulo: 'Proyecciones con Modelos Econométricos',
      descripcion: 'Aplicamos modelos de cointegración, series temporales (ARIMA), regresiones multivariables y simulaciones Monte Carlo para proyectar volúmenes, precios y valor de mercado.',
      timing: '6-8 días',
      tips: [
        'Modelos de series temporales para proyección de demanda',
        'Análisis de cointegración precio-costo',
        'Regresiones con variables macro (PMI, PIB, tipo de cambio)',
        'Monte Carlo: 10K iteraciones para intervalos de confianza'
      ],
      icon: 'LineChart',
      color: 'tech'
    },
    {
      titulo: 'Análisis Competitivo y Benchmarking',
      descripcion: 'Evaluamos players clave, participación de mercado, ventajas competitivas, costos, márgenes, estrategias y posicionamiento. Identificamos tendencias de consolidación o fragmentación.',
      timing: '4-5 días',
      tips: [
        'Perfil de top players: capacidad, tecnología, costos',
        'Análisis de márgenes EBITDA por player',
        'Estrategias competitivas: integración vertical, diversificación',
        'Análisis de fusiones/adquisiciones recientes'
      ],
      icon: 'Target',
      color: 'warning'
    },
    {
      titulo: 'Entrega de Reporte Completo',
      descripcion: 'Reporte PDF de 80-120 páginas con análisis exhaustivo, proyecciones, escenarios, dashboards interactivos y presentación PPT ejecutiva (50 slides). Sesión Q&A de 2h.',
      timing: '3-4 días',
      tips: [
        'Reporte: 80-120 págs con análisis sector completo',
        'Proyecciones mensuales/anuales 3-10 años',
        'Dashboards Excel interactivos',
        'PPT ejecutiva 50 slides para stakeholders'
      ],
      icon: 'Award',
      color: 'success'
    }
  ]

  const methodology = {
    title: 'Framework Econométrico Propietario',
    subtitle: 'Modelo validado en +100 proyectos industriales con precisión >85%',
    dataTitle: 'Ecosistema de Datos Industriales (50+ Fuentes)',
    dataDescription: 'Integramos el ecosistema más completo de datos industriales en México: +3M puntos de datos actualizados.',
    dataSources: [
      'INEGI: Censos económicos, EMIM, actividad industrial, producción manufacturera',
      'Asociaciones industriales: CANACERO, AMCI, CANACEM, AMIA (datos sectoriales)',
      'Bloomberg Terminal: precios internacionales, commodities, futuros',
      'BBVA Research: proyecciones macroeconómicas, análisis sectorial',
      'Banxico: tipo de cambio, inflación, crédito empresarial, tasas',
      'World Steel Association: estadísticas globales de acero',
      'U.S. Census Bureau: comercio bilateral, importaciones/exportaciones',
      'Bases propietarias: históricos de precios, proyectos, capacidades'
    ],
    modelTitle: 'Modelos Econométricos Avanzados',
    modelDescription: 'Aplicamos las técnicas más robustas de econometría industrial para proyecciones precisas.',
    techniques: [
      'Cointegración de Johansen: relaciones de largo plazo precio-costo',
      'Series temporales ARIMA: proyección de volúmenes y demanda',
      'Regresiones multivariables: elasticidades sector-específicas',
      'Simulaciones Monte Carlo: 10K iteraciones, intervalos de confianza 95%',
      'Análisis de escenarios: base (55%), alcista (25%), bajista (20%)',
      'Modelos de equilibrio parcial: balance oferta-demanda',
      'Análisis de sensibilidad: impacto de variables clave (PMI, tipo de cambio, etc.)'
    ],
    precision: {
      description: 'Validamos modelos con backtesting riguroso y ajustamos con datos reales continuamente.',
      metrics: [
        { value: '87% R²', label: 'Precisión del Modelo', description: 'Explica 87% de variabilidad histórica' },
        { value: '<5% Error', label: 'RMSE Proyecciones', description: 'Error cuadrático medio <5% vs real' },
        { value: '+3M Data Points', label: 'Puntos de Datos', description: '50+ fuentes integradas' }
      ]
    }
  }

  const exampleReports = [
    {
      title: 'Proyección de Mercado - Volumen y Valor',
      description: 'Proyecciones de volumen (toneladas, m³, unidades) y valor ($ MXN, $ USD) con CAGR y drivers de crecimiento identificados. Caso AMCI: mercado concreto 35M m³ (2025), CAGR 3.6%.',
      insights: [
        {
          title: 'Mercado Concreto México: $88B MXN (2025)',
          description: 'Volumen proyectado: 35.2M m³. CAGR 2023-2025: 3.6%. Drivers: infraestructura (40%), vivienda (35%), comercial (25%).'
        },
        {
          title: 'Mercado Acero México: 22.3M tons (2024)',
          description: 'Contracción -2.8% vs 2023. Sectores: automotriz 33%, construcción 27%, manufactura 14%. Proyección 2025: +1.2% recuperación gradual.'
        }
      ]
    },
    {
      title: 'Análisis de Precios y Proyecciones',
      description: 'Proyección mensual de precios con análisis de drivers fundamentales, spreads, oportunidades de arbitraje y factores de riesgo. Caso Acero: proyección HRC $876/ton (jul 2025).',
      insights: [
        {
          title: 'Precio HRC México: $876/ton (Julio 2025)',
          description: 'Proyección base +1.4% vs actual. Drivers: PMI manufacturero recuperación gradual, resolución parcial tensiones comerciales US-MX.'
        },
        {
          title: 'Escenarios Multi-Variable',
          description: 'Base ($876, 55% prob), Alcista ($893, 25%), Bajista ($857, 20%). Spread HRC-CRC: $250/ton (oportunidad procesadores).'
        }
      ]
    },
    {
      title: 'Análisis Competitivo - Market Share',
      description: 'Participación de mercado de players clave, capacidad instalada, utilización, estrategias competitivas y tendencias de consolidación.',
      insights: [
        {
          title: 'Concentración Alta: Top 3 = 75%',
          description: 'Concreto: Cemex 33%, Holcim 20%, GCC 8%. Acero: Ternium, ArcelorMittal, AHMSA controlan 75%. Estructura oligopólica con poder de mercado.'
        },
        {
          title: 'Utilización Capacidad: 84-86%',
          description: 'Utilización promedio 84% (2024), margen para expansión sin CAPEX significativo. Ternium/Holcim >90%, AHMSA 76% (problemas financieros).'
        }
      ]
    }
  ]

  const deliverables = [
    {
      title: 'Reporte PDF Ejecutivo',
      description: '80-120 páginas con análisis exhaustivo del sector: oferta, demanda, precios, competencia, proyecciones y recomendaciones estratégicas.',
      icon: 'FileText',
      color: 'warning',
      details: [
        'Executive Summary con hallazgos clave (5 págs)',
        'Análisis de demanda sectorial (20 págs)',
        'Análisis de oferta y capacidad (15 págs)',
        'Proyecciones econométricas (25 págs)',
        'Análisis competitivo y benchmarking (20 págs)',
        'Anexos: metodología, fuentes, modelos (30 págs)'
      ]
    },
    {
      title: 'Dashboards Interactivos en Excel',
      description: 'Modelos econométricos editables, proyecciones dinámicas, análisis de sensibilidad y gráficas interactivas para escenarios what-if.',
      icon: 'Database',
      color: 'tech',
      details: [
        'Proyecciones mensuales/anuales editables',
        'Análisis de sensibilidad multi-variable',
        'Escenarios personalizables (optimista, base, pesimista)',
        'Dashboards con gráficas dinámicas',
        'Cálculo automático de KPIs sectoriales'
      ]
    },
    {
      title: 'Presentación PPT Ejecutiva',
      description: '50 slides ejecutivos con hallazgos clave, proyecciones, análisis competitivo y recomendaciones para stakeholders.',
      icon: 'Award',
      color: 'success',
      details: [
        'Resumen Ejecutivo (8 slides)',
        'Panorama de Mercado (12 slides)',
        'Proyecciones y Escenarios (15 slides)',
        'Análisis Competitivo (10 slides)',
        'Recomendaciones Estratégicas (5 slides)'
      ]
    },
    {
      title: 'Sesión Q&A de 2 Horas',
      description: 'Presentación de hallazgos con equipo directivo, resolución de dudas y discusión de implicaciones estratégicas.',
      icon: 'Users',
      color: 'tech'
    },
    {
      title: 'Soporte 60 Días + Actualizaciones',
      description: 'Acceso al equipo por 60 días para consultas, actualizaciones de datos o ajustes al análisis.',
      icon: 'Shield',
      color: 'warning'
    }
  ]

  const tips = [
    {
      title: 'Define alcance geográfico claramente',
      description: 'Nacional vs regional hace gran diferencia en datos disponibles y precisión. Un cliente quería análisis "México" pero su mercado real era solo Bajío - ajustamos enfoque y precisión mejoró 40%.'
    },
    {
      title: 'Actualiza análisis cada 18-24 meses',
      description: 'Mercados industriales cambian: nueva capacidad, políticas comerciales, tecnologías. Cliente de acero actualiza cada 18 meses y ha anticipado 3 grandes movimientos de precios.'
    },
    {
      title: 'Usa el análisis para negociaciones',
      description: 'Un distribuidor de concreto usó nuestro análisis en negociación con proveedores, mostró proyecciones de demanda y obtuvo mejores términos. ROI del análisis: 50X en primer año.'
    },
    {
      title: 'Comparte con equipo comercial',
      description: 'Análisis sectorial es gold para ventas. Equipo puede hablar con datos sobre tendencias, oportunidades, amenazas. Cliente compartió con fuerza de ventas y cerraron 3 cuentas grandes en Q1.'
    },
    {
      title: 'Integra en plan estratégico corporativo',
      description: 'Nuestros análisis son tan rigurosos que clientes los integran directamente en strategic planning. Uno presentó a consejo y aprobaron $200M CAPEX basados en nuestras proyecciones.'
    }
  ]

  const pricing = {
    range: '$220K - $350K MXN',
    description: 'Perspectiva completa de industria que informa decisiones estratégicas de millones.',
    timeline: '25-30 días hábiles',
    includes: [
      'Reporte PDF de 80-120 páginas',
      'Dashboards Excel interactivos editables',
      'Presentación PPT de 50 slides',
      'Sesión Q&A de 2 horas',
      'Soporte 60 días + actualizaciones',
      'Análisis de escenarios múltiples',
      'NDA y confidencialidad total'
    ]
  }

  const indiceContent = [
    { id: 'introduccion', titulo: 'Resumen Ejecutivo', icon: 'Book', descripcion: 'Síntesis del análisis sectorial con proyecciones clave, tendencias principales, oportunidades/amenazas y recomendaciones estratégicas. Contexto macroeconómico y sectorial.' },
    { id: 'proceso', titulo: 'Análisis de Demanda', icon: 'TrendingUp', descripcion: 'Demanda por sector usuario (construcción, automotriz, manufactura). Proyecciones con modelos econométricos, elasticidades sectoriales y drivers de crecimiento identificados.' },
    { id: 'metodologia', titulo: 'Análisis de Oferta', icon: 'Factory', descripcion: 'Capacidad instalada, utilización, flexibilidad operativa, productores clave, concentración de mercado. Evaluación de expansiones/cierres planeados y impacto en balance.' },
    { id: 'ejemplos', titulo: 'Proyecciones de Precios', icon: 'LineChart', descripcion: 'Proyección mensual de precios con modelos de cointegración, análisis de spreads, factores de riesgo y oportunidades de arbitraje. Escenarios múltiples validados.' },
    { id: 'entregables', titulo: 'Análisis Competitivo', icon: 'Target', descripcion: 'Market share, estrategias competitivas, costos relativos, márgenes, ventajas competitivas. Análisis de M&A recientes y tendencias de consolidación/fragmentación.' },
    { id: 'tips', titulo: 'Factores Externos', icon: 'Globe', descripcion: 'Impacto de políticas comerciales (aranceles, USMCA), regulaciones ambientales, tipo de cambio, inflación, tasas de interés. Análisis de riesgo geopolítico y comercial.' },
    { id: 'pricing', titulo: 'Pricing y Contratación', icon: 'DollarSign', descripcion: 'Inversión $220K-$350K MXN (25-30 días). Perspectiva sectorial completa que informa decisiones estratégicas de $100M-$1B+. ROI: insights valen millones.' }
  ]

  return (
    <ServicioGuideTemplate
      serviceName="Análisis de Mercado Industrial"
      tagline="Perspectivas de mercado con +3M data points y modelos econométricos rigurosos."
      description="Estudios exhaustivos de mercados industriales con proyecciones econométricas y análisis competitivo profundo. Procesamos +3M puntos de datos de 50+ fuentes para insights accionables. Casos: Mercado del Acero, Concreto en México (AMCI), CAGR 8.3% proyección concreto 2033."
      heroGradient="from-warning-500/20 to-tech-500/20"
      icon={Factory}
      indiceContent={indiceContent}
      steps={steps}
      methodology={methodology}
      exampleReports={exampleReports}
      deliverables={deliverables}
      tips={tips}
      pricing={pricing}
      ctaText="Solicitar Análisis de Mercado Industrial"
      ctaLink="https://wa.me/5217713649201?text=Hola,%20me%20interesa%20contratar%20"
    />
  )
}

export default TeseoMercadoIndustrialGuide
