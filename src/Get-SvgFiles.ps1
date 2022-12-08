using namespace Microsoft.PowerShell.Commands
using namespace System.IO

Set-Location $PSScriptRoot

class FileAndHash {
    [string]$Hash
    [FileInfo]$File

    FileAndHash([FileInfo]$file) {
        $this.Hash = (Get-FileHash $file).Hash
        $this.File = $file
    }
}

Get-ChildItem **\*.svg -Recurse | ForEach-Object {
    New-Object FileAndHash $_
} | Group-Object -Property Hash
