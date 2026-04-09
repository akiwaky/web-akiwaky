const fs = require('fs');
const file = 'tools/scripts/n8n_workflows/AkiBot-Save-Session.json';
const data = JSON.parse(fs.readFileSync(file));

// 1. Prepare Upsert Data
const prepareNode = data.nodes.find(n => n.name === 'Prepare Upsert Data');
if (prepareNode && prepareNode.parameters.jsCode) {
    let code = prepareNode.parameters.jsCode;
    // Add rowNumber extraction
    if (!code.includes('rowNumber')) {
        code = code.replace(
            'const oldCount = hasExisting ? (parseInt(lookupResults[0].json.message_count) || 0) : 0;',
            `const oldCount = hasExisting ? (parseInt(lookupResults[0].json.message_count) || 0) : 0;\nconst rowNumber = hasExisting ? lookupResults[0].json.row_number : undefined;`
        );
        code = code.replace(
            'is_existing: hasExisting,',
            `is_existing: hasExisting,\n    row_number: rowNumber,`
        );
        prepareNode.parameters.jsCode = code;
    }
}

// 2. Update Session Row
const updateNode = data.nodes.find(n => n.name === 'Update Session Row');
if (updateNode && updateNode.parameters.columns) {
    // We need to define row_number in columns.value and schema, and set it as matchingColumns
    updateNode.parameters.columns.value.row_number = '={{ $json.row_number }}';
    
    // Add to schema
    if (updateNode.parameters.columns.schema) {
        updateNode.parameters.columns.schema.push({
            id: 'row_number',
            displayName: 'row_number',
            required: false,
            defaultMatch: true,
            display: true,
            type: 'string',
            canBeUsedToMatch: true,
            removed: false
        });
    }

    // Set matching columns
    updateNode.parameters.columns.matchingColumns = [ 'row_number' ];
    
    // Remove filtersUI if we mistakenly added it
    if (updateNode.parameters.filtersUI) {
        delete updateNode.parameters.filtersUI;
    }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Session Targeting Fix applied.');
