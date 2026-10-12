# Installs (or updates) the wp-core-contribute skill for Claude Code as a user-level skill.
# Usage, from the folder that contains this file:
#   powershell -ExecutionPolicy Bypass -File .\install.ps1

$ErrorActionPreference = 'Stop'

$source      = Join-Path $PSScriptRoot 'skills\wp-core-contribute'
$destination = Join-Path $HOME '.claude\skills\wp-core-contribute'

if ( -not ( Test-Path ( Join-Path $source 'SKILL.md' ) ) ) {
	throw "SKILL.md not found in $source"
}

New-Item -ItemType Directory -Force -Path $destination | Out-Null
Copy-Item -Path ( Join-Path $source '*' ) -Destination $destination -Recurse -Force

Write-Host "Installed wp-core-contribute skill to $destination"
Write-Host "Restart Claude Code, then type /wp-core-contribute or just describe a WordPress Core task."
