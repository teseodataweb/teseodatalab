/**
 * Extract Posts from Corrupted WordPress XML using Regex
 * Handles malformed XML by extracting content with patterns
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Turndown
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

// Helper to extract CDATA content
function extractCDATA(text) {
  if (!text) return '';
  const match = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return match ? match[1].trim() : text.trim();
}

// Helper to extract tag content
function extractTag(xml, tagName) {
  const patterns = [
    new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tagName}>`, 'i'),
    new RegExp(`<${tagName}[^>]*>([^<]*)</${tagName}>`, 'i'),
    new RegExp(`<${tagName}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, 'i')
  ];

  for (const pattern of patterns) {
    const match = xml.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return '';
}

// Clean WordPress content
function cleanContent(html) {
  if (!html) return '';
  return html
    .replace(/<!--\s*wp:[^>]+-->/g, '')
    .replace(/<!--\s*\/wp:[^>]+-->/g, '')
    .replace(/\[[^\]]+\]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Clean excerpt - remove markdown images and clean text
function makeCleanExcerpt(text, fallbackContent) {
  let excerpt = text || fallbackContent || '';
  // Remove markdown images
  excerpt = excerpt.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
  // Remove multiple newlines/spaces
  excerpt = excerpt.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  // Get first 200 chars
  if (excerpt.length > 200) {
    excerpt = excerpt.substring(0, 200).trim() + '...';
  }
  return excerpt;
}

// Detect category
function detectCategory(title, content) {
  const text = `${title} ${content}`.toLowerCase();

  const industrialKeywords = ['manufactura', 'industrial', 'logística', 'automotriz', 'nearshoring', 'nave'];
  if (industrialKeywords.some(k => text.includes(k))) {
    return { slug: 'industrial', name: 'Industrial', parent: 'sectores' };
  }

  const cities = [
    { slug: 'queretaro', name: 'Querétaro', keywords: ['querétaro', 'queretaro'] },
    { slug: 'guadalajara', name: 'Guadalajara', keywords: ['guadalajara', 'jalisco'] },
    { slug: 'monterrey', name: 'Monterrey', keywords: ['monterrey', 'nuevo león'] },
    { slug: 'cdmx', name: 'Ciudad de México', keywords: ['cdmx', 'ciudad de méxico'] },
    { slug: 'puebla', name: 'Puebla', keywords: ['puebla'] },
    { slug: 'merida', name: 'Mérida', keywords: ['mérida', 'yucatán'] },
    { slug: 'pachuca', name: 'Pachuca', keywords: ['pachuca', 'hidalgo'] }
  ];

  for (const city of cities) {
    if (city.keywords.some(k => text.includes(k))) {
      return { slug: city.slug, name: city.name, parent: 'inmobiliario' };
    }
  }

  const dataKeywords = ['inteligencia artificial', 'machine learning', 'data', 'dashboard', 'análisis'];
  if (dataKeywords.some(k => text.includes(k))) {
    return { slug: 'data-analytics', name: 'Data Analytics', parent: 'general' };
  }

  return { slug: 'tendencias', name: 'Tendencias', parent: 'general' };
}

// Get city data
function getCityData(category) {
  if (category.parent !== 'inmobiliario') return null;
  const map = {
    'queretaro': { ciudad: 'Querétaro', estado: 'Querétaro' },
    'guadalajara': { ciudad: 'Guadalajara', estado: 'Jalisco' },
    'monterrey': { ciudad: 'Monterrey', estado: 'Nuevo León' },
    'cdmx': { ciudad: 'Ciudad de México', estado: 'CDMX' },
    'puebla': { ciudad: 'Puebla', estado: 'Puebla' },
    'merida': { ciudad: 'Mérida', estado: 'Yucatán' },
    'pachuca': { ciudad: 'Pachuca', estado: 'Hidalgo' }
  };
  return map[category.slug] || { ciudad: category.name, estado: category.name };
}

// Unsplash images by category - VERIFIED working URLs
const unsplashImages = {
  // Data Analytics / Technology
  'data-analytics': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&h=630&fit=crop'
  ],
  // Industrial / Manufacturing
  'industrial': [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200&h=630&fit=crop'
  ],
  // Real Estate / Cities - VERIFIED
  'inmobiliario': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=630&fit=crop'
  ],
  // Mexican cities - Use generic city/architecture images
  'queretaro': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=630&fit=crop'
  ],
  'guadalajara': [
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=630&fit=crop'
  ],
  'monterrey': [
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=630&fit=crop'
  ],
  'cdmx': [
    'https://images.unsplash.com/photo-1518659526054-190340b32735?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=630&fit=crop'
  ],
  'puebla': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop'
  ],
  'tendencias': [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop'
  ],
  // Default - VERIFIED
  'default': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=630&fit=crop'
  ]
};

// Get Unsplash image for category
function getUnsplashImage(category, index) {
  const categoryImages = unsplashImages[category.slug] ||
                         unsplashImages[category.parent] ||
                         unsplashImages['default'];
  const imageUrl = categoryImages[index % categoryImages.length];
  return {
    url: imageUrl,
    alt: `Imagen relacionada con ${category.name}`,
    width: 1200,
    height: 630
  };
}

// Main extraction function
function extractPosts(xmlPath) {
  console.log(`\n📖 Reading: ${xmlPath}\n`);

  if (!existsSync(xmlPath)) {
    console.error(`❌ File not found: ${xmlPath}`);
    process.exit(1);
  }

  const xml = readFileSync(xmlPath, 'utf-8');
  console.log(`📏 Size: ${xml.length} characters`);

  // Find all <item> blocks
  const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
  const items = [];
  let match;

  while ((match = itemPattern.exec(xml)) !== null) {
    items.push(match[1]);
  }

  console.log(`📦 Found ${items.length} items\n`);

  // First pass: collect attachments
  const attachments = {};
  for (const item of items) {
    const postType = extractTag(item, 'wp:post_type');
    if (postType === 'attachment') {
      const postId = extractTag(item, 'wp:post_id');
      const attachmentUrl = extractTag(item, 'wp:attachment_url');
      if (postId && attachmentUrl) {
        attachments[postId] = { url: attachmentUrl, title: extractTag(item, 'title') };
      }
    }
  }
  console.log(`📎 Found ${Object.keys(attachments).length} attachments`);

  // Second pass: process posts
  const posts = [];
  const categoriesMap = new Map();
  let count = 0;

  for (const item of items) {
    const postType = extractTag(item, 'wp:post_type');
    const status = extractTag(item, 'wp:status');

    if (postType !== 'post') continue;
    if (status !== 'publish') continue;

    count++;

    // Extract fields
    const title = extractTag(item, 'title') || 'Sin título';
    let slug = extractTag(item, 'wp:post_name');

    if (!slug) {
      slug = title.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .substring(0, 60);
    }

    const htmlContent = extractTag(item, 'content:encoded') || '';
    const excerpt = extractTag(item, 'excerpt:encoded') || '';
    const pubDate = extractTag(item, 'pubDate') || item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1] || new Date().toISOString();
    const creator = extractTag(item, 'dc:creator') || 'Teseo Data Lab';

    // Skip if no real content
    if (!title || title.length < 5) continue;

    // Clean and convert content
    const cleanedHtml = cleanContent(htmlContent);
    let markdown = '';
    try {
      markdown = turndown.turndown(cleanedHtml);
    } catch (e) {
      markdown = cleanedHtml.replace(/<[^>]+>/g, '');
    }

    // Skip very short posts
    if (markdown.length < 50) continue;

    const postExcerpt = makeCleanExcerpt(cleanContent(excerpt), markdown);

    // Detect category
    const category = detectCategory(title, markdown);

    // Update category count
    const catEntry = categoriesMap.get(category.slug) || { ...category, count: 0 };
    catEntry.count++;
    categoriesMap.set(category.slug, catEntry);

    // Get featured image - prioritize Unsplash for consistency
    let featuredImage = getUnsplashImage(category, count);

    // Try to find thumbnail ID from WordPress (optional - can override with Unsplash)
    const thumbMatch = item.match(/_thumbnail_id[\s\S]*?<!\[CDATA\[(\d+)\]\]>/);
    if (thumbMatch && attachments[thumbMatch[1]]) {
      // Keep WordPress image only if it's a valid URL
      const wpImage = attachments[thumbMatch[1]].url;
      if (wpImage && wpImage.startsWith('http')) {
        // Optional: uncomment to use WordPress images instead of Unsplash
        // featuredImage = { url: wpImage, alt: attachments[thumbMatch[1]].title, width: 1200, height: 630 };
      }
    }

    // Create post object
    const post = {
      id: `post-${count}`,
      slug,
      title,
      category: { slug: category.slug, name: category.name, parent: category.parent },
      seo: {
        metaTitle: `${title} | Teseo`,
        metaDescription: postExcerpt.substring(0, 160),
        focusKeyword: title.split(' ').slice(0, 3).join(' ').toLowerCase()
      },
      excerpt: postExcerpt,
      content: markdown,
      cityData: getCityData(category),
      featuredImage,
      author: {
        name: 'Teseo Data Lab',
        slug: 'teseo-data-lab',
        bio: 'Equipo de análisis de Teseo Data Lab',
        avatar: '/authors/teseo.jpg'
      },
      publishedAt: pubDate,
      updatedAt: pubDate,
      status: 'published',
      featured: count <= 3,
      readingTime: Math.ceil(markdown.split(' ').length / 200)
    };

    posts.push(post);

    if (count % 5 === 0) {
      console.log(`   Processed ${count} posts...`);
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Categories array
  const categories = Array.from(categoriesMap.values()).sort((a, b) => b.count - a.count);

  console.log('\n📊 Summary:');
  console.log(`   ✅ Posts extracted: ${posts.length}`);
  console.log(`   📁 Categories: ${categories.length}`);

  return { posts, categories };
}

// Save to JSON
function saveToJSON(posts, categories) {
  const dataDir = join(__dirname, '..', 'src', 'data');

  // Save posts
  const postsPath = join(dataDir, 'blogPosts.json');
  writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`\n✅ Saved ${posts.length} posts to: ${postsPath}`);

  // Update categories
  const categoriesPath = join(dataDir, 'categories.json');
  let existing = [];
  try {
    existing = JSON.parse(readFileSync(categoriesPath, 'utf-8'));
  } catch (e) {}

  const merged = [...existing];
  for (const cat of categories) {
    const ex = merged.find(c => c.slug === cat.slug);
    if (ex) {
      ex.count = cat.count;
    } else {
      merged.push({ ...cat, description: `Artículos sobre ${cat.name}`, color: 'teseo', icon: 'FileText' });
    }
  }

  writeFileSync(categoriesPath, JSON.stringify(merged, null, 2), 'utf-8');
  console.log(`✅ Updated categories: ${categoriesPath}`);

  console.log('\n📈 Categories:');
  categories.forEach((cat, i) => {
    console.log(`   ${i + 1}. ${cat.name}: ${cat.count} posts`);
  });
}

// Main
function main() {
  console.log('🚀 Teseo Blog - WordPress XML Extraction');
  console.log('=========================================\n');

  const xmlPath = join(__dirname, '..', 'wordpress-export.xml');

  try {
    const { posts, categories } = extractPosts(xmlPath);

    if (posts.length === 0) {
      console.log('\n⚠️  No posts found. The XML might be too corrupted.');
      console.log('Please try exporting the XML again from WordPress.');
      process.exit(1);
    }

    saveToJSON(posts, categories);

    console.log('\n🎉 Extraction complete!');
    console.log('\nNext steps:');
    console.log('1. pnpm dev');
    console.log('2. Open http://localhost:5173/blog');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
