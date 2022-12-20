[CmdletBinding()]
param (
    # Specifies a path to one or more locations. Wildcards are permitted.
    [Parameter(Mandatory = $true,
        Position = 0,
        ParameterSetName = "ParameterSetName",
        ValueFromPipeline = $true,
        ValueFromPipelineByPropertyName = $true,
        HelpMessage = "Path to one or more locations.")]
    [ValidateNotNullOrEmpty()]
    [SupportsWildcards()]
    [Alias("PSPath")]
    [string[]]
    $PathToSvgFiles,

    [Parameter()]
    [uri]
    $ServiceUrl = "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/Symbols/SymbolServer/generateSymbol"
)

<#
.SYNOPSIS
    Convert an SVG file to CIM JSON using a web service.
.DESCRIPTION
    Calls the SymbolServer/generateSymbol REST endpoint to convert an SVG file to CIM JSON
#>
function GenerateSymbol {
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

Write-Progress $activity -PercentComplete 0

try {
    [int]$i = 0
    foreach ($svgFile in $svgFiles) {
        $outFile = $svgFile -ireplace "(?<=\.)svg$", "cim.json"
        Write-Progress $activity -CurrentOperation "Processing $($svgFile.Name)"
        Write-Debug "Current file: $svgFile Type $($svgFile.GetType())`nOutput file: $outFile"

        $symbolJson = GenerateSymbol($svgFile) 
        $symbolJson | Out-File $outFile -Encoding utf8
        $i++
        $pctComplete = ($i / $svgFileCount) * 100
        Write-Progress $activity -PercentComplete $pctComplete
    }
}
finally {
    Write-Progress $activity -Completed
}
