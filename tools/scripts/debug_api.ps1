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
$headers["Content-Type"]            = "application/json"

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
