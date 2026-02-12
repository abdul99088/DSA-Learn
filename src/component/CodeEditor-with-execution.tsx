'use client'

import { useState } from 'react'
import { Play, ArrowLeft, Terminal, BookOpen, Zap, Sparkles } from 'lucide-react'
import { Problem, ProgrammingLanguage } from '../lib/problems-complete'
import { executeCode } from '../lib/codeRunner'
import { supabase } from '../lib/supabaseClient'

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

const languageConfig = {
  python: { name: 'Python', extension: '.py', color: 'from-blue-500 to-yellow-500' },
  cpp: { name: 'C++', extension: '.cpp', color: 'from-blue-600 to-purple-600' },
  java: { name: 'Java', extension: '.java', color: 'from-red-500 to-orange-500' }
}

export default function CodeEditor({ problem, onBack }: CodeEditorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('python')
  const [code, setCode] = useState(problem?.starterCode?.[selectedLanguage] || "")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [aiHint, setAiHint] = useState("")
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleLanguageChange = (lang: ProgrammingLanguage) => {
    setSelectedLanguage(lang)
    setCode(problem?.starterCode?.[lang] || "")
    setTestResults([])
    setShowResults(false)
    setAiHint("")
  }

  const askAI = async () => {
    if (!problem) return;
    setAiHint(""); 
    setIsAiLoading(true);
    
    try {
      // Get the first error if tests failed, or a default message
      const lastError = testResults.find(r => !r.passed)?.error || "Logic check needed";
      
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: problem.title,
          userCode: code,
          language: selectedLanguage,
          error: lastError
        }),
        cache: 'no-store' 
      });

      const data = await res.json();

      if (!res.ok) {
        // This will now show the SPECIFIC debug error from your route.ts
        setAiHint(data.hint || "AI is taking a break. Try again.");
      } else {
        setAiHint(data.hint);
      }
    } catch (e: any) {
      setAiHint("Connection failed. Check your Internet or Terminal.");
      console.error("Frontend Fetch Error:", e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const runCode = async () => {
    if (!problem) return;
    setIsRunning(true)
    setShowResults(true)
    setTestResults([])

    try {
      const results: TestResult[] = []
      for (const testCase of (problem?.testCases || [])) {
        const result = await executeCode(code, testCase, selectedLanguage)
        results.push({
          passed: result.passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.actualOutput,
          error: result.error
        })
      }
      setTestResults(results)

      const allPassed = results.length > 0 && results.every(r => r.passed)
      if (allPassed) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user && problem?.id) {
          await supabase.from('user_progress').upsert({
            user_id: user.id,
            problem_id: problem.id,
            status: 'solved',
            solved_at: new Date().toISOString()
          }, { onConflict: 'user_id, problem_id' })
        }
      }
    } catch (error) {
      console.error('Execution error:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed)
  const passedCount = testResults.filter(r => r.passed).length

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b border-zinc-800/50 backdrop-blur-xl bg-zinc-900/30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="h-6 w-px bg-zinc-800" />
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              problem?.difficulty === 'basic' ? 'bg-green-500/10 text-green-400' : 
              problem?.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {problem?.difficulty?.toUpperCase() || 'UNKNOWN'}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={runCode} disabled={isRunning} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-medium disabled:opacity-50">
              {isRunning ? <div className="w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
              Run Code
            </button>
            <button onClick={() => { if(allTestsPassed) alert('✅ Success!'); }} disabled={isRunning} className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-sm font-medium">
              Submit
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2 divide-x divide-zinc-800/50">
        <div className="flex flex-col overflow-hidden">
          <div className="flex border-b border-zinc-800/50">
            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white border-b-2 border-indigo-500">
              <BookOpen className="w-4 h-4" /> Description
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">{problem?.title}</h1>
            <p className="text-zinc-400 leading-relaxed">{problem?.description}</p>
            
            {/* --- AI TUTOR SECTION --- */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              isAiLoading ? "bg-indigo-500/10 border-indigo-500/50 animate-pulse" : "bg-zinc-900/50 border-zinc-800 shadow-xl shadow-indigo-500/5"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">AI Tutor</span>
                </div>
                <button onClick={askAI} disabled={isAiLoading} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95">
                  {isAiLoading ? "Thinking..." : <><Zap className="w-3 h-3 fill-current" /> Get Hint</>}
                </button>
              </div>
              <div className="text-sm text-zinc-300 leading-relaxed min-h-[20px]">
                {aiHint ? (
                  <p className="pl-4 border-l-2 border-indigo-500 animate-in fade-in slide-in-from-left-2 duration-300"> 
                    {aiHint} 
                  </p>
                ) : (
                  <p className="text-xs text-zinc-500 italic">Get a logical nudge if you're stuck.</p>
                )}
              </div>
            </div>

            {/* Examples Section */}
            {problem?.examples?.map((ex, idx) => (
               <div key={idx} className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                  <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-tighter">Example {idx + 1}</p>
                  <p className="text-sm text-zinc-300"><strong>Input:</strong> {ex.input}</p>
                  <p className="text-sm text-zinc-300"><strong>Output:</strong> {ex.output}</p>
               </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-zinc-800/50 gap-2">
            {(Object.keys(languageConfig) as ProgrammingLanguage[]).map((lang) => (
              <button key={lang} onClick={() => handleLanguageChange(lang)} className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedLanguage === lang ? `bg-gradient-to-r ${languageConfig[lang].color} text-white` : 'bg-zinc-800/50 text-zinc-400'}`}>
                {languageConfig[lang].name}
              </button>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-6 bg-zinc-950 text-zinc-100 font-mono text-sm resize-none outline-none focus:ring-1 focus:ring-indigo-500/30"
            spellCheck={false}
          />
          {showResults && (
            <div className="h-1/3 border-t border-zinc-800 bg-zinc-900/50 overflow-y-auto p-4">
               <span className="text-sm font-bold text-zinc-400 flex items-center gap-2 mb-3">
                 <Terminal className="w-4 h-4"/> Results ({passedCount}/{testResults.length})
               </span>
               {testResults.map((res, i) => (
                  <div key={i} className={`text-xs font-mono p-2 mb-1 rounded border ${res.passed ? 'bg-green-500/5 border-green-500/20 text-green-400' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
                    {res.passed ? '✓' : '✗'} Case {i+1}: {res.passed ? 'Passed' : (res.error || 'Failed')}
                  </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}