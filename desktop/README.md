# Stick Drift Fix — Windows remapper

Companion desktop shell for injecting corrected stick axes into games on **Windows 10**.

## Why desktop?

Browsers cannot present a virtual gamepad to other apps. This package uses:

- Electron (UI + Gamepad / raw input bridge)
- [ViGEmBus](https://github.com/nefarius/ViGEmBus/releases) — virtual Xbox 360 controller driver
- The same deadzone + recenter math as the web app

## Setup (Windows 10)

1. Install [ViGEmBus](https://github.com/nefarius/ViGEmBus/releases) (reboot if prompted).
2. Install Node.js 20+.
3. From repo root:

```bash
cd desktop
npm install
npm start
```

## Status

Scaffold + integration notes ship with this repo. Full ViGEm native bindings must be built on Windows (they do not compile on Linux CI). The web app is fully usable today for diagnosis, calibration, and guides; use Steam Input / Xbox Accessories as an interim remapper if you need in-game deadzones before the native bridge is finished on your machine.

## Steam tip

If a game sees both the physical pad and the virtual pad, disable the physical device in Steam → Settings → Controller, or hide it with HidHide.
