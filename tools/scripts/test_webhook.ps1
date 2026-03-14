# Credentials loaded from environment variables — never hardcode here.
# Set before running: $env:CF_ACCESS_TOKEN="<your-cf-jwt>"
$cfCookie = $env:CF_ACCESS_TOKEN
if (-not $cfCookie) { Write-Error "CF_ACCESS_TOKEN must be set as an environment variable."; exit 1 }
$headers = @{
    "Cookie" = "CF_Authorization=$cfCookie"
}

$bodyHelp = @{ entry = @( @{ changes = @( @{ value = @{ contacts = @( @{ profile = @{ name = "Tester" } } ); messages = @( @{ from = "528155555555"; text = @{ body = "help" } } ) } } ) } ) } | ConvertTo-Json -Depth 10
$bodyStatus = @{ entry = @( @{ changes = @( @{ value = @{ contacts = @( @{ profile = @{ name = "Tester" } } ); messages = @( @{ from = "528155555555"; text = @{ body = "status" } } ) } } ) } ) } | ConvertTo-Json -Depth 10

Write-Host "--- TEST HELP ---"
$resp1 = Invoke-RestMethod -Uri "https://n8n.akiwaky.cloud/webhook/palnorte-inbound" -Method POST -Headers $headers -Body $bodyHelp -ContentType "application/json"
$resp1 | ConvertTo-Json -Depth 5

Write-Host "--- TEST STATUS ---"
$resp2 = Invoke-RestMethod -Uri "https://n8n.akiwaky.cloud/webhook/palnorte-inbound" -Method POST -Headers $headers -Body $bodyStatus -ContentType "application/json"
$resp2 | ConvertTo-Json -Depth 5
