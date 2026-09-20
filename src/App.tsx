import { useEffect, useMemo, useState } from 'react'
import { Activity, Gamepad2, ShieldAlert, Wrench } from 'lucide-react'
import { ControllerPicker } from './components/ControllerPicker'
import { DeadzonePanel } from './components/DeadzonePanel'
import { PlaybookView } from './components/PlaybookView'
import { ProfilesPanel } from './components/ProfilesPanel'
import { StickPad } from './components/StickPad'
import { PLAYBOOKS } from './data/playbooks'
import { useGamepad } from './hooks/useGamepad'
import { correctSticks, magnitude, recommendDeadzone } from './lib/math'
import { createProfile, loadProfiles, saveProfiles } from './lib/profiles'
import {
  DEFAULT_DEADZONE,
  type ControllerId,
  type DeadzoneConfig,
  type StickAxes,
  type StickProfile,
} from './lib/types'

type Tab = 'tester' | 'guides' | 'remapper'

export default function App() {
  const { pads, active, selectedIndex, setSelectedIndex } = useGamepad(true)
  const [tab, setTab] = useState<Tab>('tester')
  const [controllerId, setControllerId] = useState<ControllerId>('ps5')
  const [deadzone, setDeadzone] = useState<DeadzoneConfig>({ ...DEFAULT_DEADZONE })
  const [leftOffset, setLeftOffset] = useState<StickAxes>({ x: 0, y: 0 })
  const [rightOffset, setRightOffset] = useState<StickAxes>({ x: 0, y: 0 })
  const [profiles, setProfiles] = useState<StickProfile[]>([])

  useEffect(() => {
    setProfiles(loadProfiles())
  }, [])

  const corrected = useMemo(() => {
    if (!active) {
      return {
        left: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
      }
    }
    return correctSticks(active.left, active.right, leftOffset, rightOffset, deadzone)
  }, [active, leftOffset, rightOffset, deadzone])

  const recommended = useMemo(() => {
    if (!active) return 0.12
    const sample = Math.max(magnitude(active.left), magnitude(active.right))
    return recommendDeadzone(sample)
  }, [active])

  const persist = (next: StickProfile[]) => {
    setProfiles(next)
    saveProfiles(next)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
            <Gamepad2 className="h-3.5 w-3.5" />
            Stick Drift Fix · Windows-ready
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Fix stick drift</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Diagnose DualShock 4, DualSense, and Xbox Elite Series 2 drift in the browser. Calibrate, apply
            deadzones, save profiles — then run the Windows remapper so games get corrected sticks.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/90">
          <div className="mb-1 flex items-center gap-1.5 font-semibold">
            <ShieldAlert className="h-3.5 w-3.5" />
            Honest limits
          </div>
          Software remaps worn pots; it does not permanently repair hardware.
        </div>
      </header>

      <ControllerPicker value={controllerId} onChange={setControllerId} />

      <nav className="mt-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {(
          [
            ['tester', 'Tester & calibrate', Activity],
            ['guides', 'Fix guides', Wrench],
            ['remapper', 'Windows remapper', Gamepad2],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              tab === id ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <main className="mt-6 space-y-6">
        {tab === 'tester' && (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              {pads.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm font-medium text-slate-200">No controller detected</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Plug in via USB or pair Bluetooth, then press any button. Use Chrome or Edge on Windows 10
                    over https or localhost.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <label className="text-xs text-slate-400">
                    Active pad
                    <select
                      className="ml-2 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100"
                      value={selectedIndex}
                      onChange={(e) => setSelectedIndex(Number(e.target.value))}
                    >
                      {pads.map((p) => (
                        <option key={p.index} value={p.index}>
                          #{p.index} — {p.id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <span className="text-xs text-emerald-400">Connected · {active?.buttons ?? 0} buttons</span>
                </div>
              )}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <StickPad
                label="Left stick"
                raw={active?.left ?? { x: 0, y: 0 }}
                corrected={corrected.left}
                deadzone={Math.max(deadzone.leftX, deadzone.leftY)}
              />
              <StickPad
                label="Right stick"
                raw={active?.right ?? { x: 0, y: 0 }}
                corrected={corrected.right}
                deadzone={Math.max(deadzone.rightX, deadzone.rightY)}
              />
            </div>

            <DeadzonePanel
              deadzone={deadzone}
              leftOffset={leftOffset}
              rightOffset={rightOffset}
              recommended={recommended}
              onChange={setDeadzone}
              onCalibrate={() => {
                if (!active) return
                setLeftOffset({ ...active.left })
                setRightOffset({ ...active.right })
                const rec = recommendDeadzone(
                  Math.max(magnitude(active.left), magnitude(active.right)),
                )
                setDeadzone((d) => ({
                  ...d,
                  leftX: Math.max(d.leftX, rec),
                  leftY: Math.max(d.leftY, rec),
                  rightX: Math.max(d.rightX, rec),
                  rightY: Math.max(d.rightY, rec),
                }))
              }}
              onResetOffsets={() => {
                setLeftOffset({ x: 0, y: 0 })
                setRightOffset({ x: 0, y: 0 })
              }}
            />

            <ProfilesPanel
              profiles={profiles.filter((p) => p.controllerId === controllerId)}
              onSave={(name) => {
                const profile = createProfile(name, controllerId, deadzone, leftOffset, rightOffset)
                persist([profile, ...profiles])
              }}
              onLoad={(p) => {
                setControllerId(p.controllerId)
                setDeadzone({ ...p.deadzone })
                setLeftOffset({ ...p.leftOffset })
                setRightOffset({ ...p.rightOffset })
              }}
              onDelete={(id) => persist(profiles.filter((p) => p.id !== id))}
            />
          </>
        )}

        {tab === 'guides' && <PlaybookView controllerId={controllerId} />}

        {tab === 'remapper' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h3 className="text-lg font-semibold text-slate-50">Windows remapper (in-game fix)</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                The browser can measure drift and design profiles, but games need a virtual controller. The
                companion Windows build in this repo reads your pad, applies the same deadzone + recenter math,
                and outputs a ViGEm virtual Xbox controller that Steam and most titles understand.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-300">
                <li>Install ViGEmBus on Windows 10 (link in README).</li>
                <li>
                  Clone <code className="rounded bg-slate-900 px-1 text-cyan-300">stick-drift-fix</code> and
                  run the desktop package from <code className="rounded bg-slate-900 px-1">desktop/</code>.
                </li>
                <li>Load the profile you saved here (exported as JSON) or recalibrate in the desktop UI.</li>
                <li>Hide the physical controller in Steam if the game sees double input.</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-sm text-slate-300">
              Active guide: <strong className="text-white">{PLAYBOOKS.find((p) => p.id === controllerId)?.name}</strong>
              . Prefer measuring here, then applying the same numbers in the remapper for consistent feel.
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-slate-900 pt-6 text-center text-xs text-slate-600">
        Stick Drift Fix · local profiles only · not affiliated with Sony or Microsoft
      </footer>
    </div>
  )
}
