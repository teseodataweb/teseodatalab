/**
 * WordPress XML Cleaner and Parser for Teseo Blog
 * Limpia el XML de WordPress antes de parsearlo
 *
 * Usage: node scripts/cleanAndParseWordPress.js
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { parseStringPromise } from 'xml2js';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Turndown for HTML to Markdown conversion
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

// Custom rules for better markdown
turndown.addRule('preserveImages', {
  filter: 'img',
  replacement: (content, node) => {
    const alt = node.getAttribute('alt') || '';
    const src = node.getAttribute('src') || '';
    return `![${alt}](${src})`;
  }
});

/**
 * Clean the XML content to remove problematic sections
 */
function cleanXML(xmlContent) {
  console.log('🧹 Cleaning XML content...');

  let cleaned = xmlContent;

  // Remove any DOCTYPE declarations inside content (they break XML parsing)
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '');

  // Remove problematic wp:meta_value entries that contain full HTML pages
  // These are usually error pages that got captured
  cleaned = cleaned.replace(/<wp:meta_value>[\s\S]*?<html[\s\S]*?<\/html>[\s\S]*?<\/wp:meta_value>/gi,
    '<wp:meta_value><![CDATA[]]></wp:meta_value>');

  // Remove any remaining HTML tags outside of CDATA in meta_value
  cleaned = cleaned.replace(/<wp:meta_value>(?!<!\[CDATA\[)([\s\S]*?)<\/wp:meta_value>/gi,
    (match, content) => {
      // If it looks like it contains HTML tags, wrap in CDATA or clean
      if (content.includes('<html') || content.includes('<head') || content.includes('<body')) {
        return '<wp:meta_value><![CDATA[]]></wp:meta_value>';
      }
      return match;
    }
  );

  // Remove standalone HTML structural tags that might be floating around
  cleaned = cleaned.replace(/<\/?(?:html|head|body|style|script)[^>]*>/gi, '');

  // Clean up any double CDATA sections
  cleaned = cleaned.replace(/<!\[CDATA\[\s*<!\[CDATA\[/g, '<![CDATA[');
  cleaned = cleaned.replace(/\]\]>\s*\]\]>/g, ']]>');

  console.log('✅ XML cleaned successfully');
  return cleaned;
}

// Remove WordPress blocks and shortcodes
function cleanContent(html) {
  if (!html) return '';

  return html
    // Remove Gutenberg block comments
    .replace(/<!--\s*wp:[^>]+-->/g, '')
    .replace(/<!--\s*\/wp:[^>]+-->/g, '')
    // Remove shortcodes
    .replace(/\[[^\]]+\]/g, '')
    // Remove excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    // Remove spam/affiliate links patterns
    .replace(/<a[^>]*href="[^"]*(?:affiliate|spam|tracking)[^"]*"[^>]*>.*?<\/a>/gi, '')
    .trim();
}

// Extract featured image from post
function extractFeaturedImage(item, attachments) {
  // Check for wp:post_meta with _thumbnail_id
  const postMeta = item['wp:postmeta'] || [];
  let thumbnailId = null;

  for (const meta of postMeta) {
    const key = meta['wp:meta_key']?.[0];
    const value = meta['wp:meta_value']?.[0];
    if (key === '_thumbnail_id' && value) {
      thumbnailId = value;
      break;
    }
  }

  // Look for the attachment with this ID
  if (thumbnailId && attachments[thumbnailId]) {
    return {
      url: attachments[thumbnailId].url,
      alt: attachments[thumbnailId].title || '',
      width: 1200,
      height: 630
    };
  }

  // Default placeholder if no image
  return {
    url: '/placeholder-blog.jpg',
    alt: '',
    width: 1200,
    height: 630
  };
}

// Detect category based on content and title
function detectCategoryFromContent(title, content, wpCategories) {
  const text = `${title} ${content}`.toLowerCase();

  // Check WordPress categories first
  if (wpCategories && wpCategories.length > 0) {
    const cat = wpCategories[0];
    const catName = typeof cat === 'string' ? cat : (cat._ || cat);
    const catSlug = (cat.$?.nicename || catName).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    return {
      slug: catSlug,
      name: catName,
      parent: 'general'
    };
  }

  // Industrial sector detection
  const industrialKeywords = ['manufactura', 'industrial', 'logística', 'logistica', 'automotriz', 'nearshoring', 'parque industrial'];
  if (industrialKeywords.some(k => text.includes(k))) {
    return { slug: 'industrial', name: 'Industrial', parent: 'sectores' };
  }

  // City detection for real estate
  const cities = [
    { slug: 'queretaro', name: 'Querétaro', keywords: ['querétaro', 'queretaro', 'qro'] },
    { slug: 'guadalajara', name: 'Guadalajara', keywords: ['guadalajara', 'gdl', 'jalisco'] },
    { slug: 'monterrey', name: 'Monterrey', keywords: ['monterrey', 'mty', 'nuevo león', 'nuevo leon'] },
    { slug: 'cdmx', name: 'Ciudad de México', keywords: ['cdmx', 'ciudad de méxico', 'ciudad de mexico', 'df'] },
    { slug: 'puebla', name: 'Puebla', keywords: ['puebla'] },
    { slug: 'leon', name: 'León', keywords: ['león', 'leon', 'guanajuato'] },
    { slug: 'merida', name: 'Mérida', keywords: ['mérida', 'merida', 'yucatán', 'yucatan'] },
    { slug: 'tijuana', name: 'Tijuana', keywords: ['tijuana', 'baja california'] },
    { slug: 'aguascalientes', name: 'Aguascalientes', keywords: ['aguascalientes'] },
    { slug: 'slp', name: 'San Luis Potosí', keywords: ['san luis potosí', 'san luis potosi', 'slp'] },
    { slug: 'pachuca', name: 'Pachuca', keywords: ['pachuca', 'hidalgo'] }
  ];

  for (const city of cities) {
    if (city.keywords.some(k => text.includes(k))) {
      return { slug: city.slug, name: city.name, parent: 'inmobiliario' };
    }
  }

  // Default to data-analytics
  return { slug: 'data-analytics', name: 'Data Analytics', parent: 'general' };
}

// Extract city data for SEO
function extractCityData(category) {
  if (category.parent !== 'inmobiliario') {
    return null;
  }

  const cityStateMap = {
    'queretaro': { ciudad: 'Querétaro', estado: 'Querétaro' },
    'guadalajara': { ciudad: 'Guadalajara', estado: 'Jalisco' },
    'monterrey': { ciudad: 'Monterrey', estado: 'Nuevo León' },
    'cdmx': { ciudad: 'Ciudad de México', estado: 'CDMX' },
    'puebla': { ciudad: 'Puebla', estado: 'Puebla' },
    'leon': { ciudad: 'León', estado: 'Guanajuato' },
    'merida': { ciudad: 'Mérida', estado: 'Yucatán' },
    'tijuana': { ciudad: 'Tijuana', estado: 'Baja California' },
    'aguascalientes': { ciudad: 'Aguascalientes', estado: 'Aguascalientes' },
    'slp': { ciudad: 'San Luis Potosí', estado: 'San Luis Potosí' },
    'pachuca': { ciudad: 'Pachuca', estado: 'Hidalgo' }
  };

  return cityStateMap[category.slug] || { ciudad: category.name, estado: category.name };
}

// Main parser function
async function parseWordPressXML(xmlPath) {
  console.log(`\n📖 Reading XML file: ${xmlPath}\n`);

  if (!existsSync(xmlPath)) {
    console.error(`❌ File not found: ${xmlPath}`);
    console.log('\n📝 Instructions:');
    console.log('1. Go to your WordPress admin: yoursite.com/wp-admin');
    console.log('2. Navigate to: Tools → Export');
    console.log('3. Select "Posts" and click "Download Export File"');
    console.log('4. Save the file as: teseowebsite/wordpress-export.xml');
    console.log('5. Run this script again: node scripts/cleanAndParseWordPress.js\n');
    process.exit(1);
  }

  let xmlContent = readFileSync(xmlPath, 'utf-8');

  // Clean the XML first
  xmlContent = cleanXML(xmlContent);

  // Save cleaned XML for debugging if needed
  const cleanedPath = xmlPath.replace('.xml', '-cleaned.xml');
  writeFileSync(cleanedPath, xmlContent, 'utf-8');
  console.log(`📄 Saved cleaned XML to: ${cleanedPath}\n`);

  console.log('🔄 Parsing XML...');

  let result;
  try {
    result = await parseStringPromise(xmlContent, {
      explicitArray: true,
      trim: true,
      strict: false // Be lenient with malformed XML
    });
  } catch (parseError) {
    console.error('❌ XML Parse Error:', parseError.message);
    console.log('\n🔧 Attempting alternative parsing...');

    // Try more aggressive cleaning
    xmlContent = xmlContent
      .replace(/<!\[CDATA\[[\s\S]*?<html[\s\S]*?\]\]>/gi, '<![CDATA[]]>')
      .replace(/<wp:meta_value>[^<]*<[^/][^>]*>[^<]*<\/wp:meta_value>/gi, '<wp:meta_value><![CDATA[]]></wp:meta_value>');

    writeFileSync(cleanedPath, xmlContent, 'utf-8');

    result = await parseStringPromise(xmlContent, {
      explicitArray: true,
      trim: true,
      strict: false
    });
  }

  const channel = result.rss.channel[0];
  const items = channel.item || [];

  console.log(`📦 Found ${items.length} items in XML\n`);

  // First pass: collect attachments for featured images
  const attachments = {};
  for (const item of items) {
    const postType = item['wp:post_type']?.[0];
    if (postType === 'attachment') {
      const postId = item['wp:post_id']?.[0];
      const attachmentUrl = item['wp:attachment_url']?.[0];
      const title = item.title?.[0] || '';
      if (postId && attachmentUrl) {
        attachments[postId] = { url: attachmentUrl, title };
      }
    }
  }

  console.log(`📎 Found ${Object.keys(attachments).length} attachments\n`);

  const posts = [];
  const categoriesMap = new Map();
  let publishedCount = 0;
  let draftCount = 0;

  for (const item of items) {
    const postType = item['wp:post_type']?.[0];
    const status = item['wp:status']?.[0];

    // Only process published posts
    if (postType !== 'post') continue;
    if (status !== 'publish') {
      draftCount++;
      continue;
    }

    publishedCount++;

    const title = item.title?.[0] || 'Sin título';
    let slug = item['wp:post_name']?.[0] || '';

    // Generate slug from title if empty
    if (!slug) {
      slug = title.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .substring(0, 60);
    }

    const htmlContent = item['content:encoded']?.[0] || '';
    const excerpt = item['excerpt:encoded']?.[0] || '';
    const pubDate = item.pubDate?.[0] || new Date().toISOString();
    const creator = item['dc:creator']?.[0] || 'Teseo Research';

    // Get WordPress categories
    const wpCategories = (item.category || []).filter(c =>
      c.$?.domain === 'category'
    );

    // Clean and convert content
    const cleanedHtml = cleanContent(htmlContent);
    let markdownContent = '';
    try {
      markdownContent = turndown.turndown(cleanedHtml);
    } catch (e) {
      markdownContent = cleanedHtml.replace(/<[^>]+>/g, '');
    }

    const cleanedExcerpt = cleanContent(excerpt) || markdownContent.substring(0, 160).replace(/\n/g, ' ') + '...';

    // Detect category
    const category = detectCategoryFromContent(title, markdownContent, wpCategories);

    // Update category counts
    const catCount = categoriesMap.get(category.slug) || {
      slug: category.slug,
      name: category.name,
      parent: category.parent,
      count: 0
    };
    catCount.count++;
    categoriesMap.set(category.slug, catCount);

    // Extract city data for SEO
    const cityData = extractCityData(category);

    // Create post object
    const post = {
      id: `post-${publishedCount}`,
      slug: slug,
      title: title,
      category: {
        slug: category.slug,
        name: category.name,
        parent: category.parent
      },
      seo: {
        metaTitle: `${title} | Teseo`,
        metaDescription: cleanedExcerpt.substring(0, 160),
        focusKeyword: title.split(' ').slice(0, 3).join(' ').toLowerCase()
      },
      excerpt: cleanedExcerpt.substring(0, 300),
      content: markdownContent,
      cityData: cityData,
      featuredImage: extractFeaturedImage(item, attachments),
      author: {
        name: creator === 'admin' ? 'Teseo Research' : creator,
        slug: (creator === 'admin' ? 'teseo-research' : creator).toLowerCase().replace(/\s+/g, '-'),
        bio: 'Equipo de análisis de Teseo Data Lab',
        avatar: '/authors/teseo.jpg'
      },
      publishedAt: pubDate,
      updatedAt: pubDate,
      status: 'published',
      featured: publishedCount <= 3, // Mark first 3 as featured
      readingTime: Math.ceil(markdownContent.split(' ').length / 200) // ~200 words per minute
    };

    posts.push(post);

    // Progress indicator
    if (publishedCount % 20 === 0) {
      console.log(`   Processed ${publishedCount} posts...`);
    }
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Convert categories map to array
  const categories = Array.from(categoriesMap.values())
    .sort((a, b) => b.count - a.count);

  console.log('\n📊 Summary:');
  console.log(`   ✅ Published posts: ${publishedCount}`);
  console.log(`   ⏸️  Drafts skipped: ${draftCount}`);
  console.log(`   📁 Categories found: ${categories.length}`);

  return { posts, categories };
}

// Save to JSON files
function saveToJSON(posts, categories) {
  const dataDir = join(__dirname, '..', 'src', 'data');

  // Save posts
  const postsPath = join(dataDir, 'blogPosts.json');
  writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`\n✅ Saved ${posts.length} posts to: ${postsPath}`);

  // Update categories with counts
  const existingCategoriesPath = join(dataDir, 'categories.json');
  let existingCategories = [];
  try {
    existingCategories = JSON.parse(readFileSync(existingCategoriesPath, 'utf-8'));
  } catch (e) {
    // File doesn't exist or is invalid
  }

  // Merge with existing categories
  const mergedCategories = [...existingCategories];
  for (const cat of categories) {
    const existing = mergedCategories.find(c => c.slug === cat.slug);
    if (existing) {
      existing.count = cat.count;
    } else {
      mergedCategories.push({
        ...cat,
        description: `Artículos sobre ${cat.name}`,
        color: 'teseo',
        icon: 'FileText'
      });
    }
  }

  writeFileSync(existingCategoriesPath, JSON.stringify(mergedCategories, null, 2), 'utf-8');
  console.log(`✅ Updated ${mergedCategories.length} categories in: ${existingCategoriesPath}`);

  // Show top categories
  console.log('\n📈 Top Categories:');
  categories.slice(0, 8).forEach((cat, i) => {
    console.log(`   ${i + 1}. ${cat.name}: ${cat.count} posts`);
  });
}

// Main execution
async function main() {
  console.log('🚀 Teseo Blog WordPress Parser (with XML Cleaning)');
  console.log('===================================================\n');

  const xmlPath = join(__dirname, '..', 'wordpress-export.xml');

  try {
    const { posts, categories } = await parseWordPressXML(xmlPath);
    saveToJSON(posts, categories);

    console.log('\n🎉 Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Review src/data/blogPosts.json');
    console.log('2. Start dev server: pnpm dev');
    console.log('3. Navigate to: http://localhost:5173/blog');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
