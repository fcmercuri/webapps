const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'ziow5svx';
const DATASET = 'production';
const SITE = 'https://sainthetic.com';
const BUILD = path.join(__dirname, '..', 'build');

const clean = (v) => (typeof v === 'string' && v.startsWith('=') ? v.slice(1) : v ?? '');
const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function blocksToHtml(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((b) => {
      if (b._type !== 'block') return '';
      const tag = ['h2', 'h3', 'h4', 'blockquote'].includes(b.style) ? b.style : 'p';
      const text = (b.children || [])
        .map((c) => {
          let t = c.text || '';
          if (c.marks?.includes('strong')) t = `<strong>${t}</strong>`;
          if (c.marks?.includes('em')) t = `<em>${t}</em>`;
          return t;
        })
        .join('');
      return `<${tag}>${text}</${tag}>`;
    })
    .join('\n');
}

function headTags({ title, description, url, type, image }) {
  const t = esc(title);
  const d = esc(description);
  const h = 'data-react-helmet="true"'; // lets react-helmet replace these tags after load
  return [
    `<title ${h}>${t}</title>`,
    `<meta ${h} name="description" content="${d}"/>`,
    `<link ${h} rel="canonical" href="${url}"/>`,
    `<meta ${h} property="og:title" content="${t}"/>`,
    `<meta ${h} property="og:description" content="${d}"/>`,
    `<meta ${h} property="og:type" content="${type}"/>`,
    `<meta ${h} property="og:url" content="${url}"/>`,
    image ? `<meta ${h} property="og:image" content="${image}"/>` : '',
    `<meta ${h} name="twitter:card" content="summary_large_image"/>`,
    `<meta ${h} name="twitter:title" content="${t}"/>`,
    `<meta ${h} name="twitter:description" content="${d}"/>`,
  ].join('');
}

function buildPage(template, head, bodyHtml) {
  const stripped = template
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<link[^>]*rel="canonical"[^>]*>/g, '')
    .replace(/<meta\s+(?:name|property)="(?:description|og:[^"]*|twitter:[^"]*)"[^>]*>/g, '');
  return stripped
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

function writePage(relPath, html) {
  const file = path.join(BUILD, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

async function main() {
  const query = encodeURIComponent(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
      title, "slug": slug.current, excerpt, content, contentHtml,
      publishedAt, author, metaTitle, metaDescription
    }`
  );
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${query}`
  );
  const posts = (await res.json()).result || [];
  const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

  // Individual posts
  for (const p of posts) {
    const url = `${SITE}/blog/${p.slug}`;
    const title = p.metaTitle || p.title;
    const description = p.metaDescription || p.excerpt || 'AI-powered buyer personas and marketing strategies for SaaS growth.';
    const bodyHtml = p.contentHtml ? clean(p.contentHtml) : blocksToHtml(p.content);
    const date = clean(p.publishedAt);

    const more = posts
      .filter((o) => o.slug !== p.slug)
      .slice(0, 6)
      .map((o) => `<li><a href="/blog/${o.slug}">${esc(o.title)}</a></li>`)
      .join('');

    const body =
      `<nav><a href="/">sAInthetic</a> · <a href="/blog">Blog</a></nav>` +
      `<article><h1>${esc(p.title)}</h1>${date ? `<p>${esc(date)}</p>` : ''}${bodyHtml}</article>` +
      `<aside><h2>More articles</h2><ul>${more}</ul></aside>`;

    const ld = `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description,
      datePublished: date || undefined,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: clean(p.author) || 'sAInthetic' },
    })}</script>`;

    writePage(
      `blog/${p.slug}/index.html`,
      buildPage(template, headTags({ title, description, url, type: 'article' }) + ld, body)
    );
  }

  // Blog list page (links to every post so Google can find them)
  const list = posts
    .map((p) => `<article><h2><a href="/blog/${p.slug}">${esc(p.title)}</a></h2><p>${esc(p.excerpt)}</p></article>`)
    .join('');
  writePage(
    'blog/index.html',
    buildPage(
      template,
      headTags({
        title: 'sAInthetic Blog | AI Personas & Marketing Strategies for SaaS Growth',
        description:
          'Master buyer personas and AI content strategies. Learn how expert marketers use personas to 2X ROI, personalize at scale, and align sales teams.',
        url: `${SITE}/blog`,
        type: 'website',
        image: `${SITE}/blog-hero.jpg`,
      }),
      `<nav><a href="/">sAInthetic</a></nav><h1>sAInthetic Blog</h1>${list}`
    )
  );

  // Sitemap
  const urls = [`${SITE}/`, `${SITE}/blog`, ...posts.map((p) => `${SITE}/blog/${p.slug}`)];
  fs.writeFileSync(
    path.join(BUILD, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
      `\n</urlset>\n`
  );

  console.log(`Prerendered ${posts.length} posts + /blog + sitemap.xml`);
}

main().catch((e) => {
  console.warn('Prerender failed (site still deployed without it):', e.message);
});
