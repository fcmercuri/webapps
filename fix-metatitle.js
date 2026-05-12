// fix-metatitle.js
// Zero dependencies — uses Node.js built-in https only
// Run with: node fix-metatitle.js

const https = require('https');

const SANITY_PROJECT_ID = 'ziow5svx';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = 'ska3t1LcMyAARfNWTuDXC5VaYLImLzr0CvzrCypeCZc4PAuITnSThtOaVPLtNA6DAyAOsqqNXkxBWeSqR1B3omLn7E7P1S9vGiwhvpYNWRdZW4I7iqeu8chJ2zYDJGVcT1gpNEt1WRYq45LDZJfh4lBwHdoWBvE9D20E580WNSLcrynziOeO';

// Posts to fix with new unique meta titles and descriptions
const FIXES = [
  {
    slug: 'how-to-use-intent-data-to-prioritize-outbound-outreach',
    metaTitle: 'Intent Data for Outbound Outreach: Target Buyers Ready to Buy [2026]',
    metaDescription: 'Stop cold outreach guesswork. Learn how B2B teams use intent data signals to identify and prioritize prospects actively researching your solution right now.',
  },
  {
    slug: 'how-to-use-intent-data-prioritize-outbound-outreach',
    metaTitle: 'How to Prioritize Outbound with Intent Data: B2B Playbook',
    metaDescription: 'A step-by-step B2B playbook for using buyer intent signals to focus your outbound team on the accounts most likely to convert this quarter.',
  },
  {
    slug: 'ai-personas-to-content-engine',
    metaTitle: 'Turn AI Personas Into a Content Engine: Full B2B Framework',
    metaDescription: 'Learn how to transform AI-generated buyer personas into a repeatable content engine that drives organic traffic and pipeline for B2B SaaS companies.',
  },
  {
    slug: 'prompts-to-playbooks-gtm-recipes',
    metaTitle: 'From Prompts to GTM Playbooks: AI Recipes for B2B Sales Teams',
    metaDescription: 'Discover how to convert persona-driven AI prompts into repeatable GTM playbooks your sales and marketing teams can execute immediately.',
  },
  {
    slug: 'account-based-marketing-playbook-for-saas-companies',
    metaTitle: 'ABM Playbook for SaaS: Account-Based Marketing That Actually Converts',
    metaDescription: 'A complete account-based marketing playbook built for SaaS companies. Covers persona mapping, content strategy, and multi-channel execution.',
  },
  {
    slug: 'how-to-create-b2b-influencer-program-linkedin',
    metaTitle: 'Build a B2B LinkedIn Influencer Program That Generates Pipeline',
    metaDescription: 'Step-by-step guide to creating a B2B influencer program on LinkedIn. Learn how to identify, activate and measure influencers that drive real revenue.',
  },
  {
    slug: 'scaling-multi-persona-strategies-ai',
    metaTitle: 'Scaling Multi-Persona AI Strategies for B2B Marketing in 2026',
    metaDescription: 'How to scale AI-powered multi-persona marketing strategies across your entire funnel. Includes frameworks for content, outreach and conversion.',
  },
  {
    slug: 'linkedin-outbound-strategies-b2b-founders',
    metaTitle: 'LinkedIn Outbound Strategies for B2B Founders: 2026 Playbook',
    metaDescription: 'Proven LinkedIn outbound strategies for B2B founders. Learn how to build pipeline, grow authority and convert connections into customers.',
  },
  {
    slug: 'how-to-build-sales-assisted-plg-motion-with-ai',
    metaTitle: 'Sales-Assisted PLG with AI: Build a Hybrid Growth Motion',
    metaDescription: 'Learn how to build a sales-assisted product-led growth motion using AI personas. Combine PLG efficiency with sales intelligence to accelerate revenue.',
  },
];

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log('Fixing meta titles in Sanity...\n');
  let updated = 0, failed = 0;

  for (const fix of FIXES) {
    console.log(`📄 Processing: ${fix.slug}`);
    try {
      const result = await sanityQuery(`*[_type == "post" && slug.current == "${fix.slug}"][0]{ _id, title }`);
      const post = result?.result;
      if (!post) { console.log(`  ⚠️  Not found`); failed++; continue; }

      await sanityPatch(post._id, {
        metaTitle: fix.metaTitle,
        metaDescription: fix.metaDescription,
      });

      console.log(`  ✅ Updated: ${fix.metaTitle}`);
      updated++;
      await sleep(300);
    } catch (err) {
      console.error(`  ❌ ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Done! Updated: ${updated} · Failed: ${failed}`);
  console.log('\nNext: request indexing in Google Search Console for each URL');
}

run();
