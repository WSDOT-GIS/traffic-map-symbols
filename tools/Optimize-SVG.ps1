<#
.SYNOPSIS
    Runs the svgo tool to optimize the SVG files in the repository.
.NOTES
    See https://github.com/svg/svgo
#>

# Stop the 
$ErrorActionPreference = 'Stop'

<#
.SYNOPSIS
    Adds the location of the SVGO executable to the "PATH" environment variable.
#>
function Add-SvgoToPath {
    # Create the path. node_modules is in the parent folder of this script.
    $svgoPath = Join-Path (Get-Item $PSScriptRoot).Parent "node_modules" ".bin" "svgo.ps1" 
    Write-Debug "SVGO path is $svgoPath"

    if (-not (Test-Path $svgoPath)) {
        throw New-Object System.IO.FileNotFoundException $svgoPath
    }

    # Split the path environment variable into an array of strings.
    $pathItems = $env:Path.Split(";")

    $pathItems += [System.IO.Path]::GetDirectoryName($svgoPath)

    $env:Path = [string]::Join(";", $pathItems)
}

Add-SvgoToPath

svgo --folder src --recursive
