import ServicioGuideTemplate from './ServicioGuideTemplate'
import { BarChart3 } from 'lucide-react'

/**
 * TeseoMercadoGuide - Análisis de Mercado General
 * Para cualquier sector/producto/servicio
 */

const TeseoMercadoGuide = () => {

  const steps = [
    {
      titulo: 'Kick-off y Definición de Alcance',
      descripcion: 'Definimos producto/servicio a analizar, mercado objetivo (geográfico y demográfico), competencia a evaluar, KPIs clave y objetivos estratégicos del análisis.',
      timing: '2-3 días',
      tips: [
        'Define claramente el producto/servicio a analizar',
        'Especifica mercado geográfico (nacional, estatal, municipal)',
        'Identifica segmento demográfico objetivo (edad, NSE, etc.)',
        'Establece objetivos: lanzamiento, expansión, pricing, etc.'
      ],
      icon: 'FileText',
      color: 'tech'
    },
    {
      titulo: 'Análisis Demográfico y Socioeconómico',
      descripcion: 'Estudiamos población objetivo: tamaño, crecimiento, distribución por edad/género/NSE, ingresos, empleo, patrones de consumo y tendencias demográficas relevantes.',
      timing: '4-5 días',
      tips: [
        'Análisis demográfico: población, edad, género, crecimiento',
        'Análisis socioeconómico: NSE, ingresos, empleo, educación',
        'Patrones de consumo y preferencias',
        'Tendencias demográficas: urbanización, migración, etc.'
      ],
      icon: 'Users',
      color: 'tech'
    },
    {
      titulo: 'Evaluación de Tamaño de Mercado',
      descripcion: 'Estimamos TAM (Total Addressable Market), SAM (Serviceable Addressable Market) y SOM (Serviceable Obtainable Market) con metodologías bottom-up y top-down.',
      timing: '4-5 días',
      tips: [
        'TAM: mercado total teórico (todos los clientes potenciales)',
        'SAM: mercado direccionable (tu target específico)',
        'SOM: mercado capturables (realista en 1-3 años)',
        'Validación con datos de mercados comparables'
      ],
      icon: 'Target',
      color: 'success'
    },
    {
      titulo: 'Análisis Competitivo Profundo',
      descripcion: 'Mapeo de competencia directa e indirecta: players clave, participación de mercado, precios, propuesta de valor, fortalezas/debilidades, estrategias y posicionamiento.',
      timing: '5-6 días',
      tips: [
        'Inventario de competidores (directos e indirectos)',
        'Análisis de participación de mercado',
        'Benchmarking de precios, servicios, calidad',
        'Evaluación de ventajas competitivas y barreras de entrada'
      ],
      icon: 'Shield',
      color: 'warning'
    },
    {
      titulo: 'Proyecciones de Demanda',
      descripcion: 'Proyectamos demanda futura con modelos econométricos, análisis de tendencias, drivers de crecimiento y escenarios múltiples (conservador, base, optimista).',
      timing: '4-5 días',
      tips: [
        'Modelos de demanda con variables macro y micro',
        'Identificación de drivers de crecimiento/contracción',
        'Análisis de estacionalidad y ciclicidad',
        'Escenarios múltiples con probabilidades'
      ],
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      titulo: 'Entrega de Reporte y Recomendaciones',
      descripcion: 'Reporte PDF de 60-80 páginas con análisis completo, dashboards interactivos, presentación PPT (35 slides) y sesión Q&A de 2h con recomendaciones estratégicas.',
      timing: '3-4 días',
      tips: [
        'Reporte: 60-80 págs con análisis completo',
        'Dashboards: KPIs interactivos en Excel',
        'PPT: 35 slides ejecutivos para stakeholders',
        'Sesión Q&A: recomendaciones estratégicas'
      ],
      icon: 'Award',
      color: 'tech'
    }
  ]

  const methodology = {
    title: 'Framework de Análisis de Mercado',
    subtitle: 'Metodología probada en +200 análisis sectoriales desde 2006',
    dataTitle: 'Fuentes de Datos (50+ Bases)',
    dataDescription: 'Integramos datos oficiales con investigación primaria para insights precisos y accionables.',
    dataSources: [
      'INEGI: Censos, DENUE, ENOE, estadísticas sectoriales y demográficas',
      'DataMéxico: Secretaría de Economía, datos sectoriales y regionales',
      'Banxico: Indicadores macroeconómicos, inflación, tasas, tipo de cambio',
      'IMCO: Índice de Competitividad Estatal y Municipal',
      'Asociaciones sectoriales: datos de industria específicos',
      'Google Trends, redes sociales: análisis de interés y tendencias',
      'Encuestas propias: validación de demanda y preferencias',
      'Trabajo de campo: visitas, entrevistas, mystery shopping'
    ],
    modelTitle: 'Modelos de Proyección de Mercado',
    modelDescription: 'Aplicamos modelos estadísticos y econométricos para proyecciones rigurosas.',
    techniques: [
      'Estimación TAM/SAM/SOM con metodologías bottom-up y top-down',
      'Modelos de penetración de mercado por segmento',
      'Análisis de elasticidades precio-demanda',
      'Proyecciones con series temporales y regresiones',
      'Análisis de estacionalidad y tendencias',
      'Segmentación de mercado con análisis cluster',
      'Escenarios múltiples: conservador (20%), base (60%), optimista (20%)'
    ],
    precision: {
      description: 'Validamos proyecciones con casos históricos y ajustamos modelos continuamente.',
      metrics: [
        { value: '<5% Error', label: 'Precisión Proyecciones', description: 'Error promedio <5% vs demanda real' },
        { value: '+200 Análisis', label: 'Experiencia', description: 'Desde 2006 en múltiples sectores' },
        { value: '50+ Fuentes', label: 'Bases de Datos', description: 'Ecosistema completo integrado' }
      ]
    }
  }

  const exampleReports = [
    {
      title: 'Tamaño de Mercado - TAM/SAM/SOM',
      description: 'Estimación rigurosa de mercado total, direccionable y capturable con metodologías validadas y benchmarks sectoriales.',
      insights: [
        {
          title: 'TAM: Mercado Total',
          description: 'Estimación top-down del mercado total teórico. Ej: Mercado pádel México = población objetivo × penetración deporte × propensión pádel.'
        },
        {
          title: 'SAM/SOM: Mercado Realista',
          description: 'SAM: tu target específico (geográfico, demográfico). SOM: capturable en 1-3 años considerando competencia, recursos y barreras.'
        }
      ]
    },
    {
      title: 'Análisis Competitivo - Market Share',
      description: 'Mapeo de competencia con participación de mercado, posicionamiento, estrategias y evaluación de ventajas competitivas.',
      insights: [
        {
          title: 'Landscape Competitivo',
          description: 'Identificación de players clave, market share estimado, segmentos atendidos y propuesta de valor diferenciada.'
        },
        {
          title: 'Gaps de Mercado',
          description: 'Identificación de segmentos desatendidos, necesidades no cubiertas y oportunidades de diferenciación vs competencia.'
        }
      ]
    },
    {
      title: 'Proyección de Demanda',
      description: 'Proyección de demanda futura con drivers identificados, análisis de sensibilidad y escenarios múltiples.',
      insights: [
        {
          title: 'Crecimiento Proyectado',
          description: 'CAGR proyectado con drivers fundamentales identificados: demográficos, económicos, tecnológicos, regulatorios.'
        },
        {
          title: 'Escenarios Múltiples',
          description: 'Conservador (baja adopción), Base (crecimiento esperado), Optimista (alto crecimiento). Probabilidades asignadas para valor esperado.'
        }
      ]
    }
  ]

  const deliverables = [
    {
      title: 'Reporte PDF Ejecutivo',
      description: '60-80 páginas con análisis completo: demográfico, tamaño de mercado, competencia, proyecciones y recomendaciones estratégicas.',
      icon: 'FileText',
      color: 'tech',
      details: [
        'Executive Summary con hallazgos clave (4 págs)',
        'Análisis demográfico y socioeconómico (12 págs)',
        'Tamaño de mercado TAM/SAM/SOM (10 págs)',
        'Análisis competitivo profundo (15 págs)',
        'Proyecciones de demanda (12 págs)',
        'Recomendaciones estratégicas (7 págs)',
        'Anexos: metodología, fuentes (20 págs)'
      ]
    },
    {
      title: 'Dashboards Interactivos Excel',
      description: 'KPIs de mercado, proyecciones editables, análisis de sensibilidad y gráficas dinámicas.',
      icon: 'Database',
      color: 'success',
      details: [
        'KPIs de mercado dinámicos',
        'Proyecciones editables (TAM/SAM/SOM)',
        'Análisis de sensibilidad multi-variable',
        'Gráficas interactivas automáticas'
      ]
    },
    {
      title: 'Presentación PPT Ejecutiva',
      description: '35 slides ejecutivos con hallazgos clave, recomendaciones y plan de acción.',
      icon: 'Award',
      color: 'tech',
      details: [
        'Resumen Ejecutivo (6 slides)',
        'Oportunidad de Mercado (10 slides)',
        'Landscape Competitivo (8 slides)',
        'Proyecciones y Escenarios (7 slides)',
        'Recomendaciones (4 slides)'
      ]
    },
    {
      title: 'Sesión Q&A de 2 Horas',
      description: 'Presentación de hallazgos y discusión de implicaciones estratégicas con equipo directivo.',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Soporte 60 Días',
      description: 'Acceso al equipo para consultas, actualizaciones o ajustes al análisis.',
      icon: 'Shield',
      color: 'tech'
    }
  ]

  const tips = [
    {
      title: 'Define tu target con precisión quirúrgica',
      description: 'No digas "México", di "NSE C+ y B en ZM Monterrey, 25-45 años". Un cliente ajustó target así y descubrió que su SOM real era 3X más pequeño pero 5X más rentable.'
    },
    {
      title: 'Valida TAM con múltiples metodologías',
      description: 'Triangula: top-down (mercado total × penetración), bottom-up (segmentos sumados), análogos (mercados comparables). Si los 3 convergen, confía en el número.'
    },
    {
      title: 'No subestimes competencia indirecta',
      description: 'Cliente de gyms solo vio otros gyms, ignoró clases online, apps fitness, parques. Cuando los incluyó, SOM cayó 40%. Mejor saber antes que después.'
    },
    {
      title: 'Usa análisis para fundraising o partners',
      description: 'Startup usó nuestro análisis en pitch deck, mostró TAM $500M, SAM $80M, SOM $5M año 3. Levantó $2M seed. Inversionistas aman ver análisis riguroso vs números inflados.'
    },
    {
      title: 'Actualiza cada 12-18 meses mínimo',
      description: 'Mercados cambian rápido: nuevos competidores, cambios regulatorios, shifts demográficos. Cliente actualiza anualmente y ha pivotado 2 veces exitosamente gracias a insights frescos.'
    }
  ]

  const pricing = {
    range: '$180K - $280K MXN',
    description: 'Perspectiva completa de mercado que informa estrategia comercial y de producto.',
    timeline: '18-22 días hábiles',
    includes: [
      'Reporte PDF de 60-80 páginas',
      'Dashboards Excel interactivos',
      'Presentación PPT de 35 slides',
      'Sesión Q&A de 2 horas',
      'Soporte 60 días post-entrega',
      'Análisis de escenarios múltiples',
      'NDA y confidencialidad total'
    ]
  }

  const indiceContent = [
    { id: 'introduccion', titulo: 'Resumen Ejecutivo', icon: 'Book', descripcion: 'Síntesis del análisis con hallazgos clave, tamaño de mercado (TAM/SAM/SOM), landscape competitivo y recomendaciones estratégicas. Contexto y objetivos del estudio.' },
    { id: 'proceso', titulo: 'Análisis Demográfico', icon: 'Users', descripcion: 'Población objetivo: tamaño, distribución por edad/género/NSE, ingresos, empleo, patrones de consumo. Tendencias demográficas relevantes y segmentación detallada.' },
    { id: 'metodologia', titulo: 'Tamaño de Mercado', icon: 'Target', descripcion: 'Estimación rigurosa de TAM (total), SAM (direccionable) y SOM (capturable) con metodologías bottom-up, top-down y benchmarks. Validación cruzada de supuestos.' },
    { id: 'ejemplos', titulo: 'Análisis Competitivo', icon: 'Shield', descripcion: 'Mapeo de competencia directa e indirecta: market share, posicionamiento, precios, propuesta de valor, fortalezas/debilidades. Identificación de gaps y oportunidades.' },
    { id: 'entregables', titulo: 'Proyecciones de Demanda', icon: 'TrendingUp', descripcion: 'Proyección de demanda futura con drivers identificados, análisis de estacionalidad, elasticidades y escenarios múltiples (conservador, base, optimista) con probabilidades.' },
    { id: 'tips', titulo: 'Recomendaciones Estratégicas', icon: 'Lightbulb', descripcion: 'Recomendaciones de estrategia de entrada, segmentos prioritarios, propuesta de valor, pricing, canales de distribución. Plan de acción detallado y quick wins identificados.' },
    { id: 'pricing', titulo: 'Pricing y Contratación', icon: 'DollarSign', descripcion: 'Inversión $180K-$280K MXN (18-22 días). Perspectiva de mercado que informa decisiones estratégicas de producto, pricing, go-to-market. ROI: decisiones informadas vs intuición.' }
  ]

  return (
    <ServicioGuideTemplate
      serviceName="Análisis de Mercado"
      tagline="Inteligencia de mercado para decisiones estratégicas informadas."
      description="Estudios de mercado completos con análisis demográfico, económico, competitivo y proyecciones de demanda. Identificación de segmentos objetivo y estrategias de entrada. Aplicable a cualquier sector, producto o servicio."
      heroGradient="from-tech-500/20 to-success-500/20"
      icon={BarChart3}
      indiceContent={indiceContent}
      steps={steps}
      methodology={methodology}
      exampleReports={exampleReports}
      deliverables={deliverables}
      tips={tips}
      pricing={pricing}
      ctaText="Solicitar Análisis de Mercado"
      ctaLink="https://wa.me/5217713649201?text=Hola,%20me%20interesa%20contratar%20"
    />
  )
}

export default TeseoMercadoGuide
