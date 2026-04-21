import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { LLMModel } from '../data/models'

interface Props {
  models: LLMModel[]
}

const CustomDot = (props: Record<string, unknown>) => {
  const { cx, cy, payload } = props as { cx: number; cy: number; payload: { name: string; open: boolean } }
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={payload.open ? '#10b981' : '#8b5cf6'} fillOpacity={0.8} stroke="none" />
      <text x={cx + 7} y={cy + 4} fontSize={10} fill="#94a3b8">{payload.name.split(' ')[0]}</text>
    </g>
  )
}

export function CostSpeedChart({ models }: Props) {
  const data = models.map((m) => ({
    name: m.name,
    cost: m.inputCostPer1M,
    speed: m.tokensPerSecond,
    open: m.openSource,
  }))

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <h2 className="text-sm font-semibold text-slate-300 mb-1">Cost vs Speed</h2>
      <p className="text-xs text-slate-500 mb-4">Input $/1M tokens · tokens/sec</p>
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid stroke="#ffffff08" />
          <XAxis dataKey="cost" name="Cost" type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: '$/1M tokens', position: 'insideBottom', offset: -4, fill: '#64748b', fontSize: 11 }} />
          <YAxis dataKey="speed" name="Speed" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: 'tok/s', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: '#1e1e2e', border: '1px solid #ffffff20', borderRadius: 8, fontSize: 12 }}
            cursor={{ strokeDasharray: '3 3', stroke: '#ffffff20' }}
            formatter={(v, k) => [v, k === 'cost' ? '$/1M' : 'tok/s']}
          />
          <Scatter data={data} shape={<CustomDot />} />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2 justify-center text-xs text-slate-500">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Open source</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Closed source</div>
      </div>
    </div>
  )
}
