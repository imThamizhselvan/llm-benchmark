import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import type { LLMModel } from '../data/models'

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

interface Props {
  models: LLMModel[]
}

export function CompareChart({ models }: Props) {
  const top5 = models.slice(0, 6)

  const benchmarks = ['mmlu', 'humaneval', 'math', 'gsm8k', 'arc'] as const

  const data = benchmarks.map((key) => ({
    subject: key.toUpperCase(),
    ...Object.fromEntries(top5.map((m) => [m.name, m.benchmarks[key] ?? 0])),
  }))

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <h2 className="text-sm font-semibold text-slate-300 mb-4">Benchmark Radar (top {top5.length})</h2>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="#ffffff15" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: '#1e1e2e', border: '1px solid #ffffff20', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          {top5.map((m, i) => (
            <Radar
              key={m.id}
              name={m.name}
              dataKey={m.name}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.08}
              strokeWidth={1.5}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        {top5.map((m, i) => (
          <div key={m.id} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
            {m.name}
          </div>
        ))}
      </div>
    </div>
  )
}
