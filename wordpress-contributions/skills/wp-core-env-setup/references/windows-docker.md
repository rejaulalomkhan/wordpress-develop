# Windows: Docker Desktop + WSL 2 for wordpress-develop

1. Task Manager → Performance → CPU → "Virtualization: Enabled". If Disabled, enable Intel VT-x / AMD SVM in BIOS first.
2. Administrator PowerShell (Start → type powershell → right-click → Run as administrator):
   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -All -NoRestart
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux -All -NoRestart
   ```
   Both should report `RestartNeeded : True`.
3. Restart Windows.
4. Administrator PowerShell: `wsl --update`, then `wsl --status` → Default Version 2.
5. Open Docker Desktop, accept terms, wait for "Engine running" (bottom-left, green).
6. Normal PowerShell: `docker run --rm hello-world`.

## fnm (Node version manager)

```powershell
winget install Schniz.fnm
# add to $PROFILE:
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
# then, inside the repo:
fnm install
fnm use
```

Agents that spawn a fresh shell per command must load fnm at the start of each command.
