import fs from 'fs';
import path from 'path';

function updateIntentClassifier() {
    const filePath = 'C:\\Users\\akiwa\\Documentos\\Chatboty\\n8n workflows\\02_intent_classifier.json';
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const newCode = `const input = $input.first().json;
const text = input.normalized_text || input.raw_text || '';

const OPENAI_KEY = $env.OPENAI_API_KEY || '';
if (!OPENAI_KEY) {
  return [{ json: { ...input, intent: 'fallback', error: 'missing_openai_key' } }];
}

const systemPrompt = \`You are a CDMX place guide intent classifier.
Analyze the user's message and extract a JSON object with:
- "intent": exactly one of "recommendation", "place_info", or "fallback". (Use place_info if they ask about a specific place/name, recommendation if asking for a place to go to, fallback if unrelated).
- "candidate_place_name": If intent is place_info, the name of the place they are asking about. Otherwise null.
- "category": If intent is recommendation, extract the type of place (e.g. "coffee", "dinner", "brunch", "drinks", "bakery"). Return in English or Spanish. Otherwise null.
- "vibe": If they mention a vibe (e.g. "quiet", "trendy", "cozy", "lively"), extract it. Otherwise null.
- "zone": If they mention a location/neighborhood in CDMX (e.g. "Roma", "Condesa", "Polanco"), extract it. Otherwise null.
Return ONLY valid JSON.\`;

const response = await $helpers.httpRequest({
  method: 'POST',
  url: 'https://api.openai.com/v1/chat/completions',
  headers: { 'Authorization': \`Bearer \${OPENAI_KEY}\`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    response_format: { type: "json_object" },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text }
    ],
    max_tokens: 150,
    temperature: 0.1
  })
});

try {
  const data = JSON.parse(response);
  const result = JSON.parse(data.choices[0].message.content);
  return [{
    json: {
      ...input,
      intent: result.intent || 'fallback',
      candidate_place_name: result.candidate_place_name || null,
      extracted_category: result.category || null,
      extracted_vibe: result.vibe || null,
      extracted_zone: result.zone || null
    }
  }];
} catch (e) {
  return [{ json: { ...input, intent: 'fallback', error: 'parse_error' } }];
}`;

    const node = data.nodes.find(n => n.name === 'Classify Intent');
    if (node) {
        node.parameters.jsCode = newCode;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log('Updated Intent Classifier');
    }
}

function updateRecommendation() {
    const filePath = 'C:\\Users\\akiwa\\Documentos\\Chatboty\\n8n workflows\\04_recommendation.json';
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const newCode = `// Score all approved places and pick the best match
const input = $input.first().json;
const places = input.places || [];
const timeBucket = input.time_bucket || '';

if (!places.length) {
  return [{ json: { ...input, reply: null, outcome: 'not_found', no_match: true } }];
}

const extractedCategory = (input.extracted_category || '').toLowerCase();
const extractedVibe     = (input.extracted_vibe || '').toLowerCase();
const extractedZone     = (input.extracted_zone || '').toLowerCase();

const scored = places.map(p => {
  const props = p.properties || {};
  let score = 0;
  
  const cats  = (props.Category?.multi_select || []).map(c => c.name.toLowerCase());
  const vibes = (props.Vibe?.multi_select || []).map(v => v.name.toLowerCase());
  const times = (props['Best Time']?.multi_select || []).map(t => t.name);
  const zone  = (props.Zone?.select?.name || '').toLowerCase();
  const prio  = props.Priority?.number || 5;

  // Score exact extracted category
  if (extractedCategory && cats.some(c => c.includes(extractedCategory) || extractedCategory.includes(c))) {
    score += 5;
  }
  
  // Score extracted vibe
  if (extractedVibe && vibes.some(v => v.includes(extractedVibe) || extractedVibe.includes(v))) {
    score += 3;
  }
  
  // Score extracted zone
  if (extractedZone && zone && (zone.includes(extractedZone) || extractedZone.includes(zone))) {
    score += 6;
  }

  // Score time bucket
  if (times.includes(timeBucket)) {
    score += 2;
  }
  
  score += (prio / 10);
  
  return { props, score };
}).sort((a, b) => b.score - a.score);

const best = scored[0];

if (best.score < 1.0) {
  return [{ json: { ...input, reply: null, outcome: 'not_found', no_match: true } }];
}

const props = best.props;
const name    = props.Name?.title?.[0]?.plain_text || 'Este lugar';
const whyGo   = props['Why Go']?.rich_text?.[0]?.plain_text || '';
const vibe    = (props.Vibe?.multi_select || []).map(v => v.name).join(', ');
const mustTry = props['Must Try']?.rich_text?.[0]?.plain_text || '';
const tip     = props.Tip?.rich_text?.[0]?.plain_text || '';
const zoneResult = props.Zone?.select?.name || '';

return [{
  json: {
    ...input,
    place_matched: name,
    kb_data: { name, whyGo, vibe, mustTry, tip, zone: zoneResult, timeBucket: input.time_bucket },
    outcome: 'needs_format'
  }
}];`;

    const node = data.nodes.find(n => n.name === 'Score and Pick Best');
    if (node) {
        node.parameters.jsCode = newCode;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log('Updated Recommendation Workflow');
    }
}

updateIntentClassifier();
updateRecommendation();
