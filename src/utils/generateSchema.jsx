/**
 * Schema JSON-LD Generators for Teseo Blog
 * Provides structured data for SEO optimization
 */

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(post, siteUrl = 'https://teseo.mx') {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.seo?.metaDescription,
    image: post.featuredImage?.url ? `${siteUrl}${post.featuredImage.url}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Teseo Research',
      url: `${siteUrl}/equipo/${post.author?.slug || 'teseo-research'}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Teseo Data Lab',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-teseo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.category?.slug}/${post.slug}`
    }
  };

  // Add Place schema if post has city data
  if (post.cityData) {
    schema.about = {
      '@type': 'Place',
      name: `${post.cityData.ciudad}, ${post.cityData.estado}`,
      address: {
        '@type': 'PostalAddress',
        addressRegion: post.cityData.estado,
        addressCountry: 'MX'
      }
    };
  }

  return schema;
}

/**
 * Generate Category/CollectionPage schema for hub pages
 */
export function generateCategorySchema(category, cityData, postCount, siteUrl = 'https://teseo.mx') {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - Blog Teseo`,
    description: category.description || `Artículos sobre ${category.name}`,
    url: `${siteUrl}/blog/${category.slug}`,
    numberOfItems: postCount,
    publisher: {
      '@type': 'Organization',
      name: 'Teseo Data Lab'
    }
  };

  // Add Place if it's a city category
  if (cityData) {
    schema.about = {
      '@type': 'Place',
      name: `${cityData.nombre}, ${cityData.estado}`,
      address: {
        '@type': 'PostalAddress',
        addressRegion: cityData.estado,
        addressCountry: 'MX'
      }
    };
  }

  return schema;
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(items, siteUrl = 'https://teseo.mx') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteUrl}${item.url}` : undefined
    }))
  };
}

/**
 * Generate FAQ schema for posts with FAQs
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Organization schema for site-wide use
 */
export function generateOrganizationSchema(siteUrl = 'https://teseo.mx') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Teseo Data Lab',
    alternateName: 'Teseo',
    url: siteUrl,
    logo: `${siteUrl}/logo-teseo.png`,
    description: 'Inteligencia de datos para el sector inmobiliario e industrial en México',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciudad de México',
      addressCountry: 'MX'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52-55-1234-5678',
      contactType: 'sales',
      availableLanguage: ['Spanish', 'English']
    },
    sameAs: [
      'https://linkedin.com/company/teseo-data-lab',
      'https://twitter.com/teseodata'
    ]
  };
}

/**
 * React component to inject schema into page
 */
export function SchemaScript({ schema }) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Helper to combine multiple schemas
 */
export function combineSchemas(...schemas) {
  return schemas.filter(Boolean);
}
