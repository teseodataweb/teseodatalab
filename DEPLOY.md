# 🚀 Guía de Deploy - Teseo Data Lab Website

## ✅ Proyecto Completado

Has creado exitosamente un proyecto **completamente independiente** para Teseo Data Lab, separado de TeseoDaniel (Simulador + DatAlpine).

## 📦 Contenido del Build

La carpeta `dist/` contiene:
- ✅ `index.html` - Página principal
- ✅ `.htaccess` - Configuración de servidor Apache
- ✅ `assets/` - CSS y JavaScript optimizados
- ✅ `data/` - Datos estáticos
- ✅ `screenshots/` - Imágenes de referencia
- ✅ Imágenes y favicons

**Tamaño total del bundle:** ~1.06 MB (291 KB gzipped)

---

## 🌐 Opción 1: Deploy en teseodata.com (Dominio Raíz)

### Pasos:

1. **Acceder a tu hosting via FTP/SFTP o cPanel**

2. **Navegar a la carpeta raíz del dominio:**
   - Usualmente: `public_html/` o `www/`

3. **Subir TODO el contenido de la carpeta `dist/`:**
   ```
   public_html/
   ├── .htaccess
   ├── index.html
   ├── assets/
   ├── data/
   ├── screenshots/
   ├── favicon.ico
   ├── hero-reference.png
   └── logo-datalpine.png
   ```

4. **Verificar que el .htaccess se subió correctamente**
   - En algunos clientes FTP los archivos ocultos (que empiezan con `.`) no se muestran por defecto
   - Habilitar "Mostrar archivos ocultos" en tu cliente FTP

5. **Acceder a:** `https://teseodata.com`

---

## 📂 Opción 2: Deploy en teseodata.com/prototype (Subdirectorio)

### Pasos:

1. **Crear la carpeta `prototype` en tu servidor:**
   ```
   public_html/
   └── prototype/  ← Crear esta carpeta
   ```

2. **Subir TODO el contenido de `dist/` a `prototype/`:**
   ```
   public_html/prototype/
   ├── .htaccess
   ├── index.html
   ├── assets/
   ├── data/
   ├── screenshots/
   └── ...
   ```

3. **Actualizar el .htaccess** dentro de `prototype/` si es necesario:
   ```apache
   RewriteBase /prototype/
   RewriteRule . /prototype/index.html [L]
   ```

4. **Acceder a:** `https://teseodata.com/prototype`

---

## 🔧 Configuración del Servidor

### Apache (.htaccess incluido)

El archivo `.htaccess` ya está configurado para:
- ✅ Redireccionar todas las rutas a `index.html` (necesario para React Router)
- ✅ Compresión Gzip
- ✅ Cache de navegador optimizado

### Nginx

Si tu servidor usa Nginx, agrega esta configuración:

```nginx
server {
    listen 80;
    server_name teseodata.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🧪 Verificación Post-Deploy

Después de subir los archivos, verifica:

1. **Página principal carga correctamente:**
   - `https://teseodata.com` o `https://teseodata.com/prototype`

2. **Rutas funcionan correctamente:**
   - `/servicios/expansion`
   - `/servicios/inversion`
   - `/servicios/mercado-industrial`
   - `/terminos`
   - `/aviso-privacidad`

3. **No hay errores 404** al navegar entre páginas

4. **Las imágenes y estilos cargan correctamente**

5. **El sitio es responsive** en móvil y desktop

---

## 🔄 Actualizar el Sitio

Para hacer cambios futuros:

1. **Editar archivos en `src/`**

2. **Hacer nuevo build:**
   ```bash
   cd C:\Users\Administrator\Desktop\teseowebsite
   npm run build
   ```

3. **Subir el nuevo contenido de `dist/` al servidor**
   - Reemplazar todos los archivos

---

## 📊 Comparación con el Proyecto Anterior

### ❌ Problema Anterior (TeseoDaniel)
- Proyecto compartido con Simulador + DatAlpine + Teseo
- Navegación por estado (currentView)
- Sin React Router
- Estilos conflictivos
- Build de 1.7MB

### ✅ Solución Nueva (teseowebsite)
- Proyecto 100% independiente
- React Router con URLs reales
- Sin código innecesario
- Estilos limpios sin conflictos
- Build optimizado de 1.06MB
- Misma estructura exitosa que datalpinewebsite-main

---

## 🎯 URLs del Sitio

Una vez desplegado, tu sitio tendrá estas rutas:

| Ruta | Contenido |
|------|-----------|
| `/` | Landing principal Teseo Data Lab |
| `/servicios/expansion` | Análisis de Expansión y Crecimiento |
| `/servicios/inversion` | Estudios de Inversión y Viabilidad |
| `/servicios/mercado-industrial` | Investigación de Mercados Industriales |
| `/servicios/mercado` | Proyecciones de Mercado y Análisis Econométrico |
| `/servicios/agente-vertical` | Agente de IA Vertical Especializado |
| `/terminos` | Términos y Condiciones |
| `/aviso-privacidad` | Aviso de Privacidad |
| `/politicas-uso` | Políticas de Uso |

---

## 💡 Consejos Importantes

1. **Siempre hacer backup** antes de subir archivos al servidor
2. **Verificar que el .htaccess se subió** (es un archivo oculto)
3. **Limpiar caché del navegador** después de actualizar
4. **Probar en modo incógnito** para ver cambios sin caché
5. **Verificar en móvil** después del deploy

---

## 🆘 Solución de Problemas

### Error 404 en las rutas
- ✅ Verifica que el `.htaccess` está en la carpeta correcta
- ✅ Verifica que `mod_rewrite` está habilitado en Apache
- ✅ Contacta a tu hosting para habilitar `mod_rewrite`

### Estilos no cargan
- ✅ Verifica que la carpeta `assets/` se subió correctamente
- ✅ Limpia caché del navegador (Ctrl + F5)
- ✅ Verifica que no hay errores 404 en la consola del navegador

### Imágenes rotas
- ✅ Verifica que todas las imágenes de `public/` se subieron
- ✅ Verifica permisos de archivos en el servidor (644 para archivos, 755 para carpetas)

---

## ✅ Checklist de Deploy

- [ ] Build generado (`npm run build`)
- [ ] Backup del servidor actual
- [ ] Carpeta destino creada (`public_html/` o `public_html/prototype/`)
- [ ] Todo el contenido de `dist/` subido
- [ ] `.htaccess` verificado en el servidor
- [ ] Sitio accesible en el navegador
- [ ] Rutas funcionan correctamente
- [ ] Imágenes y estilos cargan
- [ ] Probado en móvil
- [ ] Probado en diferentes navegadores

---

**¡Listo para Deploy!** 🎉

Tu nuevo sitio Teseo Data Lab está optimizado y listo para publicación en producción.
