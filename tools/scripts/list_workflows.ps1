# Credentials loaded from environment variables — never hardcode here.
# Set before running: $env:N8N_API_KEY="<your-n8n-key>"
$key = $env:N8N_API_KEY
if (-not $key) { Write-Error "N8N_API_KEY must be set as an environment variable."; exit 1 }
$h = @{"X-N8N-API-KEY" = $key }
$response = Invoke-WebRequest -Uri "https://n8n.akiwaky.cloud/api/v1/workflows" -Headers $h
$response.Content | Out-File -FilePath "C:\Antigravity\Repo-Web\scripts\workflows_raw.json" -Encoding utf8
Write-Output "Saved raw response"
