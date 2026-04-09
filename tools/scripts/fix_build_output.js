const fs = require('fs');
const file = 'tools/scripts/n8n_workflows/AkiBot-Main-Inbound-Core.json';
const data = JSON.parse(fs.readFileSync(file));

const node = data.nodes.find(n => n.name === 'Build Final Output');
if (node && node.parameters.jsCode) {
    let code = node.parameters.jsCode;
    // We add the normalized request fields
    const toAdd = `
    phone: original.phone,
    display_name: original.display_name,
    message_text: original.message_text,
    message_type: original.message_type || 'text',
    received_at: original.received_at,`;
    
    code = code.replace(
        "status: 'ok',",
        "status: 'ok'," + toAdd
    );
    node.parameters.jsCode = code;
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log('Build Final Output updated!');
}
