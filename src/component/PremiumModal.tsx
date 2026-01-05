'use client'

import { useState } from 'react'
import { X, Crown, Check, Zap } from 'lucide-react'
import PaymentModal from './PaymentModal'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const [showPayment, setShowPayment] = useState(false)

  if (!isOpen) return null

  const handleUpgrade = () => {
    setShowPayment(true)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeInUp">
        <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 mb-4 shimmer">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 gradient-text">Upgrade to Premium</h2>
              <p className="text-zinc-400">Unlock advanced problems and exclusive features</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Access 10+ Premium Problems',
                'Advanced Algorithm Challenges',
                'Detailed Solution Explanations',
                'Priority Support',
                'Ad-free Experience',
                'New Problems Weekly'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-zinc-800">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-sm text-zinc-400 mb-1">Free</div>
                <div className="text-3xl font-bold mb-1">PKR 0</div>
                <div className="text-xs text-zinc-500 mb-4">40 free problems</div>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-600" />
                    <span>Basic problems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-600" />
                    <span>Community support</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-2 border-indigo-500 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-1 bg-indigo-500 rounded-full text-xs font-bold">
                  POPULAR
                </div>
                <div className="text-sm text-zinc-400 mb-1">Premium</div>
                <div className="text-3xl font-bold mb-1">PKR 2,700<span className="text-lg text-zinc-400">/mo</span></div>
                <div className="text-xs text-emerald-400 mb-4">All problems unlocked</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>10+ premium problems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Ad-free experience</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleUpgrade}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-bold text-lg glow-effect"
            >
              <Zap className="w-5 h-5" />
              Proceed to Payment
            </button>

            <p className="text-center text-xs text-zinc-500 mt-4">
              Secure bank transfer • Verified within 24 hours
            </p>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </>
  )
}