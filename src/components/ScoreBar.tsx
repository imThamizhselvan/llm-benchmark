interface Props {
  value: number | null
  max?: number
  color?: string
}

export function ScoreBar({ value, max = 100, color = 'bg-violet-500' }: Props) {
  if (value === null) return <span className="text-slate-600 text-xs">N/A</span>
  const pct = (value / max) * 100

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-300 w-9 text-right tabular-nums">{value.toFixed(1)}</span>
    </div>
  )
}
