'use client'

import { Lock, CheckCircle2, Circle, ChevronRight, Home } from 'lucide-react'

interface TopicViewProps {
  topic: any
  onBack: () => void
  onLevelSelect: (level: string) => void
}

export default function TopicView({ topic, onBack, onLevelSelect }: TopicViewProps) {
  const Icon = topic.icon

  const handleLevelClick = (level: string, data: any) => {
    if (data.unlocked) {
      onLevelSelect(level)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b border-zinc-800/50 backdrop-blur-xl bg-[#13131A]/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <Icon className="w-5 h-5 text-indigo-400 inline mr-2" />
                <span className="text-sm font-semibold">{topic.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
            {topic.name}
          </h1>
          <p className="text-zinc-400">{topic.description}</p>
        </div>

        <div className="grid gap-4 animate-fadeInUp">
          {Object.entries(topic.levels).map(([level, data]: [string, any]) => (
            <button
              key={level}
              onClick={() => handleLevelClick(level, data)}
              disabled={!data.unlocked}
              className={`relative rounded-2xl border p-6 transition-all text-left overflow-hidden ${
                data.unlocked
                  ? 'bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border-zinc-800/50 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer'
                  : 'bg-zinc-900/20 border-zinc-800/30 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${
                      data.completed
                        ? 'bg-emerald-500/10 border-emerald-500/20'
                        : data.unlocked
                        ? 'bg-indigo-500/10 border-indigo-500/20'
                        : 'bg-zinc-800/30 border-zinc-700/30'
                    }`}
                  >
                    {data.unlocked ? (
                      data.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-indigo-400" />
                      )
                    ) : (
                      <Lock className="w-6 h-6 text-zinc-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold capitalize mb-1">{level}</h3>
                    <p className="text-sm text-zinc-400">
                      {data.problems} problems {data.completed && '• Completed'}
                    </p>
                  </div>
                </div>
                {data.unlocked && <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}