/**
 * PostCard - Tarjeta de post para listados de blog
 * Diseño consistente con el estilo Teseo
 */

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Formatear fecha en español
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Mapeo de colores por categoría
const categoryColors = {
  teseo: 'bg-teseo-500/20 text-teseo-300 border-teseo-500/30',
  tech: 'bg-tech-500/20 text-tech-300 border-tech-500/30',
  success: 'bg-success-500/20 text-success-300 border-success-500/30',
  warning: 'bg-warning-500/20 text-warning-300 border-warning-500/30',
  default: 'bg-industrial-500/20 text-industrial-300 border-industrial-500/30'
}

export default function PostCard({ post, featured = false }) {
  const categoryColor = categoryColors[post.category?.color] || categoryColors.default
  const postUrl = `/blog/${post.category?.slug}/${post.slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-industrial-800/50 backdrop-blur-sm border border-industrial-700/50 rounded-xl overflow-hidden hover:border-teseo-500/50 transition-all duration-300 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <Link to={postUrl} className="block">
        {/* Imagen */}
        <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
          <img
            src={post.featuredImage?.url || '/placeholder-blog.jpg'}
            alt={post.featuredImage?.alt || post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/90 via-industrial-900/20 to-transparent" />

          {/* Badge de categoría */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColor}`}>
              {post.category?.name || 'General'}
            </span>
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teseo-500 text-white">
                Destacado
              </span>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-5">
          {/* Título */}
          <h3 className={`font-semibold text-white group-hover:text-teseo-400 transition-colors line-clamp-2 ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`mt-2 text-industrial-300 line-clamp-2 ${featured ? 'text-base' : 'text-sm'}`}>
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-industrial-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime || 5} min
            </span>
            {post.cityData && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {post.cityData.ciudad}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2 text-teseo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Leer más</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
