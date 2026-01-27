import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Database,
  TrendingUp,
  Shield,
  Award,
  BarChart3,
  Target,
  Lightbulb,
  Download,
  Calendar,
  DollarSign,
  Users,
  Book,
  Play,
  Settings,
  History,
  HelpCircle,
  ChevronRight,
  Home
} from 'lucide-react'

/**
 * ServicioGuideTemplate - Template reutilizable para páginas de guías de servicios
 *
 * @param {Object} props
 * @param {string} props.serviceName - Nombre del servicio (e.g., "Análisis de Mercado Econométrico")
 * @param {string} props.tagline - Frase descriptiva corta
 * @param {string} props.description - Descripción extendida del servicio
 * @param {string} props.heroGradient - Clase de gradiente para el hero (e.g., "from-teseo-500/20 to-tech-500/20")
 * @param {Object} props.icon - Componente de icono de Lucide React
 * @param {Array} props.indiceContent - Array de secciones del índice con id, titulo e icon
 * @param {Array} props.steps - Array de pasos del proceso (ver estructura abajo)
 * @param {Array} props.deliverables - Array de entregables (ver estructura abajo)
 * @param {Object} props.methodology - Objeto con metodología (ver estructura abajo)
 * @param {Array} props.exampleReports - Array de ejemplos de reportes con gráficas (ver estructura abajo)
 * @param {Array} props.tips - Array de tips y mejores prácticas
 * @param {Object} props.pricing - Objeto con información de pricing
 * @param {string} props.ctaText - Texto del CTA principal
 * @param {string} props.ctaLink - Link del CTA (WhatsApp, formulario, etc.)
 */

const ServicioGuideTemplate = ({
  serviceName,
  tagline,
  description,
  heroGradient = "from-teseo-500/20 to-tech-500/20",
  icon: IconComponent = BarChart3,
  indiceContent = [],
  steps = [],
  deliverables = [],
  methodology = {},
  exampleReports = [],
  tips = [],
  pricing = {},
  ctaText = "Solicitar Cotización",
  ctaLink = "https://wa.me/5218116689405?text=Hola,%20me%20interesa%20contratar%20"
}) => {

  const [activeTab, setActiveTab] = useState(0)

  // Icon mapping para los pasos y el índice
  const iconMap = {
    'FileText': FileText,
    'Database': Database,
    'TrendingUp': TrendingUp,
    'Shield': Shield,
    'Award': Award,
    'BarChart3': BarChart3,
    'Target': Target,
    'CheckCircle': CheckCircle,
    'Book': Book,
    'Play': Play,
    'Settings': Settings,
    'History': History,
    'HelpCircle': HelpCircle,
    'Lightbulb': Lightbulb,
    'Download': Download,
    'Users': Users
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 industrial-grid">

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className={`relative py-20 px-4 overflow-hidden bg-gradient-to-br ${heroGradient}`}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-industrial-300 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al inicio</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teseo-500/20 border-2 border-teseo-500 mb-6">
              <IconComponent className="w-10 h-10 text-teseo-400" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {serviceName}
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-industrial-300 mb-8 max-w-3xl mx-auto">
              {tagline}
            </p>

            {/* Description */}
            <p className="text-lg text-industrial-400 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* CTA Button */}
            <motion.a
              href={ctaLink + encodeURIComponent(serviceName)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-gradient-to-r from-teseo-500 to-tech-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teseo-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{ctaText}</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          BREADCRUMBS
          ============================================ */}
      <section className="py-4 px-4 bg-industrial-900/50">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-1 text-industrial-400 hover:text-white transition-colors group"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </button>
            <ChevronRight className="w-4 h-4 text-industrial-600" />
            <button
              onClick={() => window.history.back()}
              className="text-industrial-400 hover:text-white transition-colors"
            >
              Servicios
            </button>
            <ChevronRight className="w-4 h-4 text-industrial-600" />
            <span className="text-teseo-400 font-medium">{serviceName}</span>
          </nav>
        </div>
      </section>

      {/* ============================================
          ÍNDICE DE CONTENIDOS
          ============================================ */}
      {indiceContent.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="card-glass p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Book className="w-7 h-7 text-teseo-400" />
                Índice de Contenidos
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {indiceContent.map((seccion, index) => {
                  const Icon = iconMap[seccion.icon] || Book
                  return (
                    <a
                      key={seccion.id}
                      href={`#${seccion.id}`}
                      className="flex items-start gap-3 p-4 bg-industrial-800/50 rounded-xl hover:bg-industrial-700/50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-teseo-500/20 flex items-center justify-center group-hover:bg-teseo-500/30 transition-colors flex-shrink-0">
                        <Icon className="text-teseo-400 w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm mb-1">{index + 1}. {seccion.titulo}</p>
                        {seccion.descripcion && (
                          <p className="text-xs text-industrial-400 leading-relaxed">{seccion.descripcion}</p>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ============================================
          PROCESO PASO A PASO
          ============================================ */}
      {steps.length > 0 && (
        <section id="proceso" className="py-20 px-4 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ¿Cómo <span className="glow-text">funciona?</span>
              </h2>
              <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
                El proceso paso a paso para obtener tu {serviceName}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => {
                const StepIcon = iconMap[step.icon] || CheckCircle

                return (
                  <motion.div
                    key={index}
                    className="card-glass p-6 relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Número de paso */}
                    <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-${step.color || 'teseo'}-500/20 border-2 border-${step.color || 'teseo'}-500 flex items-center justify-center`}>
                      <span className={`text-lg font-bold text-${step.color || 'teseo'}-400`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="flex items-start gap-4 mb-4 mt-4">
                      <div className={`p-3 rounded-xl bg-${step.color || 'teseo'}-500/10`}>
                        <StepIcon className={`w-6 h-6 text-${step.color || 'teseo'}-400`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{step.titulo}</h3>
                        {step.timing && (
                          <span className="inline-flex items-center gap-1 text-sm text-industrial-400">
                            <Calendar className="w-4 h-4" />
                            {step.timing}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-industrial-300 mb-4 leading-relaxed">
                      {step.descripcion}
                    </p>

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-industrial-400">
                            <CheckCircle className="w-4 h-4 text-success-400 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          METODOLOGÍA
          ============================================ */}
      {methodology.title && (
        <section id="metodologia" className="py-20 px-4 bg-gradient-to-br from-industrial-900/50 to-industrial-950/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="glow-text">{methodology.title}</span>
              </h2>
              <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
                {methodology.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Descripción de metodología */}
              <motion.div
                className="card-glass p-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Database className="w-8 h-8 text-tech-400" />
                  {methodology.dataTitle || "Fuentes de Datos"}
                </h3>
                <p className="text-industrial-300 mb-6 leading-relaxed">
                  {methodology.dataDescription}
                </p>
                {methodology.dataSources && (
                  <ul className="space-y-3">
                    {methodology.dataSources.map((source, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-tech-400 flex-shrink-0 mt-0.5" />
                        <span className="text-industrial-300">{source}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              {/* Modelos y técnicas */}
              <motion.div
                className="card-glass p-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-teseo-400" />
                  {methodology.modelTitle || "Modelos Econométricos"}
                </h3>
                <p className="text-industrial-300 mb-6 leading-relaxed">
                  {methodology.modelDescription}
                </p>
                {methodology.techniques && (
                  <ul className="space-y-3">
                    {methodology.techniques.map((technique, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teseo-400 flex-shrink-0 mt-0.5" />
                        <span className="text-industrial-300">{technique}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </div>

            {/* Métricas de precisión */}
            {methodology.precision && (
              <motion.div
                className="card-glass p-8 mt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-success-400" />
                  Métricas de Precisión y Validación
                </h3>
                <p className="text-industrial-300 mb-6 leading-relaxed">
                  {methodology.precision.description}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {methodology.precision.metrics && methodology.precision.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-success-400 mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-industrial-400">
                        {metric.label}
                      </div>
                      {metric.description && (
                        <p className="text-xs text-industrial-500 mt-2">
                          {metric.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ============================================
          EJEMPLOS DE REPORTES
          ============================================ */}
      {exampleReports.length > 0 && (
        <section id="ejemplos" className="py-20 px-4 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ejemplos de <span className="glow-text">Reportes</span>
              </h2>
              <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
                Visualiza el tipo de análisis y gráficas que recibirás
              </p>
            </motion.div>

            {/* Tabs para diferentes ejemplos */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {exampleReports.map((report, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-teseo-500 to-tech-500 text-white shadow-lg shadow-teseo-500/50'
                      : 'bg-industrial-800/50 text-industrial-300 hover:bg-industrial-700/50'
                  }`}
                >
                  {report.title}
                </button>
              ))}
            </div>

            {/* Contenido del reporte activo */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card-glass p-8 md:p-12"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                {exampleReports[activeTab].title}
              </h3>
              <p className="text-lg text-industrial-300 mb-8">
                {exampleReports[activeTab].description}
              </p>

              {/* Placeholder para gráfica - aquí se insertarán componentes de Recharts */}
              <div className="bg-industrial-900/50 rounded-xl p-8 border border-industrial-700/50 min-h-[400px] flex items-center justify-center">
                {exampleReports[activeTab].chartComponent ? (
                  exampleReports[activeTab].chartComponent
                ) : (
                  <div className="text-center text-industrial-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Gráfica de ejemplo aquí</p>
                    <p className="text-sm mt-2">
                      Componente de Recharts se insertará en cada guía específica
                    </p>
                  </div>
                )}
              </div>

              {/* Insights key */}
              {exampleReports[activeTab].insights && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {exampleReports[activeTab].insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-industrial-900/30 rounded-xl">
                      <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                        <p className="text-sm text-industrial-400">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ============================================
          QUÉ RECIBES (DELIVERABLES)
          ============================================ */}
      {deliverables.length > 0 && (
        <section id="entregables" className="py-20 px-4 bg-gradient-to-br from-industrial-900/50 to-industrial-950/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ¿Qué <span className="glow-text">recibes?</span>
              </h2>
              <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
                Entregables completos y listos para presentar a inversionistas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item, index) => {
                const DeliverableIcon = iconMap[item.icon] || FileText

                return (
                  <motion.div
                    key={index}
                    className="card-glass p-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-${item.color || 'teseo'}-500/20 flex items-center justify-center mb-4`}>
                      <DeliverableIcon className={`w-7 h-7 text-${item.color || 'teseo'}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-industrial-300 leading-relaxed">
                      {item.description}
                    </p>
                    {item.details && (
                      <ul className="mt-4 space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-sm text-industrial-400">
                            <CheckCircle className="w-4 h-4 text-success-400 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          TIPS Y MEJORES PRÁCTICAS
          ============================================ */}
      {tips.length > 0 && (
        <section id="tips" className="py-20 px-4 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Tips y <span className="glow-text">Mejores Prácticas</span>
              </h2>
              <p className="text-xl text-industrial-300 max-w-3xl mx-auto">
                Recomendaciones de nuestros expertos para aprovechar al máximo este servicio
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  className="card-glass p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                      <p className="text-industrial-300 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          PRICING Y CTA FINAL
          ============================================ */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-teseo-500/10 to-tech-500/10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para <span className="glow-text">empezar?</span>
            </h2>

            {pricing.range && (
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 text-5xl font-bold text-white mb-4">
                  <DollarSign className="w-10 h-10 text-teseo-400" />
                  {pricing.range}
                </div>
                <p className="text-xl text-industrial-300">
                  {pricing.description || "Inversión única, información para toda la vida del proyecto"}
                </p>
                {pricing.timeline && (
                  <p className="text-lg text-industrial-400 mt-2">
                    Entrega en {pricing.timeline}
                  </p>
                )}
              </div>
            )}

            {pricing.includes && (
              <div className="mb-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">Incluye:</h3>
                <div className="grid md:grid-cols-2 gap-3 text-left">
                  {pricing.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
                      <span className="text-industrial-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={ctaLink + encodeURIComponent(serviceName)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teseo-500 to-tech-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teseo-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5" />
                <span>Agendar Consulta Gratuita</span>
              </motion.a>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-industrial-800 text-white font-semibold rounded-xl hover:bg-industrial-700 transition-all"
              >
                <span>Ver Todos los Servicios</span>
              </button>
            </div>

            <p className="text-sm text-industrial-400 mt-6">
              Respuesta en menos de 24 horas • Consulta inicial sin costo • NDA disponible
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default ServicioGuideTemplate
