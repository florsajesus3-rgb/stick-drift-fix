import type { StickProfile } from '../lib/types'

interface ProfilesPanelProps {
  profiles: StickProfile[]
  onSave: (name: string) => void
  onLoad: (profile: StickProfile) => void
  onDelete: (id: string) => void
}

export function ProfilesPanel({ profiles, onSave, onLoad, onDelete }: ProfilesPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-100">Saved profiles</h3>
        <button
          type="button"
          onClick={() => {
            const name = window.prompt('Profile name', `Profile ${profiles.length + 1}`)
            if (name?.trim()) onSave(name.trim())
          }}
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-white"
        >
          Save current
        </button>
      </div>
      {profiles.length === 0 ? (
        <p className="text-sm text-slate-500">No profiles yet. Calibrate, tune deadzones, then save.</p>
      ) : (
        <ul className="space-y-2">
          {profiles.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2"
            >
              <div>
                <div className="text-sm font-medium text-slate-100">{p.name}</div>
                <div className="text-xs text-slate-500">
                  {p.controllerId.toUpperCase()} · updated {new Date(p.updatedAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onLoad(p)}
                  className="rounded-md border border-cyan-500/40 px-2 py-1 text-xs text-cyan-300 hover:bg-cyan-500/10"
                >
                  Load
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(p.id)}
                  className="rounded-md border border-rose-500/30 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
