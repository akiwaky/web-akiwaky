const fs = require('fs');
const file = 'tools/scripts/n8n_workflows/AkiBot-Query-KB.json';
const data = JSON.parse(fs.readFileSync(file));

const node = data.nodes.find(n => n.name === 'Extract & Match KB' || n.type.includes('Code'));
if (node && node.parameters.jsCode) {
  let code = node.parameters.jsCode;
  
  // Replace the else branch
  const oldElse = `} else {
  // Fall back to full KB (small enough for Sprint 1)
  kb_context = fullText.substring(0, 2000);
  kb_hit = fullText.trim().length > 0;
}`;

  const newElse = `} else {
  // Strict miss
  kb_context = '';
  kb_hit = false;
}`;

  code = code.replace(oldElse, newElse);
  node.parameters.jsCode = code;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('KB fix applied');
} else {
  console.log('Could not find Extract & Match KB node');
}
