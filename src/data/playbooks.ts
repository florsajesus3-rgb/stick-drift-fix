import type { ControllerId } from '../lib/types'

export interface PlaybookStep {
  title: string
  body: string
}

export interface ControllerPlaybook {
  id: ControllerId
  name: string
  shortName: string
  blurb: string
  connection: string
  steps: PlaybookStep[]
  softwareTips: string[]
  cleaning: string[]
  hardware: string[]
}

export const PLAYBOOKS: ControllerPlaybook[] = [
  {
    id: 'ps4',
    name: 'DualShock 4 (PS4)',
    shortName: 'PS4',
    blurb: 'Common drift from worn potentiometers. Remap on PC; recalibrate on console when available.',
    connection: 'USB or Bluetooth. In Chrome/Edge on Windows, press any button after connecting.',
    steps: [
      {
        title: 'Measure the drift',
        body: 'Connect the DualShock 4, open the Tester tab, and leave both sticks untouched for 5 seconds. Note the center offset and recommended deadzone.',
      },
      {
        title: 'Apply a deadzone + recenter',
        body: 'Use Calibrate to capture the resting offset, then raise the deadzone until the corrected stick sits at 0,0. Save a profile.',
      },
      {
        title: 'Use the fixed output in games',
        body: 'Run the Windows desktop build (see README). It feeds a ViGEm virtual Xbox pad with corrected axes so Steam and most PC games see a stable stick.',
      },
      {
        title: 'Console path',
        body: 'On PS4, Settings → Devices → Controllers has limited options. Prefer cleaning or module replacement for persistent console drift.',
      },
    ],
    softwareTips: [
      'Steam → Controller settings: per-game deadzone and anti-drift for PS4 controllers.',
      'DS4Windows / Steam Input can apply deadzones if you are not using this app’s virtual pad.',
      'This website diagnoses and builds profiles; the Windows remapper injects the fix into games.',
    ],
    cleaning: [
      'Power off and disconnect the controller.',
      'Use short bursts of compressed air around the stick bases — do not jam the nozzle under the cap.',
      'Isopropyl alcohol (90%+) on a cotton swab around the base only; never soak the module.',
      'Avoid pulling the stick cap off unless you are doing a full module swap.',
    ],
    hardware: [
      'Most DualShock 4 drift is worn potentiometers in the stick module.',
      'Replacement modules are widely available; expect soldering or a plug-in module depending on revision.',
      'Hall-effect upgrade kits eliminate pot wear but require careful install and void warranty.',
    ],
  },
  {
    id: 'ps5',
    name: 'DualSense (PS5)',
    shortName: 'PS5',
    blurb: 'Same pot wear pattern as DS4. Excellent on PC via Bluetooth/USB; Edge/Chrome Gamepad API works well.',
    connection: 'USB-C or Bluetooth. Wake the pad with a button press so the browser sees it.',
    steps: [
      {
        title: 'Measure the drift',
        body: 'Connect DualSense, leave sticks centered, and read left/right offset in the Tester. Save the recommended deadzone.',
      },
      {
        title: 'Calibrate & profile',
        body: 'Capture recenter offsets, tune deadzones per stick, name the profile (e.g. “DualSense — living room”).',
      },
      {
        title: 'PC games',
        body: 'Use the Windows remapper so titles that only understand XInput get a corrected virtual controller.',
      },
      {
        title: 'PS5 console',
        body: 'Settings → Accessories → Controllers. Console tools are limited; cleaning or module replacement is the lasting fix for hardware wear.',
      },
    ],
    softwareTips: [
      'Steam Input supports DualSense with per-axis deadzones.',
      'DualSense Edge has hardware stick modules you can swap without soldering.',
      'Browser tester cannot rewrite DualSense firmware — remapping is the software fix.',
    ],
    cleaning: [
      'Same safe approach as DualShock 4: air + light IPA around stick skirts.',
      'Do not open the DualSense unless you are prepared for ribbon cables and calibration springs.',
    ],
    hardware: [
      'Stock DualSense uses potentiometer sticks that wear with time.',
      'DualSense Edge: replaceable stick modules are the cleanest hardware fix.',
      'Third-party Hall modules exist for standard DualSense; skill and tools required.',
    ],
  },
  {
    id: 'elite2',
    name: 'Xbox Elite Series 2',
    shortName: 'Elite 2',
    blurb: 'XInput on Windows. Pair with Xbox Accessories app profiles plus this tool’s deadzone math.',
    connection: 'Xbox Wireless / USB. Windows usually maps it as a standard XInput gamepad.',
    steps: [
      {
        title: 'Measure in-browser',
        body: 'Connect Elite Series 2, check resting offset. Elite sticks can feel “alive” at rest when pots are worn.',
      },
      {
        title: 'Xbox Accessories app',
        body: 'On Windows, open Xbox Accessories → configure → stick sensitivity / deadzone curves. Save to a profile slot on the controller when possible.',
      },
      {
        title: 'Layer this remapper',
        body: 'If Accessories curves are not enough, run the Windows remapper with a larger deadzone and recenter offset for stubborn drift.',
      },
      {
        title: 'Hardware',
        body: 'Elite Series 2 stick modules can be replaced; Microsoft has offered drift support programs in some regions — check current warranty/support options.',
      },
    ],
    softwareTips: [
      'Xbox Accessories (Microsoft Store) is the first stop for Elite Series 2 stick curves.',
      'Steam Input also exposes deadzones for XInput pads.',
      'This app’s virtual pad path helps when a game ignores Accessories profiles.',
    ],
    cleaning: [
      'Compressed air around sticks; avoid liquids inside the faceplate.',
      'Remove magnetic thumbstick tops and clean the shafts gently.',
    ],
    hardware: [
      'Stick modules are serviceable; use ESD-safe practices.',
      'If under warranty or covered by a drift program, prefer official support before DIY.',
    ],
  },
]
