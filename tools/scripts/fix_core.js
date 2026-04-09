const fs = require('fs');

const file = 'tools/scripts/n8n_workflows/AkiBot-Main-Inbound-Core.json';
const data = JSON.parse(fs.readFileSync(file));

// Remove Collect Response
data.nodes = data.nodes.filter(n => n.name !== 'Collect Response');

// Reroute connections
for (const [nodeName, nodeConnections] of Object.entries(data.connections)) {
  if (nodeConnections.main && nodeConnections.main[0]) {
    nodeConnections.main[0] = nodeConnections.main[0].filter(conn => {
      if (conn.node === 'Collect Response') {
        // Change to Build Final Output
        conn.node = 'Build Final Output';
        return true;
      }
      return true;
    });
  }
}

// Ensure Build Final Output has no incoming connections from Collect Response since it was removed
delete data.connections['Collect Response'];

// Make subworkflows synchronous
const saveNode = data.nodes.find(n => n.name === 'Save Session');
if (saveNode && saveNode.parameters.options) {
  saveNode.parameters.options.waitForSubWorkflow = true;
}

const logNode = data.nodes.find(n => n.name === 'Log Event');
if (logNode && logNode.parameters.options) {
  logNode.parameters.options.waitForSubWorkflow = true;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed Core Response Path appropriately.');
