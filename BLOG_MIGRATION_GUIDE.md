# Guía de Migración de Blog - Teseo Website

## Estado Actual

La estructura del blog está lista. Falta exportar los posts de WordPress.

---

## Paso 1: Exportar Posts de WordPress

1. Ve a tu WordPress: `tu-sitio.com/wp-admin`
2. Navega a: **Herramientas → Exportar**
3. Selecciona: **Entradas** (Posts)
4. Click en **Descargar archivo de exportación**
5. Guarda el archivo como: `teseowebsite/wordpress-export.xml`

---

## Paso 2: Instalar Dependencias del Parser

Ejecuta en terminal:

```bash
cd C:\Users\Administrator\Desktop\teseowebsite
pnpm add -D xml2js turndown
```

---

## Paso 3: Ejecutar el Parser

```bash
node scripts/parseWordPressBlog.js
```

Esto generará:
- `src/data/blogPosts.json` - Todos los posts
- `src/data/categories.json` - Categorías actualizadas

---

## Paso 4: Verificar el Blog

1. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

2. Navega a: `http://localhost:5173/blog`

3. Verifica:
   - Lista de posts
   - Filtros de categoría
   - Búsqueda
   - Páginas individuales de post

---

## Estructura Creada

```
teseowebsite/
├── scripts/
│   └── parseWordPressBlog.js      # Parser de WordPress XML
├── src/
│   ├── components/
│   │   └── blog/
│   │       └── PostCard.jsx       # Tarjeta de post
│   ├── pages/
│   │   └── blog/
│   │       ├── BlogHub.jsx        # Página principal /blog
│   │       ├── CategoryHub.jsx    # Hub por categoría /blog/:cat
│   │       └── BlogPost.jsx       # Post individual /blog/:cat/:slug
│   ├── data/
│   │   ├── blogPosts.json         # Posts (demo, reemplazar con parser)
│   │   ├── categories.json        # Categorías base
│   │   └── cityData.json          # Datos de mercado por ciudad
│   └── utils/
│       └── generateSchema.js      # Generador de Schema JSON-LD
└── BLOG_MIGRATION_GUIDE.md        # Este archivo
```

---

## Rutas del Blog

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/blog` | BlogHub | Listado principal con búsqueda y filtros |
| `/blog/:categoria` | CategoryHub | Hub por categoría con estadísticas |
| `/blog/:categoria/:slug` | BlogPost | Artículo individual con Markdown |

---

## Categorías Configuradas

| Slug | Nombre | Tipo |
|------|--------|------|
| `industrial` | Industrial | Sector |
| `inmobiliario` | Inmobiliario | Sector |
| `queretaro` | Querétaro | Ciudad |
| `guadalajara` | Guadalajara | Ciudad |
| `monterrey` | Monterrey | Ciudad |
| `cdmx` | Ciudad de México | Ciudad |
| `data-analytics` | Data Analytics | General |
| `tendencias` | Tendencias | General |

---

## SEO Implementado

### Schema JSON-LD
- **Article**: En cada post individual
- **BreadcrumbList**: Navegación estructurada
- **Place**: Para posts con datos de ciudad
- **CollectionPage**: En hubs de categoría

### Anti-Canibalización
- URLs semánticas: `/blog/:categoria/:slug`
- Sin URLs por fecha
- Sin archivos de autor indexados

### Arquitectura Hub-Cluster
- Hubs por ciudad/sector con datos únicos
- Posts como clusters con internal linking
- CTAs contextuales hacia servicios

---

## Datos de Mercado (cityData.json)

Cada ciudad tiene:
- Métricas de mercado (precio/m², plusvalía, proyectos)
- Zonas top con histórico
- Ventajas competitivas
- Datos industriales (parques, ocupación, sectores)

Estos datos se muestran en:
- CategoryHub (estadísticas)
- BlogPost (sidebar)
- Schema JSON-LD (SEO)

---

## Personalización

### Agregar nueva categoría

1. Edita `src/data/categories.json`:
```json
{
  "slug": "nueva-categoria",
  "name": "Nueva Categoría",
  "parent": "general",
  "description": "Descripción...",
  "color": "teseo",
  "icon": "BarChart3"
}
```

### Agregar datos de nueva ciudad

1. Edita `src/data/cityData.json`:
```json
{
  "nueva-ciudad": {
    "nombre": "Nueva Ciudad",
    "estado": "Estado",
    "mercado": {
      "costoM2Promedio": 8000,
      "plusvaliaAnual": 5.5,
      ...
    },
    ...
  }
}
```

---

## Testing Checklist

- [ ] Blog Hub carga correctamente
- [ ] Búsqueda filtra posts
- [ ] Filtros de categoría funcionan
- [ ] Posts destacados se muestran
- [ ] CategoryHub muestra estadísticas
- [ ] BlogPost renderiza Markdown
- [ ] Schema JSON-LD aparece en DevTools
- [ ] Posts relacionados se muestran
- [ ] CTAs llevan a contacto
- [ ] Navegación breadcrumb funciona
- [ ] Responsive en móvil

---

## Próximos Pasos

1. **Exportar XML de WordPress**
2. **Ejecutar parser**
3. **Revisar posts generados**
4. **Agregar imágenes a CDN** (opcional)
5. **Desplegar a producción**

---

## Soporte

Documentación basada en la arquitectura de migración de Datalpine.

**Archivos de referencia:**
- `BLOG_ARCHITECTURE_PLAN.md` (Datalpine)
- `BLOG_MIGRATION_SUMMARY.md` (Datalpine)
- `BLOG_TESTING_CHECKLIST.md` (Datalpine)
