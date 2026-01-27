/**
 * Términos y Condiciones - Teseo Data Lab
 * Legal document completo para México
 */

import { Shield, FileText, Scale, ArrowLeft } from 'lucide-react'

export default function TerminosCondiciones() {
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
            <Scale className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-industrial-300 text-lg">
            Teseo Data Lab - Inteligencia de Datos y Análisis Econométrico
          </p>
          <p className="text-industrial-400 text-sm mt-2">
            Última actualización: 2 de enero de 2026
          </p>
        </div>

        {/* Content */}
        <div className="card-glass-strong p-8 md:p-12 space-y-8">
          {/* 1. Identificación */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="text-teseo-400" size={24} />
              1. Identificación del Prestador de Servicios
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                El presente sitio web <strong className="text-white">https://teseodata.com</strong> y todos los servicios ofrecidos bajo la marca "Teseo Data Lab"
                (incluyendo servicios de consultoría y herramientas de análisis) son propiedad y están operados por:
              </p>
              <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4">
                <p className="font-semibold text-white">TESEO DATA LAB S.A.S. DE C.V.</p>
                <p><strong>RFC:</strong> TDL2206227UA</p>
                <p><strong>Domicilio:</strong> El Palmar, CP 42088, Pachuca de Soto, Hidalgo, México</p>
                <p><strong>Teléfono:</strong> +52 771 364 9201</p>
                <p><strong>Email:</strong> legal@teseodata.com</p>
              </div>
            </div>
          </section>

          {/* 2. Aceptación */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Aceptación de los Términos
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Al acceder, utilizar o contratar cualquier servicio de Teseo Data Lab (consultoría econométrica o herramientas de análisis),
                el Usuario acepta expresamente estos Términos y Condiciones, así como el Aviso de Privacidad y las Políticas de Uso.
              </p>
              <p>
                Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice nuestros servicios.
              </p>
            </div>
          </section>

          {/* 3. Descripción de los Servicios */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Descripción de los Servicios
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">Teseo Data Lab</strong> es una empresa de consultoría especializada en inteligencia de datos
                y análisis econométrico para empresas en México. Ofrecemos servicios de:
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">3.1 Servicios de Consultoría Econométrica</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Análisis de Mercado Econométrico:</strong> Estudios de mercado con regresiones hedónicas y modelos econométricos (Tier 1 - $150,000 MXN)</li>
                <li><strong>Optimización de Producto Inmobiliario:</strong> Análisis de product-market fit con optimización de mix (Tier 2 - $180,000 MXN)</li>
                <li><strong>Desarrollo de Producto Inmobiliario:</strong> Concepto completo de proyecto con tipologías, amenidades y estrategia (Tier 3 - $220,000 MXN)</li>
                <li><strong>Algoritmo de Precios Dinámicos:</strong> Sistema de pricing dinámico con revenue share del 28%</li>
                <li><strong>Análisis de Vocación de Terreno:</strong> Estudio de highest and best use para terrenos (Tier 3 - $195,000 MXN)</li>
                <li><strong>Análisis de Inversión Inmobiliaria:</strong> Due diligence financiero de lotes en venta (Tier 3 - $195,000 MXN)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">3.2 Herramientas SaaS</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Simulador Financiero Inmobiliario:</strong> Plataforma SaaS para análisis de viabilidad, riesgo crediticio y proyecciones financieras (desde $20,000 MXN/mes)</li>
                <li><strong>Alpine Data Dashboard:</strong> Dashboard de inteligencia de mercado inmobiliario (desde $5,000 MXN/mes)</li>
              </ul>

              <p className="font-semibold text-white mt-4 bg-warning-500/10 border border-warning-500/30 rounded-lg p-4">
                IMPORTANTE: Todos nuestros servicios son herramientas de análisis y NO constituyen asesoría legal,
                fiscal, contable o financiera profesional. Los resultados son estimaciones basadas en modelos econométricos
                y no garantizan resultados futuros.
              </p>
            </div>
          </section>

          {/* 4. Precios y Pagos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Precios y Forma de Pago
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">

              <h3 className="text-xl font-semibold text-white">4.1 Servicios de Consultoría (Pago Único por Proyecto)</h3>
              <p>Los servicios de consultoría operan bajo un modelo de <strong className="text-white">pago único por proyecto</strong>. Los precios indicados a continuación son <strong className="text-white">precios de inicio base</strong> y pueden variar según la complejidad, alcance y requerimientos específicos de cada proyecto:</p>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4">
                  <p className="font-semibold text-teseo-400 mb-2">Tier 1 - Foundational</p>
                  <p className="text-white font-bold">Desde $150,000 MXN</p>
                  <p className="text-sm">Análisis de Mercado Econométrico</p>
                </div>
                <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4">
                  <p className="font-semibold text-tech-400 mb-2">Tier 2 - Optimization</p>
                  <p className="text-white font-bold">Desde $180,000 MXN</p>
                  <p className="text-sm">Optimización de Producto</p>
                </div>
                <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4">
                  <p className="font-semibold text-success-400 mb-2">Tier 3 - Strategic</p>
                  <p className="text-white font-bold">Desde $195,000 - $220,000 MXN</p>
                  <p className="text-sm">Desarrollo Producto, Vocación Terreno, Análisis Inversión</p>
                </div>
                <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4">
                  <p className="font-semibold text-warning-400 mb-2">Revenue Share</p>
                  <p className="text-white font-bold">28% ganancia incremental</p>
                  <p className="text-sm">Algoritmo de Precios Dinámicos</p>
                </div>
              </div>

              <p className="bg-warning-500/10 border border-warning-500/30 rounded-lg p-4 mt-4">
                <strong className="text-warning-400">Importante - Cotización Personalizada:</strong> Los precios finales se determinan mediante cotización personalizada considerando:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Complejidad del proyecto:</strong> Número de unidades, diversidad de tipologías, etapas del desarrollo</li>
                <li><strong>Alcance del análisis:</strong> Profundidad de la investigación, cantidad de variables, modelos econométricos requeridos</li>
                <li><strong>Plazos de entrega:</strong> Proyectos urgentes pueden tener sobrecosto</li>
                <li><strong>Disponibilidad de datos:</strong> Proyectos que requieran levantamiento de información primaria</li>
                <li><strong>Ubicación geográfica:</strong> Proyectos en mercados poco estudiados o con datos limitados</li>
              </ul>
              <p className="text-sm text-industrial-400 mt-2">
                Teseo Data Lab se reserva el derecho de ajustar los precios a su discreción según las características específicas de cada proyecto.
                El precio final se acordará por escrito antes de iniciar el servicio.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">4.2 Herramientas SaaS (Suscripción Mensual)</h3>
              <p>Las herramientas SaaS operan bajo modelo de <strong className="text-white">suscripción mensual</strong>:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Simulador Financiero:</strong> Desde $20,000 MXN/mes (varía según unidades y tipo de proyecto)</li>
                <li><strong>Alpine Dashboard:</strong> Desde $5,000 MXN/mes (planes Starter, Professional, Enterprise)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">4.3 Formas de Pago Aceptadas</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transferencia bancaria SPEI (México)</li>
                <li>Tarjeta de crédito o débito (vía Stripe/procesador autorizado)</li>
                <li>Depósito en efectivo (previa coordinación y autorización)</li>
                <li>Cheque nominativo (solo para servicios de consultoría Tier 3)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">4.4 Facturación Electrónica</h3>
              <p>
                Se emitirá <strong className="text-white">Comprobante Fiscal Digital por Internet (CFDI 4.0)</strong> a nombre de
                Teseo Data Lab en un plazo máximo de <strong className="text-white">72 horas hábiles</strong> posterior a la confirmación del pago.
              </p>
              <p className="text-sm text-industrial-400">
                Para facturación, proporcione sus datos fiscales completos (RFC, razón social, régimen fiscal, uso de CFDI, domicilio fiscal).
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">4.5 Modificación de Precios</h3>
              <p>
                Teseo Data Lab <strong className="text-white">se reserva el derecho de modificar los precios</strong> de sus servicios en cualquier momento,
                a su exclusiva discreción. Los cambios en precios aplicarán:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Servicios de Consultoría:</strong> Los cambios de precio NO afectan proyectos ya cotizados o contratados. El precio acordado por escrito se respetará hasta la conclusión del proyecto.</li>
                <li><strong>Herramientas SaaS:</strong> Los cambios de precio se notificarán con 30 días de anticipación y aplicarán al siguiente ciclo de facturación. El Cliente puede cancelar antes de que entren en vigor.</li>
              </ul>
              <p className="text-sm text-industrial-400 mt-2">
                Los precios vigentes siempre estarán disponibles en <strong>https://teseodata.com</strong> o mediante solicitud a <strong>ventas@teseodata.com</strong>
              </p>
            </div>
          </section>

          {/* 5. Garantía */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Garantía de Satisfacción y Política de Reembolsos
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">

              <h3 className="text-xl font-semibold text-white">5.1 Servicios de Consultoría</h3>
              <p>
                Para servicios de consultoría econométrica, Teseo Data Lab ofrece una <strong className="text-success-400">garantía de satisfacción
                de 15 días naturales</strong> a partir de la entrega del entregable final (reporte, deck, dataset).
              </p>
              <p>
                Si el Cliente no está satisfecho con la calidad o alcance del análisis entregado, puede solicitar:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Revisión sin costo:</strong> Una ronda de ajustes o aclaraciones incluida</li>
                <li><strong>Reembolso del 50%:</strong> Si persiste la insatisfacción después de la revisión</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">5.2 Herramientas SaaS</h3>
              <p>
                Para herramientas SaaS (Simulador Financiero, Alpine Dashboard), ofrecemos una <strong className="text-success-400">garantía
                de satisfacción de 30 días naturales</strong> desde la fecha del primer pago.
              </p>
              <p>
                Si el Cliente no está satisfecho, puede solicitar reembolso del 100% del primer mes pagado.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">5.3 Proceso de Solicitud de Reembolso</h3>
              <p>Para solicitar un reembolso, envíe un email a <strong className="text-white">legal@teseodata.com</strong> con:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Número de folio de la transacción o contrato</li>
                <li>Descripción detallada del motivo de insatisfacción</li>
                <li>Datos bancarios para devolución (CLABE interbancaria a 18 dígitos)</li>
              </ul>
              <p className="text-sm text-industrial-400">
                El reembolso se procesará en un plazo máximo de <strong>15 días hábiles</strong> posterior a la aprobación.
              </p>
            </div>
          </section>

          {/* 6. Propiedad Intelectual */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Propiedad Intelectual
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">

              <h3 className="text-xl font-semibold text-white">6.1 Propiedad de Teseo Data Lab</h3>
              <p>
                Todos los derechos de propiedad intelectual sobre los servicios de Teseo Data Lab, incluyendo pero
                no limitándose a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Código fuente y diseño de software (Simulador, Alpine Dashboard)</li>
                <li>Algoritmos y modelos econométricos propietarios (regresiones hedónicas, modelo de riesgo crediticio, algoritmo de precios dinámicos)</li>
                <li>Metodologías de análisis y frameworks de consultoría</li>
                <li>Marca "Teseo Data Lab", logotipos y elementos de diseño visual</li>
                <li>Documentación, reportes, templates y materiales de capacitación</li>
                <li>Bases de datos, datasets y fuentes de información compiladas</li>
              </ul>
              <p>
                Son propiedad exclusiva de <strong className="text-white">Teseo Data Lab S.A.S. de C.V.</strong>
                y están protegidos por las leyes de propiedad intelectual de México (Ley Federal del Derecho de Autor,
                Ley de la Propiedad Industrial).
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">6.2 Derechos del Cliente sobre Entregables</h3>
              <p>
                Para <strong>servicios de consultoría</strong>, el Cliente adquiere los derechos de uso sobre los entregables
                finales (reportes, decks, datasets) exclusivamente para su proyecto interno. El Cliente NO puede:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Revender, licenciar o distribuir los análisis a terceros</li>
                <li>Replicar las metodologías o modelos econométricos para otros proyectos sin contratar nuevamente</li>
                <li>Eliminar o modificar las atribuciones a Teseo Data Lab en los documentos</li>
              </ul>

              <p className="font-semibold text-warning-400 bg-warning-500/10 border border-warning-500/30 rounded-lg p-4 mt-4">
                Queda estrictamente prohibido realizar ingeniería inversa, copiar, modificar, reproducir, distribuir
                o crear obras derivadas de cualquier servicio de Teseo Data Lab sin autorización expresa y por escrito.
              </p>
            </div>
          </section>

          {/* 7. Limitaciones de Responsabilidad */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Limitaciones de Responsabilidad
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p className="font-semibold text-white">
                7.1 Naturaleza de los Servicios
              </p>
              <p>
                Todos los servicios de Teseo Data Lab proporcionan <strong>análisis, estimaciones y proyecciones</strong> basadas en:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Datos históricos de mercado</li>
                <li>Modelos econométricos y estadísticos</li>
                <li>Información proporcionada por el Cliente</li>
                <li>Supuestos y premisas documentados en cada análisis</li>
              </ul>
              <p>
                Teseo Data Lab NO garantiza la exactitud absoluta de los resultados ni asume responsabilidad por decisiones de inversión,
                desarrollo o comercialización tomadas con base en dichos análisis.
              </p>

              <p className="font-semibold text-white mt-4">
                7.2 No Constituye Asesoría Profesional Regulada
              </p>
              <p>
                Los servicios de Teseo Data Lab <strong className="text-warning-400">NO reemplazan ni constituyen</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Asesoría legal (abogados)</li>
                <li>Asesoría fiscal o contable (contadores certificados)</li>
                <li>Asesoría financiera regulada (asesores de inversión certificados)</li>
                <li>Asesoría arquitectónica o de ingeniería (arquitectos/ingenieros certificados)</li>
                <li>Valuación certificada de inmuebles (valuadores certificados)</li>
              </ul>
              <p>
                Se recomienda encarecidamente consultar con profesionales certificados antes de tomar decisiones de inversión importantes.
              </p>

              <p className="font-semibold text-white mt-4">
                7.3 Disponibilidad de Herramientas SaaS
              </p>
              <p>
                Teseo Data Lab se esfuerza por mantener las herramientas SaaS (Simulador, Alpine Dashboard) disponibles 24/7 con un
                <strong className="text-white"> uptime objetivo del 99.5%</strong>. Sin embargo, NO garantizamos disponibilidad ininterrumpida debido a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantenimientos programados (notificados con 48 horas de anticipación)</li>
                <li>Actualizaciones de seguridad o funcionalidad</li>
                <li>Causas de fuerza mayor (desastres naturales, cortes de energía, etc.)</li>
                <li>Ataques de denegación de servicio (DDoS) u otras amenazas de ciberseguridad</li>
              </ul>

              <p className="font-semibold text-white mt-4">
                7.4 Límite de Responsabilidad Económica
              </p>
              <p>
                La responsabilidad total de Teseo Data Lab por cualquier reclamo relacionado con estos servicios
                <strong className="text-white"> no excederá el monto pagado</strong> por el Cliente en los últimos 12 meses o por el
                proyecto específico en cuestión.
              </p>
            </div>
          </section>

          {/* 8. Terminación */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Terminación del Servicio
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">

              <h3 className="text-xl font-semibold text-white">8.1 Terminación por Teseo Data Lab</h3>
              <p>
                Teseo Data Lab se reserva el derecho de suspender o terminar cualquier servicio en caso de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uso fraudulento o contrario a estos Términos y Condiciones</li>
                <li>Falta de pago del servicio contratado (después de 15 días de mora)</li>
                <li>Intento de ingeniería inversa, copia o distribución no autorizada</li>
                <li>Conducta abusiva, amenazante o discriminatoria hacia el personal</li>
                <li>Uso de los servicios para actividades ilícitas (fraude, lavado de dinero, etc.)</li>
                <li>Incumplimiento reiterado de las Políticas de Uso Aceptable</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">8.2 Terminación por el Cliente</h3>
              <p><strong>Servicios de Consultoría:</strong> Una vez iniciado un proyecto de consultoría, el Cliente puede cancelarlo
              enviando notificación por escrito con 7 días de anticipación. Se cobrará proporcionalmente el trabajo realizado hasta la fecha.</p>
              <p><strong>Herramientas SaaS:</strong> El Cliente puede cancelar su suscripción en cualquier momento. La cancelación
              será efectiva al final del período de facturación actual (sin reembolso prorrateado).</p>

              <h3 className="text-xl font-semibold text-white mt-4">8.3 Efectos de la Terminación</h3>
              <p>Al terminar el servicio:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>El Cliente perderá acceso inmediato a herramientas SaaS</li>
                <li>Los datos almacenados se conservarán por 30 días para descarga, luego se eliminarán</li>
                <li>Las obligaciones de confidencialidad y propiedad intelectual permanecen vigentes</li>
                <li>Los entregables de consultoría ya pagados siguen siendo propiedad del Cliente para uso interno</li>
              </ul>
            </div>
          </section>

          {/* 9. Jurisdicción */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Ley Aplicable y Jurisdicción
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos.
              </p>
              <p>
                Para la interpretación, cumplimiento y ejecución de estos Términos, las partes se someten
                expresamente a la jurisdicción de los tribunales competentes en <strong className="text-white">Pachuca de Soto, Hidalgo</strong>,
                renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios
                presentes o futuros.
              </p>
            </div>
          </section>

          {/* 10. Modificaciones */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Modificaciones a los Términos
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Teseo Data Lab se reserva el derecho de modificar estos Términos y Condiciones en cualquier
                momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
              <p>
                El uso continuo del Simulador después de la publicación de modificaciones constituye
                la aceptación de dichos cambios.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-12 p-6 bg-teseo-500/10 border border-teseo-500/30 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="text-teseo-400" />
              ¿Dudas sobre estos Términos?
            </h3>
            <p className="text-industrial-300 mb-4">
              Para cualquier aclaración sobre estos Términos y Condiciones, contáctanos:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-white"><strong>Email Legal:</strong> legal@teseodata.com</p>
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
