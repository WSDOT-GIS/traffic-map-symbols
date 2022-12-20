<#
.SYNOPSIS
    Converts SVG files into CIM JSON using a web service.
.DESCRIPTION
    Uses the ArcGIS REST API SymbolServer/generateSymbol REST endpoint to convert SVG files to CIM JSON.
#>
using namespace System.IO

[CmdletBinding()]
param (
    # Specifies a path to one or more locations. Wildcards are permitted.
    [Parameter(Mandatory = $true,
        Position = 0,
        ValueFromPipeline = $true,
        ValueFromPipelineByPropertyName = $true,
        HelpMessage = "Path to one or more locations.")]
    [ValidateNotNullOrEmpty()]
    [SupportsWildcards()]
    [Alias("PSPath")]
    [string[]]
    $PathToSvgFiles,

    # Directory where JSON files will be written to
    [Parameter(
        Mandatory,
        Position = 1,
        HelpMessage = "Directory to which JSON files will be written."
    )]
    [ValidateNotNullOrEmpty()]
    [DirectoryInfo]
    $OutDirectory,

    [Parameter()]
    [uri]
    $ServiceUrl = "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/Symbols/SymbolServer/generateSymbol"
)

Set-Variable ErrorActionPreference -Value "Stop" -Scope Script

# Create the output directory if it does not already exist

if (-not (Test-Path $OutDirectory)) {
    Write-Host "Creating output directory $OutDirectory"
    New-Item $OutDirectory -ItemType Directory | Write-Host
}

<#
.SYNOPSIS
    Convert an SVG file to CIM JSON using a web service.
.DESCRIPTION
    Calls the SymbolServer/generateSymbol REST endpoint to convert an SVG file to CIM JSON
#>
function GenerateSymbol {
    [CmdletBinding()]
    param (
        [System.IO.FileInfo]
        $SvgFile
    )
    $Form = @{
        svgImage = Get-Item -Path $SvgFile
        f        = "json"
    }

    # See https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.2&WT.mc_id=ps-gethelp#example-6-simplified-multipart-form-data-submission

    $Response = Invoke-WebRequest -Uri $ServiceUrl -Method Post -Form $Form
    | Select-Object -ExpandProperty Content
    return $Response
}

Write-Debug "SVG File: $($PathToSvgFiles | ConvertTo-Json -Compress). Type: $($PathToSvgFiles.GetType())"

$svgFiles = Convert-Path $PathToSvgFiles

Write-Debug "SVG Files: $svgFiles. Type $($svgFiles.GetType())"

Write-Debug "Service URL: $ServiceUrl. Type $($ServiceUrl.GetType())"


$activity = "Converting SVG files to CIM JSON"

$svgFileCount = $svgFiles.Length
$pctComplete = 0

Write-Progress $activity -PercentComplete $pctComplete

try {
    [int]$i = 0
    foreach ($svgFile in $svgFiles) {
        $filename = "$(Split-Path $svgFile -LeafBase).cim.json"
        $outFile = Join-Path $OutDirectory $filename

        Write-Progress $activity -Status "Processing $filename" -PercentComplete $pctComplete
        Write-Debug "Current file: $svgFile Type $($svgFile.GetType())`nOutput file: $outFile"

        $symbolJson = GenerateSymbol($svgFile) 
        $i++
        $pctComplete = ($i / $svgFileCount) * 100
        Write-Progress $activity -PercentComplete $pctComplete
        $symbolJson | Out-File $outFile -Encoding utf8
    }
}
finally {
    Write-Progress $activity -Completed
}
