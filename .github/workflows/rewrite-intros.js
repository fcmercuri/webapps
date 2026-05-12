// rewrite-intros.js
// Zero dependencies — uses Node.js built-in https only
// Run with: node rewrite-intros.js

const https = require('https');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SANITY_PROJECT_ID = 'ziow5svx';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = 'ska3t1LcMyAARfNWTuDXC5VaYLImLzr0CvzrCypeCZc4PAuITnSThtOaVPLtNA6DAyAOsqqNXkxBWeSqR1B3omLn7E7P1S9vGiwhvpYNWRdZW4I7iqeu8chJ2zYDJGVcT1gpNEt1WRYq45LDZJfh4lBwHdoWBvE9D20E580WNSLcrynziOeO';
const PERPLEXITY_API_KEY = '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'; // <-- paste your Perplexity API key here

// Slugs to fix
const SLUGS_TO_FIX = [
  'ai-personas-to-content-engine',
  'prompts-to-playbooks-gtm-recipes',
  'account-based-marketing-playbook-for-saas-companies',
  'how-to-create-b2b-influencer-program-linkedin',
  'scaling-multi-persona-strategies-ai',
  'linkedin-outbound-strategies-b2b-founders',
  'how-to-build-sales-assisted-plg-motion-with-ai',
];

// ─── HTTP HELPER ─────────────────────────────────────────────────────────────
function request(method, hostname, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        method, hostname, path,
        headers: {
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { resolve(data); }
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// ─── SANITY HELPERS ───────────────────────────────────────────────────────────
function sanityQuery(query) {
  return request(
    'GET',
    `${SANITY_PROJECT_ID}.api.sanity.io`,
    `/v2021-06-07/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`,
    null,
    { Authorization: `Bearer ${SANITY_TOKEN}` }
  );
}

function sanityPatch(docId, set) {
  return request(
    'POST',
    `${SANITY_PROJECT_ID}.api.sanity.io`,
    `/v2021-06-07/data/mutate/${SANITY_DATASET}`,
    { mutations: [{ patch: { id: docId, set } }] },
    { Authorization: `Bearer ${SANITY_TOKEN}` }
  );
}

// ─── PERPLEXITY HELPER ────────────────────────────────────────────────────────
async function rewriteIntro(title, currentIntro) {
  const result = await request(
    'POST',
    'api.perplexity.ai',
    '/chat/completions',
    {
      model: 'sonar',
      messages: [
        {
          role: 'system',
          content: 'You are an expert B2B SaaS content writer. You write unique, authoritative blog content that ranks on Google. You never use generic AI phrases. You always return clean HTML only.'
        },
        {
          role: 'user',
          content: `Rewrite the opening 3 paragraphs of this blog post to make it completely unique and different in structure from generic AI content.

Post title: "${title}"

Current intro:
${currentIntro}

Requirements:
- Start with a specific surprising stat or bold claim relevant to the topic
- Never start with "In this guide", "In today's landscape", "In this article"
- Second paragraph: brief real-world pain point scenario
- Third paragraph: clearly state what the reader will learn
- Active voice, direct and confident tone
- Return ONLY the 3 HTML paragraphs, nothing else

Format: <p>...</p><p>...</p><p>...</p>`
        }
      ]
    },
    { Authorization: `Bearer ${PERPLEXITY_API_KEY}` }
  );

  return result?.choices?.[0]?.message?.content || null;
}

// ─── EXTRACT / REPLACE INTRO ──────────────────────────────────────────────────
function extractIntro(html) {
  if (!html) return null;
  const matches = html.match(/<p[\s\S]*?<\/p>/gi);
  if (!matches) return null;
  return matches.slice(0, 3).join('\n');
}

function replaceIntro(html, newIntro) {
  if (!html) return html;
  let count = 0;
  return html.replace(/<p[\s\S]*?<\/p>/gi, (match) => {
    if (count < 3) {
      count++;
      return count === 1 ? newIntro : '';
    }
    return match;
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function run() {
  if (PERPLEXITY_API_KEY === 'YOUR_PERPLEXITY_API_KEY_HERE') {
    console.error('❌ Please add your Perplexity API key at the top of the script');
    process.exit(1);
  }

  console.log('🔍 Fetching posts from Sanity...\n');

  let updated = 0;
  let failed = 0;

  for (const slug of SLUGS_TO_FIX) {
    console.log(`\n📄 Processing: ${slug}`);

    try {
      const result = await sanityQuery(
        `*[_type == "post" && slug.current == "${slug}"][0]{ _id, title, contentHtml }`
      );

      const post = result?.result;
      if (!post) { console.log(`  ⚠️  Not found in Sanity`); failed++; continue; }
      if (!post.contentHtml) { console.log(`  ⚠️  No contentHtml field`); failed++; continue; }

      console.log(`  ✅ Found: ${post.title}`);

      const currentIntro = extractIntro(post.contentHtml);
      if (!currentIntro) { console.log(`  ⚠️  Could not extract intro`); failed++; continue; }

      console.log(`  🤖 Rewriting with Perplexity...`);

      const newIntro = await rewriteIntro(post.title, currentIntro);
      if (!newIntro) { console.log(`  ❌ Perplexity returned nothing`); failed++; continue; }

      console.log(`  ✏️  New intro generated`);

      const newHtml = replaceIntro(post.contentHtml, newIntro);

      await sanityPatch(post._id, { contentHtml: newHtml });

      console.log(`  ✅ Patched to Sanity`);
      updated++;

      await sleep(2000);

    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Done! Updated: ${updated} · Failed: ${failed}`);
  console.log('\nNext: go to Google Search Console and request indexing for each URL');
}

run();
