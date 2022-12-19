<#
.SYNOPSIS
    Detects duplicate SVG files.
.DESCRIPTION
    Generates a hash for each SVG file in all subdirectories,
    then group the files by hash.
#>

# Determine where the project root is:
# the parent of this script's parent
# folder.
$root = Resolve-Path "$PSScriptRoot\.."

# Create the search path.
$searchPath = Join-Path $root "**\*.svg"

Write-Host "Search path: $searchPath"

# Get all the *.svg files...
Get-ChildItem $searchPath -Recurse 
# Get each file's hash...
| Get-FileHash 
# Group the files by hash
| Group-Object Hash 
# Select the groups that have more than one file
# with the same hash. These are the duplicates.
| Where-Object Count -GT 1
# Expand the "Group property"
| Select-Object -ExpandProperty Group
# Convert absolute paths to relative
| Select-Object -Property Hash,@{Name='RelativePath';Expression={
    [System.IO.Path]::GetRelativePath($root, $_.Path)}
}
| Format-Table RelativePath -GroupBy Hash -HideTableHeaders