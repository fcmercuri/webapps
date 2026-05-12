// rewrite-intros.js
// Zero dependencies — uses Node.js built-in https only
// Run with: node rewrite-intros.js

const https = require('https');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SANITY_PROJECT_ID = 'ziow5svx';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = 'ska3t1LcMyAARfNWTuDXC5VaYLImLzr0CvzrCypeCZc4PAuITnSThtOaVPLtNA6DAyAOsqqNXkxBWeSqR1B3omLn7E7P1S9vGiwhvpYNWRdZW4I7iqeu8chJ2zYDJGVcT1gpNEt1WRYq45LDZJfh4lBwHdoWBvE9D20E580WNSLcrynziOeO';
const ANTHROPIC_API_KEY = 'YOUR_ANTHROPIC_API_KEY_HERE'; // <-- paste your Claude API key here

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

// ─── CLAUDE HELPER ────────────────────────────────────────────────────────────
async function rewriteIntro(title, currentIntro) {
  const result = await request(
    'POST',
    'api.anthropic.com',
    '/v1/messages',
    {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are an expert B2B SaaS content writer. 

Rewrite the opening 3 paragraphs of this blog post to make it unique, authoritative and different in structure from generic AI content.

Post title: "${title}"

Current intro:
${currentIntro}

Requirements:
- Start with a specific surprising stat or bold claim (not "In this guide" or "In today's landscape")
- Second paragraph should tell a brief real-world scenario or pain point story
- Third paragraph should clearly state what the reader will learn
- Use active voice, be direct and confident
- Do NOT use phrases like "In this article", "Let's dive in", "In today's competitive landscape"
- Return ONLY the rewritten HTML paragraphs, no explanation, no markdown

Return format: <p>...</p><p>...</p><p>...</p>`
        }
      ]
    },
    {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    }
  );

  return result?.content?.[0]?.text || null;
}

// ─── EXTRACT FIRST 3 PARAGRAPHS FROM HTML ────────────────────────────────────
function extractIntro(html) {
  if (!html) return null;
  const matches = html.match(/<p[\s\S]*?<\/p>/gi);
  if (!matches) return null;
  return matches.slice(0, 3).join('\n');
}

function replaceIntro(html, newIntro) {
  if (!html) return html;
  // Replace first 3 <p> blocks with new intro
  let count = 0;
  return html.replace(/<p[\s\S]*?<\/p>/gi, (match) => {
    if (count < 3) {
      count++;
      return count === 1 ? newIntro : ''; // insert new intro at first match, remove next 2
    }
    return match;
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function run() {
  if (ANTHROPIC_API_KEY === 'YOUR_ANTHROPIC_API_KEY_HERE') {
    console.error('❌ Please add your Anthropic API key at the top of the script');
    process.exit(1);
  }

  console.log('🔍 Fetching posts from Sanity...\n');

  let updated = 0;
  let failed = 0;

  for (const slug of SLUGS_TO_FIX) {
    console.log(`\n📄 Processing: ${slug}`);

    try {
      // Fetch post
      const result = await sanityQuery(
        `*[_type == "post" && slug.current == "${slug}"][0]{ _id, title, contentHtml }`
      );

      const post = result?.result;
      if (!post) { console.log(`  ⚠️  Not found in Sanity`); failed++; continue; }
      if (!post.contentHtml) { console.log(`  ⚠️  No contentHtml field`); failed++; continue; }

      console.log(`  ✅ Found: ${post.title}`);

      // Extract current intro
      const currentIntro = extractIntro(post.contentHtml);
      if (!currentIntro) { console.log(`  ⚠️  Could not extract intro paragraphs`); failed++; continue; }

      console.log(`  🤖 Rewriting intro with Claude...`);

      // Rewrite with Claude
      const newIntro = await rewriteIntro(post.title, currentIntro);
      if (!newIntro) { console.log(`  ❌ Claude returned no content`); failed++; continue; }

      console.log(`  ✏️  New intro generated`);

      // Replace intro in full HTML
      const newHtml = replaceIntro(post.contentHtml, newIntro);

      // Patch back to Sanity
      await sanityPatch(post._id, { contentHtml: newHtml });

      console.log(`  ✅ Patched to Sanity successfully`);
      updated++;

      // Delay between posts to avoid rate limits
      await sleep(2000);

    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Done! Updated: ${updated} · Failed: ${failed}`);
  console.log('\nNext steps:');
  console.log('1. Check your blog posts to verify the new intros look good');
  console.log('2. Go to Google Search Console → request indexing for each URL');
}

run();
