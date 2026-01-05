'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, Code, Home, Crown, Lock } from 'lucide-react'
import { getProblemsByTopicAndLevel, Problem } from '../lib/problems'
import PremiumModal from './PremiumModal'

export interface ProblemListProps  {
  topic: string
  topicName: string
  level: string
  onBack: () => void
  onBackToDashboard: () => void
  onProblemSelect: (problem: Problem) => void
}

export default function ProblemList({
  topic,
  topicName,
  level,
  onBack,
  onBackToDashboard,
  onProblemSelect,
  ...rest
}: ProblemListProps & Record<string, any>) {
  


  const problems = getProblemsByTopicAndLevel(topic, level)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const handleProblemClick = (problem: Problem) => {
    if (problem.premium) {
      setShowPremiumModal(true)
    } else {
      onProblemSelect(problem)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b border-zinc-800/50 backdrop-blur-xl bg-[#13131A]/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToDashboard}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-all"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              <div className="h-6 w-px bg-zinc-700" />
              <button
                onClick={onBack}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {topicName}
              </button>
            </div>
            
            <div className={`px-4 py-2 rounded-lg text-xs font-bold ${
              level === 'basic' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : level === 'medium'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {level.toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
            {topicName} - {level}
          </h1>
          <p className="text-zinc-400">{problems.length} problems to master</p>
        </div>

        <div className="space-y-3 animate-fadeInUp">
          {problems.map((problem, index) => (
            <button
              key={problem.id}
              onClick={() => handleProblemClick(problem)}
              className="w-full group relative bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 rounded-xl p-5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all text-left overflow-hidden"
            >
              {problem.premium && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              <div className="relative flex items-center gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${
                  problem.completed 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : problem.premium
                    ? 'bg-amber-500/10 border-amber-500/20'
                    : 'bg-zinc-800/50 border-zinc-700/50'
                }`}>
                  {problem.premium ? (
                    <Crown className="w-5 h-5 text-amber-400" />
                  ) : problem.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-zinc-500 font-mono text-sm">#{index + 1}</span>
                    <h3 className="font-semibold group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                      {problem.title}
                      {problem.premium && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold rounded">
                          PRO
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 line-clamp-1">
                    {problem.description}
                  </p>
                </div>

                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    {problem.premium ? (
                      <Lock className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Code className="w-5 h-5 text-indigo-400" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  )
}