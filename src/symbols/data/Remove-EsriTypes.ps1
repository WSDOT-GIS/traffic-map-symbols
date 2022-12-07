<#
.SYNOPSIS
  Removes __esri.* typing from objects declared in *.ts files
#>

$ErrorActionPreference = 'Stop'

Set-Location $PSScriptRoot

$esriRe = [regex]::new('(?<=const \w+):\s*__esri(\.\w+){1,}')

Get-ChildItem -Include "*.ts" -Recurse | Foreach-Object -ThrottleLimit 5 -Parallel {
  #Action that will run in Parallel. Reference the current object via $PSItem and bring in outside variables with $USING:varname

  $content = Get-Content $_ -Raw

  if (-not $content) {
    Write-Error "Content null from $_"
    continue
  }

  if (($USING:esriRe).IsMatch($content)) {
    $newContent = ($USING:esriRe).Replace($content, "")
    if (-not [string]::IsNullOrWhiteSpace( $newContent)) {
      Write-Host $newContent.Substring(0,100)
      $newContent | Out-File $_ -Encoding utf8
    } else {
      Write-Warning "$_`: replacement resulted in a null or empty string."
    }
  }
}