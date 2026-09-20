import { magnitude } from '../lib/math'
import type { StickAxes } from '../lib/types'

interface StickPadProps {
  label: string
  raw: StickAxes
  corrected: StickAxes
  deadzone: number
}

export function StickPad({ label, raw, corrected, deadzone }: StickPadProps) {
  const size = 200
  const cx = size / 2
  const cy = size / 2
  const radius = 78
  const rawX = cx + raw.x * radius
  const rawY = cy + raw.y * radius
  const corX = cx + corrected.x * radius
  const corY = cy + corrected.y * radius
  const dzR = deadzone * radius
  const rawMag = magnitude(raw)
  const corMag = magnitude(corrected)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl shadow-cyan-950/20">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-slate-200">{label}</h3>
        <span className="text-xs text-slate-500">raw {rawMag.toFixed(3)} · fixed {corMag.toFixed(3)}</span>
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-48 w-48" role="img" aria-label={`${label} stick visualization`}>
        <circle cx={cx} cy={cy} r={radius} fill="#020617" stroke="#1e293b" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={dzR} fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke="#1e293b" />
        <line x1={cx} y1={cy - radius} x2={cx} y2={cy + radius} stroke="#1e293b" />
        <circle cx={rawX} cy={rawY} r="7" fill="#f43f5e" opacity="0.85">
          <title>Raw</title>
        </circle>
        <circle cx={corX} cy={corY} r="8" fill="#22d3ee" stroke="#ecfeff" strokeWidth="1.5">
          <title>Corrected</title>
        </circle>
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div>
          <div className="text-rose-300">Raw</div>
          <div className="font-mono text-slate-200">
            {raw.x.toFixed(3)}, {raw.y.toFixed(3)}
          </div>
        </div>
        <div>
          <div className="text-cyan-300">Corrected</div>
          <div className="font-mono text-slate-200">
            {corrected.x.toFixed(3)}, {corrected.y.toFixed(3)}
          </div>
        </div>
      </div>
    </div>
  )
}
