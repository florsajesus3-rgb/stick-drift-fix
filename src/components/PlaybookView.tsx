import { PLAYBOOKS } from '../data/playbooks'
import type { ControllerId } from '../lib/types'

export function PlaybookView({ controllerId }: { controllerId: ControllerId }) {
  const pb = PLAYBOOKS.find((p) => p.id === controllerId)!
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
        <h3 className="text-lg font-semibold text-slate-50">{pb.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{pb.connection}</p>
      </div>

      <section>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Fix playbook</h4>
        <ol className="space-y-3">
          {pb.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs font-semibold text-cyan-300">
                Step {i + 1} — {step.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <InfoCard title="Software tips" items={pb.softwareTips} />
        <InfoCard title="Safe cleaning" items={pb.cleaning} />
        <InfoCard title="Hardware path" items={pb.hardware} />
      </div>
    </div>
  )
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <h4 className="text-sm font-semibold text-slate-100">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-400">
        {items.map((item) => (
          <li key={item} className="leading-relaxed">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
