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

$jsonPath = "C:\Antigravity\Repo-Web\scripts\n8n_workflows\PalNorte-SW-CMD-Lost.json"
$json = Get-Content -Raw -Path $jsonPath -Encoding utf8

try {
    $resp = Invoke-RestMethod -Uri "$baseUrl/workflows" -Method POST -Headers $headers -Body $json
    $resp | ConvertTo-Json -Depth 5 | Out-File -FilePath "C:\Antigravity\Repo-Web\scripts\debug_api.txt"
}
catch {
    $err = $_.Exception.Message
    if ($_.ErrorDetails) {
        $err += "`n" + $_.ErrorDetails.Message
    }
    $err | Out-File -FilePath "C:\Antigravity\Repo-Web\scripts\debug_api.txt"
}
