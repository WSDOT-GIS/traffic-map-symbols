# Change CWD to the directory the script is in.
Set-Location $PSScriptRoot

[regex]$commentRegex = '^\s*//.+$'

# Get all of the files that have lines where the entire line is a comment.
$tsFiles = Select-String -Path .\*.ts -Pattern $commentRegex -List | Select-Object -ExpandProperty Filename

$tsFiles | Foreach-Object -ThrottleLimit 5 -Parallel {
  #Action that will run in Parallel. Reference the current object via $PSItem and bring in outside variables with $USING:varname
  $backupName = "$(([System.IO.FileInfo]$_).BaseName).bak.ts"
  Copy-Item $_ $backupName
  if (Test-Path $backupName) {
    $text = Select-String -Pattern $USING:commentRegex -Path $_ -NotMatch -Raw #| Out-File $_ -Encoding utf8
    if ([string]::IsNullOrWhiteSpace($text)) {
      Write-Error "Selection text for $_ is empty."
    } else {
      Write-Host "Writing modified content to $_."
      $text | Out-File $_ -Encoding utf8
    }
  } else {
    Write-Error "Failed to create backup file $backupName."
  }
}
