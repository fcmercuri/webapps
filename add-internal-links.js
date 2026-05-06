// add-internal-links.js
// Zero dependencies — uses Node.js built-in https only
// Run with: node add-internal-links.js

const https = require('https');

const PROJECT_ID = 'ziow5svx';
const DATASET = 'production';
const TOKEN = '';

function request(method, hostname, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      { method, hostname, path, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}`, ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}) } },
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
  return request('GET', `${PROJECT_ID}.api.sanity.io`, `/v2021-06-07/data/query/${DATASET}?query=${encodeURIComponent(query)}`);
}

function sanityPatch(docId, patchBody) {
  return request('POST', `${PROJECT_ID}.api.sanity.io`, `/v2021-06-07/data/mutate/${DATASET}`, { mutations: [{ patch: { id: docId, ...patchBody } }] });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TOPIC_GROUPS = {
  personas: ['ai-persona-content-stack','ai-persona-playbook-linkedin','ai-persona-system-framework','ai-personas-account-based-marketing','ai-personas-across-funnel','ai-personas-case-studies-revenue','ai-personas-crm-integration','ai-personas-customer-expansion','ai-personas-demand-generation','ai-personas-founder-led-linkedin','ai-personas-linkedin-engagement-to-pipeline','ai-personas-product-marketing-launches','ai-personas-revenue-metrics','ai-personas-sales-enablement','ai-personas-to-content-engine','ai-personas-trends-2026','how-ai-personas-supercharge-content-creation','how-to-align-sales-and-marketing-around-buyer-personas','how-to-build-buyer-personas-from-crm-data','how-to-use-ai-personas-to-improve-cold-email-reply-rates','reduce-b2b-sales-cycle-length-ai-personas','scaling-multi-persona-strategies-ai','why-buyer-personas-fail','persona-driven-paid-media-strategy-for-b2b-saas'],
  abm: ['abm-campaign-strategy-mid-market-b2b','account-based-marketing-playbook-for-saas-companies','ai-personas-account-based-marketing','building-a-dark-funnel-strategy-for-b2b-saas','how-to-use-intent-data-prioritize-outbound-outreach','how-to-use-intent-data-to-prioritize-outbound-outreach','how-to-build-signal-based-outbound-system'],
  content: ['b2b-content-engine-drives-pipeline','how-to-use-ai-for-b2b-content-personalization-at-scale','how-to-use-ai-to-generate-case-studies-at-scale','prompt-libraries-that-drive-revenue','prompt-systems-for-power-users','prompts-to-playbooks-gtm-recipes','ai-automate-competitive-battlecards'],
  linkedin: ['ai-persona-playbook-linkedin','ai-personas-founder-led-linkedin','ai-personas-linkedin-engagement-to-pipeline','linkedin-outbound-strategies-b2b-founders','how-to-create-b2b-influencer-program-linkedin'],
  growth: ['how-to-build-a-sales-assisted-plg-motion-with-ai','how-to-build-sales-assisted-plg-motion-with-ai','how-to-build-community-led-growth-strategy-saas','partner-led-growth-building-a-b2b-referral-engine','product-led-growth-vs-sales-led-growth-choosing-the-right-gtm','demand-generation-strategies-early-stage-b2b-saas','customer-expansion-playbook-b2b-saas'],
  revenue: ['ai-personas-revenue-metrics','building-a-revenue-operations-framework-with-ai','churn-prediction-models-b2b-saas-ai','predictive-analytics-b2b-revenue-forecasting','how-to-measure-marketing-roi-in-b2b-saas','how-to-use-ai-to-optimize-your-b2b-pricing-strategy'],
  marketing: ['b2b-email-marketing-automation-that-actually-converts','b2b-marketing-plan-guide','b2b-marketing-plan-guide-template-steps-strategies-2026','b2b-social-proof-strategy-beyond-basic-testimonial','how-to-run-a-high-converting-b2b-webinar','how-to-use-micro-surveys-to-improve-b2b-conversion-rates','gtm-strategy-launching-new-b2b-product','ai-tools-for-b2b-market-segmentation-in-2026','ai-tools-for-competitive-intelligence-in-b2b-markets'],
};

const ALL_SLUGS = [...new Set(Object.values(TOPIC_GROUPS).flat())];

function slugToTitle(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    .replace(/\bAi\b/g,'AI').replace(/\bB2b\b/g,'B2B').replace(/\bSaas\b/g,'SaaS')
    .replace(/\bCrm\b/g,'CRM').replace(/\bGtm\b/g,'GTM').replace(/\bAbm\b/g,'ABM')
    .replace(/\bPlg\b/g,'PLG').replace(/\bLlm\b/g,'LLM').replace(/\bLlms\b/g,'LLMs');
}

function getRelatedSlugs(currentSlug) {
  const related = new Set();
  const myGroups = Object.entries(TOPIC_GROUPS).filter(([,s]) => s.includes(currentSlug)).map(([g]) => g);
  for (const group of myGroups) {
    for (const slug of TOPIC_GROUPS[group]) {
      if (slug !== currentSlug) related.add(slug);
      if (related.size >= 6) break;
    }
  }
  if (related.size < 3) {
    for (const slug of ALL_SLUGS) {
      if (slug !== currentSlug) related.add(slug);
      if (related.size >= 6) break;
    }
  }
  return [...related].slice(0, 3);
}

function buildRelatedHtml(slugs) {
  const li = slugs.map(s => `<li><a href="https://sainthetic.com/blog/${s}">${slugToTitle(s)}</a></li>`).join('\n');
  return `\n\n<hr/>\n<h3>Related Articles</h3>\n<ul>\n${li}\n</ul>`;
}

function buildRelatedPT(slugs) {
  const k = (s) => s.replace(/-/g,'_').slice(0,25);
  return [
    { _type:'block', _key:'related_heading', style:'h3', markDefs:[], children:[{_type:'span',_key:'rh_s',text:'Related Articles',marks:[]}] },
    ...slugs.map(s => ({
      _type:'block', _key:`rel_${k(s)}`, style:'normal',
      markDefs:[{_type:'link',_key:`lnk_${k(s)}`,href:`https://sainthetic.com/blog/${s}`}],
      children:[{_type:'span',_key:`spn_${k(s)}`,text:`→ ${slugToTitle(s)}`,marks:[`lnk_${k(s)}`]}],
    })),
  ];
}

async function run() {
  console.log('Fetching all posts from Sanity...\n');
  const result = await sanityQuery(`*[_type == "post"]{ _id, title, slug, contentHtml, content }`);
  const posts = result.result;
  if (!posts || !posts.length) { console.error('No posts returned. Check token/project ID.'); return; }
  console.log(`Found ${posts.length} posts\n`);

  let updated = 0, skipped = 0;

  for (const post of posts) {
    const slug = post.slug?.current;
    if (!slug) { console.log(`No slug for ${post._id}`); skipped++; continue; }

    const hasLinks =
      (typeof post.contentHtml === 'string' && post.contentHtml.includes('Related Articles')) ||
      (Array.isArray(post.content) && JSON.stringify(post.content).includes('Related Articles'));

    if (hasLinks) { console.log(`Skipping (already done): ${slug}`); skipped++; continue; }

    const related = getRelatedSlugs(slug);

    try {
      if (typeof post.contentHtml === 'string' && post.contentHtml.length > 0) {
        await sanityPatch(post._id, { set: { contentHtml: post.contentHtml + buildRelatedHtml(related) } });
        console.log(`✅ HTML: ${slug}`);
      } else if (Array.isArray(post.content) && post.content.length > 0) {
        await sanityPatch(post._id, { set: { content: [...post.content, ...buildRelatedPT(related)] } });
        console.log(`✅ PT:   ${slug}`);
      } else {
        console.log(`⚠️  No content: ${slug}`); skipped++; continue;
      }
      updated++;
      await sleep(400);
    } catch (err) {
      console.error(`❌ ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDone! Updated: ${updated} · Skipped: ${skipped}`);
}

run();
