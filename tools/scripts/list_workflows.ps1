$key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYzc4MDVjYi04Y2JmLTQzNjUtYTViYi0xZGMzYTE1OWUyNDkiLCJpc3MiOiJuOG4iLCJhdWQiOiJtY3Atc2VydmVyLWFwaSIsImp0aSI6ImRjZDUzOTA3LWY3ODEtNGFjMy1hMGE5LTI3ZGMyMTA2OTcxMiIsImlhdCI6MTc3MjY3NDgxMn0.axmNGg_STrBL518UPb2icHYekhHLJwa9Tw8ZgesdBcY"
$h = @{"X-N8N-API-KEY" = $key }
$response = Invoke-WebRequest -Uri "https://n8n.akiwaky.cloud/api/v1/workflows" -Headers $h
$response.Content | Out-File -FilePath "C:\Antigravity\Repo-Web\scripts\workflows_raw.json" -Encoding utf8
Write-Output "Saved raw response"
