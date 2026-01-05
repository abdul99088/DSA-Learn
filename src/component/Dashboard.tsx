'use client'

import { useState } from 'react'
import { ChevronRight, Trophy, Target, TrendingUp, LogOut, Crown, Zap } from 'lucide-react'
import { topics } from '../lib/topics'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import PremiumModal from './PremiumModal'

interface DashboardProps {
  onTopicSelect: (topic: any) => void
}

export default function Dashboard({ onTopicSelect }: DashboardProps) {
  const router = useRouter()
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const isPremium = false // Track premium status

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const userStats = {
    problemsSolved: 0,
    currentStreak: 0,
    totalProblems: 50
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b border-zinc-800/50 backdrop-blur-xl bg-[#13131A]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
                DS
              </div>
              <div>
                <h1 className="text-xl font-bold">DSA Learn</h1>
                <p className="text-xs text-zinc-500">Master algorithms</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!isPremium && (
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold text-sm hover:from-amber-400 hover:to-yellow-400 transition-all"
                >
                  <Crown className="w-4 h-4" />
                  Go Pro
                </button>
              )}
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Premium Banner */}
        {!isPremium && (
          <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Unlock Premium</h3>
                  <p className="text-sm text-zinc-400">Get 8+ advanced problems</p>
                </div>
              </div>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold hover:from-amber-400 hover:to-yellow-400 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Upgrade
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Solved</span>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold">{userStats.problemsSolved}</div>
            <div className="text-xs text-zinc-500">of {userStats.totalProblems}</div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Streak</span>
              <Target className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-3xl font-bold">{userStats.currentStreak}</div>
            <div className="text-xs text-zinc-500">days</div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Progress</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold">0%</div>
            <div className="text-xs text-zinc-500">complete</div>
          </div>
        </div>

        {/* Topics */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Topics</h2>
          <p className="text-zinc-400 text-sm">Choose a topic to start</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon
            const totalProblems = Object.values(topic.levels).reduce(
              (sum, level) => sum + level.problems,
              0
            )
            
            return (
              <button
                key={topic.id}
                onClick={() => onTopicSelect(topic)}
                className="group relative bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 text-left hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-zinc-800/50 group-hover:bg-indigo-500/10 transition-all">
                    <Icon className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-all" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">{topic.description}</p>
                
                <div className="text-xs text-zinc-500">
                  {totalProblems} problems
                </div>

                <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-0" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  )
}
