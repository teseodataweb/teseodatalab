/**
 * App Principal - Teseo Data Lab Website
 * Landing corporativa independiente con React Router
 * Code splitting implementado para mejor performance
 */

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import './App.css'

// Lazy loading para code splitting - mejora performance inicial
const TeseoLanding = lazy(() => import('./pages/TeseoLanding'))

// Blog Teseo
const BlogHub = lazy(() => import('./pages/blog/BlogHub'))
const CategoryHub = lazy(() => import('./pages/blog/CategoryHub'))
const BlogPost = lazy(() => import('./pages/blog/BlogPost'))

// Guías de Servicios Teseo Data Lab
const TeseoExpansionGuide = lazy(() => import('./components/pages/TeseoExpansionGuide'))
const TeseoInversionGuide = lazy(() => import('./components/pages/TeseoInversionGuide'))
const TeseoMercadoIndustrialGuide = lazy(() => import('./components/pages/TeseoMercadoIndustrialGuide'))
const TeseoMercadoGuide = lazy(() => import('./components/pages/TeseoMercadoGuide'))
const TeseoAgenteVerticalGuide = lazy(() => import('./components/pages/TeseoAgenteVerticalGuide'))
// Páginas legales
const TerminosCondiciones = lazy(() => import('./components/pages/TerminosCondiciones'))
const AvisoPrivacidad = lazy(() => import('./components/pages/AvisoPrivacidad'))
const PoliticasUso = lazy(() => import('./components/pages/PoliticasUso'))

// Loading component para Suspense
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-teseo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-industrial-300">Cargando...</p>
    </div>
  </div>
)

// Componente wrapper para incluir Navbar y Footer en todas las páginas
function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

// Hook para scroll automático al cambiar de ruta
function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<PageLayout><TeseoLanding /></PageLayout>} />

          {/* BLOG TESEO */}
          <Route path="/blog" element={<PageLayout><BlogHub /></PageLayout>} />
          <Route path="/blog/:categorySlug" element={<PageLayout><CategoryHub /></PageLayout>} />
          <Route path="/blog/:categorySlug/:postSlug" element={<PageLayout><BlogPost /></PageLayout>} />

          {/* GUÍAS DE SERVICIOS TESEO */}
          <Route path="/servicios/expansion" element={<PageLayout><TeseoExpansionGuide /></PageLayout>} />
          <Route path="/servicios/inversion" element={<PageLayout><TeseoInversionGuide /></PageLayout>} />
          <Route path="/servicios/mercado-industrial" element={<PageLayout><TeseoMercadoIndustrialGuide /></PageLayout>} />
          <Route path="/servicios/mercado" element={<PageLayout><TeseoMercadoGuide /></PageLayout>} />
          <Route path="/servicios/agente-vertical" element={<PageLayout><TeseoAgenteVerticalGuide /></PageLayout>} />

          {/* PÁGINAS LEGALES */}
          <Route path="/terminos" element={<PageLayout><TerminosCondiciones /></PageLayout>} />
          <Route path="/aviso-privacidad" element={<PageLayout><AvisoPrivacidad /></PageLayout>} />
          <Route path="/politicas-uso" element={<PageLayout><PoliticasUso /></PageLayout>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
