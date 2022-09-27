<#
.SYNOPSIS
    Runs lint tool, sends output to HTML, then opens that HTML in the browser.
#>
$outDir = [System.IO.DirectoryInfo]"dist"
$htmlFile = [System.IO.FileInfo]"$outDir/lint-results.html"
Write-Host "Running vue-cli-service lint and writing output to $htmlFile."

# Create output directory if it does not already exist.
if (-not (Test-Path $outDir)) {
    New-Item $outDir -ItemType Directory
}

npx vue-cli-service lint --no-fix --format html | Out-File $htmlFile
Invoke-Expression $htmlFile