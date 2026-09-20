# Stick Drift Fix

Diagnose and mitigate analog stick drift for **DualShock 4 (PS4)**, **DualSense (PS5)**, and **Xbox Elite Series 2** on Windows 10.

## What this is

1. **Web app** (this folder) — live stick tester via the browser Gamepad API, deadzone + recenter calibration, saved profiles, and per-controller fix guides.
2. **Windows remapper** (`desktop/`) — applies the same correction and feeds a **ViGEm** virtual Xbox controller so games receive fixed sticks.

Software **cannot** permanently repair worn potentiometers. Remapping hides drift in software; cleaning or replacing stick modules is the lasting hardware fix.

## Quick start (website)

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Connect a controller and press a button.

**Browsers:** Chrome or Edge on Windows 10. Use localhost or HTTPS so the Gamepad API works reliably.

## Build static site

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host.

## Windows remapper

See [`desktop/README.md`](desktop/README.md) for ViGEmBus setup and running the Electron remapper on Windows 10.

## Workflow

1. Measure drift in the web tester with sticks at rest.
2. Click **Calibrate rest**, tune deadzones until corrected sticks sit at center.
3. Save a profile.
4. Run the desktop remapper so PC games see the corrected virtual pad.

## Disclaimer

Not affiliated with Sony Interactive Entertainment or Microsoft. Use hardware repairs at your own risk; opening a controller may void warranty.
