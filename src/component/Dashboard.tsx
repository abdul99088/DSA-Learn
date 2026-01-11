'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, Trophy, Target, TrendingUp, LogOut, Crown, Zap } from 'lucide-react'
import { topics } from '../lib/topics'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import PremiumModal from './PremiumModal'
import FeedbackButton from './FeedbackButton'

interface DashboardProps {
  onTopicSelect: (topic: any) => void
  isAdmin?: boolean
}

export default function Dashboard({ onTopicSelect, isAdmin = false }: DashboardProps) {
  const router = useRouter()
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userStats, setUserStats] = useState({
    problemsSolved: 0,
    currentStreak: 0,
    totalProblems: 57,
    progressPercentage: 0
  })

  useEffect(() => {
    checkPremiumStatus()
    fetchUserStats()
  }, [])

  useEffect(() => {
    console.log('🔔 Modal state changed:', showPremiumModal)
  }, [showPremiumModal])

  const fetchUserStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: solvedProblems, error: solvedError } = await supabase
        .from('user_progress')
        .select('problem_id, solved_at')
        .eq('user_id', user.id)
        .eq('status', 'solved')

      if (solvedError && solvedError.code !== 'PGRST116') {
        console.error('Error fetching stats:', solvedError)
        return
      }

      const problemsSolved = solvedProblems?.length || 0
      const totalProblems = 57
      const progressPercentage = totalProblems > 0 
        ? Math.round((problemsSolved / totalProblems) * 100) 
        : 0

      const streak = calculateStreak(solvedProblems || [])

      setUserStats({
        problemsSolved,
        currentStreak: streak,
        totalProblems,
        progressPercentage
      })
    } catch (err) {
      console.error('Failed to fetch user stats:', err)
    }
  }

  const calculateStreak = (solvedProblems: any[]) => {
    if (!solvedProblems || solvedProblems.length === 0) return 0

    const sortedDates = solvedProblems
      .map(p => new Date(p.solved_at).toDateString())
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    let streak = 0
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
      return 0
    }

    let currentDate = new Date()
    for (const dateStr of sortedDates) {
      const expectedDate = new Date(currentDate).toDateString()
      if (dateStr === expectedDate) {
        streak++
        currentDate = new Date(currentDate.getTime() - 86400000)
      } else {
        break
      }
    }

    return streak
  }

  const checkPremiumStatus = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw new Error('Authentication failed')
      if (!user) {
        setError('Please log in to access the dashboard')
        setLoading(false)
        return
      }

      if (!user.email_confirmed_at) {
        setError('Please verify your email address to access the dashboard. Check your inbox.')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('status')
        .eq('user_id', user.id)
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      
      setIsPremium(data?.status === 'active')
    } catch (err: any) {
      console.error('Premium check failed:', err)
      setError('Failed to load dashboard: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="text-white text-xl">Loading Dashboard...</div>
      </div>
    )
  }

  if (error) {
    const isEmailNotVerified = error.includes('verify your email')
    
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center flex-col">
        <div className="max-w-md w-full bg-blue-950/30 border border-blue-900/30 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            {isEmailNotVerified ? (
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            {isEmailNotVerified ? 'Email Verification Required' : 'Error'}
          </h2>
          <p className="text-blue-300 mb-6">{error}</p>
          <div className="flex gap-3">
            {isEmailNotVerified && (
              <button
                onClick={async () => {
                  try {
                    const { data: { user } } = await supabase.auth.getUser()
                    if (user?.email) {
                      await supabase.auth.resend({
                        type: 'signup',
                        email: user.email
                      })
                      alert('Verification email sent! Check your inbox.')
                    }
                  } catch (err) {
                    console.error('Resend error:', err)
                    alert('Failed to resend email')
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Resend Email
              </button>
            )}
            <button 
              onClick={handleSignOut} 
              className="flex-1 px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg hover:bg-blue-900/50 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      {/* DEBUG BOX */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'white',
        color: 'black',
        padding: '10px',
        borderRadius: '8px',
        zIndex: 999999,
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        Modal: {showPremiumModal ? '✅ OPEN' : '❌ CLOSED'}
      </div>

      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-blue-400/5 pointer-events-none" />
      
      <header className="relative border-b border-blue-900/30 backdrop-blur-xl bg-[#0D1230]/80 sticky top-0 z-40">
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
                  onClick={() => {
                    console.log('🎯 Go Pro clicked! Setting modal to true...')
                    setShowPremiumModal(true)
                    console.log('🎯 Modal state should now be true')
                  }}
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
              {isAdmin && (
                <button
                  onClick={() => router.push('/admin')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-all"
                >
                  Admin Panel
                </button>
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
                onClick={() => {
                  console.log('🎯 Banner button clicked!')
                  setShowPremiumModal(true)
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:from-blue-400 hover:to-cyan-400 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <Zap className="w-4 h-4" />
                Upgrade Now
              </button>
            </div>
          </div>
        )}

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
            <div className="text-3xl font-bold text-white">{userStats.progressPercentage}%</div>
            <div className="text-xs text-blue-400">complete</div>
          </div>
        </div>

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

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 to-cyan-950/30 border border-blue-900/30 text-center backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-2 text-white">Additional Resources</h3>
          <p className="text-blue-300">Coming soon</p>
        </div>
      </div>

      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={() => {
          console.log('🔴 Closing modal...')
          setShowPremiumModal(false)
        }}
        onSuccess={() => {
          console.log('✅ Payment success!')
          setShowPremiumModal(false)
          checkPremiumStatus()
        }}
      />

      <FeedbackButton />
    </div>
  )
}
