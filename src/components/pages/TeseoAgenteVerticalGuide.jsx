import ServicioGuideTemplate from './ServicioGuideTemplate'
import { Target } from 'lucide-react'

/**
 * TeseoAgenteVerticalGuide - Prospección de Clientes con IA
 * Basado en caso Sherwin Williams
 */

const TeseoAgenteVerticalGuide = () => {

  const steps = [
    {
      titulo: 'Kick-off y Definición de ICP',
      descripcion: 'Definimos Ideal Customer Profile (ICP): industria, tamaño, ubicación, comportamientos clave. Establecemos criterios de scoring y KPIs de conversión esperados.',
      timing: '2-3 días',
      tips: [
        'Define industria vertical (ej: construcción, manufactura, retail)',
        'Establece criterios firmográficos: tamaño, ubicación, sector',
        'Identifica comportamientos clave de compra',
        'Define KPIs: tasa de conversión esperada, CAC objetivo'
      ],
      icon: 'FileText',
      color: 'teseo'
    },
    {
      titulo: 'Integración de Fuentes de Datos',
      descripcion: 'Integramos datos de DENUE, redes sociales, web scraping, transacciones, comportamiento online y offline. Construimos base de datos unificada con +100K prospectos potenciales.',
      timing: '4-5 días',
      tips: [
        'DENUE: empresas activas por sector y ubicación',
        'LinkedIn: decisores, tamaño de empresa, crecimiento',
        'Web scraping: sitios web, presencia digital, tecnologías',
        'Datos transaccionales: patrones de compra si disponibles'
      ],
      icon: 'Database',
      color: 'tech'
    },
    {
      titulo: 'Modelo de Propensión con ML/IA',
      descripcion: 'Entrenamos modelos de machine learning (Random Forest, XGBoost, Redes Neuronales) para predecir propensión de compra. Score 0-100 por prospecto con probabilidad de conversión.',
      timing: '6-8 días',
      tips: [
        'Feature engineering: +50 variables predictivas',
        'Modelos ML: Random Forest, XGBoost, Neural Networks',
        'Validación: cross-validation, AUC >0.80 objetivo',
        'Calibración de scores para interpretabilidad'
      ],
      icon: 'Target',
      color: 'teseo'
    },
    {
      titulo: 'Segmentación y Priorización',
      descripcion: 'Segmentamos prospectos en tiers (A: alta propensión 80-100, B: media 60-79, C: baja <60). Priorizamos por ROI esperado y probabilidad de conversión.',
      timing: '2-3 días',
      tips: [
        'Tier A (80-100): alta prioridad, contacto inmediato',
        'Tier B (60-79): prioridad media, nurturing campaign',
        'Tier C (<60): low-touch, email automation',
        'Estimación de ROI por tier para optimizar recursos'
      ],
      icon: 'LineChart',
      color: 'success'
    },
    {
      titulo: 'Dashboard de Monitoreo Continuo',
      descripcion: 'Implementamos dashboard interactivo para monitoreo en tiempo real: nuevos leads, conversiones, ROI, rendimiento del modelo. Actualización semanal automática.',
      timing: '3-4 días',
      tips: [
        'Dashboard en tiempo real con leads priorizados',
        'Tracking de conversiones para feedback loop',
        'Análisis de ROI por tier y campaña',
        'Alertas automáticas para leads high-value'
      ],
      icon: 'Monitor',
      color: 'tech'
    },
    {
      titulo: 'Optimización Continua (Ongoing)',
      descripcion: 'Re-entrenamiento mensual del modelo con datos de conversión reales. Ajuste de features, pesos y thresholds para maximizar ROI. Soporte continuo incluido en revenue share.',
      timing: 'Continuo',
      tips: [
        'Re-entrenamiento mensual con datos frescos',
        'A/B testing de features y modelos',
        'Ajuste de scoring basado en conversiones reales',
        'Expansión a nuevos segmentos si ROI positivo'
      ],
      icon: 'Award',
      color: 'teseo'
    }
  ]

  const methodology = {
    title: 'Framework de Prospección con IA',
    subtitle: 'Modelo propietario con >80% AUC validado en múltiples industrias',
    dataTitle: 'Fuentes de Datos y Variables Predictivas',
    dataDescription: 'Integramos +20 fuentes de datos para construir perfil 360° de cada prospecto.',
    dataSources: [
      'DENUE (INEGI): empresas activas, sector, tamaño, ubicación, antigüedad',
      'LinkedIn: decisores, headcount, crecimiento, tecnologías usadas',
      'Web scraping: sitio web, blog, presencia digital, tecnología stack',
      'Google Maps: reseñas, calificación, fotos, popularidad',
      'Redes sociales: actividad, engagement, menciones de marca',
      'Datos transaccionales: histórico de compras (si disponible)',
      'Fuentes públicas: noticias, expansiones, financiamiento',
      'Bases propietarias: scoring histórico, conversiones pasadas'
    ],
    modelTitle: 'Modelos de Machine Learning',
    modelDescription: 'Aplicamos ensemble de modelos de ML para máxima precisión predictiva.',
    techniques: [
      'Feature engineering: +50 variables derivadas (firmográficas, comportamentales, contextuales)',
      'Random Forest: modelo base con importancia de variables interpretable',
      'XGBoost: boosting para capturar interacciones no-lineales',
      'Redes Neuronales: para patrones complejos en datasets grandes',
      'Ensemble: combinación ponderada de modelos para robustez',
      'Calibración: isotonic regression para scores probabilísticos',
      'Validación: 5-fold cross-validation, AUC >0.80, precisión >75%'
    ],
    precision: {
      description: 'Validamos modelos con conversiones reales y optimizamos continuamente.',
      metrics: [
        { value: '>80% AUC', label: 'Precisión del Modelo', description: 'Área bajo curva ROC >0.80' },
        { value: '3-5X ROI', label: 'ROI de Conversión', description: 'vs prospección tradicional' },
        { value: 'Actualización Continua', label: 'Dashboard 24/7', description: 'Leads en tiempo real' }
      ]
    }
  }

  const exampleReports = [
    {
      title: 'Score de Propensión - Segmentación',
      description: 'Score 0-100 para cada prospecto con probabilidad de conversión. Segmentación en tiers A/B/C para priorización de esfuerzos comerciales.',
      insights: [
        {
          title: 'Tier A (Score 80-100): High-Value Leads',
          description: 'Top 15-20% de prospectos con mayor probabilidad de conversión (>50%). Contacto inmediato, atención personalizada, equipo senior.'
        },
        {
          title: 'Tier B (Score 60-79): Nurturing',
          description: '30-40% de prospectos con probabilidad media (25-50%). Campaigns de nurturing, contenido educativo, seguimiento programado.'
        }
      ]
    },
    {
      title: 'Dashboard de Monitoreo - ROI',
      description: 'Dashboard interactivo con KPIs clave: leads generados, conversiones, ROI por tier, rendimiento del modelo. Actualización semanal automática.',
      insights: [
        {
          title: 'ROI por Tier Tracked',
          description: 'Monitoreo de conversión real vs predicción. Tier A: 5X ROI, Tier B: 2.5X ROI, Tier C: 1X ROI (baseline). Ajuste de recursos basado en performance.'
        },
        {
          title: 'Feedback Loop Continuo',
          description: 'Conversiones alimentan modelo para mejora continua. Features más predictivas identificadas y priorizadas. Re-entrenamiento mensual con datos frescos.'
        }
      ]
    },
    {
      title: 'Caso de Éxito: Sherwin Williams',
      description: 'Prospección de clientes potenciales para pinturas industriales. Identificación de constructoras, talleres y desarrolladores con alta propensión de compra.',
      insights: [
        {
          title: 'Segmento Identificado: Constructoras Medianas',
          description: '20-100 empleados, proyectos activos, crecimiento >10% anual. Propensión 85%. ROI conversión: 4.2X vs prospección tradicional.'
        },
        {
          title: 'Resultados: Alto ROI',
          description: 'Conversión tier A: 42% (vs 12% baseline). Conversión tier B: 18% (vs 6%). Reducción CAC en 60%. ROI consolidado: 3.8X.'
        }
      ]
    }
  ]

  const deliverables = [
    {
      title: 'Base de Datos Calificada',
      description: 'Database de prospectos con score de propensión, segmentación tier A/B/C, datos de contacto y perfil completo.',
      icon: 'Database',
      color: 'tech',
      details: [
        'Prospectos calificados: 5K-50K dependiendo de vertical',
        'Score de propensión 0-100 por prospecto',
        'Segmentación tier A/B/C con criterios claros',
        'Datos de contacto: empresa, decisor, email, teléfono',
        'Perfil 360°: firmográfico, comportamental, contextual',
        'Actualización mensual automática'
      ]
    },
    {
      title: 'Dashboard Interactivo 24/7',
      description: 'Plataforma web para monitoreo de leads, conversiones, ROI y rendimiento del modelo en tiempo real.',
      icon: 'Monitor',
      color: 'teseo',
      details: [
        'Acceso web 24/7 a leads priorizados',
        'Filtros avanzados: tier, industria, ubicación, score',
        'KPIs en tiempo real: leads, conversiones, ROI',
        'Exportación de leads para CRM integration',
        'Alertas automáticas para leads high-value',
        'Historial de interacciones tracking'
      ]
    },
    {
      title: 'Reportes Mensuales de Performance',
      description: 'Reporte mensual con análisis de conversiones, ROI, insights del modelo y recomendaciones de optimización.',
      icon: 'FileText',
      color: 'success',
      details: [
        'Análisis de conversiones por tier',
        'ROI consolidado y por segmento',
        'Features más predictivas identificadas',
        'Recomendaciones de optimización',
        'A/B tests realizados y resultados',
        'Plan de acción para próximo mes'
      ]
    },
    {
      title: 'Sesiones de Revisión Trimestrales',
      description: 'Videollamada trimestral para revisar performance, ajustar estrategia y planificar expansiones o pivotes.',
      icon: 'Users',
      color: 'tech'
    },
    {
      title: 'Soporte Continuo',
      description: 'Acceso directo al equipo de data scientists y soporte técnico durante toda la duración del servicio.',
      icon: 'Shield',
      color: 'teseo'
    }
  ]

  const tips = [
    {
      title: 'Empieza con ICP bien definido',
      description: 'Modelo funciona mejor con ICP claro. Cliente empezó con "empresas construcción" (muy amplio), refinó a "constructoras medianas 20-100 empleados, proyectos residenciales" y ROI subió 3X.'
    },
    {
      title: 'Integra conversiones al modelo ASAP',
      description: 'Feedback loop es crítico. Cliente tardó 6 meses en integrar datos de conversión, perdió oportunidad de optimizar. Intégralo desde mes 1 para mejora continua.'
    },
    {
      title: 'No ignores tier B, son volume',
      description: 'Tier A tiene mejor conversión pero tier B tiene 3X más volumen. Cliente se enfocó solo en A, dejó dinero en la mesa. Tier B con nurturing automatizado da ROI positivo.'
    },
    {
      title: 'Usa para priorizar, no para ignorar',
      description: 'Score bajo no significa "ignorar", significa "low-touch". Cliente automatizó tier C con emails y capturó 15% adicional de revenue con esfuerzo mínimo.'
    },
    {
      title: 'Modelo mejora con el tiempo',
      description: 'Primeros 3 meses son calibración. A los 6 meses, modelo ya aprendió patrones específicos de tu negocio. Un cliente vio AUC subir de 0.78 a 0.86 en 9 meses.'
    }
  ]

  const pricing = {
    range: 'Revenue Share (Sin Costo Inicial)',
    description: 'Modelo alineado a resultados: solo cobras cuando conviertes. Sin riesgo up-front.',
    timeline: 'Entrega continua con actualizaciones mensuales',
    includes: [
      'Setup inicial sin costo (integración de datos, modelo base)',
      'Revenue share: % de ventas generadas por leads del modelo',
      'Dashboard interactivo 24/7 con leads priorizados',
      'Actualización mensual automática de base de datos',
      'Re-entrenamiento mensual del modelo con conversiones',
      'Reportes mensuales de performance y ROI',
      'Sesiones trimestrales de revisión estratégica',
      'Soporte continuo del equipo de data science'
    ]
  }

  const indiceContent = [
    { id: 'introduccion', titulo: 'Resumen Ejecutivo', icon: 'Book', descripcion: 'Resumen del modelo de prospección con IA: ICP definido, fuentes de datos integradas, precisión del modelo, ROI esperado. Casos de éxito y testimonios.' },
    { id: 'proceso', titulo: 'Modelo de Propensión', icon: 'Target', descripcion: 'Cómo funciona el scoring de propensión: features utilizadas, algoritmos de ML, calibración, validación. Score 0-100 interpretado y segmentación tier A/B/C explicada.' },
    { id: 'metodologia', titulo: 'Fuentes de Datos', icon: 'Database', descripcion: 'Ecosistema de +20 fuentes de datos integradas: DENUE, LinkedIn, web scraping, redes sociales, transaccionales. Variables derivadas y feature engineering aplicado.' },
    { id: 'ejemplos', titulo: 'Dashboard y Monitoreo', icon: 'Monitor', descripcion: 'Tour del dashboard interactivo: leads priorizados, filtros, exportación, KPIs en tiempo real, alertas automáticas. Integración con CRM existente.' },
    { id: 'entregables', titulo: 'Optimización Continua', icon: 'TrendingUp', descripcion: 'Feedback loop con conversiones reales: re-entrenamiento mensual, A/B testing, ajuste de features, expansión a nuevos segmentos. Casos de mejora continua.' },
    { id: 'tips', titulo: 'Casos de Éxito', icon: 'Award', descripcion: 'Sherwin Williams: prospección constructoras, ROI 3.8X. Otros verticales: manufactura, retail, servicios B2B. Lecciones aprendidas y mejores prácticas.' },
    { id: 'pricing', titulo: 'Modelo Revenue Share', icon: 'DollarSign', descripcion: 'Sin costo inicial, revenue share alineado a resultados. % de ventas generadas por leads del modelo. Transparencia total, dashboard de tracking, sin letra chica.' }
  ]

  return (
    <ServicioGuideTemplate
      serviceName="Agente Vertical"
      tagline="Prospección de clientes con IA y análisis de datos. Revenue share, sin riesgo inicial."
      description="Prospección de clientes potenciales con IA y análisis de datos para identificar oportunidades comerciales. Evaluación de patrones de consumo y propensión de compra para maximizar conversión. Caso de éxito: Sherwin Williams - Alto ROI, conversión 3.8X vs baseline."
      heroGradient="from-teseo-500/20 to-success-500/20"
      icon={Target}
      indiceContent={indiceContent}
      steps={steps}
      methodology={methodology}
      exampleReports={exampleReports}
      deliverables={deliverables}
      tips={tips}
      pricing={pricing}
      ctaText="Solicitar Demo de Agente Vertical"
      ctaLink="https://wa.me/5217713649201?text=Hola,%20me%20interesa%20conocer%20Agente%20Vertical%20"
    />
  )
}

export default TeseoAgenteVerticalGuide
