/**
 * BlogPost - Página de artículo individual
 * Renderiza contenido Markdown con Schema JSON-LD
 */

import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import {
  Calendar, Clock, MapPin, User, ArrowLeft, ArrowRight,
  ChevronRight, ChevronLeft, Share2, Bookmark, Copy, Check,
  Twitter, Facebook, Linkedin
} from 'lucide-react'
import PostCard from '@/components/blog/PostCard'
import blogPosts from '@/data/blogPosts.json'
import cityData from '@/data/cityData.json'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  SchemaScript
} from '@/utils/generateSchema'

// Formatear fecha en español
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Custom components para ReactMarkdown
const markdownComponents = {
  h1: ({ node, ...props }) => (
    <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-semibold text-white mt-8 mb-4 border-b border-industrial-700 pb-2" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-semibold text-white mt-6 mb-3" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="text-industrial-200 leading-relaxed mb-4" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside text-industrial-200 mb-4 space-y-2" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside text-industrial-200 mb-4 space-y-2" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="text-industrial-200" {...props} />
  ),
  strong: ({ node, ...props }) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a className="text-teseo-400 hover:text-teseo-300 underline transition-colors" {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-teseo-500 pl-4 my-4 italic text-industrial-300" {...props} />
  ),
  code: ({ node, inline, ...props }) => (
    inline ? (
      <code className="px-1.5 py-0.5 bg-industrial-700 rounded text-teseo-300 text-sm" {...props} />
    ) : (
      <code className="block p-4 bg-industrial-800 rounded-lg overflow-x-auto text-sm" {...props} />
    )
  ),
  pre: ({ node, ...props }) => (
    <pre className="bg-industrial-800 rounded-lg p-4 overflow-x-auto mb-4" {...props} />
  ),
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse border border-industrial-700" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead className="bg-industrial-800" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th className="border border-industrial-700 px-4 py-2 text-left text-white font-semibold" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="border border-industrial-700 px-4 py-2 text-industrial-200" {...props} />
  ),
  img: ({ node, ...props }) => (
    <img className="rounded-lg max-w-full h-auto my-4" loading="lazy" {...props} />
  ),
  hr: ({ node, ...props }) => (
    <hr className="border-industrial-700 my-8" {...props} />
  )
}

export default function BlogPost() {
  const { categorySlug, postSlug } = useParams()
  const [copied, setCopied] = useState(false)

  // Buscar el post
  const post = useMemo(() => {
    return blogPosts.find(p =>
      p.slug === postSlug &&
      (p.category?.slug === categorySlug || !categorySlug)
    )
  }, [categorySlug, postSlug])

  // Encontrar posts anterior y siguiente
  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: null, nextPost: null }
    const currentIndex = blogPosts.findIndex(p => p.id === post.id)
    return {
      prevPost: currentIndex > 0 ? blogPosts[currentIndex - 1] : null,
      nextPost: currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null
    }
  }, [post])

  // Función para compartir
  const handleShare = async (platform) => {
    const url = window.location.href
    const title = post?.title || 'Artículo de Teseo'
    const text = post?.excerpt || ''

    switch (platform) {
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({ title, url, text })
          } catch (err) {
            // Usuario canceló
          }
        }
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          // Fallback para navegadores antiguos
          const textArea = document.createElement('textarea')
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
    }
  }

  // Buscar datos de ciudad si aplica
  const city = useMemo(() => {
    if (!post?.cityData?.ciudad) return null
    const cityKey = post.cityData.ciudad.toLowerCase().replace(/\s+/g, '')
    return cityData[categorySlug] || cityData[cityKey] || null
  }, [post, categorySlug])

  // Posts relacionados (misma categoría, excluyendo actual)
  const relatedPosts = useMemo(() => {
    if (!post) return []
    return blogPosts
      .filter(p => p.id !== post.id && p.category?.slug === post.category?.slug)
      .slice(0, 3)
  }, [post])

  // Schema para SEO
  const articleSchema = post ? generateArticleSchema(post) : null
  const breadcrumbSchema = post ? generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.category?.name || 'General', url: `/blog/${post.category?.slug}` },
    { name: post.title }
  ]) : null

  // 404 si no existe el post
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Artículo no encontrado</h1>
          <p className="text-industrial-400 mb-8">
            El artículo que buscas no existe o ha sido movido.
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-teseo-500 text-white rounded-lg hover:bg-teseo-600 transition-colors"
          >
            Volver al Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900">
      {/* Schema JSON-LD */}
      <SchemaScript schema={articleSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-industrial-400 mb-6 flex-wrap">
            <Link to="/" className="hover:text-teseo-400 transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-teseo-400 transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/blog/${post.category?.slug}`} className="hover:text-teseo-400 transition-colors">
              {post.category?.name || 'General'}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-industrial-500 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Back link */}
          <Link
            to={`/blog/${post.category?.slug}`}
            className="inline-flex items-center gap-2 text-industrial-400 hover:text-teseo-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a {post.category?.name || 'Blog'}</span>
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category badge */}
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teseo-500/20 text-teseo-300 border border-teseo-500/30 mb-4">
              {post.category?.name || 'General'}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-industrial-400 mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author?.name || 'Teseo Research'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime || 5} min de lectura
              </span>
              {post.cityData && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {post.cityData.ciudad}, {post.cityData.estado}
                </span>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredImage?.url && post.featuredImage.url !== '/placeholder-blog.jpg' && (
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            )}
          </motion.article>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid lg:grid-cols-[1fr,280px] gap-8">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="prose prose-invert max-w-none"
            >
              <ReactMarkdown components={markdownComponents}>
                {post.content}
              </ReactMarkdown>

              {/* Data sources */}
              {city?.fuenteDatos && (
                <div className="mt-8 p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50">
                  <p className="text-xs text-industrial-400">
                    <strong className="text-industrial-300">Fuentes de datos:</strong>{' '}
                    {city.fuenteDatos}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-teseo-500/10 to-tech-500/10 border border-teseo-500/30">
                <h3 className="text-xl font-semibold text-white mb-2">
                  ¿Quieres analizar tu proyecto en {post.cityData?.ciudad || 'México'}?
                </h3>
                <p className="text-industrial-300 mb-4">
                  Nuestro equipo puede generar un análisis personalizado con inteligencia de mercado específica para tu zona.
                </p>
                <Link
                  to="/#contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-teseo-500 text-white font-medium rounded-lg hover:bg-teseo-600 transition-colors"
                >
                  <span>Solicitar análisis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Share */}
              <div className="p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50">
                <p className="text-sm font-medium text-white mb-3">Compartir</p>
                <div className="flex flex-wrap gap-2">
                  {/* Copiar enlace */}
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-2 rounded-lg bg-industrial-700/50 text-industrial-300 hover:text-teseo-400 transition-colors relative"
                    title="Copiar enlace"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                  {/* Twitter/X */}
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-lg bg-industrial-700/50 text-industrial-300 hover:text-[#1DA1F2] transition-colors"
                    title="Compartir en X (Twitter)"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  {/* Facebook */}
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-lg bg-industrial-700/50 text-industrial-300 hover:text-[#4267B2] transition-colors"
                    title="Compartir en Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  {/* LinkedIn */}
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-lg bg-industrial-700/50 text-industrial-300 hover:text-[#0A66C2] transition-colors"
                    title="Compartir en LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  {/* Share nativo (móvil) */}
                  {typeof navigator !== 'undefined' && navigator.share && (
                    <button
                      onClick={() => handleShare('native')}
                      className="p-2 rounded-lg bg-industrial-700/50 text-industrial-300 hover:text-teseo-400 transition-colors"
                      title="Más opciones"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {copied && (
                  <p className="text-xs text-green-400 mt-2">¡Enlace copiado!</p>
                )}
              </div>

              {/* City quick stats */}
              {city && city.mercado && (
                <div className="p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50">
                  <p className="text-sm font-medium text-white mb-3">
                    Datos de {city.nombre}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-industrial-400">Costo m²</span>
                      <span className="text-teseo-400 font-medium">
                        ${city.mercado.costoM2Promedio?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-industrial-400">Plusvalía</span>
                      <span className="text-success-400 font-medium">
                        +{city.mercado.plusvaliaAnual}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-industrial-400">Proyectos</span>
                      <span className="text-tech-400 font-medium">
                        {city.mercado.proyectosActivos}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${post.category?.slug}`}
                    className="block mt-4 text-center text-sm text-teseo-400 hover:text-teseo-300 transition-colors"
                  >
                    Ver más de {city.nombre} →
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Post Navigation - Anterior/Siguiente */}
      <section className="py-8 border-t border-industrial-700/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Anterior */}
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.category?.slug}/${prevPost.slug}`}
                className="group p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50 hover:border-teseo-500/50 transition-all"
              >
                <div className="flex items-center gap-2 text-sm text-industrial-400 mb-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Artículo anterior</span>
                </div>
                <p className="text-white font-medium group-hover:text-teseo-400 transition-colors line-clamp-2">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {/* Siguiente */}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.category?.slug}/${nextPost.slug}`}
                className="group p-4 rounded-xl bg-industrial-800/50 border border-industrial-700/50 hover:border-teseo-500/50 transition-all text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-industrial-400 mb-2">
                  <span>Siguiente artículo</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <p className="text-white font-medium group-hover:text-teseo-400 transition-colors line-clamp-2">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 border-t border-industrial-700/50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-xl font-semibold text-white mb-6">
              Artículos Relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
