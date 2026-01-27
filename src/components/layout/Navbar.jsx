/**
 * Navbar - Barra de navegación principal Teseo Data Lab
 * Sticky con efecto glassmorphism, responsive con menú móvil
 */

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Links de navegación principal
const navLinks = [
  { name: 'Inicio', href: '/', isRoute: true },
  { name: 'Nosotros', href: '#nosotros', isRoute: false },
  { name: 'Servicios', href: '#servicios', isRoute: false },
  { name: 'Casos', href: '#casos', isRoute: false },
  { name: 'Metodología', href: '#metodologia', isRoute: false },
  { name: 'Blog', href: '/blog', isRoute: true },
  { name: 'Contacto', href: '#contacto', isRoute: false },
]

// Servicios para el dropdown
const serviciosLinks = [
  { name: 'Análisis de Expansión', href: '/servicios/expansion', description: 'Encuentra la mejor plaza para tu negocio' },
  { name: 'Análisis de Inversión', href: '/servicios/inversion', description: 'Evalúa viabilidad financiera' },
  { name: 'Mercado Industrial', href: '/servicios/mercado-industrial', description: 'Optimiza compras y proveedores' },
  { name: 'Análisis de Mercado', href: '/servicios/mercado', description: 'Conoce tu competencia y clientes' },
  { name: 'Agente Vertical IA', href: '/servicios/agente-vertical', description: 'Prospección automatizada con IA' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServiciosOpen, setIsServiciosOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Verificar si estamos en la landing page
  const isLandingPage = location.pathname === '/'

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServiciosOpen(false)
  }, [location.pathname])

  // Scroll suave a sección (o navegar a landing + hash si no estamos en landing)
  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()

      // Si no estamos en la landing page, navegar primero a la landing con el hash
      if (!isLandingPage) {
        navigate('/' + href)
        return
      }

      // Si estamos en la landing, hacer scroll suave
      const element = document.querySelector(href)
      if (element) {
        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth'
        })
      }
      setIsMobileMenuOpen(false)
    }
  }

  // Efecto para hacer scroll cuando llegamos a la landing con un hash
  useEffect(() => {
    if (isLandingPage && location.hash) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          const navbarHeight = 80
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [location.hash, isLandingPage])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-industrial-900/90 backdrop-blur-xl border-b border-industrial-700/50 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/logo-teseo.png"
                  alt="Teseo Data Lab"
                  className="h-12 w-auto"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                link.name === 'Servicios' ? (
                  // Dropdown de Servicios
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsServiciosOpen(true)}
                    onMouseLeave={() => setIsServiciosOpen(false)}
                  >
                    <button
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1',
                        'text-industrial-300 hover:text-white hover:bg-industrial-800/50'
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={cn(
                          'transition-transform duration-200',
                          isServiciosOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isServiciosOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-80 bg-industrial-800/95 backdrop-blur-xl border border-industrial-700/50 rounded-xl shadow-xl shadow-black/30 overflow-hidden"
                        >
                          <div className="p-2">
                            {serviciosLinks.map((servicio) => (
                              <Link
                                key={servicio.href}
                                to={servicio.href}
                                className="block p-3 rounded-lg hover:bg-industrial-700/50 transition-colors group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-white group-hover:text-teseo-400 transition-colors">
                                    {servicio.name}
                                  </span>
                                  <ArrowRight size={16} className="text-industrial-500 group-hover:text-teseo-400 transition-colors" />
                                </div>
                                <p className="text-xs text-industrial-400 mt-1">
                                  {servicio.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Links normales
                  link.isRoute ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => {
                        // Si es Inicio y ya estamos en la landing, hacer scroll al top
                        if (link.href === '/' && isLandingPage) {
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                      }}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        location.pathname === link.href
                          ? 'text-teseo-400 bg-teseo-500/10'
                          : 'text-industrial-300 hover:text-white hover:bg-industrial-800/50'
                      )}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-industrial-300 hover:text-white hover:bg-industrial-800/50"
                    >
                      {link.name}
                    </a>
                  )
                )
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="mailto:contacto@teseodata.com"
                className="btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Solicitar Análisis</span>
                <ArrowRight size={16} />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-industrial-300 hover:text-white hover:bg-industrial-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-industrial-900/98 backdrop-blur-xl border-l border-industrial-700/50 z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-industrial-700/50">
                <img
                  src="/logo-teseo.png"
                  alt="Teseo Data Lab"
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-industrial-400 hover:text-white hover:bg-industrial-800/50 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  link.name === 'Servicios' ? (
                    // Servicios Accordion en móvil
                    <div key={link.name} className="space-y-2">
                      <button
                        onClick={() => setIsServiciosOpen(!isServiciosOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-industrial-300 hover:text-white hover:bg-industrial-800/50 transition-colors"
                      >
                        <span className="font-medium">{link.name}</span>
                        <ChevronDown
                          size={20}
                          className={cn(
                            'transition-transform duration-200',
                            isServiciosOpen && 'rotate-180'
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {isServiciosOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4"
                          >
                            {serviciosLinks.map((servicio) => (
                              <Link
                                key={servicio.href}
                                to={servicio.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-lg text-sm text-industrial-400 hover:text-teseo-400 hover:bg-industrial-800/30 transition-colors"
                              >
                                {servicio.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    link.isRoute ? (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          // Si es Inicio y ya estamos en la landing, hacer scroll al top
                          if (link.href === '/' && isLandingPage) {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }
                        }}
                        className={cn(
                          'block px-4 py-3 rounded-lg font-medium transition-colors',
                          location.pathname === link.href
                            ? 'text-teseo-400 bg-teseo-500/10'
                            : 'text-industrial-300 hover:text-white hover:bg-industrial-800/50'
                        )}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          scrollToSection(e, link.href)
                          setIsMobileMenuOpen(false)
                        }}
                        className="block px-4 py-3 rounded-lg font-medium text-industrial-300 hover:text-white hover:bg-industrial-800/50 transition-colors"
                      >
                        {link.name}
                      </a>
                    )
                  )
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-industrial-700/50">
                <motion.a
                  href="mailto:contacto@teseodata.com"
                  className="btn-primary w-full py-3 text-center inline-flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Solicitar Análisis</span>
                  <ArrowRight size={16} />
                </motion.a>
                <a
                  href="tel:7713649201"
                  className="block mt-3 w-full py-3 text-center border border-industrial-600 rounded-lg text-industrial-300 hover:text-white hover:border-industrial-500 transition-colors"
                >
                  771 364 9201
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer para compensar el navbar fixed */}
      <div className="h-20" />
    </>
  )
}
