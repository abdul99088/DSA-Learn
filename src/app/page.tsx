'use client'

import { useState } from 'react'
import AuthView from '../component/AuthView'
import Dashboard from '../component/Dashboard'
import TopicView from '../component/TopicView'
import ProblemList from '../component/ProblemList'
import CodeEditor from '../component/CodeEditor'
import FeedbackButton from '../component/FeedbackButton'
import { Problem } from '../lib/problems'

export default function Home() {

  
  const [view, setView] = useState<
  'auth' | 'dashboard' | 'topic' | 'problems' | 'editor'
>('auth')


  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)

  const handleAuthSuccess = () => {
    setView('dashboard')
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

  return (
    <>
      {view === 'auth' && <AuthView onAuthSuccess={handleAuthSuccess} />}
      {view === 'dashboard' && <Dashboard onTopicSelect={handleTopicSelect} />}
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
          onBackToDashboard={handleBackToDashboard}
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








