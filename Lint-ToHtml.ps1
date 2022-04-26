<#
.SYNOPSIS
    Runs lint tool, sends output to HTML, then opens that HTML in the browser.
#>
$htmlFile = [System.IO.FileInfo]"dist/lint-results.html"
Write-Host "Running vue-cli-service lint and writing output to $htmlFile."

npx vue-cli-service lint --no-fix --format html | Out-File $htmlFile
Invoke-Expression $htmlFile