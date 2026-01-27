/**
 * Políticas de Uso - Teseo Data Lab
 * Reglas de uso aceptable de los servicios
 */

import { AlertTriangle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'

export default function PoliticasUso() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-industrial-300 hover:text-teseo-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teseo-500 to-tech-500 mb-4">
            <AlertTriangle className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Políticas de Uso Aceptable
          </h1>
          <p className="text-industrial-300 text-lg">
            Reglas para el uso correcto de todos los servicios de Teseo Data Lab
          </p>
          <p className="text-industrial-400 text-sm mt-2">
            Última actualización: 2 de enero de 2026
          </p>
        </div>

        {/* Content */}
        <div className="card-glass-strong p-8 md:p-12 space-y-8">
          {/* Introducción */}
          <section>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Las presentes Políticas de Uso Aceptable establecen las reglas y restricciones que rigen
                el uso de todos los servicios de Teseo Data Lab, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Servicios de Consultoría:</strong> Análisis de Mercado, Optimización de Producto, Desarrollo de Producto, Precios Dinámicos, Vocación de Terreno, Análisis de Inversión</li>
                <li><strong>Herramientas SaaS:</strong> Simulador Financiero Inmobiliario y Alpine Data Dashboard</li>
              </ul>
              <p className="mt-3">
                Al contratar o utilizar cualquier servicio, usted acepta cumplir con estas políticas.
              </p>
              <p className="font-semibold text-warning-400">
                El incumplimiento de estas políticas puede resultar en la suspensión o terminación inmediata
                del servicio, sin reembolso.
              </p>
            </div>
          </section>

          {/* Uso Permitido */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="text-success-400" size={24} />
              Uso Permitido
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>Los servicios de Teseo Data Lab pueden ser utilizados para:</p>

              <h3 className="text-lg font-semibold text-white mt-3">Servicios de Consultoría:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analizar la viabilidad de proyectos inmobiliarios legítimos (residencial, comercial, mixto)</li>
                <li>Optimizar el producto inmobiliario con base en análisis de mercado</li>
                <li>Desarrollar conceptos de proyecto alineados con la demanda</li>
                <li>Implementar estrategias de pricing dinámico basadas en datos</li>
                <li>Evaluar el highest and best use de terrenos</li>
                <li>Realizar due diligence financiero de oportunidades de inversión</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-3">Herramientas SaaS:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analizar la viabilidad financiera de proyectos inmobiliarios</li>
                <li>Generar simulaciones de crédito para clientes potenciales</li>
                <li>Crear documentos PDF profesionales para presentaciones</li>
                <li>Consultar inteligencia de mercado y datos de competencia</li>
                <li>Guardar y gestionar múltiples proyectos y simulaciones</li>
                <li>Capacitación interna del equipo de ventas y análisis (con licencia adecuada)</li>
              </ul>
            </div>
          </section>

          {/* Uso Prohibido */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <XCircle className="text-danger-400" size={24} />
              Uso Prohibido
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p className="font-semibold text-white">Queda ESTRICTAMENTE PROHIBIDO:</p>

              <h3 className="text-xl font-semibold text-white mt-4">1. Actividades Ilícitas</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar el Simulador para fraudes inmobiliarios o financieros</li>
                <li>Generar documentos falsos o con información fraudulenta</li>
                <li>Violar leyes mexicanas de lavado de dinero o financiamiento al terrorismo</li>
                <li>Evadir impuestos o realizar actividades fiscales ilícitas</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">2. Ingeniería Inversa y Copia de Propiedad Intelectual</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Descompilar, desensamblar o realizar ingeniería inversa del software SaaS</li>
                <li>Copiar, modificar o crear obras derivadas de las herramientas o entregables</li>
                <li>Extraer el código fuente, algoritmos propietarios o modelos econométricos</li>
                <li>Replicar las metodologías de análisis (regresiones hedónicas, modelo de riesgo, algoritmo de precios)</li>
                <li>Reutilizar análisis de consultoría para proyectos distintos al contratado</li>
                <li>Distribuir o revender los reportes, datasets o entregables a terceros</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">3. Reventa o Uso No Autorizado de Servicios</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Revender, subarrendar o sublicenciar las herramientas SaaS a terceros</li>
                <li>Ofrecer servicios de consultoría "white-label" basados en análisis de Teseo Data Lab sin autorización</li>
                <li>Compartir cuentas SaaS o credenciales con terceros no autorizados</li>
                <li>Usar entregables de consultoría para proyectos de terceros sin contratar nuevamente</li>
                <li>Presentar análisis de Teseo Data Lab como trabajo propio ante clientes o inversionistas</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">4. Abuso del Sistema</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Realizar ataques de denegación de servicio (DoS/DDoS)</li>
                <li>Intentar acceder a cuentas de otros usuarios</li>
                <li>Explotar vulnerabilidades de seguridad sin reportarlas responsablemente</li>
                <li>Generar carga excesiva en los servidores mediante scripts automatizados</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">5. Uso Inapropiado de Datos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ingresar datos personales de terceros sin su consentimiento</li>
                <li>Utilizar el Simulador para spam o phishing</li>
                <li>Extraer o recopilar datos de otros usuarios del sistema</li>
              </ul>
            </div>
          </section>

          {/* Responsabilidades del Usuario */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Responsabilidades del Usuario
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>Como usuario de los servicios de Teseo Data Lab, usted es responsable de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Exactitud de Datos:</strong> Verificar que toda la información ingresada sea veraz y precisa</li>
                <li><strong className="text-white">Seguridad de Cuenta:</strong> Mantener la confidencialidad de sus credenciales de acceso</li>
                <li><strong className="text-white">Cumplimiento Legal:</strong> Asegurar que su uso cumple con todas las leyes aplicables en México</li>
                <li><strong className="text-white">Interpretación de Resultados:</strong> Entender que los resultados son estimaciones y no garantías</li>
                <li><strong className="text-white">Backup de Datos:</strong> Mantener copias de seguridad de sus simulaciones importantes</li>
              </ul>
            </div>
          </section>

          {/* Limitaciones de los Servicios */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Limitaciones de los Servicios
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>El Usuario reconoce y acepta que:</p>

              <h3 className="text-lg font-semibold text-white mt-3">Limitaciones de Servicios de Consultoría:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Los análisis econométricos proporcionan <strong className="text-white">estimaciones basadas en datos históricos</strong>, no garantías de resultados futuros</li>
                <li>Los modelos de regresión hedónica explican comportamiento pasado del mercado, no predicen con certeza absoluta</li>
                <li>Las recomendaciones de producto, pricing o estrategia son <strong className="text-white">opiniones profesionales informadas</strong>, no certezas</li>
                <li>El éxito del proyecto depende de múltiples factores externos (economía, políticas públicas, competencia, ejecución)</li>
                <li>Los análisis de vocación de terreno evalúan opciones, pero la decisión final es del Cliente</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-3">Limitaciones de Herramientas SaaS:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>El Simulador Financiero proporciona <strong className="text-white">estimaciones financieras</strong>, no garantías de resultados</li>
                <li>Los cálculos de riesgo crediticio son <strong className="text-white">modelos probabilísticos</strong>, no certezas</li>
                <li>Las proyecciones de plusvalía se basan en <strong className="text-white">promedios históricos</strong>, no predicciones infalibles</li>
                <li>Alpine Dashboard muestra datos de mercado agregados que pueden tener rezago o inexactitudes</li>
              </ul>

              <p className="bg-warning-500/10 border border-warning-500/30 rounded-lg p-4 mt-4">
                <strong className="text-warning-400">IMPORTANTE:</strong> Ningún servicio de Teseo Data Lab <strong>reemplaza</strong> la asesoría de
                profesionales certificados (contadores, abogados, arquitectos, ingenieros, valuadores). Teseo Data Lab <strong>NO asume responsabilidad</strong> por
                decisiones de inversión, desarrollo o comercialización basadas únicamente en nuestros servicios.
              </p>
            </div>
          </section>

          {/* Sanciones */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Sanciones por Incumplimiento
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>En caso de detectar un incumplimiento a estas Políticas de Uso, Teseo Data Lab se reserva el derecho de:</p>

              <div className="grid md:grid-cols-3 gap-4 my-4">
                <div className="bg-warning-500/10 border border-warning-500/30 rounded-lg p-4">
                  <p className="font-semibold text-warning-400 mb-2">Advertencia</p>
                  <p className="text-sm">Primera infracción menor: notificación por email con advertencia formal.</p>
                </div>
                <div className="bg-danger-500/10 border border-danger-500/30 rounded-lg p-4">
                  <p className="font-semibold text-danger-400 mb-2">Suspensión Temporal</p>
                  <p className="text-sm">Segunda infracción o infracción moderada: suspensión de 7-30 días.</p>
                </div>
                <div className="bg-industrial-800/50 border border-industrial-700 rounded-lg p-4">
                  <p className="font-semibold text-white mb-2">Terminación Permanente</p>
                  <p className="text-sm">Infracción grave o tercera infracción: cancelación inmediata sin reembolso.</p>
                </div>
              </div>

              <p className="font-semibold text-danger-400 mt-4">
                Infracciones graves (fraude, ingeniería inversa, actividades ilícitas) resultarán en terminación
                inmediata y posible acción legal.
              </p>
            </div>
          </section>

          {/* Reportar Abuso */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Reportar Abuso o Mal Uso
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Si detecta que otro usuario está violando estas Políticas de Uso, o si descubre una
                vulnerabilidad de seguridad en el Simulador, por favor repórtelo de inmediato a:
              </p>
              <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4 my-4">
                <p><strong className="text-white">Email de Seguridad:</strong> security@teseodata.com</p>
                <p><strong className="text-white">Email de Abuso:</strong> legal@teseodata.com</p>
                <p><strong className="text-white">Teléfono:</strong> +52 771 364 9201</p>
              </div>
              <p className="text-sm text-industrial-400">
                Respetamos la divulgación responsable de vulnerabilidades y trabajaremos con usted para resolverlas.
              </p>
            </div>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Modificaciones a estas Políticas
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Teseo Data Lab se reserva el derecho de modificar estas Políticas de Uso en cualquier momento.
                Las modificaciones entrarán en vigor inmediatamente después de su publicación en
                https://teseodata.com/politicas-uso
              </p>
              <p>
                Es responsabilidad del Usuario revisar periódicamente estas políticas. El uso continuo
                del Simulador después de cambios constituye la aceptación de las políticas modificadas.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-12 p-6 bg-teseo-500/10 border border-teseo-500/30 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">
              ¿Dudas sobre estas Políticas?
            </h3>
            <p className="text-industrial-300 mb-4">
              Si tiene preguntas sobre estas Políticas de Uso Aceptable, contáctenos:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-white"><strong>Email:</strong> legal@teseodata.com</p>
              <p className="text-white"><strong>Teléfono:</strong> +52 771 364 9201</p>
              <p className="text-white"><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-secondary py-3 px-8"
          >
            ↑ Volver Arriba
          </button>
        </div>
      </div>
    </div>
  )
}
