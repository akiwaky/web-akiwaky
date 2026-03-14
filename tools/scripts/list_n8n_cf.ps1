# Credentials loaded from environment variables — never hardcode here.
# Set before running:
#   $env:N8N_API_KEY       = "<your-n8n-key>"
#   $env:CF_CLIENT_ID      = "<CF-Access-Client-Id>"
#   $env:CF_CLIENT_SECRET  = "<CF-Access-Client-Secret>"
$n8nKey   = $env:N8N_API_KEY
$cfId     = $env:CF_CLIENT_ID
$cfSecret = $env:CF_CLIENT_SECRET
if (-not $n8nKey -or -not $cfId -or -not $cfSecret) {
    Write-Error "N8N_API_KEY, CF_CLIENT_ID, and CF_CLIENT_SECRET must be set as environment variables."
    exit 1
}
$baseUrl = "https://n8n.akiwaky.cloud/api/v1"

$headers = @{}
$headers["X-N8N-API-KEY"]           = $n8nKey
$headers["CF-Access-Client-Id"]     = $cfId
$headers["CF-Access-Client-Secret"] = $cfSecret

try {
    $resp = Invoke-RestMethod -Uri "$baseUrl/workflows" -Method GET -Headers $headers
    $resp.data | Select-Object id, active, name | Format-Table -AutoSize
}
catch {
    Write-Host "Error: $_"
}
