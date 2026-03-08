$cfCookie = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwNjAzMDFmZjQ0OWE5YWJhMjMwNDQyYzdhOGU4ODE5M2UzODVjN2I4YjkyZTZlOThiZjhkZTIxYmM5OGU4NjAifQ.eyJhdWQiOlsiOGU2ODhkMzQzNmQxOWU4ZDk0ZjdlNGU1YWYyZmQ4NDdhNDI5NzVlNmUwNjIwMjM3YWNiOTU2ZWNjNDdjNWU5MiJdLCJlbWFpbCI6ImFraXdha3lAZ21haWwuY29tIiwiZXhwIjoxNzcyOTg4ODg2LCJpYXQiOjE3NzI5MDI0ODYsIm5iZiI6MTc3MjkwMjQ4NiwiaXNzIjoiaHR0cHM6Ly9ha2l3YWt5LmNsb3VkZmxhcmVhY2Nlc3MuY29tIiwidHlwZSI6ImFwcCIsImlkZW50aXR5X25vbmNlIjoiZ1hEMUhtSlZpRVVadjlIMyIsInN1YiI6IjgxMTIzMTdmLTQ2YTUtNTc5Mi05MDhhLWExYTUwM2QyNzU4ZCIsImNvdW50cnkiOiJNWCIsInBvbGljeV9pZCI6ImZkY2MyNDRjLTM1NGQtNGJmZS1iNjljLTg1NmExYWU1ZWUyMSJ9.tY9-vCOiR5bMP7fbedRXY_hGOkX-ph5yi4vKCgYLCo-N0M51ZC23Fa8YYmWDG2EvDwQcNTE3UA8L6di3QCP7JWBxIE4Yjl8vIVLXIpLIrz1bZLit8UfIIPqww5uY7K_D-chrUM5T5msZMeSexLZ8ay8NipuGPL18khrfb0Y4IdVOQRyOlhmUxIIAYJiTpTHYcjtwFiB9pnCi_A3G1Iy9ZggKKvbXTR7Tr1Q_k8Y_e3Z31IVy9kR8tbIrG_rJo378826SkpFp6Yr6UstvskvsgERFXCPTdZhKksl1Q6bTtIAMWQHk_sK_ZZJFrRwVlZ87FZGXMP079x9pwHFXxLrQpA"
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
