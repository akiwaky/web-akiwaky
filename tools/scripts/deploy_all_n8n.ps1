$cfCookie = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwNjAzMDFmZjQ0OWE5YWJhMjMwNDQyYzdhOGU4ODE5M2UzODVjN2I4YjkyZTZlOThiZjhkZTIxYmM5OGU4NjAifQ.eyJhdWQiOlsiOGU2ODhkMzQzNmQxOWU4ZDk0ZjdlNGU1YWYyZmQ4NDdhNDI5NzVlNmUwNjIwMjM3YWNiOTU2ZWNjNDdjNWU5MiJdLCJlbWFpbCI6ImFraXdha3lAZ21haWwuY29tIiwiZXhwIjoxNzcyOTg4ODg2LCJpYXQiOjE3NzI5MDI0ODYsIm5iZiI6MTc3MjkwMjQ4NiwiaXNzIjoiaHR0cHM6Ly9ha2l3YWt5LmNsb3VkZmxhcmVhY2Nlc3MuY29tIiwidHlwZSI6ImFwcCIsImlkZW50aXR5X25vbmNlIjoiZ1hEMUhtSlZpRVVadjlIMyIsInN1YiI6IjgxMTIzMTdmLTQ2YTUtNTc5Mi05MDhhLWExYTUwM2QyNzU4ZCIsImNvdW50cnkiOiJNWCIsInBvbGljeV9pZCI6ImZkY2MyNDRjLTM1NGQtNGJmZS1iNjljLTg1NmExYWU1ZWUyMSJ9.tY9-vCOiR5bMP7fbedRXY_hGOkX-ph5yi4vKCgYLCo-N0M51ZC23Fa8YYmWDG2EvDwQcNTE3UA8L6di3QCP7JWBxIE4Yjl8vIVLXIpLIrz1bZLit8UfIIPqww5uY7K_D-chrUM5T5msZMeSexLZ8ay8NipuGPL18khrfb0Y4IdVOQRyOlhmUxIIAYJiTpTHYcjtwFiB9pnCi_A3G1Iy9ZggKKvbXTR7Tr1Q_k8Y_e3Z31IVy9kR8tbIrG_rJo378826SkpFp6Yr6UstvskvsgERFXCPTdZhKksl1Q6bTtIAMWQHk_sK_ZZJFrRwVlZ87FZGXMP079x9pwHFXxLrQpA"
$n8nKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYzc4MDVjYi04Y2JmLTQzNjUtYTViYi0xZGMzYTE1OWUyNDkiLCJpc3MiOiJuOG4iLCJhdWQiOiJtY3Atc2VydmVyLWFwaSIsImp0aSI6ImRjZDUzOTA3LWY3ODEtNGFjMy1hMGE5LTI3ZGMyMTA2OTcxMiIsImlhdCI6MTc3MjY3NDgxMn0.axmNGg_STrBL518UPb2icHYekhHLJwa9Tw8ZgesdBcY"
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
