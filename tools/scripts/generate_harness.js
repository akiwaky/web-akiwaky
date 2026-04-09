const fs = require('fs');

const FIXTURES = {
    greeting_new_user: {
        phone: '+5215550000101', display_name: 'Test', message_text: 'Hola', message_type: 'text',
        expected_intent: 'greeting', expected_response_exact: 'Hola, te ayudaré a encontrar info, ¿qué buscas?',
        expected_kb_hit: false, expected_needs_human: false
    },
    kb_question_found: {
        phone: '+5215550000102', display_name: 'Test', message_text: '¿Cuál es la clave?', message_type: 'text',
        expected_intent: 'kb_query', expected_response_contains: 'la espera', expected_kb_hit: true, expected_needs_human: false
    },
    kb_question_not_found: {
        phone: '+5215550000103', display_name: 'Test', message_text: '¿Cuál es el horario de apertura?', message_type: 'text',
        expected_intent: 'kb_query', expected_response_exact: 'No encontré esa información en mi base actual.',
        expected_kb_hit: false, expected_needs_human: false
    },
    unknown_unclear: {
        phone: '+5215550000104', display_name: 'Test', message_text: 'eso', message_type: 'text',
        expected_intent: 'unknown', expected_response_exact: 'No estoy seguro de haber entendido bien. ¿Me lo puedes escribir con un poco más de detalle?',
        expected_kb_hit: false, expected_needs_human: false
    },
    explicit_human_handoff: {
        phone: '+5215550000105', display_name: 'Test', message_text: '#humano', message_type: 'text',
        expected_intent: 'human_handoff', expected_response_exact: 'Entendido. Lo paso con una persona.',
        expected_kb_hit: false, expected_needs_human: true
    },
    unsupported_non_text: {
        phone: '+5215550000106', display_name: 'Test', message_text: '', message_type: 'image',
        expected_intent: 'unsupported', expected_response_exact: 'Por ahora solo puedo ayudarte con mensajes de texto.',
        expected_kb_hit: false, expected_needs_human: false
    },
    greeting_stale_session: {
        phone: '+5215550000201', display_name: 'Test', message_text: 'Hola', message_type: 'text',
        expected_intent: 'greeting', expected_response_exact: 'Hola, te ayudaré a encontrar info, ¿qué buscas?',
        expected_kb_hit: false, expected_needs_human: false,
        seed: {
            session_status: 'active', short_memory: '', message_count: 5, last_seen_offset: -4 * 60 * 60 * 1000
        }
    },
    follow_up_contextual: {
        phone: '+5215550000202', display_name: 'Test', message_text: '¿Y cuál era?', message_type: 'text',
        expected_intent: 'follow_up', expected_response_contains: 'la espera',
        expected_kb_hit: true, expected_needs_human: false,
        seed: {
            session_status: 'active', short_memory: 'El usuario preguntó por la clave y se respondió: la espera', message_count: 2, last_seen_offset: -10 * 60 * 1000
        }
    },
    prior_handoff_state: {
        phone: '+5215550000203', display_name: 'Test', message_text: 'Hola', message_type: 'text',
        expected_intent: 'greeting', expected_response_exact: 'Un agente te atenderá pronto.',
        expected_kb_hit: false, expected_needs_human: true,
        seed: {
            session_status: 'handoff', short_memory: '', needs_human: true, message_count: 3, last_seen_offset: -5 * 60 * 1000
        }
    },
    returning_active_user: {
        phone: '+5215550000204', display_name: 'Test', message_text: 'Hola', message_type: 'text',
        expected_intent: 'greeting', expected_response_exact: 'Hola de nuevo. ¿En qué te ayudo ahora?',
        expected_kb_hit: false, expected_needs_human: false,
        seed: {
            session_status: 'active', short_memory: '', message_count: 8, last_seen_offset: -5 * 60 * 1000
        }
    },
    kb_follow_up_debug: {
        phone: '+5215550000205', display_name: 'Test', message_text: '¿Y los horarios?', message_type: 'text',
        expected_intent: 'follow_up', expected_response_contains: 'No encontré',
        expected_kb_hit: false, expected_needs_human: false,
        seed: {
            session_status: 'active', short_memory: 'Usuario preguntó por servicios', message_count: 1, last_seen_offset: -2 * 60 * 1000
        }
    },
    generic_returning_debug: {
        phone: '+5215550000206', display_name: 'Test', message_text: 'Hola', message_type: 'text',
        expected_intent: 'greeting', expected_response_exact: 'Hola de nuevo. ¿En qué te ayudo ahora?',
        expected_kb_hit: false, expected_needs_human: false,
        seed: {
            session_status: 'active', short_memory: '', message_count: 12, last_seen_offset: -2 * 60 * 1000
        }
    }
};

const nodes = [];
const connections = {};

let idCounter = 1;
function getNextId() { return 'node-' + (idCounter++); }

const manualTriggerId = getNextId();
nodes.push({
    name: 'Manual Trigger',
    type: 'n8n-nodes-base.manualTrigger',
    typeVersion: 1,
    position: [0, 0],
    id: manualTriggerId,
    parameters: {}
});

const webhookTriggerId = getNextId();
nodes.push({
    name: 'Webhook Trigger',
    type: 'n8n-nodes-base.webhook',
    typeVersion: 2,
    position: [0, 200],
    id: webhookTriggerId,
    webhookId: 'akibot-test-harness',
    parameters: {
        httpMethod: 'GET',
        path: 'akibot-test',
        responseMode: 'responseNode',
        options: {}
    }
});

const testConfigId = getNextId();
nodes.push({
    name: 'Test Config',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [200, 0],
    id: testConfigId,
    parameters: {
        jsCode: `
const fixtureKeys = Object.keys(${JSON.stringify(FIXTURES)});
let fixture_name = fixtureKeys[0];

if ($('Webhook Trigger').item) {
    const query = $('Webhook Trigger').first().json.query || {};
    if (query.fixture) {
        let idx = parseInt(query.fixture);
        if (idx >= 0 && idx < fixtureKeys.length) {
            fixture_name = fixtureKeys[idx];
        } else if (fixtureKeys.includes(query.fixture)) {
            fixture_name = query.fixture;
        }
    }
} else if ($('Manual Trigger').item) {
    // You can change this to test manually from UI
    fixture_name = 'greeting_new_user';
}

return [{ json: { fixture_name } }];
`
    }
});

connections['Manual Trigger'] = { main: [[ { node: 'Test Config', type: 'main', index: 0 } ]] };
connections['Webhook Trigger'] = { main: [[ { node: 'Test Config', type: 'main', index: 0 } ]] };

// ... Wait, let me just add the webhook code and respond block
const respondNodeId = getNextId();
nodes.push({
    name: 'Respond Webhook',
    type: 'n8n-nodes-base.respondToWebhook',
    typeVersion: 1.1,
    position: [1800, 200],
    id: respondNodeId,
    parameters: {
        respondWith: 'json',
        responseBody: '={{ JSON.stringify($json) }}',
        options: {}
    }
});


const fixtureConfigId = getNextId();
nodes.push({
    name: 'Set Fixture Data',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [400, 0],
    id: fixtureConfigId,
    parameters: {
        jsCode: `
const fixName = $input.first().json.fixture_name;
const fixtures = ${JSON.stringify(FIXTURES)};
const fix = fixtures[fixName];

if (!fix) {
  throw new Error('Fixture not found: ' + fixName);
}

const out = {
  fixture_name: fixName,
  phone: fix.phone,
  display_name: fix.display_name,
  message_text: fix.message_text,
  message_type: fix.message_type,
  received_at: new Date().toISOString(),
  expected_intent: fix.expected_intent,
  expected_response_exact: fix.expected_response_exact || '',
  expected_response_contains: fix.expected_response_contains || '',
  expected_kb_hit: fix.expected_kb_hit,
  expected_needs_human: fix.expected_needs_human
};

if (fix.seed) {
  out.has_seed = true;
  out.session_status = fix.seed.session_status;
  out.short_memory = fix.seed.short_memory;
  out.last_seen_at = new Date(new Date().getTime() + (fix.seed.last_seen_offset || 0)).toISOString();
  out.message_count = fix.seed.message_count;
  out.needs_human = fix.seed.needs_human || false;
} else {
  out.has_seed = false;
}

return [{ json: out }];
`
    }
});

connections['Test Config'] = { main: [[ { node: 'Set Fixture Data', type: 'main', index: 0 } ]] };

const ifSeedId = getNextId();
nodes.push({
    name: 'Has Seed Data?',
    type: 'n8n-nodes-base.if',
    typeVersion: 2,
    position: [600, 0],
    id: ifSeedId,
    parameters: {
        conditions: {
            options: { caseSensitive: false },
            conditions: [
                {
                    id: "has-seed",
                    leftValue: "={{ $json.has_seed }}",
                    rightValue: true,
                    operator: {
                        type: "boolean",
                        operation: "equals"
                    }
                }
            ]
        }
    }
});

connections['Set Fixture Data'] = { main: [[ { node: 'Has Seed Data?', type: 'main', index: 0 } ]] };

const updateSheetName = 'Seed DB for Fixture';
nodes.push({
    name: updateSheetName,
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.5,
    position: [800, -200],
    id: getNextId(),
    credentials: {
        googleSheetsOAuth2Api: {
            id: '',
            name: 'Google Sheets account'
        }
    },
    parameters: {
        operation: 'appendOrUpdate',
        documentId: { __rl: true, value: '1cbnDSwdxZlJe0s8J4FQSU_ccPZIIts-GhjxXrOEdYzg', mode: 'list' },
        sheetName: { __rl: true, value: 'sessions', mode: 'name' },
        columns: {
            mappingMode: 'defineBelow',
            value: {
                phone: '={{ $json.phone }}',
                session_status: '={{ $json.session_status }}',
                short_memory: '={{ $json.short_memory }}',
                last_seen_at: '={{ $json.last_seen_at }}',
                message_count: '={{ $json.message_count }}',
                needs_human: '={{ $json.needs_human }}'
            },
            matchingColumns: [ 'phone' ],
            schema: [
                { id: 'phone', displayName: 'phone', required: false, defaultMatch: true, display: true, type: 'string', canBeUsedToMatch: true, removed: false }
            ]
        },
        options: {}
    }
});

const executeNodeName = 'Execute Main Core';
const formatOutputNodeName = 'Compare Output';

connections['Has Seed Data?'] = { 
    main: [
        [ { node: updateSheetName, type: 'main', index: 0 } ],
        [ { node: executeNodeName, type: 'main', index: 0 } ]
    ]
};

connections[updateSheetName] = { main: [[ { node: executeNodeName, type: 'main', index: 0 } ]] };

nodes.push({
    name: executeNodeName,
    type: 'n8n-nodes-base.executeWorkflow',
    typeVersion: 1.2,
    position: [1400, 0],
    id: getNextId(),
    parameters: {
        workflowId: { __rl: true, value: '={{ /*MAIN_CORE_ID*/ }}', mode: 'id' },
        workflowInputs: {
            mappingMode: 'defineBelow',
            value: {
                phone: '={{ $json.phone }}',
                display_name: '={{ $json.display_name }}',
                message_text: '={{ $json.message_text }}',
                message_type: '={{ $json.message_type }}',
                received_at: '={{ $json.received_at }}',
                raw_input: '{}'
            }
        },
        options: { waitForSubWorkflow: true }
    }
});

nodes.push({
    name: formatOutputNodeName,
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [1600, 0],
    id: getNextId(),
    parameters: {
        jsCode: `
const result = $input.first().json;
const phone = result.phone;
const fixtures = ${JSON.stringify(FIXTURES)};
let fix = null;
let fixture_name = 'unknown';

for(const k of Object.keys(fixtures)){
    if(fixtures[k].phone === phone) {
        fix = fixtures[k];
        fixture_name = k;
        break;
    }
}

let pass_intent = false;
let pass_response = false;
let pass_kb_hit = false;
let pass_needs_human = false;

if(fix) {
    pass_intent = (result.intent === fix.expected_intent);
    if (fix.expected_response_exact) {
        pass_response = (result.response_text === fix.expected_response_exact);
    } else if (fix.expected_response_contains) {
        pass_response = (result.response_text.includes(fix.expected_response_contains));
    } else {
        pass_response = true;
    }
    pass_kb_hit = (result.kb_hit === fix.expected_kb_hit);
    pass_needs_human = (result.needs_human === fix.expected_needs_human);
}

return [{
  json: {
    fixture_name,
    phone,
    expected_intent: fix ? fix.expected_intent : '',
    expected_response_exact: fix ? fix.expected_response_exact : '',
    expected_response_contains: fix ? fix.expected_response_contains : '',
    expected_kb_hit: fix ? fix.expected_kb_hit : false,
    expected_needs_human: fix ? fix.expected_needs_human : false,
    actual_intent: result.intent,
    actual_response_text: result.response_text,
    actual_kb_hit: result.kb_hit,
    actual_needs_human: result.needs_human,
    pass_intent,
    pass_response,
    pass_kb_hit,
    pass_needs_human,
    overall_pass: pass_intent && pass_response && pass_kb_hit && pass_needs_human
  }
}];
`
    }
});

connections[executeNodeName] = { main: [[ { node: formatOutputNodeName, type: 'main', index: 0 } ]] };
connections[formatOutputNodeName] = { main: [[ { node: 'Respond Webhook', type: 'main', index: 0 } ]] };

const originalData = JSON.parse(fs.readFileSync('tools/scripts/n8n_workflows/AkiBot-Test-Harness.json'));
let coreId = '={{ /*MAIN_CORE_ID*/ }}';
const oldExecNode = originalData.nodes.find(n => n.name === 'Execute Main Core');
if (oldExecNode && oldExecNode.parameters.workflowId && oldExecNode.parameters.workflowId.value) {
    coreId = oldExecNode.parameters.workflowId.value;
}
nodes.find(n => n.name === executeNodeName).parameters.workflowId.value = coreId;

const newData = {
    name: 'AkiBot - Test Harness',
    nodes: nodes,
    connections: connections,
    settings: {}
};

fs.writeFileSync('tools/scripts/n8n_workflows/AkiBot-Test-Harness.json', JSON.stringify(newData, null, 2));
console.log('Harness Generated!');
