'use client'

import { useState } from 'react'
import { Play, Check, X, ArrowLeft, Code2, Terminal, BookOpen, CheckCircle } from 'lucide-react'
import { Problem } from '../lib/problems'

interface CodeEditorProps {
  problem: Problem
  onBack: () => void
}

interface TestResult {
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput: string
  error?: string
}

export default function CodeEditor({ problem, onBack }: CodeEditorProps) {
  const [code, setCode] = useState(problem.starterCode)
  const [activeTab, setActiveTab] = useState<'description' | 'solution'>('description')
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setShowResults(true)
    
    setTimeout(() => {
      const results: TestResult[] = problem.testCases.map((testCase) => {
        const passed = Math.random() > 0.3
        return {
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: passed ? testCase.expectedOutput : 'null',
          error: passed ? undefined : 'Output mismatch'
        }
      })
      setTestResults(results)
      setIsRunning(false)
    }, 1500)
  }

  const submitCode = () => {
    alert('Code submitted! 🎉')
  }

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed)
  const passedCount = testResults.filter(r => r.passed).length

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800/50 backdrop-blur-xl bg-zinc-900/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="h-6 w-px bg-zinc-800" />
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                problem.difficulty === 'basic' 
                  ? 'bg-green-500/10 text-green-400'
                  : problem.difficulty === 'medium'
                  ? 'bg-yellow-500/10 text-yellow-400'
                  : 'bg-red-500/10 text-red-400'
              }`}>
                {problem.difficulty.toUpperCase()}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-sm font-medium disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
                    Running
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run
                  </>
                )}
              </button>
              <button
                onClick={submitCode}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all text-sm font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid lg:grid-cols-2 divide-x divide-zinc-800/50">
        
        {/* Left - Problem Description */}
        <div className="flex flex-col overflow-hidden">
          <div className="flex border-b border-zinc-800/50">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'description'
                  ? 'text-white border-b-2 border-indigo-500'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Description
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-3">{problem.title}</h1>
              <p className="text-zinc-400 leading-relaxed">{problem.description}</p>
            </div>

            {problem.examples.map((example, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
                <div className="text-sm font-medium text-zinc-400 mb-3">Example {i + 1}</div>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-zinc-500">Input:</span>
                    <span className="text-green-400 ml-2">{example.input}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Output:</span>
                    <span className="text-blue-400 ml-2">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="pt-2 border-t border-zinc-800">
                      <span className="text-zinc-500">Explanation:</span>
                      <p className="text-zinc-400 mt-1">{example.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div>
              <h3 className="font-semibold mb-3">Constraints</h3>
              <ul className="space-y-2">
                {problem.constraints.map((constraint, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-zinc-600">•</span>
                    <span className="font-mono">{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right - Code Editor & Results */}
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50">
            <div className="flex items-center gap-2 text-zinc-400">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">Code</span>
            </div>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-6 bg-zinc-950 text-zinc-100 font-mono text-sm resize-none outline-none"
            spellCheck={false}
          />

          {/* Test Results */}
          {showResults && (
            <div className="border-t border-zinc-800/50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm font-medium">Test Results</span>
                </div>
                {testResults.length > 0 && (
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    allTestsPassed
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {passedCount}/{testResults.length} Passed
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                {testResults.map((result, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-4 border ${
                      result.passed
                        ? 'bg-green-500/5 border-green-500/20'
                        : 'bg-red-500/5 border-red-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {result.passed ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                        Test {i + 1}
                      </span>
                    </div>
                    
                    <div className="space-y-2 font-mono text-xs">
                      <div>
                        <span className="text-zinc-500">Input:</span>
                        <span className="text-zinc-300 ml-2">{result.input}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Expected:</span>
                        <span className="text-zinc-300 ml-2">{result.expectedOutput}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Got:</span>
                        <span className={`ml-2 ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                          {result.actualOutput}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}