import { Cpu, TrendingUp } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="flex items-center gap-2 text-violet-400">
          <Cpu size={22} />
          <TrendingUp size={18} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-none">LLM Benchmark</h1>
          <p className="text-xs text-slate-400 mt-0.5">Compare AI models at a glance</p>
        </div>
        <span className="ml-auto text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full">
          {new Date().toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
        </span>
      </div>
    </header>
  )
}
