import { Globe, Lock, Zap, BookOpen } from 'lucide-react'
import type { LLMModel } from '../data/models'
import { ScoreBar } from './ScoreBar'

const providerColors: Record<string, string> = {
  OpenAI: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Anthropic: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Google: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Meta: 'bg-blue-600/20 text-blue-300 border-blue-600/30',
  DeepSeek: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Mistral: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Alibaba: 'bg-red-500/20 text-red-300 border-red-500/30',
  xAI: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  Moonshot: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
}

const providerCountry: Record<string, { flag: string; name: string }> = {
  OpenAI: { flag: '🇺🇸', name: 'USA' },
  Anthropic: { flag: '🇺🇸', name: 'USA' },
  Google: { flag: '🇺🇸', name: 'USA' },
  Meta: { flag: '🇺🇸', name: 'USA' },
  xAI: { flag: '🇺🇸', name: 'USA' },
  Mistral: { flag: '🇫🇷', name: 'France' },
  DeepSeek: { flag: '🇨🇳', name: 'China' },
  Alibaba: { flag: '🇨🇳', name: 'China' },
  Moonshot: { flag: '🇨🇳', name: 'China' },
}

const benchmarkColors: Record<string, string> = {
  mmlu: 'bg-violet-500',
  humaneval: 'bg-blue-500',
  math: 'bg-emerald-500',
  gsm8k: 'bg-amber-500',
  arc: 'bg-pink-500',
}

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return String(n)
}

export function ModelCard({ model }: { model: LLMModel }) {
  const badge = providerColors[model.provider] ?? 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  const country = providerCountry[model.provider]

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:border-violet-500/30 hover:bg-white/[0.06] transition-all group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors">{model.name}</h3>
          <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border mt-1 ${badge}`}>
            {model.provider}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {country && (
            <span
              className="text-sm leading-none"
              aria-label={country.name}
              title={country.name}
            >
              {country.flag}
            </span>
          )}
          {model.openSource ? (
            <Globe size={14} className="text-emerald-400" aria-label="Open source">
              <title>Open source</title>
            </Globe>
          ) : (
            <Lock size={14} className="text-slate-500" aria-label="Closed source">
              <title>Closed source</title>
            </Lock>
          )}
          {model.multimodal && (
            <BookOpen size={14} className="text-blue-400" aria-label="Multimodal">
              <title>Multimodal</title>
            </BookOpen>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-xs text-slate-500 mb-0.5">Context</div>
          <div className="text-xs font-mono text-slate-200">{fmt(model.contextWindow)}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-xs text-slate-500 mb-0.5">Input/1M</div>
          <div className="text-xs font-mono text-slate-200">${model.inputCostPer1M}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
          <div className="text-xs text-slate-500 mb-0.5">Speed</div>
          <div className="flex items-center gap-1">
            <Zap size={10} className="text-amber-400" />
            <span className="text-xs font-mono text-slate-200">{model.tokensPerSecond}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        {(Object.entries(model.benchmarks) as [string, number | null][]).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-xs text-slate-500 uppercase w-16 shrink-0">{key}</span>
            <ScoreBar value={val} color={benchmarkColors[key]} />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {model.tags.map((tag) => (
          <span key={tag} className="text-xs bg-white/5 text-slate-400 px-1.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
