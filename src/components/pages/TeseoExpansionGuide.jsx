import ServicioGuideTemplate from './ServicioGuideTemplate'
import { MapPin } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

/**
 * TeseoExpansionGuide - Guía completa para Análisis Data-Econométrico de Expansión
 *
 * Utiliza ServicioGuideTemplate con datos específicos de Teseo Data Lab
 */

const TeseoExpansionGuide = () => {

  // ============================================
  // DATA PARA GRÁFICAS DE EJEMPLO (Caso Cayco)
  // ============================================

  // Ejemplo 1: Scoring de plazas por viabilidad (5 capas integradas)
  const scoringPlazas = [
    { plaza: 'Querétaro', demanda: 92, oferta: 78, saturacion: 18, oportunidad: 95, rentabilidad: 98, total: 95 },
    { plaza: 'San Luis Potosí', demanda: 82, oferta: 72, saturacion: 28, oportunidad: 78, rentabilidad: 82, total: 78 },
    { plaza: 'Tula', demanda: 68, oferta: 55, saturacion: 45, oportunidad: 65, rentabilidad: 58, total: 62 },
    { plaza: 'Pachuca', demanda: 65, oferta: 58, saturacion: 42, oportunidad: 62, rentabilidad: 55, total: 58 },
    { plaza: 'Huauchinango', demanda: 38, oferta: 32, saturacion: 68, oportunidad: 28, rentabilidad: 22, total: 35 }
  ]

  // Ejemplo 2: Proyección ROI por plaza (3 escenarios)
  const proyeccionROI = [
    { plaza: 'Querétaro', base: 397.4, optimista: 485.2, pesimista: 287.6 },
    { plaza: 'San Luis Potosí', base: 156.8, optimista: 215.3, pesimista: 98.5 },
    { plaza: 'Tula', base: 82.5, optimista: 125.8, pesimista: 45.2 },
    { plaza: 'Pachuca', base: 62.3, optimista: 98.7, pesimista: 28.5 },
    { plaza: 'Huauchinango', base: -15.2, optimista: 12.5, pesimista: -42.8 }
  ]

  // Ejemplo 3: Modelo de 5 capas - Querétaro (caso exitoso)
  const modeloCapasQueretaro = [
    { capa: 'Demanda', score: 92, peso: 25 },
    { capa: 'Oferta', score: 78, peso: 20 },
    { capa: 'Saturación', score: 82, peso: 20 },
    { capa: 'Oportunidad', score: 95, peso: 20 },
    { capa: 'Rentabilidad', score: 98, peso: 15 }
  ]

  // ============================================
  // COMPONENTES DE GRÁFICAS
  // ============================================

  const GraficaScoringPlazas = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={scoringPlazas}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="plaza" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" domain={[0, 100]} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
          labelStyle={{ color: '#f9fafb' }}
        />
        <Legend />
        <Bar dataKey="total" fill="#8b5cf6" name="Score Total (0-100)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )

  const GraficaProyeccionROI = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={proyeccionROI} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis type="number" stroke="#9ca3af" tickFormatter={(value) => `${value}%`} />
        <YAxis type="category" dataKey="plaza" stroke="#9ca3af" width={120} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
          labelStyle={{ color: '#f9fafb' }}
          formatter={(value) => [`${value.toFixed(1)}%`, '']}
        />
        <Legend />
        <Bar dataKey="pesimista" fill="#ef4444" name="Escenario Pesimista" radius={[0, 4, 4, 0]} />
        <Bar dataKey="base" fill="#3b82f6" name="Escenario Base" radius={[0, 4, 4, 0]} />
        <Bar dataKey="optimista" fill="#22c55e" name="Escenario Optimista" radius={[0, 4, 4, 0]} />
        <ReferenceLine x={0} stroke="#ffffff" strokeWidth={2} />
      </BarChart>
    </ResponsiveContainer>
  )

  const GraficaModeloCapas = () => (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={modeloCapasQueretaro}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis dataKey="capa" stroke="#9ca3af" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
        <Radar name="Score Querétaro" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
          labelStyle={{ color: '#f9fafb' }}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )

  // ============================================
  // DATOS DEL SERVICIO
  // ============================================

  const steps = [
    {
      titulo: 'Kick-off Estratégico',
      descripcion: 'Definimos objetivos de expansión, plazas candidatas (hasta 10 ciudades), criterios de decisión (ROI mínimo, tiempo de retorno), y restricciones operativas (logística, proveedores, regulatorias).',
      timing: '2-3 días',
      tips: [
        'Define lista preliminar de 5-10 plazas candidatas',
        'Establece ROI mínimo aceptable (ej: >100% a 5 años)',
        'Especifica restricciones logísticas y operativas',
        'Comparte casos anteriores de expansión (éxitos/fracasos)'
      ],
      icon: 'FileText',
      color: 'teseo'
    },
    {
      titulo: 'Recolección Masiva de Datos',
      descripcion: 'Integramos 50+ bases de datos por plaza: INEGI (censos, DENUE, actividad económica), datos industriales sectoriales, competencia (ubicaciones, capacidad, market share), permisos, infraestructura, y proyecciones macroeconómicas regionales.',
      timing: '5-7 días',
      tips: [
        'Procesamos +3M puntos de datos de fuentes públicas y privadas',
        'Mapeo completo de competencia por plaza (directa e indirecta)',
        'Análisis de barreras de entrada por región',
        'Proyecciones económicas regionales (PIB, empleo, inversión)'
      ],
      icon: 'Database',
      color: 'tech'
    },
    {
      titulo: 'Modelo de 5 Capas',
      descripcion: 'Aplicamos modelo propietario de 5 capas: 1) Demanda (proyección con series temporales), 2) Oferta (competencia actual y pipeline), 3) Saturación (índice de concentración), 4) Oportunidad (gaps de mercado), 5) Rentabilidad (ROI/VPN proyectados).',
      timing: '6-8 días',
      tips: [
        'Capa Demanda: Proyección 5-10 años con ARIMA, regresiones',
        'Capa Oferta: Inventario actual + proyectos anunciados',
        'Capa Saturación: HHI, ratio demanda/oferta, barreras',
        'Capa Oportunidad: Déficit de oferta, nichos desatendidos',
        'Capa Rentabilidad: Modelo financiero completo por plaza'
      ],
      icon: 'TrendingUp',
      color: 'teseo'
    },
    {
      titulo: 'Scoring y Ranking de Plazas',
      descripcion: 'Generamos score ponderado (0-100) por plaza integrando las 5 capas, con pesos personalizables según tus prioridades. Ranking final con recomendación clara: GO / CONSIDERAR / NO GO.',
      timing: '3-4 días',
      tips: [
        'Score 80-100: GO (alta viabilidad, ROI >150%)',
        'Score 60-79: CONSIDERAR (viable con condiciones)',
        'Score <60: NO GO (alto riesgo, ROI <50%)',
        'Análisis de sensibilidad: cómo cambia ranking si varían supuestos'
      ],
      icon: 'Target',
      color: 'success'
    },
    {
      titulo: 'Validación Multi-Escenario',
      descripcion: 'Simulaciones Monte Carlo (10,000 iteraciones) para cada plaza con 3 escenarios (base, optimista, pesimista). Análisis de riesgo, probabilidad de éxito, y downside risk por plaza.',
      timing: '2-3 días',
      tips: [
        'Monte Carlo: distribución de ROI con intervalos de confianza',
        'Escenario Base: supuestos más probables (60% prob)',
        'Escenario Optimista: crecimiento acelerado (20% prob)',
        'Escenario Pesimista: crisis/recesión (20% prob)'
      ],
      icon: 'Shield',
      color: 'tech'
    },
    {
      titulo: 'Entrega y Roadmap de Expansión',
      descripcion: 'Reporte PDF Ejecutivo (100-150 páginas) con análisis completo por plaza, ranking final, roadmap de expansión secuencial (año 1, 2, 3+), y presentación PPT ejecutiva (40-50 slides) para consejo/inversionistas.',
      timing: '2 días',
      tips: [
        'Reporte: 100-150 págs con análisis detallado por plaza',
        'Roadmap: secuencia óptima de expansión (priorización)',
        'PPT: 40-50 slides ejecutivos para junta de consejo',
        'Sesión Q&A de 2h + soporte 60 días'
      ],
      icon: 'Award',
      color: 'teseo'
    }
  ]

  const methodology = {
    title: 'Modelo Propietario de 5 Capas',
    subtitle: 'Framework probado en +100 proyectos de expansión territorial',
    dataTitle: 'Fuentes de Datos por Plaza (50+)',
    dataDescription: 'Integramos las fuentes de datos más completas del ecosistema mexicano para cada plaza candidata.',
    dataSources: [
      'INEGI: Censos, DENUE, actividad económica, ENOE, PIB regional',
      'Sector Industrial: Producción, capacidad instalada, estadísticas sectoriales',
      'Banxico: Indicadores macroeconómicos regionales, crédito empresarial',
      'IMCO: Índice de Competitividad Estatal y Municipal',
      'Secretarías Estatales: Permisos, inversión, proyectos de infraestructura',
      'Competencia: Ubicaciones, capacidad, market share, precios, expansión',
      'Logística: Carreteras, ferrocarril, puertos, costos de transporte',
      'Bases propietarias: Históricos de demanda y proyectos similares'
    ],
    modelTitle: 'Modelo de 5 Capas Integradas',
    modelDescription: 'Framework propietario que integra análisis de demanda, oferta, saturación, oportunidad y rentabilidad en un score único.',
    techniques: [
      'Capa 1 - Demanda: Series temporales (ARIMA), regresiones con variables macroeconómicas',
      'Capa 2 - Oferta: Mapeo de competencia actual + pipeline de proyectos futuros',
      'Capa 3 - Saturación: Índice HHI, ratio demanda/oferta, barreras de entrada',
      'Capa 4 - Oportunidad: Análisis de gaps, nichos desatendidos, ventanas temporales',
      'Capa 5 - Rentabilidad: Modelo financiero completo (ROI, VPN, TIR, payback)',
      'Simulaciones Monte Carlo: 10K iteraciones para distribución de resultados',
      'Análisis Multi-Escenario: Base, Optimista, Pesimista con probabilidades'
    ],
    precision: {
      description: 'Validamos nuestro modelo con casos históricos de expansión y backtesting riguroso.',
      metrics: [
        { value: '397% ROI', label: 'Proyección Querétaro (Cayco)', description: 'ROI real vs proyectado: error <8%' },
        { value: '92% Precisión', label: 'Aciertos en Recomendaciones', description: 'GO vs NO GO validado ex-post' },
        { value: '100+ Plazas', label: 'Evaluadas desde 2018', description: 'Framework probado en campo' }
      ]
    }
  }

  const exampleReports = [
    {
      title: 'Scoring de Plazas Candidatas',
      description: 'Ranking de plazas (0-100) integrando las 5 capas del modelo. Identifica claramente dónde expandir primero, dónde considerar con condiciones, y dónde NO expandir.',
      chartComponent: <GraficaScoringPlazas />,
      insights: [
        {
          title: 'Querétaro: Plaza GO (95/100)',
          description: 'Score total 95: alta demanda proyectada, baja saturación competitiva, ROI 397% a 5 años. Recomendación: expandir en año 1 con inversión de $45M MXN.'
        },
        {
          title: 'Huauchinango: Plaza NO GO (35/100)',
          description: 'Score total 35: demanda insuficiente, alta saturación, ROI negativo -15%. Recomendación: descartada para expansión en horizonte 5 años.'
        }
      ]
    },
    {
      title: 'Proyección ROI Multi-Escenario',
      description: 'ROI proyectado a 5 años por plaza en 3 escenarios (pesimista, base, optimista). Permite evaluar upside potential vs downside risk para tomar decisiones informadas.',
      chartComponent: <GraficaProyeccionROI />,
      insights: [
        {
          title: 'Querétaro: Upside Masivo',
          description: 'Escenario base: 397% ROI. Escenario optimista: 485% ROI. Incluso en escenario pesimista: 288% ROI. Riesgo de pérdida: <1%.'
        },
        {
          title: 'Huauchinango: Alto Riesgo',
          description: 'Escenario base: -15% ROI. Escenario pesimista: -43% ROI. Solo escenario optimista genera retorno positivo (+12%). Probabilidad de pérdida: 68%.'
        }
      ]
    },
    {
      title: 'Modelo de 5 Capas - Querétaro',
      description: 'Desglose de score por cada una de las 5 capas para la plaza con mejor viabilidad (Querétaro). Muestra fortalezas y debilidades específicas.',
      chartComponent: <GraficaModeloCapas />,
      insights: [
        {
          title: 'Fortalezas Clave',
          description: 'Rentabilidad (98/100) y Oportunidad (95/100) son los factores más fuertes. Demanda proyectada (92/100) sólida con crecimiento industrial acelerado.'
        },
        {
          title: 'Área de Atención',
          description: 'Oferta competitiva (78/100) es el factor más bajo, pero aún favorable. Competidores establecidos requieren diferenciación clara en producto/servicio.'
        }
      ]
    }
  ]

  const deliverables = [
    {
      title: 'Reporte PDF Ejecutivo',
      description: '100-150 páginas con análisis completo por plaza, modelo de 5 capas, scoring, ranking final, y roadmap de expansión secuencial.',
      icon: 'FileText',
      color: 'teseo',
      details: [
        'Executive Summary con recomendaciones GO/NO GO',
        'Análisis detallado por plaza (20-30 págs cada una)',
        'Modelo de 5 capas explicado con datos',
        'Ranking final y matriz de decisión',
        'Roadmap de expansión secuencial (años 1, 2, 3+)',
        'Anexos: metodología, fuentes, supuestos (30 págs)'
      ]
    },
    {
      title: 'Presentación PPT Ejecutiva',
      description: '40-50 slides ejecutivos listos para presentar a consejo directivo, inversionistas, o comité de expansión.',
      icon: 'Award',
      color: 'tech',
      details: [
        'Resumen Ejecutivo y Recomendaciones (8 slides)',
        'Análisis por Plaza Top 3 (15 slides)',
        'Modelo de 5 Capas y Scoring (10 slides)',
        'Roadmap de Expansión y Timeline (5 slides)',
        'Análisis Financiero Consolidado (7 slides)',
        'Next Steps y Plan de Acción (5 slides)'
      ]
    },
    {
      title: 'Modelos Financieros en Excel',
      description: 'Modelos financieros editables por plaza: ROI, VPN, TIR, payback, flujos de caja proyectados, análisis de sensibilidad.',
      icon: 'Database',
      color: 'success',
      details: [
        'Modelo financiero completo por plaza (10 años)',
        'Simulaciones Monte Carlo (10K iteraciones)',
        'Análisis de sensibilidad multi-variable',
        'Dashboards interactivos con gráficas',
        'Supuestos editables para tu análisis what-if'
      ]
    },
    {
      title: 'Mapas GIS de Plazas',
      description: 'Mapas georreferenciados de cada plaza con ubicaciones de competencia, hotspots de demanda, infraestructura clave, y zonas recomendadas.',
      icon: 'Target',
      color: 'teseo',
      details: [
        'Mapa de ubicaciones competitivas por plaza',
        'Heatmap de demanda estimada',
        'Capas de infraestructura (carreteras, servicios)',
        'Zonas recomendadas para instalación',
        'Análisis de accesibilidad y logística'
      ]
    },
    {
      title: 'Sesión Q&A de 2 Horas',
      description: 'Videollamada de 2h con equipo directivo para presentar hallazgos, resolver dudas, y discutir estrategia de expansión detallada.',
      icon: 'CheckCircle',
      color: 'tech',
      details: [
        'Presentación ejecutiva de hallazgos (45 min)',
        'Sesión de preguntas y respuestas (60 min)',
        'Discusión de roadmap y next steps (15 min)'
      ]
    },
    {
      title: 'Soporte 60 Días',
      description: 'Acceso directo al equipo de analistas por 60 días para resolver dudas, actualizar modelos, o incorporar nueva información de mercado.',
      icon: 'Shield',
      color: 'success',
      details: [
        'Respuesta <24h por email, WhatsApp, o videollamada',
        '2 revisiones menores sin costo adicional',
        'Actualización de data si hay cambios macroeconómicos',
        'Soporte para presentación a inversionistas'
      ]
    }
  ]

  const tips = [
    {
      title: 'Define criterios de decisión ANTES del análisis',
      description: 'Establece ROI mínimo aceptable, tiempo máximo de payback, y restricciones operativas (logística, proveedores, regulatorias) antes de iniciar. Esto permite afinar el modelo a tus necesidades específicas.'
    },
    {
      title: 'Incluye plazas "control" en la evaluación',
      description: 'Si ya operás en algunas plazas, inclúyelas en el análisis como benchmark. Podremos validar el modelo comparando proyecciones vs resultados reales de tus operaciones actuales.'
    },
    {
      title: 'Comparte tu plan de expansión interno',
      description: 'Si ya tenés una lista preliminar de plazas candidatas, compártela. Podemos evaluar esas plazas + sugerir alternativas que tal vez no habías considerado pero tienen alto potencial.'
    },
    {
      title: 'Usa el roadmap para priorizar CapEx',
      description: 'El roadmap de expansión secuencial te permite planificar inversiones multi-año. Un cliente nuestro ajustó su presupuesto de CapEx basándose en nuestro roadmap y maximizó ROI consolidado.'
    },
    {
      title: 'Actualiza el análisis cada 18-24 meses',
      description: 'Los mercados regionales cambian: nueva infraestructura, competencia, políticas. Considera una actualización cada 18-24 meses para mantener la estrategia vigente (descuento 50% para clientes recurrentes).'
    },
    {
      title: 'Integra el análisis con tu plan estratégico',
      description: 'Nuestros reportes son tan rigurosos que muchos clientes los integran directamente en su plan estratégico corporativo y los usan para solicitar financiamiento o presentar a consejo.'
    }
  ]

  const pricing = {
    range: '$195K - $280K MXN',
    description: 'Inversión única. Evita errores de expansión que pueden costar decenas de millones.',
    timeline: '20-25 días hábiles',
    includes: [
      'Reporte PDF Ejecutivo (100-150 páginas)',
      'Presentación PPT Ejecutiva (40-50 slides)',
      'Modelos financieros en Excel (editables)',
      'Mapas GIS de plazas',
      'Sesión Q&A de 2 horas',
      'Soporte 60 días + 2 revisiones menores',
      'NDA y confidencialidad total'
    ]
  }

  const indiceContent = [
    { id: 'introduccion', titulo: 'Introducción', icon: 'Book', descripcion: 'Resumen ejecutivo del análisis de expansión con ranking final de plazas, recomendaciones GO/NO GO, roadmap de expansión secuencial, y ROI proyectado consolidado. Contexto estratégico de expansión territorial y objetivos del estudio.' },
    { id: 'metodologia', titulo: 'Metodología de 5 Capas', icon: 'Database', descripcion: 'Framework propietario de 5 capas (Demanda, Oferta, Saturación, Oportunidad, Rentabilidad) validado en +100 proyectos de expansión. Fuentes de datos (50+ por plaza), modelos econométricos aplicados, y sistema de scoring integrado.' },
    { id: 'proceso', titulo: 'Análisis por Plaza', icon: 'MapPin', descripcion: 'Análisis detallado de cada plaza candidata: contexto económico regional, proyección de demanda, mapeo de competencia, índice de saturación, identificación de oportunidades, y modelo financiero completo (ROI, VPN, TIR, payback).' },
    { id: 'ejemplos', titulo: 'Scoring y Ranking', icon: 'Target', descripcion: 'Score ponderado (0-100) por plaza integrando las 5 capas del modelo. Ranking final con clasificación GO (80-100), CONSIDERAR (60-79), NO GO (<60). Análisis de sensibilidad: cómo cambia el ranking si varían supuestos clave.' },
    { id: 'entregables', titulo: 'Roadmap de Expansión', icon: 'TrendingUp', descripcion: 'Plan secuencial de expansión multi-año: plazas prioritarias para año 1, año 2, año 3+. Timeline detallado con hitos clave, inversión requerida por fase, ROI consolidado esperado, y plan de mitigación de riesgos.' },
    { id: 'tips', titulo: 'Análisis de Riesgo', icon: 'Shield', descripcion: 'Simulaciones Monte Carlo (10K iteraciones) por plaza con distribución de resultados. Análisis multi-escenario (base, optimista, pesimista). Probabilidad de éxito, downside risk, y factores críticos de riesgo por plaza.' },
    { id: 'pricing', titulo: 'Pricing y Contratación', icon: 'DollarSign', descripcion: 'Inversión de $195K-$280K MXN en análisis completo (20-25 días). Incluye reporte ejecutivo, PPT, modelos Excel, mapas GIS, sesión Q&A de 2h, y soporte 60 días. ROI del análisis: evita errores de expansión que pueden costar $50M+ en pérdidas.' }
  ]

  return (
    <ServicioGuideTemplate
      serviceName="Análisis Data-Econométrico de Expansión"
      tagline="¿Dónde expandir tu negocio? Modelo de 5 capas para decisiones de expansión territorial."
      description="Evaluación estratégica de viabilidad territorial para expansión con modelo econométrico de 5 capas: Demanda, Oferta, Saturación, Oportunidad y Rentabilidad. Score integrado (0-100) por plaza, ranking final GO/NO GO, y roadmap de expansión secuencial. Caso de éxito: Cayco Concretos - ROI 397% en Querétaro."
      heroGradient="from-teseo-500/20 to-warning-500/20"
      icon={MapPin}
      indiceContent={indiceContent}
      steps={steps}
      methodology={methodology}
      exampleReports={exampleReports}
      deliverables={deliverables}
      tips={tips}
      pricing={pricing}
      ctaText="Solicitar Análisis de Expansión"
      ctaLink="https://wa.me/5217713649201?text=Hola,%20me%20interesa%20contratar%20"
    />
  )
}

export default TeseoExpansionGuide
