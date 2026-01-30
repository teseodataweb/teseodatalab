/**
 * Footer - Teseo Data Lab
 * Footer corporativo para todas las páginas
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Shield, Linkedin, Database } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-industrial-950 via-industrial-900 to-teseo-950 relative overflow-hidden border-t border-industrial-800">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teseo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="glow-text">Teseo</span>
                <span className="text-white"> Data Lab</span>
              </h3>
              <p className="text-sm text-industrial-400 mb-4">S.A.S. de C.V.</p>
              <p className="text-industrial-300 text-sm leading-relaxed mb-6">
                Transformamos datos en decisiones estratégicas desde 2006.
                Especialistas en inteligencia de negocios y análisis econométrico.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://www.linkedin.com/company/teseo-data-center/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-industrial-800 flex items-center justify-center text-industrial-400 hover:bg-teseo-500/20 hover:text-teseo-400 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn Teseo Data Lab"
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="mailto:contacto@teseodata.com"
                  className="w-9 h-9 rounded-lg bg-industrial-800 flex items-center justify-center text-industrial-400 hover:bg-success-500/20 hover:text-success-400 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Email Teseo Data Lab"
                >
                  <Mail size={18} />
                </motion.a>
                <motion.a
                  href="tel:+527713649201"
                  className="w-9 h-9 rounded-lg bg-industrial-800 flex items-center justify-center text-industrial-400 hover:bg-tech-500/20 hover:text-tech-400 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Teléfono Teseo Data Lab"
                >
                  <Phone size={18} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Contacto y Ubicación */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Phone size={18} className="text-teseo-400" />
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="text-teseo-400 flex-shrink-0 mt-0.5" size={16} />
                <div className="text-industrial-400">
                  <p className="font-semibold text-white text-xs mb-1">Oficina Principal</p>
                  <p className="leading-snug">
                    El Palmar, CP 42088<br />
                    Pachuca de Soto, Hidalgo<br />
                    México
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="text-teseo-400 flex-shrink-0" size={16} />
                <a
                  href="tel:+527713649201"
                  className="text-industrial-400 hover:text-teseo-400 transition-colors"
                >
                  +52 771 364 9201
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="text-teseo-400 flex-shrink-0" size={16} />
                <a
                  href="mailto:contacto@teseodata.com"
                  className="text-industrial-400 hover:text-teseo-400 transition-colors"
                >
                  contacto@teseodata.com
                </a>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              {[
                { name: 'Estudios de Expansión', href: '/servicios/expansion' },
                { name: 'Análisis de Inversión', href: '/servicios/inversion' },
                { name: 'Agente Vertical IA', href: '/servicios/agente-vertical' },
                { name: 'Mercado Industrial', href: '/servicios/mercado-industrial' },
                { name: 'Análisis de Mercado', href: '/servicios/mercado' },
                { name: 'Boletines', href: '/boletines' },
                { name: 'Blog', href: '/blog' }
              ].map((servicio, index) => (
                <li key={index}>
                  <Link
                    to={servicio.href}
                    className="text-industrial-400 text-sm hover:text-teseo-400 transition-colors"
                  >
                    {servicio.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teseo-400" />
              Legal
            </h4>
            <ul className="space-y-2 mb-6">
              {[
                { name: 'Términos y Condiciones', href: '/terminos' },
                { name: 'Aviso de Privacidad', href: '/aviso-privacidad' },
                { name: 'Políticas de Uso', href: '/politicas-uso' }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-industrial-400 text-sm hover:text-teseo-400 transition-colors text-left block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Info Legal */}
            <div className="p-3 bg-industrial-800/30 border border-industrial-700 rounded-lg">
              <p className="text-xs text-industrial-400 leading-relaxed">
                <span className="text-white font-semibold block mb-1">Teseo Data Lab S.A.S. de C.V.</span>
                RFC: TDL2206227UA<br />
                Pachuca de Soto, Hidalgo
              </p>
              <a
                href="mailto:legal@teseodata.com"
                className="text-xs text-teseo-400 hover:text-teseo-300 transition-colors mt-2 inline-block"
              >
                legal@teseodata.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-industrial-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-industrial-400">
            <div className="text-center md:text-left">
              <p>
                © {new Date().getFullYear()} <span className="text-white font-semibold">Teseo Data Lab S.A.S. de C.V.</span> Todos los derechos reservados.
              </p>
              <p className="text-xs mt-1">
                18+ años transformando datos en decisiones estratégicas
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="text-success-400" size={14} />
                <span>Datos seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-teseo-400" size={14} />
                <span>Hecho en México</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="text-tech-400" size={14} />
                <span>130+ proyectos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
