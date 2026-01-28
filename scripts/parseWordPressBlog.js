/**
 * WordPress XML to JSON Parser for Teseo Blog
 *
 * Usage:
 * 1. Export your WordPress blog: Tools → Export → Posts
 * 2. Save the XML file as: teseowebsite/wordpress-export.xml
 * 3. Run: node scripts/parseWordPressBlog.js
 *
 * Output:
 * - src/data/blogPosts.json (all posts)
 * - src/data/categories.json (categories with counts)
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
function extractFeaturedImage(item) {
  // Check for wp:post_meta with _thumbnail_id
  const postMeta = item['wp:postmeta'] || [];
  let thumbnailId = null;

  for (const meta of postMeta) {
    const key = meta['wp:meta_key']?.[0];
    const value = meta['wp:meta_value']?.[0];
    if (key === '_thumbnail_id') {
      thumbnailId = value;
      break;
    }
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
    const catName = cat._ || cat;
    const catSlug = cat.$?.nicename || catName.toLowerCase().replace(/\s+/g, '-');
    return {
      slug: catSlug,
      name: catName,
      parent: 'general'
    };
  }

  // Industrial sector detection
  const industrialKeywords = ['manufactura', 'industrial', 'logística', 'automotriz', 'nearshoring', 'parque industrial'];
  if (industrialKeywords.some(k => text.includes(k))) {
    return { slug: 'industrial', name: 'Industrial', parent: 'sectores' };
  }

  // City detection for real estate
  const cities = [
    { slug: 'queretaro', name: 'Querétaro', keywords: ['querétaro', 'queretaro', 'qro'] },
    { slug: 'guadalajara', name: 'Guadalajara', keywords: ['guadalajara', 'gdl', 'jalisco'] },
    { slug: 'monterrey', name: 'Monterrey', keywords: ['monterrey', 'mty', 'nuevo león'] },
    { slug: 'cdmx', name: 'Ciudad de México', keywords: ['cdmx', 'ciudad de méxico', 'df'] },
    { slug: 'puebla', name: 'Puebla', keywords: ['puebla'] },
    { slug: 'leon', name: 'León', keywords: ['león', 'leon', 'guanajuato'] },
    { slug: 'merida', name: 'Mérida', keywords: ['mérida', 'merida', 'yucatán'] },
    { slug: 'tijuana', name: 'Tijuana', keywords: ['tijuana', 'baja california'] },
    { slug: 'aguascalientes', name: 'Aguascalientes', keywords: ['aguascalientes'] },
    { slug: 'slp', name: 'San Luis Potosí', keywords: ['san luis potosí', 'san luis potosi', 'slp'] }
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
function extractCityData(category, content) {
  if (category.parent !== 'inmobiliario') {
    return null;
  }

  return {
    ciudad: category.name,
    estado: category.name, // Would need mapping for accurate state
    region: 'Centro' // Would need mapping
  };
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
    console.log('5. Run this script again: node scripts/parseWordPressBlog.js\n');
    process.exit(1);
  }

  const xmlContent = readFileSync(xmlPath, 'utf-8');

  console.log('🔄 Parsing XML...');
  const result = await parseStringPromise(xmlContent, {
    explicitArray: true,
    trim: true
  });

  const channel = result.rss.channel[0];
  const items = channel.item || [];

  console.log(`📦 Found ${items.length} items in XML\n`);

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
    const slug = item['wp:post_name']?.[0] || title.toLowerCase().replace(/\s+/g, '-');
    const htmlContent = item['content:encoded']?.[0] || '';
    const excerpt = item['excerpt:encoded']?.[0] || '';
    const pubDate = item.pubDate?.[0] || new Date().toISOString();
    const creator = item['dc:creator']?.[0] || 'admin';

    // Get WordPress categories
    const wpCategories = (item.category || []).filter(c =>
      c.$?.domain === 'category'
    );

    // Clean and convert content
    const cleanedHtml = cleanContent(htmlContent);
    const markdownContent = turndown.turndown(cleanedHtml);
    const cleanedExcerpt = cleanContent(excerpt) || markdownContent.substring(0, 160) + '...';

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
    const cityData = extractCityData(category, markdownContent);

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
      featuredImage: extractFeaturedImage(item),
      author: {
        name: creator,
        slug: creator.toLowerCase().replace(/\s+/g, '-'),
        bio: 'Analista en Teseo',
        avatar: '/authors/default.jpg'
      },
      publishedAt: pubDate,
      updatedAt: pubDate,
      status: 'published',
      featured: publishedCount <= 3, // Mark first 3 as featured
      readingTime: Math.ceil(markdownContent.split(' ').length / 200) // ~200 words per minute
    };

    posts.push(post);

    // Progress indicator
    if (publishedCount % 50 === 0) {
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

  // Save categories
  const categoriesPath = join(dataDir, 'categories.json');
  writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf-8');
  console.log(`✅ Saved ${categories.length} categories to: ${categoriesPath}`);

  // Show top categories
  console.log('\n📈 Top Categories:');
  categories.slice(0, 5).forEach((cat, i) => {
    console.log(`   ${i + 1}. ${cat.name}: ${cat.count} posts`);
  });
}

// Main execution
async function main() {
  console.log('🚀 Teseo Blog WordPress Parser');
  console.log('================================\n');

  const xmlPath = join(__dirname, '..', 'wordpress-export.xml');

  try {
    const { posts, categories } = await parseWordPressXML(xmlPath);
    saveToJSON(posts, categories);

    console.log('\n🎉 Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Review src/data/blogPosts.json');
    console.log('2. Update src/data/cityData.json with market data');
    console.log('3. Test the blog at /blog');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
