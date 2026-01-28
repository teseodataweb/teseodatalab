/**
 * Repair and Parse WordPress XML for Teseo Blog
 * Fixes corrupted/truncated XML exports
 *
 * Usage: node scripts/repairAndParseXML.js
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

/**
 * Repair corrupted WordPress XML
 */
function repairXML(xmlContent) {
  console.log('🔧 Repairing XML structure...');

  let repaired = xmlContent;

  // Remove any DOCTYPE declarations (they break XML parsing)
  repaired = repaired.replace(/<!DOCTYPE[^>]*>/gi, '');

  // Remove WordPress error pages embedded in content
  repaired = repaired.replace(/<wp:meta_value>[\s\S]*?<html[\s\S]*?<\/html>[\s\S]*?<\/wp:meta_value>/gi,
    '<wp:meta_value><![CDATA[]]></wp:meta_value>');

  // Remove problematic meta values with HTML
  repaired = repaired.replace(/<wp:meta_value>(?!<!\[CDATA\[)[^<]*<html[^>]*>[\s\S]*?<\/wp:meta_value>/gi,
    '<wp:meta_value><![CDATA[]]></wp:meta_value>');

  // Find last valid </item> tag
  const lastItemMatch = repaired.match(/<\/item>[\s\S]*$/);
  if (lastItemMatch) {
    const lastItemIndex = repaired.lastIndexOf('</item>');
    if (lastItemIndex > 0) {
      // Check if there's garbage after the last </item>
      const afterLastItem = repaired.substring(lastItemIndex + 7).trim();
      if (afterLastItem && !afterLastItem.startsWith('</channel>')) {
        // Check if there's a partial item after
        const partialItem = afterLastItem.match(/<item>[\s\S]*$/);
        if (partialItem) {
          // There's an incomplete item, truncate at last complete </item>
          repaired = repaired.substring(0, lastItemIndex + 7);
          console.log('✂️  Truncated incomplete item at end');
        }
      }
    }
  }

  // Ensure proper closing tags
  if (!repaired.includes('</channel>')) {
    repaired += '\n</channel>';
    console.log('➕ Added missing </channel>');
  }
  if (!repaired.includes('</rss>')) {
    repaired += '\n</rss>';
    console.log('➕ Added missing </rss>');
  }

  // Remove any standalone HTML structural tags
  repaired = repaired.replace(/<\/?(?:html|head|body|style|script)[^>]*>/gi, '');

  // Clean up broken CDATA
  repaired = repaired.replace(/\]\]>[\s\S]*?\]\]>/g, ']]>');

  console.log('✅ XML repaired');
  return repaired;
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

// Detect category from content
function detectCategory(title, content, wpCategories) {
  const text = `${title} ${content}`.toLowerCase();

  // Check WordPress categories first
  if (wpCategories && wpCategories.length > 0) {
    const cat = wpCategories[0];
    const catName = typeof cat === 'string' ? cat : (cat._ || cat);
    const catSlug = (cat.$?.nicename || catName).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    return { slug: catSlug, name: catName, parent: 'general' };
  }

  // Industrial keywords
  const industrialKeywords = ['manufactura', 'industrial', 'logística', 'logistica', 'automotriz', 'nearshoring', 'parque industrial', 'nave industrial'];
  if (industrialKeywords.some(k => text.includes(k))) {
    return { slug: 'industrial', name: 'Industrial', parent: 'sectores' };
  }

  // Cities
  const cities = [
    { slug: 'queretaro', name: 'Querétaro', keywords: ['querétaro', 'queretaro', 'qro'] },
    { slug: 'guadalajara', name: 'Guadalajara', keywords: ['guadalajara', 'gdl', 'jalisco'] },
    { slug: 'monterrey', name: 'Monterrey', keywords: ['monterrey', 'mty', 'nuevo león'] },
    { slug: 'cdmx', name: 'Ciudad de México', keywords: ['cdmx', 'ciudad de méxico', 'df'] },
    { slug: 'puebla', name: 'Puebla', keywords: ['puebla'] },
    { slug: 'leon', name: 'León', keywords: ['león', 'leon', 'guanajuato'] },
    { slug: 'merida', name: 'Mérida', keywords: ['mérida', 'merida', 'yucatán'] },
    { slug: 'tijuana', name: 'Tijuana', keywords: ['tijuana', 'baja california'] },
    { slug: 'pachuca', name: 'Pachuca', keywords: ['pachuca', 'hidalgo'] },
    { slug: 'aguascalientes', name: 'Aguascalientes', keywords: ['aguascalientes'] },
    { slug: 'slp', name: 'San Luis Potosí', keywords: ['san luis potosí', 'san luis potosi', 'slp'] }
  ];

  for (const city of cities) {
    if (city.keywords.some(k => text.includes(k))) {
      return { slug: city.slug, name: city.name, parent: 'inmobiliario' };
    }
  }

  // Data/IA keywords
  const dataKeywords = ['inteligencia artificial', 'machine learning', 'data', 'análisis', 'dashboard'];
  if (dataKeywords.some(k => text.includes(k))) {
    return { slug: 'data-analytics', name: 'Data Analytics', parent: 'general' };
  }

  return { slug: 'tendencias', name: 'Tendencias', parent: 'general' };
}

// Get city data
function getCityData(category) {
  if (category.parent !== 'inmobiliario') return null;

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

// Main parser
async function parseWordPressXML(xmlPath) {
  console.log(`\n📖 Reading: ${xmlPath}\n`);

  if (!existsSync(xmlPath)) {
    console.error(`❌ File not found: ${xmlPath}`);
    process.exit(1);
  }

  let xmlContent = readFileSync(xmlPath, 'utf-8');
  console.log(`📏 Original size: ${xmlContent.length} characters`);

  // Repair XML
  xmlContent = repairXML(xmlContent);

  // Save repaired XML
  const repairedPath = xmlPath.replace('.xml', '-repaired.xml');
  writeFileSync(repairedPath, xmlContent, 'utf-8');
  console.log(`💾 Saved repaired XML: ${repairedPath}\n`);

  console.log('🔄 Parsing XML...');

  let result;
  try {
    result = await parseStringPromise(xmlContent, {
      explicitArray: true,
      trim: true,
      strict: false
    });
  } catch (error) {
    console.error('❌ Parse error:', error.message);

    // Try even more aggressive repair
    console.log('🔧 Attempting aggressive repair...');
    xmlContent = xmlContent
      .replace(/<!\[CDATA\[[\s\S]*?error[\s\S]*?\]\]>/gi, '<![CDATA[]]>')
      .replace(/<wp:meta_value>[^<]*error[^<]*<\/wp:meta_value>/gi, '<wp:meta_value><![CDATA[]]></wp:meta_value>');

    writeFileSync(repairedPath, xmlContent, 'utf-8');

    result = await parseStringPromise(xmlContent, {
      explicitArray: true,
      trim: true,
      strict: false
    });
  }

  const channel = result?.rss?.channel?.[0];
  if (!channel) {
    console.error('❌ Invalid XML structure: no channel found');
    process.exit(1);
  }

  const items = channel.item || [];
  console.log(`📦 Found ${items.length} items\n`);

  // Collect attachments
  const attachments = {};
  for (const item of items) {
    if (item['wp:post_type']?.[0] === 'attachment') {
      const id = item['wp:post_id']?.[0];
      const url = item['wp:attachment_url']?.[0];
      if (id && url) {
        attachments[id] = { url, title: item.title?.[0] || '' };
      }
    }
  }
  console.log(`📎 Found ${Object.keys(attachments).length} attachments`);

  // Process posts
  const posts = [];
  const categoriesMap = new Map();
  let count = 0;

  for (const item of items) {
    const postType = item['wp:post_type']?.[0];
    const status = item['wp:status']?.[0];

    if (postType !== 'post' || status !== 'publish') continue;

    count++;

    const title = item.title?.[0] || 'Sin título';
    let slug = item['wp:post_name']?.[0] || '';

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

    // Get WP categories
    const wpCategories = (item.category || []).filter(c => c.$?.domain === 'category');

    // Clean and convert content
    const cleanedHtml = cleanContent(htmlContent);
    let markdown = '';
    try {
      markdown = turndown.turndown(cleanedHtml);
    } catch (e) {
      markdown = cleanedHtml.replace(/<[^>]+>/g, '');
    }

    const cleanExcerpt = (cleanContent(excerpt) || markdown.substring(0, 160).replace(/\n/g, ' ') + '...').substring(0, 300);

    // Detect category
    const category = detectCategory(title, markdown, wpCategories);

    // Update category count
    const catEntry = categoriesMap.get(category.slug) || { ...category, count: 0 };
    catEntry.count++;
    categoriesMap.set(category.slug, catEntry);

    // Get featured image
    let featuredImage = { url: '/placeholder-blog.jpg', alt: '', width: 1200, height: 630 };
    const postMeta = item['wp:postmeta'] || [];
    for (const meta of postMeta) {
      if (meta['wp:meta_key']?.[0] === '_thumbnail_id') {
        const thumbId = meta['wp:meta_value']?.[0];
        if (thumbId && attachments[thumbId]) {
          featuredImage = {
            url: attachments[thumbId].url,
            alt: attachments[thumbId].title,
            width: 1200,
            height: 630
          };
        }
        break;
      }
    }

    // Create post
    const post = {
      id: `post-${count}`,
      slug,
      title,
      category: { slug: category.slug, name: category.name, parent: category.parent },
      seo: {
        metaTitle: `${title} | Teseo`,
        metaDescription: cleanExcerpt.substring(0, 160),
        focusKeyword: title.split(' ').slice(0, 3).join(' ').toLowerCase()
      },
      excerpt: cleanExcerpt,
      content: markdown,
      cityData: getCityData(category),
      featuredImage,
      author: {
        name: creator.includes('admin') ? 'Teseo Data Lab' : creator,
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

    if (count % 10 === 0) {
      console.log(`   Processed ${count} posts...`);
    }
  }

  // Sort by date
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Categories array
  const categories = Array.from(categoriesMap.values()).sort((a, b) => b.count - a.count);

  console.log('\n📊 Summary:');
  console.log(`   ✅ Posts: ${posts.length}`);
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

  console.log('\n📈 Top Categories:');
  categories.slice(0, 6).forEach((cat, i) => {
    console.log(`   ${i + 1}. ${cat.name}: ${cat.count} posts`);
  });
}

// Main
async function main() {
  console.log('🚀 Teseo Blog - WordPress XML Repair & Parse');
  console.log('=============================================\n');

  const xmlPath = join(__dirname, '..', 'wordpress-export.xml');

  try {
    const { posts, categories } = await parseWordPressXML(xmlPath);
    saveToJSON(posts, categories);

    console.log('\n🎉 Migration complete!');
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
