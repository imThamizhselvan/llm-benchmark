import { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { FilterBar } from './components/FilterBar'
import { ModelCard } from './components/ModelCard'
import { CompareChart } from './components/CompareChart'
import { CostSpeedChart } from './components/CostSpeedChart'
import { StatsBar } from './components/StatsBar'
import { models } from './data/models'
import type { LLMModel } from './data/models'

type View = 'grid' | 'charts'

export default function App() {
  const [search, setSearch] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortKey, setSortKey] = useState('mmlu')
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [view, setView] = useState<View>('grid')

  const filtered = useMemo(() => {
    let list = [...models]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q))
    }
    if (selectedProvider) list = list.filter((m) => m.provider === selectedProvider)
    if (selectedTag) list = list.filter((m) => m.tags.includes(selectedTag))
    if (showOpenOnly) list = list.filter((m) => m.openSource)

    list.sort((a, b) => {
      const aVal = sortKey in a.benchmarks
        ? ((a.benchmarks as Record<string, number | null>)[sortKey] ?? -1)
        : (a as unknown as Record<string, number>)[sortKey]
      const bVal = sortKey in b.benchmarks
        ? ((b.benchmarks as Record<string, number | null>)[sortKey] ?? -1)
        : (b as unknown as Record<string, number>)[sortKey]
      return (bVal as number) - (aVal as number)
    })

    return list as LLMModel[]
  }, [search, selectedProvider, selectedTag, sortKey, showOpenOnly])

  return (
    <div className="min-h-screen bg-[#0f0f13]">
      <Header />
      <FilterBar
        search={search} onSearch={setSearch}
        selectedProvider={selectedProvider} onProvider={setSelectedProvider}
        selectedTag={selectedTag} onTag={setSelectedTag}
        sortKey={sortKey} onSort={setSortKey}
        showOpenOnly={showOpenOnly} onOpenOnly={setShowOpenOnly}
      />

      <StatsBar models={filtered} total={models.length} />

      <div className="max-w-7xl mx-auto px-4 pb-2 flex items-center gap-2">
        <button
          onClick={() => setView('grid')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === 'grid' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
        >
          Cards
        </button>
        <button
          onClick={() => setView('charts')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === 'charts' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
        >
          Charts
        </button>
        <span className="ml-auto text-xs text-slate-600">{filtered.length} models</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        {view === 'grid' ? (
          filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No models match your filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((m) => <ModelCard key={m.id} model={m} />)}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CompareChart models={filtered} />
            <CostSpeedChart models={filtered} />
          </div>
        )}
      </main>
    </div>
  )
}
