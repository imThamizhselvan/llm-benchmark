import type { LLMModel } from '../data/models'

interface Props {
  models: LLMModel[]
  total: number
}

export function StatsBar({ models, total }: Props) {
  const fastest = models.reduce((a, b) => a.tokensPerSecond > b.tokensPerSecond ? a : b, models[0])
  const cheapest = models.reduce((a, b) => a.inputCostPer1M < b.inputCostPer1M ? a : b, models[0])
  const topMmlu = [...models].filter(m => m.benchmarks.mmlu !== null).sort((a, b) => (b.benchmarks.mmlu ?? 0) - (a.benchmarks.mmlu ?? 0))[0]

  const stats = [
    { label: 'Models shown', value: `${models.length} / ${total}` },
    { label: 'Fastest', value: fastest?.name ?? '—', sub: `${fastest?.tokensPerSecond} tok/s` },
    { label: 'Cheapest input', value: cheapest?.name ?? '—', sub: `$${cheapest?.inputCostPer1M}/1M` },
    { label: 'Top MMLU', value: topMmlu?.name ?? '—', sub: `${topMmlu?.benchmarks.mmlu}` },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-7xl mx-auto px-4 py-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
          <div className="text-xs text-slate-500 mb-1">{s.label}</div>
          <div className="text-sm font-semibold text-white truncate">{s.value}</div>
          {s.sub && <div className="text-xs text-violet-400 mt-0.5">{s.sub}</div>}
        </div>
      ))}
    </div>
  )
}
