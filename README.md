# Teseo Data Lab Website

Sitio web corporativo independiente para Teseo Data Lab - Inteligencia de Datos y Análisis Econométrico.

## 🚀 Características

- ✅ Proyecto completamente independiente (sin código compartido de DatAlpine o Simulador)
- ✅ React Router con URLs reales
- ✅ Landing page corporativa profesional
- ✅ 5 guías de servicios detalladas
- ✅ Páginas legales (Términos, Privacidad, Políticas)
- ✅ Optimizado para SEO
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Animaciones con Framer Motion
- ✅ Build optimizado para producción

## 📦 Stack Tecnológico

- **React 19.1** - UI Framework
- **React Router 7.9** - Enrutamiento
- **Vite 6.4** - Build tool
- **Tailwind CSS 4.1** - Estilos
- **Framer Motion 12.15** - Animaciones
- **Recharts 2.15** - Gráficas
- **Lucide React** - Iconos

## 🛠️ Comandos Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173`

### Build de Producción
```bash
npm run build
```
Genera el build optimizado en la carpeta `dist/`

### Preview del Build
```bash
npm run preview
```
Preview del build de producción en `http://localhost:4173`

## 📂 Estructura del Proyecto

```
teseowebsite/
├── public/              # Assets públicos
├── src/
│   ├── components/
│   │   ├── layout/      # Componentes de layout (Footer, etc.)
│   │   ├── pages/       # Páginas de servicios y legales
│   │   └── ui/          # Componentes UI reutilizables
│   ├── lib/             # Utilidades
│   ├── pages/           # Página principal (TeseoLanding)
│   ├── App.jsx          # Router principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globales
├── dist/                # Build de producción
└── package.json
```

## 🌐 Rutas Disponibles

- `/` - Landing principal de Teseo Data Lab
- `/servicios/expansion` - Análisis de Expansión y Crecimiento
- `/servicios/inversion` - Estudios de Inversión y Viabilidad
- `/servicios/mercado-industrial` - Investigación de Mercados Industriales
- `/servicios/mercado` - Proyecciones de Mercado
- `/servicios/agente-vertical` - Agente de IA Vertical
- `/terminos` - Términos y Condiciones
- `/aviso-privacidad` - Aviso de Privacidad
- `/politicas-uso` - Políticas de Uso

## 🚀 Deploy en Producción

### Para teseodata.com/prototype

1. **Build el proyecto:**
   ```bash
   npm run build
   ```

2. **Subir contenido de `dist/` al servidor:**
   - Carpeta destino: `public_html/prototype/`
   - Incluir todos los archivos y carpetas de `dist/`

3. **Configuración del servidor:**
   - El servidor debe estar configurado para servir `index.html` para todas las rutas
   - Si usas Apache, incluir `.htaccess`:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /prototype/
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /prototype/index.html [L]
     </IfModule>
     ```

### Para teseodata.com (dominio raíz)

1. **Actualizar `vite.config.js`:**
   ```javascript
   export default defineConfig({
     base: '/', // Cambiar de '/prototype/' a '/'
     // ... resto de configuración
   })
   ```

2. **Build y subir:**
   ```bash
   npm run build
   ```
   - Subir contenido de `dist/` a `public_html/`

## 📊 Performance

- **Bundle Size:** ~1.06 MB (291 KB gzipped)
- **CSS:** 97 KB (15.5 KB gzipped)
- **HTML:** 2.68 KB (0.93 KB gzipped)

## 🔧 Mantenimiento

### Actualizar contenido de servicios
Editar archivos en `src/components/pages/Teseo*.jsx`

### Actualizar landing page
Editar `src/pages/TeseoLanding.jsx`

### Actualizar footer
Editar `src/components/layout/Footer.jsx`

## 📝 Notas

- Este proyecto es **completamente independiente** de TeseoDaniel (Simulador + DatAlpine)
- Usa React Router para navegación real con URLs
- Optimizado para SEO con meta tags completos
- Responsive design para todos los dispositivos

## 👥 Desarrollado por

**Teseo Data Lab S.A.S. de C.V.**
- Website: https://teseodata.com
- Email: contacto@teseodata.com
- Teléfono: +52 771 364 9201
