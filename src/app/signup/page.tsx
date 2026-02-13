'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Code2, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, Trophy, Target, TrendingUp } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-blue-400/5 pointer-events-none" />
        
        <div className="relative max-w-md w-full">
          <div className="bg-blue-950/30 border border-blue-900/30 rounded-2xl p-8 backdrop-blur-xl text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
            <p className="text-blue-300 mb-6">
              We've sent a verification email to <span className="font-semibold text-white">{email}</span>
            </p>
            <p className="text-sm text-blue-400">
              Check your inbox and verify your email to get started!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] flex">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-blue-400/5 pointer-events-none" />
      
      {/* Left Side - Signup Form */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">DSA Learn</h1>
              <p className="text-xs text-blue-400">Master Data Structures & Algorithms</p>
            </div>
          </div>

          {/* Signup Card */}
          <div className="bg-blue-950/30 border border-blue-900/30 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-blue-300 mb-8">Start your DSA journey today</p>

            <form onSubmit={handleSignup} className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="text-sm font-medium text-blue-300 mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-blue-900/20 border border-blue-800/50 rounded-xl text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="text-sm font-medium text-blue-300 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-blue-900/20 border border-blue-800/50 rounded-xl text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm font-medium text-blue-300 mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-blue-900/20 border border-blue-800/50 rounded-xl text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <p className="text-xs text-blue-400 mt-2">Must be at least 6 characters</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <span className="text-blue-300 text-sm">Already have an account? </span>
              <button
                onClick={() => router.push('/login')}
                className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-blue-400/60 mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Right Side - Features Showcase */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
        
        <div className="relative max-w-lg w-full space-y-6">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Master DSA, Get Hired
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">
              Learn Data Structures<br />& Algorithms
            </h3>
            <p className="text-blue-300 text-lg">
              Practice 60+ curated problems with AI-powered hints
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Trophy className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">60+ Problems</h4>
                  <p className="text-sm text-blue-300">
                    From basic to advanced, covering all major topics
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">AI Tutor</h4>
                  <p className="text-sm text-blue-300">
                    Get instant hints when you're stuck on a problem
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Track Progress</h4>
                  <p className="text-sm text-blue-300">
                    Monitor your streak and celebrate your achievements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">60+</div>
              <div className="text-xs text-blue-400">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-xs text-blue-400">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-xs text-blue-400">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}