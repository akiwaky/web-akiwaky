# Credentials loaded from environment variables — never hardcode here.
# Set before running: $env:CF_ACCESS_TOKEN="<your-cf-jwt>" ; $env:N8N_API_KEY="<your-n8n-key>"
$cfCookie = $env:CF_ACCESS_TOKEN
$n8nKey   = $env:N8N_API_KEY
if (-not $cfCookie -or -not $n8nKey) { Write-Error "CF_ACCESS_TOKEN and N8N_API_KEY must be set as environment variables."; exit 1 }
$baseUrl = "https://n8n.akiwaky.cloud/api/v1"

$headers = @{
    "X-N8N-API-KEY" = $n8nKey
    "Cookie"        = "CF_Authorization=$cfCookie"
    "Content-Type"  = "application/json"
}

function Create-Workflow($jsonPath) {
    if (-not (Test-Path $jsonPath)) {
        Write-Host "File not found: $jsonPath"
        return $null
    }
    $json = Get-Content -Raw -Path $jsonPath -Encoding utf8
    try {
        $resp = Invoke-RestMethod -Uri "$baseUrl/workflows" -Method POST -Headers $headers -Body $json
        Write-Host "Created: $($resp.name) -> $($resp.id)"
        return $resp.id
    }
    catch {
        Write-Host "Error creating $jsonPath : $_"
        return $null
    }
}

$benefitsId = Create-Workflow "C:\Antigravity\Repo-Web\scripts\n8n_workflows\PalNorte-SW-CMD-Benefits.json"
$lostId = Create-Workflow "C:\Antigravity\Repo-Web\scripts\n8n_workflows\PalNorte-SW-CMD-Lost.json"
$auditId = Create-Workflow "C:\Antigravity\Repo-Web\scripts\n8n_workflows\PalNorte-SW-Audit-Logger.json"

$intentId = "Nj4NlX79abLJjLi7"
$helpId = "OWmFO9lfD1eflWRi"
$statusId = "ahnw5vlJGs7LJ1qO"

if (-not $benefitsId -or -not $lostId -or -not $auditId) {
    Write-Host "Failed to create one or more base workflows. Aborting Main Router creation."
    exit 1
}

# Read Main Router
$mainJsonPath = "C:\Antigravity\Repo-Web\scripts\n8n_workflows\PalNorte-WA-Main-Router.json"
$mainJson = Get-Content -Raw -Path $mainJsonPath -Encoding utf8

# Replace IDs
$mainJson = $mainJson.Replace("INTENT_ROUTER_ID", $intentId)
$mainJson = $mainJson.Replace("HELP_WF_ID", $helpId)
$mainJson = $mainJson.Replace("BENEFITS_WF_ID", $benefitsId)
$mainJson = $mainJson.Replace("STATUS_WF_ID", $statusId)
$mainJson = $mainJson.Replace("LOST_WF_ID", $lostId)
$mainJson = $mainJson.Replace("AUDIT_WF_ID", $auditId)

try {
    $resp = Invoke-RestMethod -Uri "$baseUrl/workflows" -Method POST -Headers $headers -Body $mainJson
    Write-Host "Created Main Router -> $($resp.id)"
    $mainRouterId = $resp.id

    # Activate Main Router
    # According to n8n API, you can update 'active' by PUTting just the changed fields, or the whole workflow. 
    # But often you just need to POST to /workflows/$id/activate or PUT with active:true
    # The API for 2.X is PUT /api/v1/workflows/$id with the whole workflow + active=true, or just { "active": true }?
    # Actually, let's pull it, modify, push.
    $fullRouter = Invoke-RestMethod -Uri "$baseUrl/workflows/$mainRouterId" -Method GET -Headers $headers
    $fullRouter.active = $true
    $fullRouterJson = $fullRouter | ConvertTo-Json -Depth 20
    $respAct = Invoke-RestMethod -Uri "$baseUrl/workflows/$mainRouterId" -Method PUT -Headers $headers -Body $fullRouterJson
    Write-Host "Activated Main Router? $($respAct.active)"
}
catch {
    Write-Host "Error creating/activating Main Router: $_"
}
