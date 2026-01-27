import ServicioGuideTemplate from './ServicioGuideTemplate'
import { Microscope } from 'lucide-react'

/**
 * TeseoInversionGuide - Guía para Análisis de Inversión
 * Basado en caso real: Cancha de Pádel en Pachuca
 */

const TeseoInversionGuide = () => {

  const steps = [
    {
      titulo: 'Kick-off y Definición de Alcance',
      descripcion: 'Definimos el proyecto de inversión, monto de capital disponible, ROI esperado, horizonte de retorno y restricciones específicas del inversionista.',
      timing: '2-3 días',
      tips: [
        'Define claramente el monto de inversión disponible',
        'Establece ROI mínimo aceptable (ej: 50% a 3 años)',
        'Especifica horizonte de inversión (corto, mediano, largo plazo)',
        'Comparte expectativas de flujo de caja y liquidez'
      ],
      icon: 'FileText',
      color: 'success'
    },
    {
      titulo: 'Análisis Demográfico y de Demanda',
      descripcion: 'Estudiamos población objetivo, patrones de consumo, capacidad de pago y preferencias del mercado meta mediante encuestas y análisis de datos INEGI, MOPRADEF y fuentes sectoriales.',
      timing: '4-6 días',
      tips: [
        'Análisis demográfico: edad, género, NSE del mercado objetivo',
        'Estudio de hábitos: frecuencia, horarios, preferencias',
        'Capacidad de gasto y disposición a pagar',
        'Tamaño de mercado potencial y addressable'
      ],
      icon: 'Users',
      color: 'tech'
    },
    {
      titulo: 'Análisis Competitivo y de Mercado',
      descripcion: 'Mapeo completo de competencia directa e indirecta: precios, servicios, ubicaciones, fortalezas/debilidades. Identificación de gaps de mercado y oportunidades de diferenciación.',
      timing: '3-4 días',
      tips: [
        'Inventario de competidores (directos e indirectos)',
        'Análisis de precios y modelos de negocio',
        'Evaluación de servicios y amenidades ofrecidas',
        'Identificación de ventajas competitivas potenciales'
      ],
      icon: 'Target',
      color: 'warning'
    },
    {
      titulo: 'Modelo Financiero Completo',
      descripcion: 'Construcción de modelo financiero detallado: inversión inicial, costos fijos/variables, proyección de ingresos, flujos de caja, punto de equilibrio, ROI, VPN, TIR y análisis de sensibilidad.',
      timing: '5-7 días',
      tips: [
        'Inversión inicial: infraestructura, equipo, permisos',
        'Costos operativos: RRHH, servicios, mantenimiento',
        'Proyección de ingresos conservadora, base y optimista',
        'Análisis de punto de equilibrio operativo y financiero'
      ],
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      titulo: 'Análisis Multi-Escenario',
      descripcion: 'Evaluamos 3 escenarios (pesimista, base, optimista) con diferentes supuestos de demanda, precios y costos. Simulaciones Monte Carlo para distribución de resultados y probabilidad de éxito.',
      timing: '2-3 días',
      tips: [
        'Escenario Base: supuestos más probables (60% probabilidad)',
        'Escenario Optimista: alta demanda, precios premium (20%)',
        'Escenario Pesimista: baja adopción, guerra de precios (20%)',
        'Monte Carlo: 10K iteraciones para rango de ROI esperado'
      ],
      icon: 'Shield',
      color: 'tech'
    },
    {
      titulo: 'Entrega de Reporte y Sesión Ejecutiva',
      descripcion: 'Reporte PDF ejecutivo (60-80 págs), modelo financiero editable en Excel, presentación PPT (30 slides) y sesión de Q&A de 2h con recomendaciones finales GO/NO GO.',
      timing: '2 días',
      tips: [
        'Reporte: análisis completo con recomendación clara',
        'Excel: modelo financiero 100% editable para what-if',
        'PPT: presentación ejecutiva para inversionistas/socios',
        'Sesión Q&A: resolución de dudas y ajustes finales'
      ],
      icon: 'Award',
      color: 'success'
    }
  ]

  const methodology = {
    title: 'Metodología de Análisis de Inversión',
    subtitle: 'Framework riguroso con enfoque bottom-up y validación de supuestos',
    dataTitle: 'Fuentes de Datos Primarias y Secundarias',
    dataDescription: 'Combinamos datos oficiales con investigación de campo propia para validar supuestos y proyecciones.',
    dataSources: [
      'INEGI: Censos, DENUE, ENOE, estadísticas demográficas y económicas',
      'MOPRADEF: Módulo de Práctica Deportiva y Ejercicio Físico (para caso pádel)',
      'Google Maps y trabajo de campo: mapeo de competencia y verificación',
      'Encuestas propias: 200+ respuestas para validar demanda y preferencias',
      'DataMéxico: salarios, empleo, actividad económica regional',
      'Fuentes sectoriales: asociaciones, estudios de mercado, benchmarks',
      'Entrevistas con operadores: validación de costos y operación'
    ],
    modelTitle: 'Modelo Financiero y Econométrico',
    modelDescription: 'Construimos modelo financiero completo con proyecciones conservadoras y análisis de riesgo robusto.',
    techniques: [
      'Modelo de ingresos bottom-up: demanda × frecuencia × precio × tasa de conversión',
      'Análisis de punto de equilibrio operativo y financiero',
      'Cálculo de ROI, VPN, TIR con tasa de descuento ajustada al riesgo',
      'Flujos de caja proyectados (5-10 años) con estacionalidad',
      'Análisis de sensibilidad: elasticidad precio-demanda, costos, mix de ingresos',
      'Simulaciones Monte Carlo (10K iteraciones) para distribución de ROI',
      'Análisis de escenarios: pesimista, base, optimista'
    ],
    precision: {
      description: 'Validamos modelos con casos históricos y ajustamos supuestos con datos de campo.',
      metrics: [
        { value: '60.7% ROI', label: 'Proyección Base Pachuca', description: 'Escenario conservador validado' },
        { value: '18-35 años', label: 'Mercado Objetivo', description: '67% de demanda potencial' },
        { value: '15-20 días', label: 'Tiempo de Entrega', description: 'Análisis completo' }
      ]
    }
  }

  const exampleReports = [
    {
      title: 'Análisis Demográfico - Mercado Objetivo',
      description: 'Segmentación por edad, género y NSE del mercado potencial. Caso Pachuca: 67% del mercado son jóvenes adultos 18-35 años, con sesgo masculino 4:1 que representa oportunidad en segmento femenino.',
      insights: [
        {
          title: 'Segmento Principal: 18-35 años (67%)',
          description: 'Jóvenes adultos representan 2/3 del mercado potencial. Alta disposición a pagar y frecuencia de uso 1-3 veces/semana.'
        },
        {
          title: 'Oportunidad Femenina: Ratio 1:4',
          description: 'Solo 1 de cada 4 jugadores es mujer. Campañas dirigidas y clases de iniciación pueden capturar este segmento desatendido.'
        }
      ]
    },
    {
      title: 'Análisis Competitivo y Precios',
      description: 'Mapeo de competidores con análisis de precios, servicios, horarios y amenidades. Identificación de gaps de mercado y oportunidades de diferenciación.',
      insights: [
        {
          title: 'Rango de Precios: $200-$500/hora',
          description: 'Competencia ofrece $200-$300 en horarios valle, $400-$500 en horarios pico. Oportunidad en precios intermedios con mejor servicio.'
        },
        {
          title: 'Gaps de Servicio Identificados',
          description: 'Mercado demanda: sauna, baños con regadera, vestidores, cafetería. Solo 1 de 4 competidores ofrece estos servicios.'
        }
      ]
    },
    {
      title: 'Modelo Financiero - ROI y Punto de Equilibrio',
      description: 'Proyección de ingresos, costos, flujos de caja y métricas clave (ROI, VPN, TIR, payback). Análisis de sensibilidad y escenarios múltiples.',
      insights: [
        {
          title: 'ROI Base: 60.7% a 5 años',
          description: 'Escenario conservador: 60.7% ROI. Optimista: 98.5%. Pesimista: 28.3%. Payback period: 3.2 años en escenario base.'
        },
        {
          title: 'Punto de Equilibrio: Mes 8',
          description: 'Operación break-even en mes 8 con ocupación 45%. Full capacity (80% ocupación) alcanzable en mes 14-16.'
        }
      ]
    }
  ]

  const deliverables = [
    {
      title: 'Reporte PDF Ejecutivo',
      description: '60-80 páginas con análisis completo: demográfico, competitivo, financiero, recomendaciones GO/NO GO y plan de acción.',
      icon: 'FileText',
      color: 'success',
      details: [
        'Executive Summary con recomendación clara (3 págs)',
        'Análisis demográfico y de demanda (15 págs)',
        'Análisis competitivo y de mercado (12 págs)',
        'Modelo financiero explicado (20 págs)',
        'Análisis de riesgo y sensibilidad (10 págs)',
        'Anexos: metodología, fuentes, encuestas (20 págs)'
      ]
    },
    {
      title: 'Modelo Financiero en Excel',
      description: 'Modelo 100% editable con proyecciones 5-10 años, análisis de sensibilidad, escenarios y dashboards interactivos.',
      icon: 'Database',
      color: 'tech',
      details: [
        'Proyección de ingresos detallada (por servicio/producto)',
        'Estructura de costos fijos y variables',
        'Flujos de caja mensuales y anuales',
        'Cálculo automático de ROI, VPN, TIR, payback',
        'Análisis de sensibilidad multi-variable',
        'Dashboards con gráficas dinámicas'
      ]
    },
    {
      title: 'Presentación PPT Ejecutiva',
      description: '30 slides listos para presentar a inversionistas, socios o consejo directivo.',
      icon: 'Award',
      color: 'teseo',
      details: [
        'Resumen Ejecutivo y Recomendación (5 slides)',
        'Oportunidad de Mercado (8 slides)',
        'Análisis Competitivo (6 slides)',
        'Modelo Financiero y ROI (8 slides)',
        'Riesgos y Mitigación (3 slides)'
      ]
    },
    {
      title: 'Sesión Q&A de 2 Horas',
      description: 'Videollamada para presentar hallazgos, resolver dudas y discutir estrategia de implementación.',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Soporte 60 Días',
      description: 'Acceso directo al equipo por 60 días para actualizaciones, ajustes o nuevas preguntas.',
      icon: 'Shield',
      color: 'tech'
    }
  ]

  const tips = [
    {
      title: 'Sé conservador en proyecciones de ingresos',
      description: 'Mejor sorprender positivamente que decepcionar. Proyecta ocupación/ventas 20-30% por debajo de tu estimado optimista para crear colchón de seguridad.'
    },
    {
      title: 'Valida supuestos con datos de campo',
      description: 'No te quedes solo con escritorio. Visita competencia, habla con clientes potenciales, valida precios. Un cliente hizo esto y descubrió que su target price era 25% muy alto.'
    },
    {
      title: 'Considera estacionalidad y ramp-up',
      description: 'Muy pocos negocios arrancan a full capacity. Modela ramp-up realista (6-18 meses) y considera estacionalidad en tu flujo de caja.'
    },
    {
      title: 'No subestimes costos operativos ocultos',
      description: 'Mantenimiento, reposición, seguros, impuestos... Agrega buffer de 15-20% a costos operativos proyectados para cubrir imprevistos.'
    },
    {
      title: 'Análisis de sensibilidad es tu mejor amigo',
      description: 'Juega con el modelo: ¿Qué pasa si precios bajan 20%? ¿Si costos suben 15%? ¿Si demanda es 30% menor? Conoce tus puntos de quiebre antes de invertir.'
    }
  ]

  const pricing = {
    range: '$150K - $220K MXN',
    description: 'Inversión en análisis que puede evitar pérdidas de millones en proyectos inviables.',
    timeline: '15-20 días hábiles',
    includes: [
      'Reporte PDF Ejecutivo (60-80 páginas)',
      'Modelo financiero Excel 100% editable',
      'Presentación PPT Ejecutiva (30 slides)',
      'Sesión Q&A de 2 horas',
      'Soporte 60 días post-entrega',
      'Análisis de sensibilidad y escenarios',
      'NDA y confidencialidad total'
    ]
  }

  const indiceContent = [
    { id: 'introduccion', titulo: 'Resumen Ejecutivo', icon: 'Book', descripcion: 'Síntesis del análisis con recomendación GO/NO GO, ROI proyectado, riesgos clave y plan de acción. Contexto del proyecto de inversión y objetivos del estudio.' },
    { id: 'proceso', titulo: 'Análisis de Mercado', icon: 'Users', descripcion: 'Estudio demográfico del mercado objetivo: tamaño, segmentación, patrones de consumo, capacidad de pago y preferencias. Estimación de demanda potencial y addressable.' },
    { id: 'metodologia', titulo: 'Análisis Competitivo', icon: 'Target', descripcion: 'Mapeo de competencia directa e indirecta: ubicaciones, precios, servicios, fortalezas/debilidades. Identificación de gaps de mercado y oportunidades de diferenciación.' },
    { id: 'ejemplos', titulo: 'Modelo Financiero', icon: 'TrendingUp', descripcion: 'Proyección completa de ingresos, costos, flujos de caja. Cálculo de ROI, VPN, TIR, punto de equilibrio y payback period. Supuestos explicados y validados.' },
    { id: 'entregables', titulo: 'Análisis de Riesgo', icon: 'Shield', descripcion: 'Evaluación de riesgos clave: mercado, operación, financieros, regulatorios. Análisis de sensibilidad multi-variable y escenarios (pesimista, base, optimista).' },
    { id: 'tips', titulo: 'Recomendaciones', icon: 'Lightbulb', descripcion: 'Recomendación final GO/NO GO con fundamentos. Plan de acción detallado para implementación exitosa. Quick wins y mejores prácticas del sector.' },
    { id: 'pricing', titulo: 'Pricing y Contratación', icon: 'DollarSign', descripcion: 'Inversión de $150K-$220K MXN (15-20 días). Evita pérdidas de $5M-$50M+ en proyectos inviables. ROI del análisis: decisiones informadas valen oro.' }
  ]

  return (
    <ServicioGuideTemplate
      serviceName="Análisis de Inversión"
      tagline="¿Vale la pena invertir? Análisis riguroso de viabilidad financiera con fundamento econométrico."
      description="Estudios de viabilidad financiera con modelos de ROI, VPN, TIR, EBITDA y análisis de sensibilidad. Evaluación de demanda, competencia y proyecciones multi-escenario. Caso de éxito: Cancha de Pádel Pachuca - ROI 60.7% base, 98.5% optimista."
      heroGradient="from-success-500/20 to-tech-500/20"
      icon={Microscope}
      indiceContent={indiceContent}
      steps={steps}
      methodology={methodology}
      exampleReports={exampleReports}
      deliverables={deliverables}
      tips={tips}
      pricing={pricing}
      ctaText="Solicitar Análisis de Inversión"
      ctaLink="https://wa.me/5217713649201?text=Hola,%20me%20interesa%20contratar%20"
    />
  )
}

export default TeseoInversionGuide
