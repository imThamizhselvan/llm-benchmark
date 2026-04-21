import { Search, SlidersHorizontal } from 'lucide-react'
import { providers, allTags } from '../data/models'

interface Props {
  search: string
  onSearch: (v: string) => void
  selectedProvider: string
  onProvider: (v: string) => void
  selectedTag: string
  onTag: (v: string) => void
  sortKey: string
  onSort: (v: string) => void
  showOpenOnly: boolean
  onOpenOnly: (v: boolean) => void
}

const sortOptions = [
  { value: 'mmlu', label: 'MMLU' },
  { value: 'humaneval', label: 'HumanEval' },
  { value: 'math', label: 'MATH' },
  { value: 'gsm8k', label: 'GSM8K' },
  { value: 'inputCostPer1M', label: 'Cost ↑' },
  { value: 'tokensPerSecond', label: 'Speed' },
  { value: 'contextWindow', label: 'Context' },
]

export function FilterBar({ search, onSearch, selectedProvider, onProvider, selectedTag, onTag, sortKey, onSort, showOpenOnly, onOpenOnly }: Props) {
  return (
    <div className="bg-black/20 border-b border-white/5 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search models..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
          />
        </div>

        <select
          value={selectedProvider}
          onChange={(e) => onProvider(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500/50"
        >
          <option value="">All providers</option>
          {providers.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        <select
          value={selectedTag}
          onChange={(e) => onTag(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500/50"
        >
          <option value="">All tags</option>
          {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <div className="flex items-center gap-2 text-sm">
          <SlidersHorizontal size={14} className="text-slate-500" />
          <span className="text-slate-400">Sort:</span>
          <select
            value={sortKey}
            onChange={(e) => onSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500/50"
          >
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showOpenOnly}
            onChange={(e) => onOpenOnly(e.target.checked)}
            className="accent-violet-500"
          />
          Open source only
        </label>
      </div>
    </div>
  )
}
