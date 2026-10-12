---
name: wp-core-env-setup
description: "Use when setting up or repairing a local WordPress Core (wordpress-develop) environment for running PHPUnit, PHPCS and PHPStan: Docker/WSL, Node version via .nvmrc, npm env scripts, fork and upstream remotes."
compatibility: "Targets WordPress 7.0+ core trunk (PHP 7.4.0+). Windows 10/11 with WSL 2 and Docker Desktop; also works on macOS/Linux with Docker."
---

# WordPress Core environment setup

## When to use

- New machine, or `npm run test:php` / `npm run env:start` fails.
- Docker says the engine or Virtual Machine Platform is not available.
- `npm install` complains about the Node or npm version.

## Inputs required

- OS and whether the shell is elevated (never run Claude Code itself as Administrator).
- `git --version`, `node -v`, `npm -v`, `docker info` output.
- Path of the wordpress-develop clone and its remotes (`git remote -v`).

## Procedure

1. Repository
   - Clone the fork with `git clone -c core.autocrlf=input -c core.longpaths=true <fork-url>`.
   - `git remote add upstream https://github.com/WordPress/wordpress-develop` and `git fetch upstream trunk`.
2. Docker (Windows details in `references/windows-docker.md`)
   - Virtualization enabled → Virtual Machine Platform + WSL features → restart → `wsl --update`.
   - Docker Desktop shows "Engine running"; `docker run --rm hello-world` prints "Hello from Docker!".
3. Node
   - Use a version manager (fnm recommended on Windows) with `--use-on-cd`, and the version in `.nvmrc`.
   - Leave the global Node untouched for other projects. Use npm, not pnpm (the repo ships `package-lock.json`).
4. Build and start
   - `npm install`, `npm run build:dev`, `npm run env:start`, `npm run env:install`.
5. Smoke test
   - `npm run test:php -- --group widgets` → `OK (...)`.

## Verification

- `docker run --rm hello-world` succeeds.
- `node -v` inside the repo matches `.nvmrc`.
- The smoke test prints `OK` and exits 0.

## Failure modes / debugging

- `failed to connect to the docker API ... dockerDesktopLinuxEngine` → Docker Desktop not started yet; open it and wait for "Engine running".
- "Virtual Machine Platform not enabled" → enable the feature in an Administrator PowerShell and restart Windows (restarting Docker is not enough).
- `npm` warns that install scripts were skipped (npm 11) → ignore unless a build or watcher fails; then approve only that package's scripts.
- Tests "pass" suspiciously fast or show `Error establishing a database connection` → the DB container is down; restart with `npm run env:restart` and re-run, checking the exit code.
- A terminal opened before fnm was configured keeps the old Node → open a new terminal.

## Escalation

- Virtualization shows "Disabled" in Task Manager → needs a BIOS/UEFI change; ask the user for the PC model and stop.
- Corporate/managed machines: ask before changing Windows features.
