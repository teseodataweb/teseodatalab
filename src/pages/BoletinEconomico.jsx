/**
 * Landing Page - Boletín Económico Perspectivas de Hidalgo 2026
 * Landing optimizada para captura de leads y consultoría personalizada
 */

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Download,
  FileText,
  CheckCircle2,
  Loader2,
  ArrowRight,
  BarChart3,
  Building2,
  Phone,
  Mail,
  User,
  Factory,
  Utensils,
  HardHat,
  Target,
  LineChart,
  Lightbulb,
  Shield,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  TrendingDown,
  DollarSign,
  Briefcase,
  Eye,
  Lock,
  Gift,
  MessageSquare,
  Train,
  GraduationCap,
  Shirt,
  Wrench,
  Award,
  Zap,
  Scale,
  Building,
  Percent
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

// URL del Google Apps Script (configurar después de crear el script)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZHdj_xKXa3pNHN8blPLT_7iy44xq0IDt9_8uxcmIBd4FTsp6E4vhktU0VBV3nhhUS/exec'

// Animaciones reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
}

export default function BoletinEconomico() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    telefono: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState('')

  const formRef = useRef(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones')
      return
    }

    setIsSubmitting(true)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fecha: new Date().toISOString(),
          origen: 'Boletín Perspectivas Hidalgo 2026'
        })
      })

      // El boletín se envía por correo desde Google Apps Script
      setIsSuccess(true)

    } catch (err) {
      console.error('Error al enviar:', err)
      setError('Hubo un error al procesar tu solicitud. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Los 5 Motores de Hidalgo
  const motoresHidalgo = [
    {
      icon: HardHat,
      title: 'Construcción',
      question: '¿Cuál es el potencial real de crecimiento?',
      description: 'Sector líder en generación de empleo estatal',
      benefit: 'Descubre las metas de obra privada y dónde están las oportunidades',
      opportunities: ['Vivienda', 'Parques industriales', 'Desarrollos comerciales'],
      color: 'teseo'
    },
    {
      icon: Wrench,
      title: 'Metalmecánica',
      question: '¿Cómo aprovechar el nearshoring?',
      description: 'Sector clave para cadenas de valor globales',
      benefit: 'Conoce qué certificaciones necesitas y cómo integrarte',
      opportunities: ['Cadenas automotrices', 'Sector aeroespacial', 'Proveeduría especializada'],
      color: 'tech'
    },
    {
      icon: Utensils,
      title: 'Restaurantero',
      question: '¿Cuántos negocios nuevos se proyectan?',
      description: 'Uno de los sectores más dinámicos del estado',
      benefit: 'Anticipa la demanda que traerán los nuevos residentes',
      opportunities: ['Crecimiento poblacional', 'Zonas de oportunidad'],
      color: 'success'
    },
    {
      icon: Shirt,
      title: 'Textil',
      question: '¿Hacia dónde se está reconvirtiendo?',
      description: 'Transformación hacia mayor valor agregado',
      benefit: 'Identifica los nichos de textiles técnicos con futuro',
      opportunities: ['Sector automotriz', 'Sector médico', 'Seguridad industrial'],
      color: 'warning'
    },
    {
      icon: GraduationCap,
      title: 'Educación',
      question: '¿Cuánta infraestructura educativa se necesitará?',
      description: 'Demanda creciente por nuevos residentes',
      benefit: 'Conoce las proyecciones de escuelas y formación técnica',
      opportunities: ['Formación técnica', 'Vinculación con industria'],
      color: 'tech'
    }
  ]

  // Variables clave del boletín
  const variablesClave = [
    { icon: TrendingUp, label: 'Crecimiento PIB Hidalgo Q2 2025', hint: '¿Por qué Hidalgo fue #1 nacional?' },
    { icon: Factory, label: 'Actividades Secundarias', hint: '¿Qué posición ocupa en el ranking industrial?' },
    { icon: Building2, label: 'Estructura Empresarial', hint: '¿Cuántas empresas son realmente competitivas?' },
    { icon: DollarSign, label: 'Concentración de Ingresos', hint: '¿Qué % generan las empresas grandes?' },
    { icon: Scale, label: 'Índice de Competitividad Estatal', hint: '¿Cómo se compara Hidalgo vs. el Bajío?' },
    { icon: Train, label: 'Impacto del Tren México-Pachuca', hint: '¿Qué ventaja logística única representa?' }
  ]

  // Proyecciones 2026
  const proyecciones = [
    {
      icon: LineChart,
      title: 'PIB Nacional 2026',
      desc: 'Banxico proyecta 1.21% y FMI 1.5% de crecimiento',
      detail: 'Recuperación más robusta vs 2025'
    },
    {
      icon: Percent,
      title: 'Inflación Esperada',
      desc: 'Expectativa de 3.93% según Banxico',
      detail: 'Posible estabilización del poder adquisitivo'
    },
    {
      icon: Target,
      title: 'Revisión T-MEC',
      desc: 'Julio 2026: momento clave para México',
      detail: 'Factor determinante para nearshoring'
    },
    {
      icon: Zap,
      title: 'Nearshoring',
      desc: 'Oportunidad para estados con vocación industrial',
      detail: 'Hidalgo posicionado estratégicamente'
    }
  ]

  // Preguntas comparativas Hidalgo vs Bajío
  const preguntasBajio = [
    { question: '¿Cuántas posiciones separan a Hidalgo de Querétaro en competitividad?', icon: Award },
    { question: '¿Cuál es la brecha real en número de empresas grandes?', icon: Building },
    { question: '¿Cuánta inversión extranjera ha captado cada estado?', icon: DollarSign }
  ]

  const beneficios = [
    {
      icon: Eye,
      title: 'Entiende el Momento',
      description: 'Descubre por qué Hidalgo lidera el crecimiento nacional y qué significa para tu sector.'
    },
    {
      icon: Target,
      title: 'Identifica Oportunidades',
      description: 'Conoce los 5 sectores estratégicos y dónde se concentrará la inversión y el empleo.'
    },
    {
      icon: Clock,
      title: 'Anticipa el Futuro',
      description: 'Prepárate para el impacto del T-MEC, nearshoring y nuevas infraestructuras en 2026.'
    },
    {
      icon: Shield,
      title: 'Decide con Datos',
      description: 'Basa tus decisiones en análisis de Banxico, FMI, INEGI y Censo Económico 2024.'
    }
  ]

  // Estadísticas destacadas del boletín
  const statsDestacados = [
    { value: '#1', label: 'Crecimiento Nacional', sublabel: 'Q2 2025' },
    { value: '5', label: 'Sectores Estratégicos', sublabel: 'Motores económicos' },
    { value: '2026', label: 'Proyecciones', sublabel: 'T-MEC y nearshoring' },
    { value: 'PDF', label: 'Descarga Gratis', sublabel: '9 páginas' }
  ]

  return (
    <>
      <Helmet>
        <title>Boletín Económico: Perspectivas de Hidalgo 2026 | Teseo Data Lab</title>
        <meta name="description" content="Descarga gratis el Boletín Perspectivas de Hidalgo 2026. Hidalgo #1 en crecimiento nacional, 5 sectores estratégicos, proyecciones económicas y oportunidades de inversión." />
        <meta property="og:title" content="Boletín Económico: Perspectivas de Hidalgo 2026 | Teseo Data Lab" />
        <meta property="og:description" content="Hidalgo creció 5.7% en Q2 2025, liderando el país. Descubre los 5 motores económicos y las proyecciones para 2026." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-industrial-950 via-industrial-900 to-industrial-950 overflow-hidden">

        {/* ==================== HEADER SIMPLIFICADO ==================== */}
        <header className="py-5 px-4 border-b border-industrial-800/50 bg-industrial-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo-teseo.png"
                alt="Teseo Data Lab"
                className="h-9 w-auto transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-semibold text-white hidden sm:block">
                <span className="glow-text">Teseo</span> Data Lab
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1.5 bg-teseo-500/20 border border-teseo-500/30 rounded-full text-teseo-400 text-xs font-medium hidden sm:block">
                Enero 2026
              </span>
              <button
                onClick={scrollToForm}
                className="px-4 py-2 bg-teseo-500 hover:bg-teseo-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Descargar Gratis
              </button>
            </div>
          </div>
        </header>

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative py-16 md:py-24 px-4">
          {/* Background decorativo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teseo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-tech-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Contenido Hero */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-success-500/20 border border-success-500/30 rounded-full text-success-400 text-sm font-medium">
                    <Award className="w-4 h-4" />
                    #1 Crecimiento Nacional Q2 2025
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Boletín Económico:{' '}
                  <span className="glow-text">Perspectivas</span>{' '}
                  <span className="text-industrial-300">de Hidalgo 2026</span>
                </h1>

                <p className="text-xl text-industrial-300 mb-8 leading-relaxed">
                  Hidalgo lidera el crecimiento económico nacional. <span className="text-white font-semibold">¿Sabes por qué?</span>{' '}
                  Descubre los 5 sectores estratégicos, las oportunidades del <span className="text-teseo-400">Tren México-Pachuca</span> y
                  las proyecciones que definirán el futuro del estado.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teseo-500 to-teseo-600 hover:from-teseo-600 hover:to-teseo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-teseo-500/25 hover:scale-[1.02]"
                  >
                    <Download className="w-5 h-5" />
                    Descargar Boletín Gratis
                  </button>
                  <a
                    href="#motores"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-industrial-800/60 hover:bg-industrial-800 border border-industrial-700/50 text-white font-medium rounded-xl transition-colors"
                  >
                    Ver los 5 Motores
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Stats destacados */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {statsDestacados.map((stat, i) => (
                    <div key={i} className="text-center p-3 bg-industrial-800/30 rounded-lg border border-industrial-700/30">
                      <div className="text-xl md:text-2xl font-bold text-teseo-400">{stat.value}</div>
                      <div className="text-xs text-industrial-300">{stat.label}</div>
                      <div className="text-[10px] text-industrial-500">{stat.sublabel}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mockup del Boletín */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* === CONTENEDOR PARA IMAGEN DE PORTADA === */}
                <div className="relative bg-gradient-to-br from-industrial-800/80 to-industrial-900/80 rounded-2xl p-4 border border-industrial-700/50 shadow-2xl backdrop-blur-sm">

                  {/*
                    ============================================
                    IMAGEN DE PORTADA DEL BOLETÍN
                    ============================================
                    Reemplaza el src con la ruta de tu imagen.
                    Tamaño recomendado: 600x800px (aspect ratio 3:4)
                    Formatos: PNG, JPG, WebP
                    Ubicación sugerida: /public/images/boletin-portada.png
                  */}
                  <div className="aspect-[3/4] rounded-xl shadow-xl overflow-hidden relative bg-[#4A2B7E]">
                    {/* Imagen de portada - REEMPLAZAR SRC */}
                    <img
                      src="/images/boletin-portada.png"
                      alt="Boletín Económico: Perspectivas de Hidalgo 2026"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback si no existe la imagen
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    {/* Fallback visual si no hay imagen */}
                    <div className="absolute inset-0 p-6 flex-col hidden" style={{ display: 'flex' }}>
                      <div className="text-right text-white/80 text-sm italic mb-4">
                        Enero 2026
                      </div>
                      <div className="mb-auto">
                        <h3 className="text-white font-bold text-lg mb-1">BOLETÍN ECONÓMICO:</h3>
                        <h2 className="text-white font-bold text-2xl md:text-3xl leading-tight">
                          PERSPECTIVAS<br />DE HIDALGO
                        </h2>
                        <div className="mt-4 text-white/30 text-6xl md:text-7xl font-bold leading-none">
                          20<br />26
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-white font-bold text-xl tracking-wider">TESEO</div>
                        <div className="text-white/60 text-xs tracking-widest">Data Lab</div>
                      </div>
                    </div>
                  </div>

                  {/* Badge flotante */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-success-500 to-success-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Gratis
                  </div>

                  {/* Info del documento */}
                  <div className="absolute -bottom-3 left-6 bg-industrial-800 border border-industrial-700 text-industrial-300 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    9 páginas • PDF
                  </div>
                </div>

                {/* Glow de fondo */}
                <div className="absolute -inset-8 bg-teseo-500/15 blur-3xl rounded-full -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== DATO DESTACADO: HIDALGO #1 ==================== */}
        <section className="py-12 px-4 bg-gradient-to-r from-success-500/10 via-industrial-900 to-success-500/10 border-y border-success-500/20">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-success-500/20 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-success-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-success-400 font-bold text-xl">Hidalgo: #1 Nacional</p>
                    <p className="text-industrial-400 text-sm">en crecimiento económico</p>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-industrial-300">
                    Hidalgo superó a todos los estados del país en crecimiento económico.
                    <span className="text-white font-medium"> ¿Qué sectores impulsaron este resultado histórico?</span>
                  </p>
                  <p className="text-success-400 font-medium mt-2 flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="w-4 h-4" />
                    Descubre qué oportunidades representa para tu negocio
                  </p>
                </div>

                <button
                  onClick={scrollToForm}
                  className="px-5 py-2.5 bg-success-500/20 hover:bg-success-500/30 border border-success-500/30 text-success-400 font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  Ver análisis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== VARIABLES CLAVE ==================== */}
        <section id="contenido" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-teseo-500/10 border border-teseo-500/20 rounded-full text-teseo-400 text-sm font-medium mb-4">
                Contenido del Boletín
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Indicadores clave que descubrirás
              </h2>
              <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                Datos del Censo Económico 2024, Banxico, FMI e INEGI analizados por expertos
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {variablesClave.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group p-5 bg-industrial-800/40 border border-industrial-700/50 rounded-xl hover:border-teseo-500/40 hover:bg-industrial-800/60 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-teseo-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-teseo-500/25 transition-colors">
                      <item.icon className="w-5 h-5 text-teseo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.label}</h3>
                      <p className="text-industrial-400 text-sm flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {item.hint}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center mt-10">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 text-teseo-400 hover:text-teseo-300 font-medium transition-colors"
              >
                Desbloquea el análisis completo
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ==================== LOS 5 MOTORES DE HIDALGO ==================== */}
        <section id="motores" className="py-20 px-4 bg-industrial-900/50 border-y border-industrial-800/50">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-tech-500/10 border border-tech-500/20 rounded-full text-tech-400 text-sm font-medium mb-4">
                Análisis Sectorial
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Los 5 Motores de Hidalgo
              </h2>
              <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                Sectores que concentrarán la inversión, el empleo y la demanda del Tren México-Pachuca
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {motoresHidalgo.slice(0, 3).map((motor, index) => (
                <motion.div
                  key={motor.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 bg-gradient-to-br from-industrial-800/60 to-industrial-900/60 border border-industrial-700/50 rounded-2xl hover:border-teseo-500/30 transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-${motor.color}-500/20 flex items-center justify-center mb-4`}>
                    <motor.icon className={`w-7 h-7 text-${motor.color}-400`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{motor.title}</h3>
                  <p className="text-industrial-400 text-sm mb-4">{motor.description}</p>

                  <div className="p-3 bg-industrial-900/50 rounded-lg border border-industrial-700/30 mb-4">
                    <p className="text-industrial-300 text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4 text-teseo-500" />
                      {motor.question}
                    </p>
                  </div>

                  <p className="text-teseo-400 text-sm mb-4 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {motor.benefit}
                  </p>

                  <div className="space-y-1.5">
                    {motor.opportunities.map((opp, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-industrial-300">
                        <ChevronRight className="w-4 h-4 text-industrial-500" />
                        {opp}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Segunda fila - 2 motores */}
            <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
              {motoresHidalgo.slice(3).map((motor, index) => (
                <motion.div
                  key={motor.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  className="relative p-6 bg-gradient-to-br from-industrial-800/60 to-industrial-900/60 border border-industrial-700/50 rounded-2xl hover:border-teseo-500/30 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-${motor.color}-500/20 flex items-center justify-center mb-4`}>
                    <motor.icon className={`w-7 h-7 text-${motor.color}-400`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{motor.title}</h3>
                  <p className="text-industrial-400 text-sm mb-4">{motor.description}</p>

                  <div className="p-3 bg-industrial-900/50 rounded-lg border border-industrial-700/30 mb-4">
                    <p className="text-industrial-300 text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4 text-teseo-500" />
                      {motor.question}
                    </p>
                  </div>

                  <p className="text-teseo-400 text-sm mb-4 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {motor.benefit}
                  </p>

                  <div className="space-y-1.5">
                    {motor.opportunities.map((opp, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-industrial-300">
                        <ChevronRight className="w-4 h-4 text-industrial-500" />
                        {opp}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== HIDALGO VS BAJÍO ==================== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Contenido */}
              <motion.div {...fadeInUp}>
                <span className="inline-block px-4 py-1.5 bg-warning-500/10 border border-warning-500/20 rounded-full text-warning-400 text-sm font-medium mb-4">
                  Análisis Comparativo
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Hidalgo vs. Bajío: <span className="text-warning-400">¿Cuál es la brecha real?</span>
                </h2>
                <p className="text-industrial-300 text-lg mb-6">
                  Hidalgo compite con los estados más industrializados del país.
                  Pero tiene una <span className="text-white font-semibold">ventaja logística única</span> que
                  ningún estado del Bajío puede igualar. <span className="text-warning-400">¿Sabes cuál es?</span>
                </p>

                <div className="p-5 bg-gradient-to-r from-teseo-500/10 to-tech-500/10 border border-teseo-500/20 rounded-xl mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Train className="w-6 h-6 text-teseo-400" />
                    <h4 className="text-white font-semibold">El factor diferenciador</h4>
                  </div>
                  <p className="text-industrial-300 text-sm">
                    Descubre qué infraestructura estratégica posiciona a Hidalgo como
                    el <span className="text-teseo-400 font-medium">próximo hub económico del centro del país</span>.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-industrial-400 text-sm mb-2">En el boletín encontrarás:</p>
                  {preguntasBajio.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-industrial-800/30 rounded-lg border border-industrial-700/30 hover:border-warning-500/30 transition-colors">
                      <item.icon className="w-5 h-5 text-warning-500" />
                      <span className="text-industrial-300 text-sm flex-1">{item.question}</span>
                      <Lock className="w-4 h-4 text-industrial-600" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-warning-500/10 border border-warning-500/20 rounded-xl">
                  <p className="text-warning-400 text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Beneficio: Identifica oportunidades donde otros ven limitaciones
                  </p>
                </div>
              </motion.div>

              {/* Visual de oportunidad */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-industrial-800/60 to-industrial-900/60 border border-industrial-700/50 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="bg-industrial-900/50 rounded-xl p-6 border border-industrial-700/30">
                    <h4 className="text-white font-semibold mb-6 text-center">¿Dónde está Hidalgo frente al Bajío?</h4>

                    <div className="space-y-6">
                      {/* Visualización abstracta */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-tech-400 text-sm font-medium">Estados del Bajío</span>
                          <span className="text-teseo-400 text-sm font-medium">Hidalgo</span>
                        </div>
                        <div className="h-8 bg-industrial-800 rounded-full overflow-hidden relative">
                          <div className="absolute left-0 top-0 h-full w-3/4 bg-gradient-to-r from-tech-500/60 to-tech-500/30 rounded-full" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-teseo-500 rounded-full border-2 border-white shadow-lg" />
                        </div>
                        <p className="text-center text-industrial-500 text-xs mt-2">La brecha actual</p>
                      </div>

                      {/* Flecha de oportunidad */}
                      <div className="flex items-center justify-center gap-4 py-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-warning-500/50" />
                        <div className="px-4 py-2 bg-warning-500/20 border border-warning-500/30 rounded-full">
                          <span className="text-warning-400 text-sm font-medium">Oportunidad</span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-warning-500/50" />
                      </div>

                      {/* Ventaja única */}
                      <div className="text-center p-4 bg-teseo-500/10 border border-teseo-500/20 rounded-xl">
                        <Train className="w-8 h-8 text-teseo-400 mx-auto mb-2" />
                        <p className="text-white font-medium mb-1">Ventaja logística única</p>
                        <p className="text-industrial-400 text-xs">Descubre en el boletín qué hace diferente a Hidalgo</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-industrial-500 text-sm mt-4">
                    Análisis completo en el boletín
                  </p>
                </div>

                <div className="absolute -inset-4 bg-warning-500/10 blur-3xl rounded-full -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== PROYECCIONES 2026 ==================== */}
        <section className="py-20 px-4 bg-gradient-to-b from-industrial-900/50 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-success-500/10 border border-success-500/20 rounded-full text-success-400 text-sm font-medium mb-4">
                Mirando al Futuro
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Perspectivas para <span className="text-success-400">2026</span>
              </h2>
              <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                Factores clave que impactarán la economía de Hidalgo y México
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {proyecciones.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 bg-industrial-800/40 border border-industrial-700/50 rounded-xl hover:border-success-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-success-500/15 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-success-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-industrial-300 text-sm mb-2">{item.desc}</p>
                  <p className="text-industrial-500 text-xs">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== BENEFICIOS ==================== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Por qué descargar este boletín?
              </h2>
              <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                Información estratégica para tomar mejores decisiones de negocio
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {beneficios.map((beneficio, index) => (
                <motion.div
                  key={beneficio.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teseo-500/20 to-tech-500/20 flex items-center justify-center mx-auto mb-4">
                    <beneficio.icon className="w-7 h-7 text-teseo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{beneficio.title}</h3>
                  <p className="text-industrial-400 text-sm leading-relaxed">{beneficio.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FORMULARIO DE DESCARGA ==================== */}
        <section ref={formRef} className="py-20 px-4 bg-gradient-to-b from-industrial-900/50 to-industrial-950">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-start">

              {/* Info lateral */}
              <motion.div {...fadeInUp} className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Descarga tu boletín gratuito
                  </h2>
                  <p className="text-industrial-400">
                    9 páginas de análisis económico con datos actualizados y proyecciones para 2026.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: FileText, text: 'Panorama económico nacional' },
                    { icon: BarChart3, text: 'Perspectivas de Hidalgo' },
                    { icon: Factory, text: 'Los 5 motores económicos' },
                    { icon: Target, text: 'Proyecciones 2026' },
                    { icon: Lock, text: 'Tus datos están protegidos' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-industrial-300">
                      <item.icon className="w-5 h-5 text-teseo-500" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Consultoría */}
                <div className="p-5 bg-gradient-to-br from-teseo-500/10 to-tech-500/10 border border-teseo-500/20 rounded-xl">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-teseo-400" />
                    ¿Necesitas un análisis personalizado?
                  </h4>
                  <p className="text-industrial-400 text-sm mb-4">
                    Desarrollamos estudios a la medida de tu proyecto, sector o municipio de interés.
                  </p>
                  <Link
                    to="/#contacto"
                    className="inline-flex items-center gap-2 text-teseo-400 hover:text-teseo-300 text-sm font-medium"
                  >
                    Solicitar consultoría
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Formulario */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-3"
              >
                <div className="bg-gradient-to-br from-industrial-800/80 to-industrial-900/80 border border-industrial-700/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
                  {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Nombre */}
                      <div>
                        <label className="block text-sm font-medium text-industrial-300 mb-2">
                          Nombre completo *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-industrial-500" />
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            placeholder="Tu nombre"
                            className="w-full pl-12 pr-4 py-3.5 bg-industrial-900/60 border border-industrial-700 rounded-xl text-white placeholder-industrial-500 focus:outline-none focus:border-teseo-500 focus:ring-1 focus:ring-teseo-500/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-industrial-300 mb-2">
                          Correo electrónico *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-industrial-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="tu@email.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-industrial-900/60 border border-industrial-700 rounded-xl text-white placeholder-industrial-500 focus:outline-none focus:border-teseo-500 focus:ring-1 focus:ring-teseo-500/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Grid 2 columnas */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Empresa */}
                        <div>
                          <label className="block text-sm font-medium text-industrial-300 mb-2">
                            Empresa *
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-industrial-500" />
                            <input
                              type="text"
                              name="empresa"
                              value={formData.empresa}
                              onChange={handleInputChange}
                              required
                              placeholder="Tu empresa"
                              className="w-full pl-12 pr-4 py-3.5 bg-industrial-900/60 border border-industrial-700 rounded-xl text-white placeholder-industrial-500 focus:outline-none focus:border-teseo-500 focus:ring-1 focus:ring-teseo-500/50 transition-all"
                            />
                          </div>
                        </div>

                        {/* Teléfono */}
                        <div>
                          <label className="block text-sm font-medium text-industrial-300 mb-2">
                            Teléfono *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-industrial-500" />
                            <input
                              type="tel"
                              name="telefono"
                              value={formData.telefono}
                              onChange={handleInputChange}
                              required
                              placeholder="+52 (771) 123 4567"
                              className="w-full pl-12 pr-4 py-3.5 bg-industrial-900/60 border border-industrial-700 rounded-xl text-white placeholder-industrial-500 focus:outline-none focus:border-teseo-500 focus:ring-1 focus:ring-teseo-500/50 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Checkbox términos */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-industrial-600 bg-industrial-800 text-teseo-500 focus:ring-teseo-500"
                        />
                        <label htmlFor="terms" className="text-sm text-industrial-400">
                          Acepto los{' '}
                          <Link to="/terminos" className="text-teseo-400 hover:underline" target="_blank">
                            términos y condiciones
                          </Link>{' '}
                          y el{' '}
                          <Link to="/aviso-privacidad" className="text-teseo-400 hover:underline" target="_blank">
                            aviso de privacidad
                          </Link>
                        </label>
                      </div>

                      {/* Error */}
                      {error && (
                        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gradient-to-r from-teseo-500 to-teseo-600 hover:from-teseo-600 hover:to-teseo-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-teseo-500/25 hover:scale-[1.01]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            Descargar Boletín Gratis
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* Success State */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-20 h-20 bg-success-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-success-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        ¡Revisa tu correo!
                      </h3>
                      <p className="text-industrial-300 mb-2">
                        Hemos enviado el boletín a <span className="text-teseo-400 font-medium">{formData.email}</span>
                      </p>
                      <p className="text-industrial-500 text-sm mb-6">
                        Si no lo encuentras, revisa tu carpeta de spam o promociones.
                      </p>

                      <div className="p-4 bg-industrial-800/50 rounded-xl border border-industrial-700/50 mb-6">
                        <p className="text-industrial-400 text-sm mb-3">¿No recibiste el correo? Descarga directamente:</p>
                        <a
                          href="/descargas/boletin-perspectivas-hidalgo-2026.pdf"
                          download="Boletin-Perspectivas-Hidalgo-2026-Teseo.pdf"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teseo-500 hover:bg-teseo-600 text-white font-semibold rounded-lg transition-colors text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Descargar PDF
                        </a>
                      </div>

                      <div className="pt-6 border-t border-industrial-700">
                        <p className="text-industrial-400 text-sm mb-4">¿Te gustaría un análisis personalizado para tu proyecto?</p>
                        <Link
                          to="/#contacto"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-industrial-800 hover:bg-industrial-700 border border-industrial-700 text-white font-medium rounded-xl transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Solicitar consultoría
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== CTA CONSULTORÍA ==================== */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="relative bg-gradient-to-br from-teseo-500/10 via-industrial-800/50 to-tech-500/10 border border-teseo-500/20 rounded-2xl p-8 md:p-12 text-center overflow-hidden"
            >
              {/* Decoración */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-teseo-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-tech-500/20 rounded-full blur-3xl" />

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-teseo-500 to-tech-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  ¿Necesitas un estudio a la medida?
                </h2>
                <p className="text-industrial-300 max-w-2xl mx-auto mb-4 text-lg">
                  En Teseo Data Lab desarrollamos análisis económicos personalizados para tu proyecto,
                  sector o municipio de interés en Hidalgo.
                </p>
                <p className="text-industrial-400 text-sm mb-8 italic">
                  "Deja que otros tengan opiniones, tú ten data"
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/#contacto"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teseo-500 to-teseo-600 hover:from-teseo-600 hover:to-teseo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-teseo-500/25"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Solicitar Consultoría
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-industrial-800/60 hover:bg-industrial-800 border border-industrial-700/50 text-white font-medium rounded-xl transition-colors"
                  >
                    Conocer Servicios
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== FOOTER MÍNIMO ==================== */}
        <footer className="py-8 px-4 border-t border-industrial-800/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-industrial-500 text-sm">
            <div className="flex items-center gap-2">
              <img src="/logo-teseo.png" alt="Teseo" className="h-6 w-auto opacity-60" />
              <span>© {new Date().getFullYear()} Teseo Data Lab</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/aviso-privacidad" className="hover:text-teseo-400 transition-colors">
                Aviso de Privacidad
              </Link>
              <Link to="/terminos" className="hover:text-teseo-400 transition-colors">
                Términos
              </Link>
              <Link to="/" className="hover:text-teseo-400 transition-colors">
                Sitio Principal
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
