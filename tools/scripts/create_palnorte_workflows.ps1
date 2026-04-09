# Credentials loaded from environment variables — never hardcode here.
# Set before running: $env:N8N_API_KEY="<your-n8n-key>"
$apiKey = $env:N8N_API_KEY
if (-not $apiKey) { Write-Error "N8N_API_KEY must be set as an environment variable."; exit 1 }
$baseUrl = "https://n8n.akiwaky.cloud/api/v1"
$headers = @{ "X-N8N-API-KEY" = $apiKey; "Content-Type" = "application/json" }

function Create-Workflow($body) {
    $json = $body | ConvertTo-Json -Depth 20
    $resp = Invoke-RestMethod -Uri "$baseUrl/workflows" -Method POST -Headers $headers -Body $json
    Write-Host "Created: $($resp.name) => ID: $($resp.id)"
    return $resp.id
}

# --- SW 1: Intent Router ---
$intentRouter = @{
  name = "PalNorte - SW - Intent Router"
  nodes = @(
    @{ parameters = @{ workflowInputs = @{ values = @(@{ name = "rawMessage" }) } }; name = "When Executed by Another Workflow"; type = "n8n-nodes-base.executeWorkflowTrigger"; typeVersion = 1.1; position = @(240,300); id = "trigger-intent" }
    @{ parameters = @{ jsCode = "const raw = `$input.first().json.rawMessage || '';`nconst msg = raw.toLowerCase().trim();`nconst helpAliases = ['help','ayuda','commands','comandos','menu','inicio','hola','hi','hello'];`nconst benefitsAliases = ['benefits','beneficios','vip','privilegios','accesos','beneficio'];`nconst statusAliases = ['status','estado','donde','grupo','plan','where'];`nconst lostAliases = ['lost','perdido','perdida','no encuentro','help me','me perdi','separado'];`nlet intent = 'help';`nif (helpAliases.some(a => msg === a || msg.startsWith(a + ' '))) intent = 'help';`nelse if (benefitsAliases.some(a => msg === a || msg.includes(a))) intent = 'benefits';`nelse if (statusAliases.some(a => msg === a || msg.includes(a))) intent = 'status';`nelse if (lostAliases.some(a => msg === a || msg.includes(a))) intent = 'lost';`nreturn [{ json: { intent, rawMessage: raw } }];" }; name = "Route Intent"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(460,300); id = "code-intent" }
  )
  connections = @{
    "When Executed by Another Workflow" = @{ main = @(@(@{ node = "Route Intent"; type = "main"; index = 0 })) }
  }
  settings = @{ executionOrder = "v1" }
}
$intentRouterId = Create-Workflow $intentRouter

# --- SW 2: CMD Help ---
$cmdHelp = @{
  name = "PalNorte - SW - CMD Help"
  nodes = @(
    @{ parameters = @{}; name = "When Executed by Another Workflow"; type = "n8n-nodes-base.executeWorkflowTrigger"; typeVersion = 1.1; position = @(240,300); id = "trigger-help" }
    @{ parameters = @{ jsCode = "const reply = '*Pal Norte Buddy Bot* - Comandos disponibles:`n`n- *benefits* -> tus beneficios y accesos VIP`n- *status* -> donde esta el grupo y el plan`n- *lost* -> te ayudo a encontrar al grupo`n`nEscribe el comando que necesitas.';`nreturn [{ json: { reply } }];" }; name = "Build Help Reply"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(460,300); id = "code-help" }
  )
  connections = @{
    "When Executed by Another Workflow" = @{ main = @(@(@{ node = "Build Help Reply"; type = "main"; index = 0 })) }
  }
  settings = @{ executionOrder = "v1" }
}
$cmdHelpId = Create-Workflow $cmdHelp

# --- SW 3: CMD Benefits ---
$cmdBenefits = @{
  name = "PalNorte - SW - CMD Benefits"
  nodes = @(
    @{ parameters = @{}; name = "When Executed by Another Workflow"; type = "n8n-nodes-base.executeWorkflowTrigger"; typeVersion = 1.1; position = @(240,300); id = "trigger-benefits" }
    @{ parameters = @{ jsCode = "const dbId = 'BENEFITS_DB_ID';`nconst reply = 'Buscando tus beneficios VIP...';`nreturn [{ json: { reply, dbId } }];" }; name = "Placeholder Benefits"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(460,300); id = "code-benefits-ph" }
    @{ parameters = @{ jsCode = "const items = `$input.all();`nif (!items || items.length === 0) { return [{ json: { reply: 'No tengo informacion de beneficios disponible. Prueba: status' } }]; }`nconst bullets = items.slice(0, 5).map(item => {`n  const name = item.json.properties?.Name?.title?.[0]?.plain_text || 'Beneficio';`n  const desc = item.json.properties?.Description?.rich_text?.[0]?.plain_text || '';`n  const loc = item.json.properties?.Location?.rich_text?.[0]?.plain_text || '';`n  return '- *' + name + '*' + (loc ? `\n  Lugar: ` + loc : '') + (desc ? `\n  ` + desc : '');`n}).join('\n\n');`nconst reply = '*Beneficios VIP confirmados:*\n\n' + bullets + '\n\n_La info puede cambiar. Verifica en acceso VIP._\n\nPrueba: *status*';`nreturn [{ json: { reply } }];" }; name = "Format Benefits"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(680,300); id = "code-benefits-fmt" }
  )
  connections = @{
    "When Executed by Another Workflow" = @{ main = @(@(@{ node = "Placeholder Benefits"; type = "main"; index = 0 })) }
    "Placeholder Benefits" = @{ main = @(@(@{ node = "Format Benefits"; type = "main"; index = 0 })) }
  }
  settings = @{ executionOrder = "v1" }
}
$cmdBenefitsId = Create-Workflow $cmdBenefits

# --- SW 4: CMD Status ---
$cmdStatus = @{
  name = "PalNorte - SW - CMD Status"
  nodes = @(
    @{ parameters = @{}; name = "When Executed by Another Workflow"; type = "n8n-nodes-base.executeWorkflowTrigger"; typeVersion = 1.1; position = @(240,300); id = "trigger-status" }
    @{ parameters = @{ jsCode = "const dbId = 'STATUS_DB_ID';`nreturn [{ json: { dbId, filter: 'Active' } }];" }; name = "Placeholder Status"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(460,300); id = "code-status-ph" }
    @{ parameters = @{ jsCode = "const items = `$input.all();`nif (!items || items.length === 0) { return [{ json: { reply: 'No tengo el status del grupo ahora.\n\nPunto de respaldo: pide que alguien del grupo actualice.\n\nEscribe: lost si no ubicas donde estamos.' } }]; }`nconst props = items[0].json.properties;`nconst meetup = props?.Meetup_Point?.rich_text?.[0]?.plain_text || 'No disponible';`nconst fallback = props?.Fallback_Point?.rich_text?.[0]?.plain_text || 'No disponible';`nconst plan = props?.Plan_Summary?.rich_text?.[0]?.plain_text || 'Sin plan registrado';`nconst updatedBy = props?.Updated_By?.rich_text?.[0]?.plain_text || '';`nconst reply = 'Punto principal: ' + meetup + '\nPunto de respaldo: ' + fallback + '\nPlan: ' + plan + (updatedBy ? '\n\n_Actualizado por ' + updatedBy + '_' : '') + '\n\nEscribe: *lost* si no ubicas el punto';`nreturn [{ json: { reply } }];" }; name = "Format Status"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(680,300); id = "code-status-fmt" }
  )
  connections = @{
    "When Executed by Another Workflow" = @{ main = @(@(@{ node = "Placeholder Status"; type = "main"; index = 0 })) }
    "Placeholder Status" = @{ main = @(@(@{ node = "Format Status"; type = "main"; index = 0 })) }
  }
  settings = @{ executionOrder = "v1" }
}
$cmdStatusId = Create-Workflow $cmdStatus

# --- SW 5: CMD Lost ---
$cmdLost = @{
  name = "PalNorte - SW - CMD Lost"
  nodes = @(
    @{ parameters = @{}; name = "When Executed by Another Workflow"; type = "n8n-nodes-base.executeWorkflowTrigger"; typeVersion = 1.1; position = @(240,300); id = "trigger-lost" }
    @{ parameters = @{ jsCode = "const reply = 'Vamos a ubicarte.\n\nQue ves cerca de ti? Responde *uno*:\n\n- stage\n- food\n- entrance\n- VIP\n- no idea';`nreturn [{ json: { reply } }];" }; name = "Ask Location"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(460,300); id = "code-lost-ask" }
  )
  connections = @{
    "When Executed by Another Workflow" = @{ main = @(@(@{ node = "Ask Location"; type = "main"; index = 0 })) }
  }
  settings = @{ executionOrder = "v1" }
}
$cmdLostId = Create-Workflow $cmdLost

# --- SW 6: Audit Logger ---
$auditLogger = @{
  name = "PalNorte - SW - Audit Logger"
  nodes = @(
    @{ parameters = @{ workflowInputs = @{ values = @(@{ name = "waPhone" },@{ name = "displayName" },@{ name = "intent" },@{ name = "outcome" }) } }; name = "When Executed by Another Workflow"; type = "n8n-nodes-base.executeWorkflowTrigger"; typeVersion = 1.1; position = @(240,300); id = "trigger-audit" }
    @{ parameters = @{ jsCode = "// Audit log placeholder - will write to Notion Users DB once created`nconst log = { ts: new Date().toISOString(), phone: `$json.waPhone, intent: `$json.intent, outcome: `$json.outcome };`nconsole.log('AUDIT:', JSON.stringify(log));`nreturn [{ json: log }];" }; name = "Log Audit"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(460,300); id = "code-audit" }
  )
  connections = @{
    "When Executed by Another Workflow" = @{ main = @(@(@{ node = "Log Audit"; type = "main"; index = 0 })) }
  }
  settings = @{ executionOrder = "v1" }
}
$auditLoggerId = Create-Workflow $auditLogger

# --- MAIN: WA Router ---
$mainRouter = @{
  name = "PalNorte - WA Main Router"
  nodes = @(
    @{ parameters = @{ httpMethod = "POST"; path = "palnorte-inbound"; responseMode = "lastNode"; options = @{} }; name = "WA Inbound"; type = "n8n-nodes-base.webhook"; typeVersion = 2; position = @(240,300); id = "webhook-main"; webhookId = "palnorte-inbound" }
    @{ parameters = @{ jsCode = "const body = `$input.first().json.body || `$input.first().json;`nlet waPhone = '', displayName = '', messageBody = '';`ntry {`n  const entry = body?.entry?.[0];`n  const change = entry?.changes?.[0];`n  const msg = change?.value?.messages?.[0];`n  const contact = change?.value?.contacts?.[0];`n  if (msg) { waPhone = msg.from || ''; displayName = contact?.profile?.name || waPhone; messageBody = msg.text?.body || ''; }`n} catch(e) {`n  waPhone = body.from || body.waPhone || 'unknown';`n  displayName = body.displayName || waPhone;`n  messageBody = body.body || body.message || '';`n}`nconst skip = !messageBody || !waPhone || waPhone === 'unknown';`nreturn [{ json: { waPhone, displayName, messageBody, skip } }];" }; name = "Normalize Payload"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(460,300); id = "code-normalize" }
    @{ parameters = @{ conditions = @{ options = @{ caseSensitive = $false }; conditions = @(@{ id = "skip-check"; leftValue = "={{ `$json.skip }}"; rightValue = $true; operator = @{ type = "boolean"; operation = "equals" } }) } }; name = "Skip Invalid"; type = "n8n-nodes-base.if"; typeVersion = 2; position = @(680,300); id = "if-skip" }
    @{ parameters = @{ workflowId = @{ __rl = $true; value = $intentRouterId; mode = "id" }; workflowInputs = @{ mappingMode = "defineBelow"; value = @{ rawMessage = "={{ `$json.messageBody }}" } }; options = @{ waitForSubWorkflow = $true } }; name = "Route Intent"; type = "n8n-nodes-base.executeWorkflow"; typeVersion = 1.1; position = @(900,460); id = "exec-intent" }
    @{ parameters = @{ rules = @{ values = @(@{ outputKey = "help"; conditions = @{ conditions = @(@{ leftValue = "={{ `$json.intent }}"; rightValue = "help"; operator = @{ type = "string"; operation = "equals" } }) } },@{ outputKey = "benefits"; conditions = @{ conditions = @(@{ leftValue = "={{ `$json.intent }}"; rightValue = "benefits"; operator = @{ type = "string"; operation = "equals" } }) } },@{ outputKey = "status"; conditions = @{ conditions = @(@{ leftValue = "={{ `$json.intent }}"; rightValue = "status"; operator = @{ type = "string"; operation = "equals" } }) } },@{ outputKey = "lost"; conditions = @{ conditions = @(@{ leftValue = "={{ `$json.intent }}"; rightValue = "lost"; operator = @{ type = "string"; operation = "equals" } }) } }) }; options = @{ fallbackOutput = "extra" } }; name = "Dispatch Command"; type = "n8n-nodes-base.switch"; typeVersion = 3.2; position = @(1120,460); id = "switch-dispatch" }
    @{ parameters = @{ workflowId = @{ __rl = $true; value = $cmdHelpId; mode = "id" }; options = @{ waitForSubWorkflow = $true } }; name = "Run Help"; type = "n8n-nodes-base.executeWorkflow"; typeVersion = 1.1; position = @(1340,200); id = "exec-help" }
    @{ parameters = @{ workflowId = @{ __rl = $true; value = $cmdBenefitsId; mode = "id" }; options = @{ waitForSubWorkflow = $true } }; name = "Run Benefits"; type = "n8n-nodes-base.executeWorkflow"; typeVersion = 1.1; position = @(1340,340); id = "exec-benefits" }
    @{ parameters = @{ workflowId = @{ __rl = $true; value = $cmdStatusId; mode = "id" }; options = @{ waitForSubWorkflow = $true } }; name = "Run Status"; type = "n8n-nodes-base.executeWorkflow"; typeVersion = 1.1; position = @(1340,480); id = "exec-status" }
    @{ parameters = @{ workflowId = @{ __rl = $true; value = $cmdLostId; mode = "id" }; options = @{ waitForSubWorkflow = $true } }; name = "Run Lost"; type = "n8n-nodes-base.executeWorkflow"; typeVersion = 1.1; position = @(1340,620); id = "exec-lost" }
    @{ parameters = @{ mode = "chooseBranch" }; name = "Collect Reply"; type = "n8n-nodes-base.merge"; typeVersion = 3; position = @(1560,340); id = "merge-reply" }
    @{ parameters = @{ jsCode = "const reply = `$input.first().json.reply || 'No pude entender eso. Prueba: help';`nconst waPhone = `$('Normalize Payload').first().json.waPhone;`nreturn [{ json: { reply, waPhone } }];" }; name = "Final Reply"; type = "n8n-nodes-base.code"; typeVersion = 2; position = @(1780,340); id = "code-final" }
    @{ parameters = @{ workflowId = @{ __rl = $true; value = $auditLoggerId; mode = "id" }; options = @{ waitForSubWorkflow = $false } }; name = "Log Audit"; type = "n8n-nodes-base.executeWorkflow"; typeVersion = 1.1; position = @(2000,500); id = "exec-audit" }
  )
  connections = @{
    "WA Inbound" = @{ main = @(@(@{ node = "Normalize Payload"; type = "main"; index = 0 })) }
    "Normalize Payload" = @{ main = @(@(@{ node = "Skip Invalid"; type = "main"; index = 0 })) }
    "Skip Invalid" = @{ main = @(@(), @(@{ node = "Route Intent"; type = "main"; index = 0 })) }
    "Route Intent" = @{ main = @(@(@{ node = "Dispatch Command"; type = "main"; index = 0 })) }
    "Dispatch Command" = @{ main = @(@(@{ node = "Run Help"; type = "main"; index = 0 }),@(@{ node = "Run Benefits"; type = "main"; index = 0 }),@(@{ node = "Run Status"; type = "main"; index = 0 }),@(@{ node = "Run Lost"; type = "main"; index = 0 }),@(@{ node = "Run Help"; type = "main"; index = 0 })) }
    "Run Help" = @{ main = @(@(@{ node = "Collect Reply"; type = "main"; index = 0 })) }
    "Run Benefits" = @{ main = @(@(@{ node = "Collect Reply"; type = "main"; index = 1 })) }
    "Run Status" = @{ main = @(@(@{ node = "Collect Reply"; type = "main"; index = 2 })) }
    "Run Lost" = @{ main = @(@(@{ node = "Collect Reply"; type = "main"; index = 3 })) }
    "Collect Reply" = @{ main = @(@(@{ node = "Final Reply"; type = "main"; index = 0 })) }
    "Final Reply" = @{ main = @(@(@{ node = "Log Audit"; type = "main"; index = 0 })) }
  }
  settings = @{ executionOrder = "v1" }
}
$mainRouterId = Create-Workflow $mainRouter

Write-Host ""
Write-Host "=== WORKFLOW IDS ==="
Write-Host "Intent Router:  $intentRouterId"
Write-Host "CMD Help:       $cmdHelpId"
Write-Host "CMD Benefits:   $cmdBenefitsId"
Write-Host "CMD Status:     $cmdStatusId"
Write-Host "CMD Lost:       $cmdLostId"
Write-Host "Audit Logger:   $auditLoggerId"
Write-Host "Main Router:    $mainRouterId"
Write-Host ""
Write-Host "Webhook URL: https://webhooks.akiwaky.cloud/webhook/palnorte-inbound"
