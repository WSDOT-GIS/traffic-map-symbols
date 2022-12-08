$ErrorActionPreference = 'Stop'

Set-Location ([System.IO.DirectoryInfo]$PSScriptRoot).Parent

npx svgo --folder src --recursive --output optimized --pretty --exclude .\optimized
