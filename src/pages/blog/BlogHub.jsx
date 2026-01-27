/**
 * BlogHub - Página principal del blog
 * Listado de posts con búsqueda, filtros por categoría y paginación
 */

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Filter, BookOpen, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import PostCard from '@/components/blog/PostCard'
import blogPosts from '@/data/blogPosts.json'
import categories from '@/data/categories.json'

const POSTS_PER_PAGE = 12

export default function BlogHub() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Filtrar posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Filtro de búsqueda
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtro de categoría
      const matchesCategory = selectedCategory === 'all' ||
        post.category?.slug === selectedCategory ||
        post.category?.parent === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Reset página cuando cambian filtros
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Posts destacados (solo si no hay filtros activos)
  const featuredPosts = useMemo(() => {
    if (searchQuery || selectedCategory !== 'all') return []
    return blogPosts.filter(post => post.featured).slice(0, 3)
  }, [searchQuery, selectedCategory])

  // Posts regulares (sin destacados)
  const regularPosts = useMemo(() => {
    if (featuredPosts.length > 0) {
      return filteredPosts.filter(post => !post.featured)
    }
    return filteredPosts
  }, [filteredPosts, featuredPosts])

  // Paginación
  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    return regularPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [regularPosts, currentPage])

  // Categorías con conteo
  const categoriesWithCount = useMemo(() => {
    const counts = {}
    blogPosts.forEach(post => {
      const slug = post.category?.slug
      if (slug) {
        counts[slug] = (counts[slug] || 0) + 1
      }
    })

    return categories
      .map(cat => ({ ...cat, count: counts[cat.slug] || 0 }))
      .filter(cat => cat.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [])

  // Handlers de paginación
  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  const goToPrevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1)
  }

  // Generar números de página a mostrar
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teseo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-tech-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teseo-500/10 border border-teseo-500/30 text-teseo-400 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>{blogPosts.length} Artículos Publicados</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blog <span className="glow-text">Teseo</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-industrial-300 mb-8">
              Inteligencia de mercado, análisis de datos y tendencias del sector inmobiliario e industrial en México.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-industrial-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-industrial-800/80 border border-industrial-700 rounded-xl text-white placeholder-industrial-400 focus:outline-none focus:border-teseo-500 focus:ring-1 focus:ring-teseo-500 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 border-y border-industrial-700/50 bg-industrial-800/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-industrial-400 flex-shrink-0" />

            {/* All button */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-teseo-500 text-white'
                  : 'bg-industrial-700/50 text-industrial-300 hover:bg-industrial-700'
              }`}
            >
              Todos ({blogPosts.length})
            </button>

            {/* Category buttons */}
            {categoriesWithCount.slice(0, 8).map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-teseo-500 text-white'
                    : 'bg-industrial-700/50 text-industrial-300 hover:bg-industrial-700'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-teseo-400" />
                <h2 className="text-xl font-semibold text-white">Destacados</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    featured={index === 0}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-industrial-400">
              {filteredPosts.length} artículos
              {searchQuery && ` para "${searchQuery}"`}
              {selectedCategory !== 'all' && ` en ${categories.find(c => c.slug === selectedCategory)?.name}`}
              {totalPages > 1 && ` • Página ${currentPage} de ${totalPages}`}
            </div>

            {totalPages > 1 && (
              <div className="text-sm text-industrial-500">
                Mostrando {((currentPage - 1) * POSTS_PER_PAGE) + 1}-{Math.min(currentPage * POSTS_PER_PAGE, regularPosts.length)} de {regularPosts.length}
              </div>
            )}
          </div>

          {/* All Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {/* Previous button */}
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === 1
                        ? 'bg-industrial-800/50 text-industrial-600 cursor-not-allowed'
                        : 'bg-industrial-700/50 text-industrial-300 hover:bg-industrial-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`dots-${index}`} className="px-3 py-2 text-industrial-500">...</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? 'bg-teseo-500 text-white'
                              : 'bg-industrial-700/50 text-industrial-300 hover:bg-industrial-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === totalPages
                        ? 'bg-industrial-800/50 text-industrial-600 cursor-not-allowed'
                        : 'bg-industrial-700/50 text-industrial-300 hover:bg-industrial-700'
                    }`}
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-industrial-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron artículos</h3>
              <p className="text-industrial-400 mb-6">
                Intenta con otros términos de búsqueda o categorías.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="px-6 py-2 bg-teseo-500 text-white rounded-lg hover:bg-teseo-600 transition-colors"
              >
                Ver todos los artículos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-industrial-700/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              ¿Necesitas inteligencia de mercado personalizada?
            </h2>
            <p className="text-industrial-300 mb-6">
              Nuestro equipo de analistas puede generar reportes específicos para tu proyecto de inversión o desarrollo.
            </p>
            <Link
              to="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teseo-500 to-teseo-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-teseo-500/25 transition-all"
            >
              <span>Contactar a Teseo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
