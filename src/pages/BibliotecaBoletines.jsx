/**
 * Biblioteca de Boletines - Teseo Data Lab
 * Repositorio de reportes y análisis económicos para descarga directa
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  TrendingUp,
  Building2,
  Factory,
  Home,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  Search,
  Filter,
  Eye,
  Clock,
  MapPin,
  BarChart3,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

// Datos de los boletines
const boletines = [
  {
    id: 'economico-2026',
    titulo: 'Perspectivas Económicas Hidalgo 2026',
    subtitulo: 'Análisis macroeconómico y sectorial',
    categoria: 'Económico',
    fecha: 'Enero 2026',
    año: '2026',
    region: 'Hidalgo',
    descripcion: 'Análisis integral de las perspectivas económicas para Hidalgo en 2026. Incluye proyecciones de PIB, empleo, inversión y los 5 motores económicos del estado.',
    highlights: [
      'Proyección PIB estatal +4.2%',
      '5 sectores motores analizados',
      'Impacto del nearshoring',
      'Oportunidades de inversión'
    ],
    paginas: 28,
    archivo: '/archivos-boletines/boletin-economico-hidalgo-2026.pdf',
    imagen: '/images/boletin-economico-cover.png',
    color: 'emerald',
    icon: TrendingUp,
    destacado: true
  },
  {
    id: 'inmobiliario-ampi-2025',
    titulo: 'Panorama Inmobiliario AMPI Riviera Nayarit',
    subtitulo: 'Mercado inmobiliario de lujo Q4 2025',
    categoria: 'Inmobiliario',
    fecha: 'Diciembre 2025',
    año: '2025',
    region: 'Riviera Nayarit',
    descripcion: 'Reporte completo del mercado inmobiliario de Riviera Nayarit. Análisis de precios, demanda, oferta, inventario y tendencias del segmento premium.',
    highlights: [
      'Ventas Q4 analizadas',
      'Índice de precios por zona',
      'Inventario disponible',
      'Proyección 2026'
    ],
    paginas: 35,
    archivo: '/archivos-boletines/boletin-inmobiliario-2025.pdf',
    imagen: '/images/boletin-inmobiliario-cover.png',
    color: 'blue',
    icon: Home,
    destacado: false
  },
  {
    id: 'acero-2025',
    titulo: 'Futuros del Acero en México',
    subtitulo: 'Análisis de la industria siderúrgica',
    categoria: 'Industrial',
    fecha: '2025',
    año: '2025',
    region: 'Nacional',
    descripcion: 'Estudio del mercado del acero en México. Producción, consumo, importaciones y perspectivas para la industria siderúrgica nacional.',
    highlights: [
      'Producción nacional analizada',
      'Cadena de valor completa',
      'Impacto arancelario',
      'Proyecciones 2026-2028'
    ],
    paginas: 42,
    archivo: '/archivos-boletines/boletin-acero-2025.pdf',
    imagen: '/images/boletin-acero-cover.png',
    color: 'slate',
    icon: Factory,
    destacado: false
  },
  {
    id: 'concreto-2025',
    titulo: 'Perspectivas del Mercado de Concreto',
    subtitulo: 'Industria cementera en México 2025',
    categoria: 'Industrial',
    fecha: '2025',
    año: '2025',
    region: 'Nacional',
    descripcion: 'Análisis exhaustivo del mercado de concreto premezclado en México. Incluye volúmenes, precios, competencia y proyecciones de crecimiento.',
    highlights: [
      '27M m³ producción anual',
      'CAGR proyectado 8.3%',
      'Análisis competitivo',
      'Hotspots de demanda'
    ],
    paginas: 38,
    archivo: '/archivos-boletines/boletin-concreto-2025.pdf',
    imagen: '/images/boletin-concreto-cover.png',
    color: 'amber',
    icon: Building2,
    destacado: false
  }
]

// Categorías para filtrado
const categorias = ['Todos', 'Económico', 'Inmobiliario', 'Industrial']

// Colores por categoría
const colorMap = {
  emerald: {
    bg: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    button: 'bg-emerald-500 hover:bg-emerald-600',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  blue: {
    bg: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    button: 'bg-blue-500 hover:bg-blue-600',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  slate: {
    bg: 'from-slate-500/20 to-slate-600/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    button: 'bg-slate-500 hover:bg-slate-600',
    badge: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    button: 'bg-amber-500 hover:bg-amber-600',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    button: 'bg-cyan-500 hover:bg-cyan-600',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  }
}

// Animaciones
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

// Componente de Card de Boletín
function BoletinCard({ boletin, index }) {
  const colors = colorMap[boletin.color]
  const Icon = boletin.icon

  const handleDownload = () => {
    // Crear link temporal para descarga
    const link = document.createElement('a')
    link.href = boletin.archivo
    link.download = `${boletin.id}.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`group relative bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl overflow-hidden`}
    >
      {/* Badge destacado o próximamente */}
      {boletin.proximamente ? (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-industrial-600 to-industrial-700 text-white text-xs font-bold rounded-full shadow-lg">
            <Clock size={12} />
            Próximamente
          </span>
        </div>
      ) : boletin.destacado && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
            <Sparkles size={12} />
            Nuevo
          </span>
        </div>
      )}

      {/* Header con icono */}
      <div className="relative p-6 pb-4">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} ${colors.border} border mb-4`}>
          <Icon className={`w-7 h-7 ${colors.text}`} />
        </div>

        {/* Categoría y fecha */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors.badge}`}>
            {boletin.categoria}
          </span>
          <span className="flex items-center gap-1 text-xs text-industrial-400">
            <Calendar size={12} />
            {boletin.fecha}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teseo-400 transition-colors">
          {boletin.titulo}
        </h3>
        <p className="text-sm text-industrial-400 mb-3">
          {boletin.subtitulo}
        </p>

        {/* Región */}
        <div className="flex items-center gap-1 text-xs text-industrial-500">
          <MapPin size={12} />
          {boletin.region}
        </div>
      </div>

      {/* Descripción */}
      <div className="px-6 pb-4">
        <p className="text-sm text-industrial-300 leading-relaxed line-clamp-3">
          {boletin.descripcion}
        </p>
      </div>

      {/* Highlights */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {boletin.highlights.slice(0, 4).map((highlight, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight className={`w-3 h-3 mt-1 flex-shrink-0 ${colors.text}`} />
              <span className="text-xs text-industrial-400">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer con meta y botón */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-industrial-500">
            <span className="flex items-center gap-1">
              <FileText size={12} />
              {boletin.paginas} páginas
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              PDF
            </span>
          </div>
        </div>

        {/* Botón de descarga */}
        {boletin.proximamente ? (
          <div className="w-full py-3 px-4 bg-industrial-700/50 text-industrial-400 font-semibold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
            <Clock size={18} />
            Disponible pronto
          </div>
        ) : (
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 ${colors.button} text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/20`}
          >
            <Download size={18} />
            Descargar Gratis
          </motion.button>
        )}
      </div>

      {/* Efecto hover glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
        <div className={`absolute inset-0 bg-gradient-to-t from-${boletin.color}-500/5 to-transparent`} />
      </div>
    </motion.div>
  )
}

// Componente de Card Destacada (Hero)
function BoletinDestacado({ boletin }) {
  const colors = colorMap[boletin.color]
  const Icon = boletin.icon

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = boletin.archivo
    link.download = `${boletin.id}.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-gradient-to-br from-industrial-800/80 to-industrial-900/80 backdrop-blur-xl border border-industrial-700/50 rounded-3xl overflow-hidden`}
    >
      <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Contenido */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
              <Sparkles size={12} />
              Último lanzamiento
            </span>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors.badge}`}>
              {boletin.categoria}
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            {boletin.titulo}
          </h2>
          <p className="text-lg text-industrial-300 mb-6">
            {boletin.subtitulo}
          </p>

          <p className="text-industrial-400 mb-6 leading-relaxed">
            {boletin.descripcion}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {boletin.highlights.map((highlight, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full ${colors.button} flex items-center justify-center`}>
                  <ChevronRight className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-industrial-300">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-6 mb-6 text-sm text-industrial-400">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {boletin.fecha}
            </span>
            <span className="flex items-center gap-2">
              <FileText size={16} />
              {boletin.paginas} páginas
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {boletin.region}
            </span>
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center justify-center gap-3 px-8 py-4 ${colors.button} text-white font-bold rounded-xl shadow-xl shadow-black/30 text-lg`}
          >
            <Download size={22} />
            Descargar Ahora
            <ArrowRight size={20} />
          </motion.button>
        </div>

        {/* Visual - Imagen de portada estilo BoletinEconomico */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative bg-gradient-to-br from-industrial-800/80 to-industrial-900/80 rounded-2xl p-4 border border-industrial-700/50 shadow-2xl backdrop-blur-sm">
            {/* Imagen de portada */}
            <div className="aspect-[3/4] rounded-xl shadow-xl overflow-hidden relative bg-[#4A2B7E] max-w-sm">
              <img
                src="/images/boletin-portada.png"
                alt="Boletín Económico: Perspectivas de Hidalgo 2026"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback visual si no hay imagen */}
              <div className="absolute inset-0 p-6 flex-col hidden" style={{ display: 'none' }}>
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
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Nuevo
            </div>

            {/* Info del documento */}
            <div className="absolute -bottom-3 left-6 bg-industrial-800 border border-industrial-700 text-industrial-300 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              {boletin.paginas} páginas • PDF
            </div>
          </div>

          {/* Glow de fondo */}
          <div className={`absolute -inset-8 bg-gradient-to-br ${colors.bg} blur-3xl rounded-full -z-10 opacity-60`} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function BibliotecaBoletines() {
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  // Filtrar boletines
  const boletinesFiltrados = boletines.filter(boletin => {
    const coincideCategoria = filtroCategoria === 'Todos' || boletin.categoria === filtroCategoria
    const coincideBusqueda = boletin.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      boletin.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      boletin.region.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  // Boletín destacado (el más reciente marcado como destacado)
  const boletinDestacado = boletines.find(b => b.destacado)

  // Si hay filtros activos, mostrar todos los boletines filtrados (incluido destacado)
  // Si no hay filtros, excluir el destacado del grid (se muestra arriba)
  const hayFiltrosActivos = filtroCategoria !== 'Todos' || busqueda !== ''
  const otrosBoletines = hayFiltrosActivos
    ? boletinesFiltrados
    : boletinesFiltrados.filter(b => !b.destacado)

  return (
    <>
      <Helmet>
        <title>Biblioteca de Boletines | Teseo Data Lab</title>
        <meta name="description" content="Descarga gratis nuestros boletines y reportes de análisis económico, inmobiliario e industrial. Información estratégica para la toma de decisiones." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-industrial-950 via-industrial-900 to-industrial-950">
        {/* Efectos de fondo */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teseo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-3xl" />
        </div>

        {/* Header / Navbar simple */}
        <header className="relative z-50 border-b border-industrial-800/50 bg-industrial-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo-teseo.png" alt="Teseo Data Lab" className="h-10 w-auto" />
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-industrial-400 hover:text-white transition-colors text-sm">
                  Inicio
                </Link>
                <Link to="/blog" className="text-industrial-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
                <a
                  href="mailto:contacto@teseodata.com"
                  className="px-4 py-2 bg-teseo-500 hover:bg-teseo-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Contacto
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-800/50 border border-industrial-700/50 rounded-full mb-6">
                <BookOpen className="w-4 h-4 text-teseo-400" />
                <span className="text-sm text-industrial-300">Biblioteca de Recursos</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Boletines y Reportes
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teseo-400 via-emerald-400 to-cyan-400">
                  de Análisis Estratégico
                </span>
              </h1>

              <p className="text-lg md:text-xl text-industrial-300 max-w-3xl mx-auto mb-8">
                Descarga gratis nuestros estudios de mercado, análisis económicos y reportes sectoriales.
                Información basada en datos para decisiones estratégicas.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{boletines.length}</div>
                  <div className="text-sm text-industrial-400">Boletines</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">+150</div>
                  <div className="text-sm text-industrial-400">Páginas de análisis</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-industrial-400">Gratis</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boletín Destacado */}
        {boletinDestacado && filtroCategoria === 'Todos' && busqueda === '' && (
          <section className="relative px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <BoletinDestacado boletin={boletinDestacado} />
            </div>
          </section>
        )}

        {/* Filtros */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-industrial-800/30 border border-industrial-700/30 rounded-2xl backdrop-blur-sm">
              {/* Búsqueda */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-industrial-500" />
                <input
                  type="text"
                  placeholder="Buscar boletines..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-industrial-900/50 border border-industrial-700/50 rounded-xl text-white placeholder-industrial-500 focus:outline-none focus:border-teseo-500/50 transition-colors"
                />
              </div>

              {/* Filtros por categoría */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter className="w-4 h-4 text-industrial-500 mr-2" />
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFiltroCategoria(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filtroCategoria === cat
                        ? 'bg-teseo-500 text-white'
                        : 'bg-industrial-800/50 text-industrial-400 hover:text-white hover:bg-industrial-700/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Boletines */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {otrosBoletines.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otrosBoletines.map((boletin, index) => (
                  <BoletinCard key={boletin.id} boletin={boletin} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-industrial-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No se encontraron boletines</h3>
                <p className="text-industrial-400">Intenta con otros filtros o términos de búsqueda</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="relative bg-gradient-to-br from-teseo-500/10 to-emerald-500/10 border border-teseo-500/20 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teseo-500/20 rounded-2xl mb-6">
                  <Layers className="w-8 h-8 text-teseo-400" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  ¿Necesitas un análisis personalizado?
                </h2>
                <p className="text-industrial-300 mb-8 max-w-2xl mx-auto">
                  Nuestro equipo de expertos puede crear estudios a medida para tu industria,
                  mercado o proyecto específico.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://calendly.com/teseodata/teseo-data-lab-consultoria-personalizada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-teseo-500 hover:bg-teseo-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Agendar Consultoría
                    <ArrowRight size={20} />
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-industrial-800/50 hover:bg-industrial-700/50 text-white font-medium rounded-xl border border-industrial-700/50 transition-colors"
                  >
                    Ver Servicios
                    <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer simple */}
        <footer className="relative border-t border-industrial-800/50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo-teseo.png" alt="Teseo Data Lab" className="h-8 w-auto" />
              <span className="text-sm text-industrial-500">© 2026 Teseo Data Lab</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-industrial-400">
              <Link to="/aviso-privacidad" className="hover:text-white transition-colors">
                Aviso de Privacidad
              </Link>
              <Link to="/terminos" className="hover:text-white transition-colors">
                Términos
              </Link>
              <a href="mailto:contacto@teseodata.com" className="hover:text-teseo-400 transition-colors">
                contacto@teseodata.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
