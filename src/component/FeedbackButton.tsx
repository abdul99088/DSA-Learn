'use client'

import { useState } from 'react'
import { MessageSquare, X, Send, Smile, Meh, Frown } from 'lucide-react'

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState<'good' | 'okay' | 'bad' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    // Save to database here
    console.log({ rating, feedback })
    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setRating(null)
      setFeedback('')
    }, 2000)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 bg-[#13131A] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold mb-2">Send Feedback</h2>
                <p className="text-zinc-400 text-sm mb-6">Help us improve</p>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">How was your experience?</label>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setRating('good')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        rating === 'good'
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <Smile className={`w-8 h-8 ${rating === 'good' ? 'text-green-400' : 'text-zinc-500'}`} />
                      <span className="text-xs">Good</span>
                    </button>
                    <button
                      onClick={() => setRating('okay')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        rating === 'okay'
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <Meh className={`w-8 h-8 ${rating === 'okay' ? 'text-yellow-400' : 'text-zinc-500'}`} />
                      <span className="text-xs">Okay</span>
                    </button>
                    <button
                      onClick={() => setRating('bad')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        rating === 'bad'
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <Frown className={`w-8 h-8 ${rating === 'bad' ? 'text-red-400' : 'text-zinc-500'}`} />
                      <span className="text-xs">Bad</span>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Tell us more (optional)</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What can we improve?"
                    className="w-full h-24 px-4 py-3 bg-black/50 border border-zinc-700 rounded-xl resize-none outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!rating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-medium disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Send Feedback
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p className="text-zinc-400 text-sm">Your feedback helps us improve</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}