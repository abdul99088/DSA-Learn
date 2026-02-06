'use client'

import { useState, useEffect } from 'react'
import AuthView from '../component/AuthView'
import Dashboard from '../component/Dashboard'
import TopicView from '../component/TopicView'
import ProblemList from '../component/ProblemList'
import CodeEditor from '../component/CodeEditor-with-execution'
import FeedbackButton from '../component/FeedbackButton'
import { supabase } from '../lib/supabaseClient'
import { Problem } from '../lib/problems-complete'

export default function Home() {
  const [view, setView] = useState<
    'auth' | 'dashboard' | 'topic' | 'problems' | 'editor'
  >('auth')
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAuthAndAdmin()
  }, [])

  const checkAuthAndAdmin = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('Auth check error:', error)
        setView('auth')
        setIsLoading(false)
        return
      }

      if (user) {
        console.log('User found:', user.email)
        setView('dashboard')
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'avassayk@gmail.com'
        setIsAdmin(user.email === adminEmail)
      } else {
        console.log('No user logged in')
        setView('auth')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setView('auth')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthSuccess = () => {
    setView('dashboard')
    checkAuthAndAdmin()
  }

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic)
    setView('topic')
  }

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level)
    setView('problems')
  }

  const handleBackToDashboard = () => {
    setView('dashboard')
    setSelectedTopic(null)
    setSelectedLevel('')
    setSelectedProblem(null)
  }

  const handleBackToTopic = () => {
    setView('topic')
    setSelectedLevel('')
  }

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem)
    setView('editor')
  }

  const handleBackToProblems = () => {
    setView('problems')
    setSelectedProblem(null)
  }

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-300 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {view === 'auth' && <AuthView onAuthSuccess={handleAuthSuccess} />}
      {view === 'dashboard' && (
        <Dashboard onTopicSelect={handleTopicSelect} isAdmin={isAdmin} />
      )}
      {view === 'topic' && selectedTopic && (
        <TopicView 
          topic={selectedTopic} 
          onBack={handleBackToDashboard}
          onLevelSelect={handleLevelSelect}
        />
      )}
      {view === 'problems' && selectedTopic && (
        <ProblemList
          topic={selectedTopic.id}
          topicName={selectedTopic.name}
          level={selectedLevel}
          onBack={handleBackToTopic}
          onProblemSelect={handleProblemSelect}
        />
      )}
      {view === 'editor' && selectedProblem && (
        <CodeEditor
          problem={selectedProblem}
          onBack={handleBackToProblems}
        />
      )}
      
      {/* Feedback Button (shows on all pages except auth) */}
      {view !== 'auth' && <FeedbackButton />}
    </>
  )
}








