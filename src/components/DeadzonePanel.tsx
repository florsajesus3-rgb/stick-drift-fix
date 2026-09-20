import { percent } from '../lib/math'
import type { DeadzoneConfig, StickAxes } from '../lib/types'

interface DeadzonePanelProps {
  deadzone: DeadzoneConfig
  leftOffset: StickAxes
  rightOffset: StickAxes
  recommended: number
  onChange: (next: DeadzoneConfig) => void
  onCalibrate: () => void
  onResetOffsets: () => void
}

function Slider({
  label,
  value,
  onValue,
}: {
  label: string
  value: number
  onValue: (v: number) => void
}) {
  return (
    <label className="block">
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="font-mono text-cyan-300">{percent(value)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={0.4}
        step={0.01}
        value={value}
        onChange={(e) => onValue(Number(e.target.value))}
        className="w-full accent-cyan-400"
      />
    </label>
  )
}

export function DeadzonePanel({
  deadzone,
  leftOffset,
  rightOffset,
  recommended,
  onChange,
  onCalibrate,
  onResetOffsets,
}: DeadzonePanelProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Correction</h3>
          <p className="text-xs text-slate-500">
            Recommended deadzone from rest sample: <span className="text-cyan-300">{percent(recommended)}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCalibrate}
            className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Calibrate rest
          </button>
          <button
            type="button"
            onClick={onResetOffsets}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500"
          >
            Reset offsets
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Slider
          label="Left stick deadzone"
          value={Math.max(deadzone.leftX, deadzone.leftY)}
          onValue={(v) => onChange({ ...deadzone, leftX: v, leftY: v })}
        />
        <Slider
          label="Right stick deadzone"
          value={Math.max(deadzone.rightX, deadzone.rightY)}
          onValue={(v) => onChange({ ...deadzone, rightX: v, rightY: v })}
        />
        <label className="block">
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>Left outer clamp</span>
            <span className="font-mono text-cyan-300">{percent(deadzone.leftOuter)}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={1}
            step={0.01}
            value={deadzone.leftOuter}
            onChange={(e) => onChange({ ...deadzone, leftOuter: Number(e.target.value) })}
            className="w-full accent-cyan-400"
          />
        </label>
        <label className="block">
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>Right outer clamp</span>
            <span className="font-mono text-cyan-300">{percent(deadzone.rightOuter)}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={1}
            step={0.01}
            value={deadzone.rightOuter}
            onChange={(e) => onChange({ ...deadzone, rightOuter: Number(e.target.value) })}
            className="w-full accent-cyan-400"
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-900/80 p-3 text-xs text-slate-400">
        <div>
          Left offset{' '}
          <span className="font-mono text-slate-200">
            {leftOffset.x.toFixed(3)}, {leftOffset.y.toFixed(3)}
          </span>
        </div>
        <div>
          Right offset{' '}
          <span className="font-mono text-slate-200">
            {rightOffset.x.toFixed(3)}, {rightOffset.y.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  )
}
