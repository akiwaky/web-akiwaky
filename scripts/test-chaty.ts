// Simple test script for Chaty webhooks
// Simulates WhatsApp webhook payload format to the n8n tests endpoint
// Make sure to replace WEBHOOK_URL with the actual test URL of your active Chaty router in n8n.

const WEBHOOK_URL = process.env.CHATY_TEST_WEBHOOK_URL || "https://n8n.akiwaky.cloud/webhook-test/akichaty-inbound";


const testCases = [
  {
    name: "Place Info - Rosetta",
    message: "Dime sobre Rosetta",
    expectedIntent: "place_info"
  },
  {
    name: "Recommendation - Quiet Coffee",
    message: "recomiéndame un café tranquilo en la roma",
    expectedIntent: "recommendation"
  },
  {
    name: "Recommendation - Dinner",
    message: "Quiero cenar en Polanco",
    expectedIntent: "recommendation"
  },
  {
    name: "Fallback - Help",
    message: "ayuda",
    expectedIntent: "fallback"
  }
];

async function runTests() {
  console.log(`Running Chaty Routing Tests against ${WEBHOOK_URL}...`);
  
  let passed = 0;
  
  for (const tc of testCases) {
    console.log(`n▶ Testing: ${tc.name} ("${tc.message}")`);
    
    // Construct fake Meta WhatsApp payload
    const payload = {
      object: "whatsapp_business_account",
      entry: [{
        id: "123456789",
        changes: [{
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15551943682",
              phone_number_id: "941377499069555"
            },
            contacts: [{
              profile: { name: "Test User" },
              wa_id: "1234567890"
            }],
            messages: [{
              from: "1234567890",
              id: `wamid.${Math.random().toString(36).substring(7)}`,
              timestamp: Math.floor(Date.now() / 1000).toString(),
              type: "text",
              text: { body: tc.message }
            }]
          },
          field: "messages"
        }]
      }]
    };

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!resp.ok) {
        console.error(`❌ HTTP Error: ${resp.status} ${resp.statusText}`);
        continue;
      }
      
      const result = await resp.json();
      
      // Verification logic: the main router responds when the last node is reached, returning the state object
      const actualIntent = result.intent;
      
      if (actualIntent === tc.expectedIntent) {
        console.log(`✅ Passed (Intent: ${actualIntent})`);
        console.log(`   Reply: ${result.reply || "(No reply returned/failed API call)"}`);
        passed++;
      } else {
        console.error(`❌ Failed`);
        console.error(`   Expected intent: ${tc.expectedIntent}, got: ${actualIntent}`);
      }
    } catch (e: any) {
      console.error(`❌ Error fetching: ${e.message}`);
    }
  }
  
  console.log(`nDone. Passed ${passed}/${testCases.length} tests.`);
  if (passed !== testCases.length) {
    process.exit(1);
  }
}

runTests();
