import { PLAYBOOKS } from '../data/playbooks'
import type { ControllerId } from '../lib/types'

interface ControllerPickerProps {
  value: ControllerId
  onChange: (id: ControllerId) => void
}

export function ControllerPicker({ value, onChange }: ControllerPickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {PLAYBOOKS.map((pb) => {
        const active = pb.id === value
        return (
          <button
            key={pb.id}
            type="button"
            onClick={() => onChange(pb.id)}
            className={`rounded-2xl border p-4 text-left transition ${
              active
                ? 'border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-950/30'
                : 'border-slate-800 bg-slate-950/50 hover:border-slate-600'
            }`}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300/80">{pb.shortName}</div>
            <div className="mt-1 text-sm font-semibold text-slate-100">{pb.name}</div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{pb.blurb}</p>
          </button>
        )
      })}
    </div>
  )
}
