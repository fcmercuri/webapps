// rewrite-intros.js
const https = require('https');

const SANITY_PROJECT_ID = 'ziow5svx';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = 'ska3t1LcMyAARfNWTuDXC5VaYLImLzr0CvzrCypeCZc4PAuITnSThtOaVPLtNA6DAyAOsqqNXkxBWeSqR1B3omLn7E7P1S9vGiwhvpYNWRdZW4I7iqeu8chJ2zYDJGVcT1gpNEt1WRYq45LDZJfh4lBwHdoWBvE9D20E580WNSLcrynziOeO';
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY; // loaded from GitHub secret

const SLUGS_TO_FIX = [
  'ai-personas-to-content-engine',
  'prompts-to-playbooks-gtm-recipes',
  'account-based-marketing-playbook-for-saas-companies',
  'how-to-create-b2b-influencer-program-linkedin',
  'scaling-multi-persona-strategies-ai',
  'linkedin-outbound-strategies-b2b-founders',
  'how-to-build-sales-assisted-plg-motion-with-ai',
];

function request(method, hostname, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      { method, hostname, path, headers: { 'Content-Type': 'application/json', ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}), ...headers } },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { resolve(data); } });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function sanityQuery(query) {
  return request('GET', `${SANITY_PROJECT_ID}.api.sanity.io`, `/v2021-06-07/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`, null, { Authorization: `Bearer ${SANITY_TOKEN}` });
}

function sanityPatch(docId, set) {
  return request('POST', `${SANITY_PROJECT_ID}.api.sanity.io`, `/v2021-06-07/data/mutate/${SANITY_DATASET}`, { mutations: [{ patch: { id: docId, set } }] }, { Authorization: `Bearer ${SANITY_TOKEN}` });
}

async function rewriteIntro(title, currentIntro) {
  const result = await request(
    'POST', 'api.perplexity.ai', '/chat/completions',
    {
      model: 'sonar',
      messages: [
        { role: 'system', content: 'You are an expert B2B SaaS content writer. Return clean HTML only, no markdown, no explanation.' },
        { role: 'user', content: `Rewrite the opening 3 paragraphs of this blog post to make it completely unique.

Post title: "${title}"

Current intro:
${currentIntro}

Requirements:
- Start with a specific surprising stat or bold claim
- Never use "In this guide", "In today's landscape", "In this article"
- Second paragraph: real-world pain point scenario
- Third paragraph: what the reader will learn
- Active voice, confident tone
- Return ONLY 3 HTML paragraphs: <p>...</p><p>...</p><p>...</p>` }
      ]
    },
    { Authorization: `Bearer ${PERPLEXITY_API_KEY}` }
  );
  return result?.choices?.[0]?.message?.content || null;
}

function extractIntro(html) {
  if (!html) return null;
  const matches = html.match(/<p[\s\S]*?<\/p>/gi);
  if (!matches) return null;
  return matches.slice(0, 3).join('\n');
}

function replaceIntro(html, newIntro) {
  let count = 0;
  return html.replace(/<p[\s\S]*?<\/p>/gi, (match) => {
    if (count < 3) { count++; return count === 1 ? newIntro : ''; }
    return match;
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  if (!PERPLEXITY_API_KEY) {
    console.error('âŒ PERPLEXITY_API_KEY secret not set in GitHub');
    process.exit(1);
  }

  console.log('Fetching posts from Sanity...\n');
  let updated = 0, failed = 0;

  for (const slug of SLUGS_TO_FIX) {
    console.log(`\nðŸ“„ Processing: ${slug}`);
    try {
      const result = await sanityQuery(`*[_type == "post" && slug.current == "${slug}"][0]{ _id, title, contentHtml }`);
      const post = result?.result;
      if (!post) { console.log(`  âš ï¸  Not found`); failed++; continue; }
      if (!post.contentHtml) { console.log(`  âš ï¸  No contentHtml`); failed++; continue; }
      console.log(`  âœ… Found: ${post.title}`);

      const currentIntro = extractIntro(post.contentHtml);
      if (!currentIntro) { console.log(`  âš ï¸  No intro found`); failed++; continue; }

      console.log(`  ðŸ¤– Rewriting with Perplexity...`);
      const newIntro = await rewriteIntro(post.title, currentIntro);
      if (!newIntro) { console.log(`  âŒ No response`); failed++; continue; }

      const newHtml = replaceIntro(post.contentHtml, newIntro);
      await sanityPatch(post._id, { contentHtml: newHtml });
      console.log(`  âœ… Patched to Sanity`);
      updated++;
      await sleep(2000);
    } catch (err) {
      console.error(`  âŒ ${err.message}`);
      failed++;
    }
  }

  console.log(`\nðŸŽ‰ Done! Updated: ${updated} Â· Failed: ${failed}`);
}

run();
