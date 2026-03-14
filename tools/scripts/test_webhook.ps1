# Credentials loaded from environment variables — never hardcode here.
# Set before running:
#   $env:CF_CLIENT_ID      = "<CF-Access-Client-Id>"
#   $env:CF_CLIENT_SECRET  = "<CF-Access-Client-Secret>"
$cfId     = $env:CF_CLIENT_ID
$cfSecret = $env:CF_CLIENT_SECRET
if (-not $cfId -or -not $cfSecret) {
    Write-Error "CF_CLIENT_ID and CF_CLIENT_SECRET must be set as environment variables."
    exit 1
}
$headers = @{}
$headers["CF-Access-Client-Id"]     = $cfId
$headers["CF-Access-Client-Secret"] = $cfSecret

$bodyHelp = @{ entry = @( @{ changes = @( @{ value = @{ contacts = @( @{ profile = @{ name = "Tester" } } ); messages = @( @{ from = "528155555555"; text = @{ body = "help" } } ) } } ) } ) } | ConvertTo-Json -Depth 10
$bodyStatus = @{ entry = @( @{ changes = @( @{ value = @{ contacts = @( @{ profile = @{ name = "Tester" } } ); messages = @( @{ from = "528155555555"; text = @{ body = "status" } } ) } } ) } ) } | ConvertTo-Json -Depth 10

Write-Host "--- TEST HELP ---"
$resp1 = Invoke-RestMethod -Uri "https://n8n.akiwaky.cloud/webhook/palnorte-inbound" -Method POST -Headers $headers -Body $bodyHelp -ContentType "application/json"
$resp1 | ConvertTo-Json -Depth 5

Write-Host "--- TEST STATUS ---"
$resp2 = Invoke-RestMethod -Uri "https://n8n.akiwaky.cloud/webhook/palnorte-inbound" -Method POST -Headers $headers -Body $bodyStatus -ContentType "application/json"
$resp2 | ConvertTo-Json -Depth 5
