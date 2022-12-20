<#
.SYNOPSIS
    Locates references to SVG files
.DESCRIPTION
    A longer description of the function, its purpose, common use cases, etc.
.NOTES
    Information or caveats about the function e.g. 'This function is not supported in Linux'
.LINK
    Specify a URI to a help page, this will show when Get-Help -Online is used.
.EXAMPLE
    .\tools\Get-SvgFileReferences.ps1

    Path: C:\Users\YourUserName\source\repos\TravelerInformation\TravelerInformationCoreMap\src\assets\main.css

    Location                SVGFile
    --------                -------
    src\assets\main.css:154 ), url(https://wsdot.wa.gov/libraries/fontawesome/webfonts/fa-brands-400.svg
    src\assets\main.css:163 ), url(https://wsdot.wa.gov/libraries/fontawesome/webfonts/fa-light-300.svg
    src\assets\main.css:172 ), url(https://wsdot.wa.gov/libraries/fontawesome/webfonts/fa-regular-400.svg
    src\assets\main.css:181 ), url(https://wsdot.wa.gov/libraries/fontawesome/webfonts/fa-solid-900.svg
    src\assets\main.css:338 ./icons/candy-stripe-bar.svg

    Path: C:\Users\YourUserName\source\repos\TravelerInformation\TravelerInformationCoreMap\src\components\HeaderView.vue

    Location                         SVGFile
    --------                         -------
    src\components\HeaderView.vue:4  @/assets/wsdot-logo-white.svg
    src\components\HeaderView.vue:6  @/assets/wsdot-logo-white.svg
    src\components\HeaderView.vue:25 @/assets/wsdot-logo-white.svg
    src\components\HeaderView.vue:26 @/assets/wsdot-logo-black.svg

    Path: C:\Users\YourUserName\source\repos\TravelerInformation\TravelerInformationCoreMap\src\symbols\IconDefinitions.ts

    Location                           SVGFile
    --------                           -------
    src\symbols\IconDefinitions.ts:30  verticalClearanceLines.svg
    src\symbols\IconDefinitions.ts:135 fire icon.svg
    src\symbols\IconDefinitions.ts:169 alert icon.svg
    src\symbols\IconDefinitions.ts:189 Alert Icon Medium.svg
    src\symbols\IconDefinitions.ts:209 Alert Icon High.svg
    src\symbols\IconDefinitions.ts:229 Alert Icon High.svg
    src\symbols\IconDefinitions.ts:249 Alert Icon Highest.svg
    src\symbols\IconDefinitions.ts:269 Road Closure Icon.svg
    src\symbols\IconDefinitions.ts:351 DoNotEnterIcon.svg
#>



$ErrorActionPreference = 'Stop'

# Set-Location (Join-Path $PSScriptRoot ".." "src" | Resolve-Path)

$selections = Select-String -Pattern "[^`"']+\.svg" -Path .\src\**\*.* -AllMatches | Where-Object {
    # Exclude SVG files
    $_.Filename -inotmatch "\.((svg)|(ps1))$" -and $_.Matches.Value -inotcontains "url"
}

$selections 
| Select-Object -ExcludeProperty Line,Pattern,IgnoreCase
| Format-Table -GroupBy Path -Wrap -AutoSize -Property (
        @{
            Name="Location"
            Expression={
                $relPath = [System.IO.Path]::GetRelativePath(".", $_.Path)
                "$relPath`:$($_.LineNumber)"
            }
        },@{
            Name="SVGFile"
            Expression={$_.Matches.Value}
        }
    )
