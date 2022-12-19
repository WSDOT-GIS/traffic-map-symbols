$ErrorActionPreference = 'Stop'

Set-Location ([System.IO.DirectoryInfo]$PSScriptRoot).Parent

npx svgo --folder src --recursive --pretty
