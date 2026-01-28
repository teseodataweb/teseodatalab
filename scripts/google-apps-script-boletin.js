/**
 * ============================================
 * GOOGLE APPS SCRIPT - BOLETÍN TESEO DATA LAB
 * ============================================
 *
 * Este script:
 * 1. Registra los leads en Google Sheets
 * 2. Envía un correo HTML con identidad Teseo
 * 3. Incluye el link de descarga del boletín
 *
 * CONFIGURACIÓN:
 * 1. Abre Google Sheets: https://docs.google.com/spreadsheets/d/11duNe2QgqXMn8PGzs8Xn7z-hdJxwZLmVbCEQm19RRkA
 * 2. Ve a Extensiones → Apps Script
 * 3. Borra el código existente y pega este archivo completo
 * 4. Guarda (Ctrl+S)
 * 5. Implementar → Nueva implementación → Aplicación web
 * 6. Ejecutar como: Yo | Acceso: Cualquier persona
 * 7. Copia la URL y pégala en BoletinEconomico.jsx (línea 53)
 */

// ============================================
// CONFIGURACIÓN - MODIFICAR SEGÚN NECESIDAD
// ============================================

const CONFIG = {
  // URL del sitio web de Teseo (para el link de descarga)
  WEBSITE_URL: 'https://teseodata.com',

  // Ruta del PDF en el sitio
  PDF_PATH: '/descargas/boletin-perspectivas-hidalgo-2026.pdf',

  // Email de remitente (debe tener permisos en Google Workspace)
  SENDER_NAME: 'Teseo Data Lab',

  // Asunto del correo
  EMAIL_SUBJECT: 'Tu Boletín Económico: Perspectivas de Hidalgo 2026',

  // Colores de marca Teseo
  COLORS: {
    primary: '#8B5CF6',      // Púrpura Teseo
    primaryDark: '#7C3AED',
    secondary: '#3B82F6',    // Azul Tech
    dark: '#1a1a2e',         // Fondo oscuro
    darkAlt: '#16213e',
    gray: '#6B7280',
    white: '#FFFFFF'
  }
};

// ============================================
// FUNCIÓN PRINCIPAL - NO MODIFICAR
// ============================================

function doPost(e) {
  try {
    // Parsear datos del formulario
    const data = JSON.parse(e.postData.contents);

    // 1. Guardar en la hoja de cálculo
    guardarEnSheet(data);

    // 2. Enviar correo con el boletín
    enviarCorreoBoletin(data);

    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Registro exitoso y correo enviado'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log del error
    console.error('Error en doPost:', error);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// GUARDAR EN GOOGLE SHEETS
// ============================================

function guardarEnSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Agregar fila con los datos
  sheet.appendRow([
    new Date().toISOString(),           // Fecha y hora
    data.nombre || '',                   // Nombre
    data.email || '',                    // Email
    data.empresa || '',                  // Empresa
    data.telefono || '',                 // Teléfono
    data.origen || 'Boletín Hidalgo',   // Origen
    'Enviado'                            // Status del correo
  ]);
}

// ============================================
// ENVIAR CORREO CON EL BOLETÍN
// ============================================

function enviarCorreoBoletin(data) {
  const downloadUrl = CONFIG.WEBSITE_URL + CONFIG.PDF_PATH;
  const nombre = data.nombre ? data.nombre.split(' ')[0] : 'Estimado/a';

  // Generar HTML del correo
  const htmlBody = generarHTMLCorreo(nombre, downloadUrl);

  // Enviar correo
  MailApp.sendEmail({
    to: data.email,
    subject: CONFIG.EMAIL_SUBJECT,
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME
  });
}

// ============================================
// PLANTILLA HTML DEL CORREO
// ============================================

function generarHTMLCorreo(nombre, downloadUrl) {
  const c = CONFIG.COLORS;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Boletín Económico - Teseo Data Lab</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">

  <!-- Contenedor principal -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f5;">
    <tr>
      <td style="padding: 40px 20px;">

        <!-- Email container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: ${c.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, ${c.dark} 0%, ${c.darkAlt} 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <!-- Logo Teseo -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding-right: 12px;">
                    <img src="${CONFIG.WEBSITE_URL}/logo-teseo.png" alt="Teseo" width="50" height="50" style="display: block;">
                  </td>
                  <td>
                    <span style="font-size: 28px; font-weight: 700; color: ${c.white};">
                      <span style="color: ${c.primary};">Teseo</span> Data Lab
                    </span>
                  </td>
                </tr>
              </table>

              <p style="color: ${c.gray}; font-size: 14px; margin: 15px 0 0 0;">
                Inteligencia de datos para decisiones estratégicas
              </p>
            </td>
          </tr>

          <!-- Contenido principal -->
          <tr>
            <td style="padding: 40px;">

              <!-- Saludo -->
              <h1 style="color: ${c.dark}; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">
                ¡Hola ${nombre}!
              </h1>

              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Gracias por tu interés en nuestro análisis económico. Aquí tienes tu
                <strong>Boletín Económico: Perspectivas de Hidalgo 2026</strong>.
              </p>

              <!-- Card del boletín -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #4A2B7E 0%, #3B1F6E 100%); border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <h2 style="color: ${c.white}; font-size: 20px; font-weight: 700; margin: 0 0 5px 0;">
                      BOLETÍN ECONÓMICO
                    </h2>
                    <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin: 0 0 20px 0;">
                      Perspectivas de Hidalgo 2026
                    </p>

                    <!-- Botón de descarga -->
                    <a href="${downloadUrl}"
                       style="display: inline-block; background: linear-gradient(135deg, ${c.primary} 0%, ${c.primaryDark} 100%); color: ${c.white}; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);">
                      📥 Descargar Boletín PDF
                    </a>

                    <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 15px 0 0 0;">
                      9 páginas • Análisis completo
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Qué encontrarás -->
              <h3 style="color: ${c.dark}; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">
                ¿Qué encontrarás en el boletín?
              </h3>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <span style="color: ${c.primary}; font-size: 18px;">📊</span>
                        </td>
                        <td>
                          <strong style="color: ${c.dark};">Panorama Económico Nacional</strong>
                          <p style="color: ${c.gray}; font-size: 14px; margin: 4px 0 0 0;">Proyecciones de PIB e inflación 2025-2026</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <span style="color: ${c.primary}; font-size: 18px;">🏆</span>
                        </td>
                        <td>
                          <strong style="color: ${c.dark};">Hidalgo #1 Nacional</strong>
                          <p style="color: ${c.gray}; font-size: 14px; margin: 4px 0 0 0;">Por qué lidera el crecimiento económico</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <span style="color: ${c.primary}; font-size: 18px;">⚙️</span>
                        </td>
                        <td>
                          <strong style="color: ${c.dark};">Los 5 Motores de Hidalgo</strong>
                          <p style="color: ${c.gray}; font-size: 14px; margin: 4px 0 0 0;">Sectores estratégicos con mayor potencial</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <span style="color: ${c.primary}; font-size: 18px;">🚀</span>
                        </td>
                        <td>
                          <strong style="color: ${c.dark};">Proyecciones 2026</strong>
                          <p style="color: ${c.gray}; font-size: 14px; margin: 4px 0 0 0;">T-MEC, nearshoring y oportunidades</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Consultoría -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F3F4F6; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: ${c.dark}; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                      💡 ¿Necesitas un análisis personalizado?
                    </h3>
                    <p style="color: ${c.gray}; font-size: 14px; line-height: 1.5; margin: 0 0 15px 0;">
                      En Teseo Data Lab desarrollamos estudios económicos a la medida de tu proyecto,
                      sector o región de interés. Más de 18 años de experiencia nos respaldan.
                    </p>
                    <a href="${CONFIG.WEBSITE_URL}/#contacto"
                       style="display: inline-block; background-color: ${c.dark}; color: ${c.white}; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Agendar Consultoría →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Frase Teseo -->
              <p style="color: ${c.gray}; font-size: 14px; font-style: italic; text-align: center; margin: 0 0 20px 0; padding: 20px; border-top: 1px solid #E5E7EB;">
                "Deja que otros tengan opiniones, <strong style="color: ${c.primary};">tú ten data</strong>"
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${c.dark}; padding: 30px 40px; text-align: center;">
              <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0 0 15px 0;">
                <a href="${CONFIG.WEBSITE_URL}" style="color: ${c.primary}; text-decoration: none; font-weight: 600;">
                  Visitar sitio web
                </a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="${CONFIG.WEBSITE_URL}/blog" style="color: rgba(255,255,255,0.8); text-decoration: none;">
                  Blog
                </a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="${CONFIG.WEBSITE_URL}/#contacto" style="color: rgba(255,255,255,0.8); text-decoration: none;">
                  Contacto
                </a>
              </p>

              <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 10px 0;">
                Teseo Data Lab | Pachuca, Hidalgo, México
              </p>

              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">
                +52 771 364 9201 | contacto@teseodata.com
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 20px auto 0 auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://www.linkedin.com/company/teseo-data-center/" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 12px;">
                      LinkedIn
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://www.instagram.com/teseo_data_lab/" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 12px;">
                      Instagram
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://www.facebook.com/teseodatalab" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 12px;">
                      Facebook
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: rgba(255,255,255,0.3); font-size: 10px; margin: 20px 0 0 0;">
                © ${new Date().getFullYear()} Teseo Data Lab. Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

// ============================================
// FUNCIÓN DE PRUEBA (OPCIONAL)
// ============================================

function testEnvioCorreo() {
  // Datos de prueba
  const testData = {
    nombre: 'Usuario Prueba',
    email: 'tu-email@ejemplo.com',  // Cambiar por tu email
    empresa: 'Empresa Test',
    telefono: '+52 771 123 4567',
    origen: 'Test Manual'
  };

  try {
    enviarCorreoBoletin(testData);
    console.log('Correo de prueba enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar correo de prueba:', error);
  }
}

// ============================================
// FUNCIÓN PARA CREAR ENCABEZADOS (PRIMERA VEZ)
// ============================================

function crearEncabezados() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const encabezados = ['Fecha', 'Nombre', 'Email', 'Empresa', 'Teléfono', 'Origen', 'Status Correo'];

  // Insertar encabezados en la primera fila
  sheet.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);

  // Dar formato a los encabezados
  const headerRange = sheet.getRange(1, 1, 1, encabezados.length);
  headerRange.setBackground('#4A2B7E');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');

  console.log('Encabezados creados exitosamente');
}
