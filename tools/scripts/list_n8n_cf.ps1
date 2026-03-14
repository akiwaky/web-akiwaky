# Credentials loaded from environment variables — never hardcode here.
# Set before running: $env:CF_ACCESS_TOKEN="<your-cf-jwt>" ; $env:N8N_API_KEY="<your-n8n-key>"
$cfCookie = $env:CF_ACCESS_TOKEN
$n8nKey   = $env:N8N_API_KEY
if (-not $cfCookie -or -not $n8nKey) { Write-Error "CF_ACCESS_TOKEN and N8N_API_KEY must be set as environment variables."; exit 1 }
$baseUrl = "https://n8n.akiwaky.cloud/api/v1"

$headers = @{
    "X-N8N-API-KEY" = $n8nKey
    "Cookie"        = "CF_Authorization=$cfCookie"
}

try {
    $resp = Invoke-RestMethod -Uri "$baseUrl/workflows" -Method GET -Headers $headers
    $resp.data | Select-Object id, active, name | Format-Table -AutoSize
}
catch {
    Write-Host "Error: $_"
}
