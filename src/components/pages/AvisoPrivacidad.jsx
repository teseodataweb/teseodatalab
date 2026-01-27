/**
 * Aviso de Privacidad - Cumplimiento LFPDPPP (INAI México)
 * Teseo Data Lab
 */

import { Shield, Lock, Eye, UserX, FileText, ArrowLeft } from 'lucide-react'

export default function AvisoPrivacidad() {
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
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Aviso de Privacidad
          </h1>
          <p className="text-industrial-300 text-lg">
            Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares
          </p>
          <p className="text-industrial-400 text-sm mt-2">
            Última actualización: 2 de enero de 2026
          </p>
        </div>

        {/* Content */}
        <div className="card-glass-strong p-8 md:p-12 space-y-8">
          {/* Identidad del Responsable */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="text-teseo-400" size={24} />
              Identidad y Domicilio del Responsable
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">Responsable del Tratamiento de Datos Personales:</p>
                <p><strong>Razón Social:</strong> TESEO DATA LAB S.A.S. DE C.V.</p>
                <p><strong>RFC:</strong> TDL2206227UA</p>
                <p><strong>Domicilio:</strong> El Palmar, CP 42088, Pachuca de Soto, Hidalgo, México</p>
                <p><strong>Sitio Web:</strong> https://teseodata.com</p>
                <p><strong>Email de Privacidad:</strong> privacidad@teseodata.com</p>
                <p><strong>Teléfono:</strong> +52 771 364 9201</p>
              </div>
            </div>
          </section>

          {/* Datos Personales Recabados */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="text-teseo-400" size={24} />
              Datos Personales que Recabamos
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Para las finalidades señaladas en este Aviso de Privacidad, podemos recabar sus datos personales
                de las siguientes formas:
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">Datos de Identificación y Contacto:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número telefónico</li>
                <li>Nombre de la empresa/desarrollo</li>
                <li>Cargo o puesto</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">Datos del Proyecto (para servicios de consultoría y SaaS):</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre del proyecto inmobiliario</li>
                <li>Ubicación del desarrollo (dirección, coordenadas GPS)</li>
                <li>Número de unidades o superficie del terreno</li>
                <li>Precios de venta o inversión</li>
                <li>Características del proyecto (tipologías, amenidades, target)</li>
                <li>Condiciones de crédito o financiamiento</li>
                <li>Información competitiva del mercado local</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">Datos Agregados de Clientes Finales (para análisis estadístico):</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rangos de edad y nivel socioeconómico</li>
                <li>Rangos de ingresos y capacidad de pago</li>
                <li>Códigos postales de residencia</li>
                <li>Preferencias de producto inmobiliario</li>
              </ul>
              <p className="text-sm text-industrial-400">
                Estos datos son agregados y anonimizados, NO recabamos datos personales identificables de clientes finales.
              </p>

              <p className="bg-warning-500/10 border border-warning-500/30 rounded-lg p-4 mt-4">
                <strong className="text-warning-400">Importante:</strong> NO recabamos datos personales sensibles
                tales como origen racial o étnico, estado de salud, información genética, creencias religiosas,
                filosóficas o morales, afiliación sindical, opiniones políticas o preferencia sexual.
              </p>
            </div>
          </section>

          {/* Finalidades */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Finalidades del Tratamiento de Datos Personales
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Finalidades Primarias (necesarias para el servicio):</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Servicios de Consultoría:</strong> Realizar análisis de mercado, estudios econométricos, optimización de producto y demás servicios contratados</li>
                <li><strong>Herramientas SaaS:</strong> Proveer acceso al Simulador Financiero y Alpine Dashboard</li>
                <li>Generar análisis financieros, reportes, decks y documentos PDF</li>
                <li>Procesar pagos y emitir comprobantes fiscales (CFDI 4.0)</li>
                <li>Brindar soporte técnico, consultoría y atención al cliente</li>
                <li>Cumplir con obligaciones fiscales, legales y regulatorias (SAT, INAI)</li>
                <li>Guardar y gestionar proyectos, simulaciones y entregables del Cliente</li>
                <li>Mejorar la calidad y precisión de nuestros modelos econométricos (datos anonimizados)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">Finalidades Secundarias (opcionales, requieren consentimiento):</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Envío de boletines informativos, newsletters y contenido educativo sobre el mercado inmobiliario</li>
                <li>Envío de ofertas promocionales, descuentos y nuevos servicios de Teseo Data Lab</li>
                <li>Estudios de mercado, investigaciones y mejora de productos/servicios</li>
                <li>Invitaciones a webinars, eventos, conferencias del sector inmobiliario</li>
                <li>Elaboración de casos de éxito y testimonios (previa autorización específica)</li>
                <li>Análisis de comportamiento de navegación para mejorar la experiencia del sitio web</li>
              </ul>

              <p className="bg-teseo-500/10 border border-teseo-500/30 rounded-lg p-4 mt-4">
                <strong className="text-white">Su consentimiento:</strong> Si no desea que sus datos personales
                sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a
                privacidad@teseodata.com con el asunto "Limitación de Finalidades".
              </p>
            </div>
          </section>

          {/* Transferencias */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="text-teseo-400" size={24} />
              Transferencias de Datos Personales
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Le informamos que sus datos personales NO serán transferidos a terceros dentro o fuera del país,
                salvo en los siguientes casos permitidos por la Ley:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cuando la transferencia esté prevista en una ley o tratado internacional</li>
                <li>Cuando sea necesario para la prevención o diagnóstico médico (no aplica en nuestro caso)</li>
                <li>Por orden de autoridad competente (SAT, INAI, autoridad judicial)</li>
                <li>A empresas del mismo grupo corporativo (actualmente no aplica)</li>
              </ul>

              <p className="font-semibold text-white mt-4">
                Proveedores de Servicios (encargados):
              </p>
              <p>
                Podemos compartir sus datos con proveedores que nos ayudan a operar el Simulador, tales como:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Servicios de hosting y almacenamiento en la nube (servidores en México)</li>
                <li>Procesadores de pago (bancos autorizados en México)</li>
                <li>Servicios de email marketing (solo si autorizó finalidades secundarias)</li>
              </ul>
              <p className="text-sm text-industrial-400 mt-2">
                Todos estos proveedores están obligados contractualmente a mantener la confidencialidad de sus datos.
              </p>
            </div>
          </section>

          {/* Derechos ARCO */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <UserX className="text-teseo-400" size={24} />
              Derechos ARCO
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos
                y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección
                de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación);
                que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo
                utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines
                específicos (Oposición). Estos derechos se conocen como derechos ARCO.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">¿Cómo ejercer sus Derechos ARCO?</h3>
              <p>
                Para ejercer cualquiera de estos derechos, deberá presentar una solicitud por escrito a:
              </p>
              <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4 my-4">
                <p><strong className="text-white">Email:</strong> privacidad@teseodata.com</p>
                <p><strong className="text-white">Asunto:</strong> "Solicitud de Derechos ARCO - [Acceso/Rectificación/Cancelación/Oposición]"</p>
              </div>

              <p><strong className="text-white">Su solicitud deberá contener:</strong></p>
              <ul className="list-decimal pl-6 space-y-2">
                <li>Nombre completo y correo electrónico registrado</li>
                <li>Descripción clara del derecho que desea ejercer</li>
                <li>Documentos que acrediten su identidad (INE/Pasaporte escaneado)</li>
                <li>Cualquier elemento que facilite la localización de sus datos</li>
              </ul>

              <p className="mt-4">
                <strong className="text-white">Plazos de Respuesta:</strong> Teseo Data Lab dará respuesta
                a su solicitud en un plazo máximo de <span className="text-teseo-400 font-bold">20 días hábiles</span>,
                contados desde la fecha en que se recibió la solicitud. Si la solicitud es procedente, se hará
                efectiva en un plazo máximo de <span className="text-teseo-400 font-bold">15 días hábiles</span>.
              </p>
            </div>
          </section>

          {/* Revocación de Consentimiento */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Revocación del Consentimiento
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Usted puede revocar su consentimiento para el uso de sus datos personales en cualquier momento,
                siempre que no exista una obligación legal que impida la revocación.
              </p>
              <p>
                Para revocar su consentimiento, envíe un correo a <strong className="text-white">privacidad@teseodata.com</strong> con
                el asunto "Revocación de Consentimiento", siguiendo los mismos requisitos de la solicitud ARCO.
              </p>
            </div>
          </section>

          {/* Cookies y Tecnologías */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Uso de Cookies y Tecnologías de Rastreo
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Le informamos que en nuestra página web utilizamos cookies, web beacons y otras tecnologías
                para monitorear su comportamiento como usuario de Internet, brindarle un mejor servicio y
                experiencia al navegar en nuestra página.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4">Cookies que utilizamos:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento de las herramientas SaaS (sesión, autenticación, estado de usuario)</li>
                <li><strong>Cookies analíticas:</strong> Google Analytics, Mixpanel o similares para entender patrones de uso y mejorar el servicio</li>
                <li><strong>Cookies de preferencias:</strong> Guardar configuraciones del usuario (idioma, tema, filtros predeterminados)</li>
                <li><strong>Cookies de marketing:</strong> Facebook Pixel, LinkedIn Insight Tag (solo si autorizó finalidades secundarias)</li>
                <li><strong>Cookies de rendimiento:</strong> Para medir velocidad de carga y optimizar la plataforma</li>
              </ul>

              <p className="mt-4">
                Usted puede desactivar las cookies en su navegador en cualquier momento. Sin embargo, desactivar las cookies
                esenciales puede afectar significativamente la funcionalidad de las herramientas SaaS. Las cookies analíticas
                y de marketing pueden desactivarse sin afectar las funciones principales.
              </p>
              <p className="text-sm text-industrial-400 mt-2">
                Para gestionar cookies: Chrome (Configuración → Privacidad y seguridad → Cookies), Firefox (Opciones → Privacidad y seguridad),
                Safari (Preferencias → Privacidad).
              </p>
            </div>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Modificaciones al Aviso de Privacidad
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones
                al presente Aviso de Privacidad, para la atención de novedades legislativas, políticas internas
                o nuevos requerimientos para la prestación u ofrecimiento de nuestros servicios.
              </p>
              <p>
                Estas modificaciones estarán disponibles en nuestro sitio web https://teseodata.com/aviso-privacidad
              </p>
            </div>
          </section>

          {/* Autoridad */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Autoridad Competente
            </h2>
            <div className="text-industrial-300 space-y-3 leading-relaxed">
              <p>
                Si considera que su derecho de protección de datos personales ha sido lesionado por alguna
                conducta u omisión de nuestra parte, puede interponer su inconformidad o denuncia ante el
                Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
              </p>
              <div className="bg-industrial-800/30 border border-industrial-700 rounded-lg p-4 mt-4">
                <p><strong className="text-white">INAI:</strong></p>
                <p>Sitio Web: <a href="https://home.inai.org.mx" target="_blank" rel="noopener" className="text-teseo-400 hover:underline">https://home.inai.org.mx</a></p>
                <p>Teléfono: 800 835 4324</p>
                <p>Email: atencionlainai@inai.org.mx</p>
              </div>
            </div>
          </section>

          {/* Consentimiento */}
          <div className="mt-12 p-6 bg-success-500/10 border border-success-500/30 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">
              Consentimiento
            </h3>
            <p className="text-industrial-300 mb-4">
              Al proporcionar sus datos personales a través de nuestro sitio web, al contratar servicios de consultoría
              o al utilizar las herramientas de análisis de Teseo Data Lab, usted acepta y
              consiente el tratamiento de sus datos personales conforme a lo establecido en el presente Aviso de Privacidad.
            </p>
            <p className="text-sm text-industrial-400">
              Si tiene alguna duda sobre este Aviso de Privacidad, contáctenos en <strong className="text-white">privacidad@teseodata.com</strong>
            </p>
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
