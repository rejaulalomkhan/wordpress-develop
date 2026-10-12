# Installs (or updates) every skill in this repository as a user-level Claude Code skill.
# Usage, from the repository root:
#   powershell -ExecutionPolicy Bypass -File .\install.ps1

$ErrorActionPreference = 'Stop'

$sourceRoot = Join-Path $PSScriptRoot 'skills'
$targetRoot = Join-Path $HOME '.claude\skills'

if ( -not ( Test-Path $sourceRoot ) ) {
	throw "skills folder not found next to install.ps1"
}

New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null

$installed = @()
foreach ( $skill in Get-ChildItem -Path $sourceRoot -Directory ) {
	if ( -not ( Test-Path ( Join-Path $skill.FullName 'SKILL.md' ) ) ) {
		Write-Warning "Skipping $($skill.Name): no SKILL.md"
		continue
	}
	$destination = Join-Path $targetRoot $skill.Name
	if ( Test-Path $destination ) {
		Remove-Item -Recurse -Force $destination
	}
	Copy-Item -Path $skill.FullName -Destination $destination -Recurse -Force
	$installed += $skill.Name
}

# Remove the earlier single-skill install if present.
$legacy = Join-Path $targetRoot 'wp-core-contribute'
if ( Test-Path $legacy ) {
	Remove-Item -Recurse -Force $legacy
	Write-Host "Removed old skill: wp-core-contribute"
}

Write-Host "Installed $($installed.Count) skills to ${targetRoot}:"
$installed | ForEach-Object { Write-Host "  - $_" }
Write-Host "Restart Claude Code to load them."
