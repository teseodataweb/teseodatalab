# QA/QC CHECKLIST - TESEO DATA LAB WEBSITE

**Proyecto:** Teseo Data Lab Website
**Fecha de Revisión:** 2025-12-31
**URL Local:** http://localhost:5173
**Responsable QA:** [Por asignar]

---

## RESUMEN EJECUTIVO

Este documento contiene el checklist completo de QA/QC para el sitio web de Teseo Data Lab, organizado por áreas de responsabilidad para facilitar la revisión por diferentes departamentos.

---

## FASE 1: QA TÉCNICO (Desarrollo)

### 1.1 Navegación y Rutas
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 1.1.1 | Todas las rutas cargan correctamente | [ ] | |
| 1.1.2 | Navegación desde Navbar funciona | [ ] | |
| 1.1.3 | Links del Footer funcionan | [ ] | |
| 1.1.4 | Scroll suave a secciones (#hash) | [ ] | |
| 1.1.5 | Botón atrás del navegador funciona | [ ] | |
| 1.1.6 | URLs amigables sin errores 404 | [ ] | |
| 1.1.7 | Menú móvil abre/cierra correctamente | [ ] | |
| 1.1.8 | Dropdown de servicios funciona | [ ] | |

### 1.2 Consola y Errores
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 1.2.1 | Sin errores en consola (página principal) | [ ] | |
| 1.2.2 | Sin errores en consola (páginas de servicios) | [ ] | |
| 1.2.3 | Sin errores en consola (páginas legales) | [ ] | |
| 1.2.4 | Sin warnings críticos de React | [ ] | |
| 1.2.5 | Sin recursos 404 (imágenes, fonts, etc.) | [ ] | |

### 1.3 Build y Deployment
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 1.3.1 | Build de producción sin errores | [ ] | |
| 1.3.2 | Preview de producción funciona | [ ] | |
| 1.3.3 | ESLint sin errores críticos | [ ] | |
| 1.3.4 | Archivos .htaccess configurados | [ ] | |

### 1.4 Formularios e Interacciones
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 1.4.1 | Botones CTA tienen acción definida | [ ] | |
| 1.4.2 | Links de WhatsApp funcionan | [ ] | |
| 1.4.3 | Links de email funcionan | [ ] | |
| 1.4.4 | Links de teléfono funcionan | [ ] | |

---

## FASE 2: QA UX/UI (Diseño)

### 2.1 Consistencia Visual
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 2.1.1 | Paleta de colores consistente | [ ] | |
| 2.1.2 | Tipografía uniforme en todo el sitio | [ ] | |
| 2.1.3 | Espaciados consistentes (padding/margin) | [ ] | |
| 2.1.4 | Bordes y radios uniformes | [ ] | |
| 2.1.5 | Iconografía del mismo estilo (Lucide) | [ ] | |
| 2.1.6 | Logo visible y bien posicionado | [ ] | |

### 2.2 Responsive Design
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 2.2.1 | Mobile (320px - 480px) | [ ] | |
| 2.2.2 | Tablet (768px - 1024px) | [ ] | |
| 2.2.3 | Desktop (1024px - 1440px) | [ ] | |
| 2.2.4 | Large Desktop (1440px+) | [ ] | |
| 2.2.5 | Imágenes se adaptan correctamente | [ ] | |
| 2.2.6 | Tablas son scrollables en móvil | [ ] | |
| 2.2.7 | Gráficas se redimensionan | [ ] | |

### 2.3 Animaciones y Transiciones
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 2.3.1 | Animaciones no son molestas | [ ] | |
| 2.3.2 | Transiciones suaves (no abruptas) | [ ] | |
| 2.3.3 | Hover states en elementos interactivos | [ ] | |
| 2.3.4 | Loading states cuando aplique | [ ] | |
| 2.3.5 | Scroll reveal funciona correctamente | [ ] | |

### 2.4 Feedback Visual
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 2.4.1 | Estados activos visibles en navegación | [ ] | |
| 2.4.2 | Focus visible en elementos de formulario | [ ] | |
| 2.4.3 | Cursor pointer en elementos clicables | [ ] | |
| 2.4.4 | Indicadores de carga cuando aplique | [ ] | |

---

## FASE 3: QA CONTENIDO (Marketing/Comunicación)

### 3.1 Ortografía y Gramática
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 3.1.1 | Sin errores ortográficos | [ ] | |
| 3.1.2 | Puntuación correcta | [ ] | |
| 3.1.3 | Acentos correctos | [ ] | |
| 3.1.4 | Mayúsculas/minúsculas consistentes | [ ] | |

### 3.2 Información Corporativa
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 3.2.1 | RFC correcto: TDL2206227UA | [ ] | |
| 3.2.2 | Teléfono correcto: +52 771 364 9201 | [ ] | |
| 3.2.3 | Email correcto: contacto@teseodata.com | [ ] | |
| 3.2.4 | Dirección/ubicación correcta | [ ] | |
| 3.2.5 | Redes sociales actualizadas | [ ] | |

### 3.3 Mensajes y CTAs
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 3.3.1 | CTAs claros y accionables | [ ] | |
| 3.3.2 | Propuesta de valor clara | [ ] | |
| 3.3.3 | Beneficios bien comunicados | [ ] | |
| 3.3.4 | Tono profesional y consistente | [ ] | |

### 3.4 Servicios y Descripciones
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 3.4.1 | 5 servicios bien descritos | [ ] | |
| 3.4.2 | Casos de estudio coherentes | [ ] | |
| 3.4.3 | Metodología clara | [ ] | |
| 3.4.4 | Deliverables bien explicados | [ ] | |

---

## FASE 4: QA SEO (Marketing Digital)

### 4.1 Meta Tags
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 4.1.1 | Title tag único por página | [ ] | |
| 4.1.2 | Meta description única por página | [ ] | |
| 4.1.3 | Keywords relevantes | [ ] | |
| 4.1.4 | Canonical URLs definidas | [ ] | |
| 4.1.5 | Viewport meta tag | [ ] | |

### 4.2 Open Graph (Redes Sociales)
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 4.2.1 | og:title definido | [ ] | |
| 4.2.2 | og:description definido | [ ] | |
| 4.2.3 | og:image definido (1200x630px) | [ ] | |
| 4.2.4 | og:url definido | [ ] | |
| 4.2.5 | Twitter cards configuradas | [ ] | |

### 4.3 Estructura y URLs
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 4.3.1 | URLs amigables y descriptivas | [ ] | |
| 4.3.2 | Estructura jerárquica correcta | [ ] | |
| 4.3.3 | Sin parámetros innecesarios | [ ] | |
| 4.3.4 | Redirecciones funcionando | [ ] | |

### 4.4 Analytics y Tracking
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 4.4.1 | Google Analytics (GA4) configurado | [ ] | |
| 4.4.2 | Eventos de conversión definidos | [ ] | |
| 4.4.3 | Google Search Console verificado | [ ] | |

---

## FASE 5: QA ACCESIBILIDAD (UX/Legal)

### 5.1 WCAG 2.1 Nivel A
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 5.1.1 | Alt text en todas las imágenes | [ ] | |
| 5.1.2 | Contraste mínimo 4.5:1 (texto) | [ ] | |
| 5.1.3 | Navegación por teclado funcional | [ ] | |
| 5.1.4 | Focus visible en todos los elementos | [ ] | |
| 5.1.5 | Estructura de headings correcta (h1-h6) | [ ] | |
| 5.1.6 | Labels en campos de formulario | [ ] | |
| 5.1.7 | Links con texto descriptivo | [ ] | |

### 5.2 WCAG 2.1 Nivel AA
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 5.2.1 | Contraste mejorado 7:1 (texto grande) | [ ] | |
| 5.2.2 | Texto redimensionable hasta 200% | [ ] | |
| 5.2.3 | No solo color para transmitir info | [ ] | |
| 5.2.4 | Skip links implementados | [ ] | |

### 5.3 Compatibilidad
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 5.3.1 | Funciona sin JavaScript (degradación) | [ ] | |
| 5.3.2 | Compatible con lectores de pantalla | [ ] | |
| 5.3.3 | Funciona con zoom del navegador | [ ] | |

---

## FASE 6: QA PERFORMANCE (Desarrollo/DevOps)

### 6.1 Lighthouse Scores (Objetivo: >90)
| # | Métrica | Objetivo | Actual | Notas |
|---|---------|----------|--------|-------|
| 6.1.1 | Performance | >90 | [ ] | |
| 6.1.2 | Accessibility | >90 | [ ] | |
| 6.1.3 | Best Practices | >90 | [ ] | |
| 6.1.4 | SEO | >90 | [ ] | |

### 6.2 Core Web Vitals
| # | Métrica | Objetivo | Actual | Notas |
|---|---------|----------|--------|-------|
| 6.2.1 | LCP (Largest Contentful Paint) | <2.5s | [ ] | |
| 6.2.2 | FID (First Input Delay) | <100ms | [ ] | |
| 6.2.3 | CLS (Cumulative Layout Shift) | <0.1 | [ ] | |
| 6.2.4 | TTFB (Time to First Byte) | <800ms | [ ] | |

### 6.3 Optimización de Recursos
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 6.3.1 | Imágenes optimizadas (WebP/AVIF) | [ ] | |
| 6.3.2 | CSS minificado | [ ] | |
| 6.3.3 | JavaScript minificado | [ ] | |
| 6.3.4 | Gzip/Brotli compression | [ ] | |
| 6.3.5 | Lazy loading de imágenes | [ ] | |
| 6.3.6 | Code splitting implementado | [ ] | |

---

## FASE 7: QA LEGAL (Legal/Compliance)

### 7.1 Documentos Legales
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 7.1.1 | Aviso de Privacidad presente | [ ] | |
| 7.1.2 | Términos y Condiciones presentes | [ ] | |
| 7.1.3 | Políticas de Uso presentes | [ ] | |
| 7.1.4 | Información de contacto visible | [ ] | |

### 7.2 Cumplimiento LFPDPPP (México)
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 7.2.1 | Identidad del responsable | [ ] | |
| 7.2.2 | Finalidad del tratamiento de datos | [ ] | |
| 7.2.3 | Opciones para limitar uso | [ ] | |
| 7.2.4 | Medios para ejercer derechos ARCO | [ ] | |
| 7.2.5 | Transferencia de datos explicada | [ ] | |

### 7.3 Cookies y Tracking
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 7.3.1 | Banner de cookies (si aplica) | [ ] | |
| 7.3.2 | Política de cookies documentada | [ ] | |
| 7.3.3 | Opt-out disponible | [ ] | |

---

## FASE 8: QA SEGURIDAD (Desarrollo/IT)

### 8.1 Configuración Básica
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 8.1.1 | HTTPS configurado | [ ] | |
| 8.1.2 | Headers de seguridad (CSP, X-Frame) | [ ] | |
| 8.1.3 | No exposición de datos sensibles | [ ] | |
| 8.1.4 | Dependencias actualizadas | [ ] | |

### 8.2 Inputs y Datos
| # | Verificación | Estado | Notas |
|---|--------------|--------|-------|
| 8.2.1 | Validación de inputs | [ ] | |
| 8.2.2 | Sanitización de datos | [ ] | |
| 8.2.3 | No logs de info sensible | [ ] | |

---

## FASE 9: COMPATIBILIDAD DE NAVEGADORES

### 9.1 Desktop
| # | Navegador | Versión | Estado | Notas |
|---|-----------|---------|--------|-------|
| 9.1.1 | Chrome | Latest | [ ] | |
| 9.1.2 | Firefox | Latest | [ ] | |
| 9.1.3 | Safari | Latest | [ ] | |
| 9.1.4 | Edge | Latest | [ ] | |

### 9.2 Mobile
| # | Navegador | Versión | Estado | Notas |
|---|-----------|---------|--------|-------|
| 9.2.1 | Chrome Android | Latest | [ ] | |
| 9.2.2 | Safari iOS | Latest | [ ] | |
| 9.2.3 | Samsung Internet | Latest | [ ] | |

---

## MATRIZ DE RESPONSABILIDADES

| Fase | Área Responsable | Revisor Principal | Revisor Secundario |
|------|------------------|-------------------|-------------------|
| 1. Técnico | Desarrollo | Tech Lead | DevOps |
| 2. UX/UI | Diseño | UX Lead | Director Creativo |
| 3. Contenido | Marketing | Content Manager | Director Marketing |
| 4. SEO | Marketing Digital | SEO Specialist | Marketing Manager |
| 5. Accesibilidad | UX + Legal | UX Lead | Compliance |
| 6. Performance | Desarrollo | Tech Lead | DevOps |
| 7. Legal | Legal | Abogado | Director General |
| 8. Seguridad | IT/DevOps | Security Lead | Tech Lead |
| 9. Compatibilidad | QA | QA Lead | Desarrollo |

---

## CRITERIOS DE APROBACIÓN

### Para Go-Live:
- [ ] **Fase 1 (Técnico):** 100% items críticos aprobados
- [ ] **Fase 2 (UX/UI):** 90% items aprobados
- [ ] **Fase 3 (Contenido):** 100% información corporativa correcta
- [ ] **Fase 4 (SEO):** Meta tags básicos configurados
- [ ] **Fase 5 (Accesibilidad):** WCAG Nivel A cumplido
- [ ] **Fase 6 (Performance):** Lighthouse >80 en todas las métricas
- [ ] **Fase 7 (Legal):** 100% documentos legales presentes
- [ ] **Fase 8 (Seguridad):** Sin vulnerabilidades críticas
- [ ] **Fase 9 (Compatibilidad):** Funciona en Chrome, Firefox, Safari

---

## HALLAZGOS Y OBSERVACIONES

### Críticos (Bloquean Go-Live)
| # | Descripción | Fase | Responsable | Estado |
|---|-------------|------|-------------|--------|
| | | | | |

### Mayores (Deben resolverse pronto)
| # | Descripción | Fase | Responsable | Estado |
|---|-------------|------|-------------|--------|
| | | | | |

### Menores (Mejoras opcionales)
| # | Descripción | Fase | Responsable | Estado |
|---|-------------|------|-------------|--------|
| | | | | |

---

## FIRMAS DE APROBACIÓN

| Área | Nombre | Firma | Fecha |
|------|--------|-------|-------|
| Desarrollo | | | |
| Diseño UX/UI | | | |
| Marketing | | | |
| Legal | | | |
| Dirección General | | | |

---

*Documento generado automáticamente. Actualizar conforme avance la revisión.*
