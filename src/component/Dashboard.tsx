'use client'

import { useState, useEffect } from 'react'
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
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkPremiumStatus()
  }, [])

  const checkPremiumStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('user_subscriptions')
          .select('status')
          .eq('user_id', user.id)
          .single()
        
        setIsPremium(data?.status === 'active')
      }
    } catch (error) {
      console.error('Error checking premium status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const userStats = {
    problemsSolved: 0,
    currentStreak: 0,
    totalProblems: 57
  }

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-blue-400/5 pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b border-blue-900/30 backdrop-blur-xl bg-[#0D1230]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
                DS
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DSA Learn</h1>
                <p className="text-xs text-blue-400">Master algorithms</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!isPremium && (
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:from-blue-400 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25"
                >
                  <Crown className="w-4 h-4" />
                  Go Pro
                </button>
              )}
              {isPremium && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                  <Crown className="w-4 h-4" />
                  Premium
                </div>
              )}
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-blue-300 hover:text-white hover:bg-blue-900/30 transition-all"
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
          <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/30 p-6 shadow-xl shadow-blue-500/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Unlock Premium</h3>
                  <p className="text-sm text-blue-300">Get access to 40+ advanced problems & premium features</p>
                </div>
              </div>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:from-blue-400 hover:to-cyan-400 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <Zap className="w-4 h-4" />
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-300">Solved</span>
              <Trophy className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">{userStats.problemsSolved}</div>
            <div className="text-xs text-blue-400">of {userStats.totalProblems}</div>
          </div>

          <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-300">Streak</span>
              <Target className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white">{userStats.currentStreak}</div>
            <div className="text-xs text-blue-400">days</div>
          </div>

          <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-300">Progress</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white">0%</div>
            <div className="text-xs text-blue-400">complete</div>
          </div>
        </div>

        {/* Topics */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white">Topics</h2>
          <p className="text-blue-300 text-sm">Choose a topic to start learning</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
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
                className="group relative bg-blue-950/30 border border-blue-900/30 rounded-xl p-6 text-left hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-900/30 group-hover:bg-blue-500/20 transition-all">
                    <Icon className="w-6 h-6 text-blue-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-600 group-hover:text-blue-400 transition-all" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm text-blue-300 mb-4">{topic.description}</p>
                
                <div className="text-xs text-blue-400">
                  {totalProblems} problems
                </div>

                <div className="mt-4 h-1 bg-blue-900/30 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-0" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 to-cyan-950/30 border border-blue-900/30 text-center backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-2 text-white">Additional Resources</h3>
          <p className="text-blue-300">Coming soon </p>
        </div>
      </div>

      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)}
        onSuccess={() => {
          setShowPremiumModal(false)
          setIsPremium(true)
        }}
      />
    </div>
  )
}