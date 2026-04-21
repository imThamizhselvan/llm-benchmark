export interface LLMModel {
  id: string
  name: string
  provider: string
  releaseDate: string
  contextWindow: number
  inputCostPer1M: number
  outputCostPer1M: number
  tokensPerSecond: number
  multimodal: boolean
  openSource: boolean
  benchmarks: {
    mmlu: number | null
    humaneval: number | null
    math: number | null
    gsm8k: number | null
    arc: number | null
  }
  tags: string[]
}

export const models: LLMModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    releaseDate: '2024-05',
    contextWindow: 128000,
    inputCostPer1M: 2.5,
    outputCostPer1M: 10.0,
    tokensPerSecond: 110,
    multimodal: true,
    openSource: false,
    benchmarks: { mmlu: 88.7, humaneval: 90.2, math: 76.6, gsm8k: 97.2, arc: 96.4 },
    tags: ['flagship', 'multimodal', 'fast'],
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    releaseDate: '2024-07',
    contextWindow: 128000,
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.6,
    tokensPerSecond: 180,
    multimodal: true,
    openSource: false,
    benchmarks: { mmlu: 82.0, humaneval: 87.2, math: 70.2, gsm8k: 93.1, arc: 93.5 },
    tags: ['budget', 'fast', 'multimodal'],
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    releaseDate: '2025-07',
    contextWindow: 200000,
    inputCostPer1M: 15.0,
    outputCostPer1M: 75.0,
    tokensPerSecond: 60,
    multimodal: true,
    openSource: false,
    benchmarks: { mmlu: 90.4, humaneval: 92.1, math: 85.3, gsm8k: 98.1, arc: 97.2 },
    tags: ['flagship', 'reasoning', 'multimodal'],
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    releaseDate: '2025-07',
    contextWindow: 200000,
    inputCostPer1M: 3.0,
    outputCostPer1M: 15.0,
    tokensPerSecond: 95,
    multimodal: true,
    openSource: false,
    benchmarks: { mmlu: 88.3, humaneval: 90.7, math: 82.1, gsm8k: 97.8, arc: 96.8 },
    tags: ['balanced', 'coding', 'multimodal'],
  },
  {
    id: 'claude-haiku-4',
    name: 'Claude Haiku 4',
    provider: 'Anthropic',
    releaseDate: '2025-10',
    contextWindow: 200000,
    inputCostPer1M: 0.8,
    outputCostPer1M: 4.0,
    tokensPerSecond: 200,
    multimodal: true,
    openSource: false,
    benchmarks: { mmlu: 83.1, humaneval: 84.9, math: 71.4, gsm8k: 94.5, arc: 94.1 },
    tags: ['budget', 'fast', 'multimodal'],
  },
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    releaseDate: '2025-02',
    contextWindow: 1000000,
    inputCostPer1M: 0.1,
    outputCostPer1M: 0.4,
    tokensPerSecond: 250,
    multimodal: true,
    openSource: false,
    benchmarks: { mmlu: 85.2, humaneval: 83.5, math: 74.1, gsm8k: 95.2, arc: 94.8 },
    tags: ['budget', 'fast', 'long-context', 'multimodal'],
  },
  {
    id: 'gemini-2-pro',
    name: 'Gemini 2.0 Pro',
    provider: 'Google',
    releaseDate: '2025-02',
    contextWindow: 2000000,
    inputCostPer1M: 1.25,
    outputCostPer1M: 5.0,
    tokensPerSecond: 120,
    multimodal: true,
    openSource: false,
    benchmarks: { mmlu: 89.1, humaneval: 88.2, math: 80.4, gsm8k: 97.0, arc: 96.1 },
    tags: ['flagship', 'long-context', 'multimodal'],
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    releaseDate: '2024-12',
    contextWindow: 128000,
    inputCostPer1M: 0.23,
    outputCostPer1M: 0.4,
    tokensPerSecond: 90,
    multimodal: false,
    openSource: true,
    benchmarks: { mmlu: 86.0, humaneval: 88.4, math: 77.0, gsm8k: 95.1, arc: 95.5 },
    tags: ['open-source', 'efficient'],
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    releaseDate: '2025-01',
    contextWindow: 128000,
    inputCostPer1M: 0.55,
    outputCostPer1M: 2.19,
    tokensPerSecond: 45,
    multimodal: false,
    openSource: true,
    benchmarks: { mmlu: 90.8, humaneval: 92.6, math: 97.3, gsm8k: 97.3, arc: null },
    tags: ['open-source', 'reasoning', 'math'],
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    provider: 'Mistral',
    releaseDate: '2024-07',
    contextWindow: 128000,
    inputCostPer1M: 2.0,
    outputCostPer1M: 6.0,
    tokensPerSecond: 85,
    multimodal: false,
    openSource: false,
    benchmarks: { mmlu: 84.0, humaneval: 92.0, math: 69.9, gsm8k: 93.0, arc: null },
    tags: ['coding', 'multilingual'],
  },
  {
    id: 'qwen-2-5-72b',
    name: 'Qwen 2.5 72B',
    provider: 'Alibaba',
    releaseDate: '2024-09',
    contextWindow: 131072,
    inputCostPer1M: 0.4,
    outputCostPer1M: 1.2,
    tokensPerSecond: 75,
    multimodal: false,
    openSource: true,
    benchmarks: { mmlu: 86.1, humaneval: 86.9, math: 83.1, gsm8k: 95.9, arc: null },
    tags: ['open-source', 'multilingual', 'math'],
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    provider: 'xAI',
    releaseDate: '2025-02',
    contextWindow: 131072,
    inputCostPer1M: 3.0,
    outputCostPer1M: 15.0,
    tokensPerSecond: 70,
    multimodal: false,
    openSource: false,
    benchmarks: { mmlu: 90.1, humaneval: 88.5, math: 93.3, gsm8k: 97.0, arc: null },
    tags: ['reasoning', 'math'],
  },
]

export const providers = [...new Set(models.map((m) => m.provider))]
export const allTags = [...new Set(models.flatMap((m) => m.tags))]
