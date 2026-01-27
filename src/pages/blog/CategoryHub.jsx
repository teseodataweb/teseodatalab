/**
 * CategoryHub - Hub de categoría/ciudad
 * Muestra posts de una categoría con estadísticas del mercado
 */

import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Building2, Factory, TrendingUp, BarChart3,
  ArrowLeft, ArrowRight, ChevronRight
} from 'lucide-react'
import PostCard from '@/components/blog/PostCard'
import blogPosts from '@/data/blogPosts.json'
import categories from '@/data/categories.json'
import cityData from '@/data/cityData.json'
import { generateCategorySchema, generateBreadcrumbSchema, SchemaScript } from '@/utils/generateSchema'

// Iconos por tipo
const iconMap = {
  MapPin: MapPin,
  Building2: Building2,
  Factory: Factory,
  BarChart3: BarChart3,
  TrendingUp: TrendingUp
}

// Formatear número con separadores
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toLocaleString('es-MX')
}

// Formatear moneda
function formatCurrency(num) {
  return '$' + num.toLocaleString('es-MX')
}

export default function CategoryHub() {
  const { categorySlug } = useParams()

  // Buscar categoría
  const category = useMemo(() => {
    return categories.find(c => c.slug === categorySlug) || {
      slug: categorySlug,
      name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
      description: `Artículos sobre ${categorySlug}`
    }
  }, [categorySlug])

  // Buscar datos de ciudad si aplica
  const city = useMemo(() => {
    return cityData[categorySlug] || null
  }, [categorySlug])

  // Filtrar posts de esta categoría
  const categoryPosts = useMemo(() => {
    return blogPosts.filter(post =>
      post.category?.slug === categorySlug ||
      post.category?.parent === categorySlug
    )
  }, [categorySlug])

  // Icono de la categoría
  const CategoryIcon = iconMap[category.icon] || MapPin

  // Schema para SEO
  const categorySchema = generateCategorySchema(category, city, categoryPosts.length)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: category.name, url: `/blog/${categorySlug}` }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900">
      {/* Schema JSON-LD */}
      <SchemaScript schema={categorySchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teseo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-tech-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-industrial-400 mb-8">
            <Link to="/" className="hover:text-teseo-400 transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-teseo-400 transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-teseo-400">{category.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Category header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-teseo-500/20 border border-teseo-500/30">
                <CategoryIcon className="w-8 h-8 text-teseo-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {category.name}
                </h1>
                <p className="text-industrial-400 mt-1">
                  {categoryPosts.length} artículos publicados
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-industrial-300 max-w-2xl">
              {category.description || city?.descripcion || `Análisis e inteligencia de mercado sobre ${category.name}.`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* City Stats (if available) */}
      {city && city.mercado && (
        <section className="py-8 border-y border-industrial-700/50 bg-industrial-800/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Precio m2 */}
              {city.mercado.costoM2Promedio && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50"
                >
                  <p className="text-xs text-industrial-400 mb-1">Costo por m²</p>
                  <p className="text-xl font-bold text-teseo-400">
                    {formatCurrency(city.mercado.costoM2Promedio)}
                  </p>
                </motion.div>
              )}

              {/* Plusvalía */}
              {city.mercado.plusvaliaAnual && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50"
                >
                  <p className="text-xs text-industrial-400 mb-1">Plusvalía Anual</p>
                  <p className="text-xl font-bold text-success-400">
                    +{city.mercado.plusvaliaAnual}%
                  </p>
                </motion.div>
              )}

              {/* Proyectos */}
              {city.mercado.proyectosActivos && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50"
                >
                  <p className="text-xs text-industrial-400 mb-1">Proyectos Activos</p>
                  <p className="text-xl font-bold text-tech-400">
                    {city.mercado.proyectosActivos}
                  </p>
                </motion.div>
              )}

              {/* Absorción */}
              {city.mercado.absorcionResidencial && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50"
                >
                  <p className="text-xs text-industrial-400 mb-1">Absorción</p>
                  <p className="text-xl font-bold text-warning-400">
                    {city.mercado.absorcionResidencial}%
                  </p>
                </motion.div>
              )}

              {/* Población */}
              {city.poblacion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50"
                >
                  <p className="text-xs text-industrial-400 mb-1">Población</p>
                  <p className="text-xl font-bold text-industrial-200">
                    {formatNumber(city.poblacion)}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Ventajas competitivas */}
            {city.ventajasCompetitivas && city.ventajasCompetitivas.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-industrial-400 mb-3">Ventajas competitivas:</p>
                <div className="flex flex-wrap gap-2">
                  {city.ventajasCompetitivas.slice(0, 4).map((ventaja, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-teseo-500/10 text-teseo-300 border border-teseo-500/30"
                    >
                      {ventaja.split(':')[0]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-industrial-400 hover:text-teseo-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Blog</span>
          </Link>

          {categoryPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CategoryIcon className="w-16 h-16 text-industrial-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Próximamente
              </h3>
              <p className="text-industrial-400 mb-6">
                Estamos preparando contenido sobre {category.name}. Vuelve pronto.
              </p>
              <Link
                to="/blog"
                className="px-6 py-2 bg-teseo-500 text-white rounded-lg hover:bg-teseo-600 transition-colors"
              >
                Ver otros artículos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-industrial-700/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              ¿Buscas análisis específico de {category.name}?
            </h2>
            <p className="text-industrial-300 mb-6">
              Generamos reportes personalizados con inteligencia de mercado para tu proyecto.
            </p>
            <Link
              to="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teseo-500 to-teseo-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-teseo-500/25 transition-all"
            >
              <span>Solicitar análisis personalizado</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
