'use client'
import { useState } from 'react'
import { CheckCircle2, Circle, Code, Crown, Lock, ChevronLeft } from 'lucide-react'
import { getProblemsByTopicAndLevel, Problem } from '../lib/problems-complete'


import PremiumModal from './PremiumModal'

export default function ProblemList({ topic, topicName, level, onBack, onProblemSelect }: any) {
  const problems = getProblemsByTopicAndLevel(topic, level)

  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const handleProblemClick = (problem: Problem) => {
    if (problem.premium) setShowPremiumModal(true)
    else onProblemSelect(problem)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <button onClick={onBack} className="flex items-center gap-2 mb-6 text-zinc-400 hover:text-white transition-colors">
        <ChevronLeft size={20} /> Back to {topicName}
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold">{topicName}</h1>
          <p className="text-zinc-500 mt-2">{problems.length} Practice Problems</p>
        </div>
        <span className={`px-4 py-1 rounded-full text-xs font-bold border ${
          level === 'premium' ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500' : 
          level === 'hard' ? 'border-red-500/50 bg-red-500/10 text-red-500' :
          'border-zinc-700 bg-zinc-800'
        }`}>
          {level.toUpperCase()}
        </span>
      </div>

      <div className="grid gap-4">
        {problems.map((problem: Problem, index: number) => (
          <button 
            key={problem.id} 
            onClick={() => handleProblemClick(problem)}
            className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-zinc-600 font-mono w-6">{(index + 1).toString().padStart(2, '0')}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{problem.title}</h3>
                  {problem.company && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {problem.company}
                    </span>
                  )}
                  {problem.premium && <Crown size={14} className="text-yellow-500" />}
                </div>
                <p className="text-sm text-zinc-500 line-clamp-1">{problem.description}</p>
              </div>
            </div>
            {problem.premium ? <Lock size={18} className="text-zinc-600" /> : <Code size={18} className="text-zinc-600 group-hover:text-indigo-400" />}
          </button>
        ))}
      </div>
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  )
}

