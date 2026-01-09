'use client'

import { X, Check, Crown, Shield, Upload, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
console.log('🟢 PremiumModal component loaded')
interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function PremiumModal({ isOpen, onClose, onSuccess }: PremiumModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | null>(null)
  const [transactionId, setTransactionId] = useState('')
  const [copied, setCopied] = useState<string>('')

  if (!isOpen) return null

  const paymentDetails = {
    accountTitle: 'ABDUL VASSAY KHALIQ',
    accountNumber: '0805 0108944223',
    iban: 'PK36 MEZN 0008 0501 0894 4223',
    bank: 'Meezan Bank',
    branch: 'Main Branch'
  }

  const prices = {
    monthly: { pkr: 2999, usd: 9.99 },
    yearly: { pkr: 14999, usd: 59.99 }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleSubmitPayment = async () => {
    if (!selectedPlan || !transactionId.trim()) {
      setError('Please select a plan and enter transaction ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: insertError } = await supabase
        .from('payment_verifications')
        .insert({
          user_id: user.id,
          user_email: user.email,
          plan_type: selectedPlan,
          payment_method: 'bank',
          transaction_id: transactionId,
          amount: prices[selectedPlan].pkr,
          status: 'pending',
          created_at: new Date().toISOString()
        })

      if (insertError) throw insertError

      setSuccess(true)
      
      // Call onSuccess if provided
      if (onSuccess) {
        onSuccess()
      }
      
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setSelectedPlan(null)
        setTransactionId('')
      }, 4000)

    } catch (err: any) {
      console.error('Payment submission error:', err)
      setError(err.message || 'Failed to submit payment')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[#0D1230] border border-blue-900/30 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Payment Submitted!</h3>
          <p className="text-blue-300 mb-4">
            Bismillah! We'll verify your payment within 24 hours and activate your premium account.
          </p>
          <p className="text-sm text-blue-400">
            You'll receive an email confirmation once verified.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-[#0D1230] border border-blue-900/30 rounded-2xl max-w-4xl w-full my-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-blue-900/30 transition-colors z-10"
        >
          <X className="w-5 h-5 text-blue-300" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-lg shadow-blue-500/30">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Upgrade to Premium</h2>
            <p className="text-blue-300">Choose your plan and complete payment</p>
          </div>

          {!selectedPlan ? (
            <>
              {/* Pricing Plans */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Monthly Plan */}
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className="relative p-6 rounded-2xl bg-blue-950/30 border-2 border-blue-900/30 hover:border-blue-500/50 transition-all text-left group"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-1">Monthly</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">₨699</span>
                      <span className="text-blue-400">/month</span>
                    </div>
                    <p className="text-sm text-blue-400 mt-1">≈ ${prices.monthly.usd} USD</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm text-blue-200">
                      <Check className="w-4 h-4 text-green-400" />
                      Access to all premium problems
                    </li>
                    <li className="flex items-center gap-2 text-sm text-blue-200">
                      <Check className="w-4 h-4 text-green-400" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2 text-sm text-blue-200">
                      <Check className="w-4 h-4 text-green-400" />
                      Valid for 30 days
                    </li>
                  </ul>

                  <div className="py-2 rounded-lg bg-blue-500/10 text-blue-400 text-sm text-center font-medium group-hover:bg-blue-500/20 transition-all">
                    Select Monthly Plan →
                  </div>
                </button>

                {/* Yearly Plan */}
                <button
                  onClick={() => setSelectedPlan('yearly')}
                  className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 text-left group hover:shadow-blue-500/30 transition-all"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold">
                    BEST VALUE - SAVE 50%
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-1">Yearly</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">₨9,999</span>
                      <span className="text-blue-400">/year</span>
                    </div>
                    <p className="text-sm text-green-400 mt-1 font-semibold">Just ₨1,250/month - Save ₨21,000</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm text-white">
                      <Check className="w-4 h-4 text-green-400" />
                      Everything in Monthly
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white">
                      <Check className="w-4 h-4 text-green-400" />
                      Early access to new features
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white">
                      <Check className="w-4 h-4 text-green-400" />
                      Valid for 365 days
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white">
                      <Check className="w-4 h-4 text-green-400" />
                      Priority support
                    </li>
                  </ul>

                  <div className="py-2 rounded-lg bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white text-sm text-center font-bold group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all">
                    Select Yearly Plan →
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Payment Instructions */}
              <div className="mb-6">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-sm text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1"
                >
                  ← Change Plan
                </button>
                
                <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 mb-6">
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-blue-400" />
                    Selected Plan: {selectedPlan === 'monthly' ? 'Monthly Premium' : 'Yearly Premium'}
                  </h3>
                  <p className="text-3xl font-bold text-blue-400">
                    Amount: ₨{prices[selectedPlan].pkr.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-300 mt-1">
                    Valid for {selectedPlan === 'monthly' ? '30 days' : '365 days'}
                  </p>
                </div>

                {/* Payment Details */}
                <div className="p-6 rounded-xl bg-blue-950/50 border border-blue-500/30 mb-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Bank Transfer Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg hover:bg-blue-900/40 transition-all">
                      <div>
                        <p className="text-xs text-blue-400 mb-1">Account Title</p>
                        <p className="text-white font-semibold">{paymentDetails.accountTitle}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(paymentDetails.accountTitle, 'title')}
                        className="p-2 hover:bg-blue-900/50 rounded transition-all"
                        title="Copy"
                      >
                        {copied === 'title' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-blue-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg hover:bg-blue-900/40 transition-all">
                      <div>
                        <p className="text-xs text-blue-400 mb-1">Account Number</p>
                        <p className="text-white font-mono text-lg font-semibold">{paymentDetails.accountNumber}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(paymentDetails.accountNumber, 'account')}
                        className="p-2 hover:bg-blue-900/50 rounded transition-all"
                        title="Copy"
                      >
                        {copied === 'account' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-blue-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg hover:bg-blue-900/40 transition-all">
                      <div className="flex-1">
                        <p className="text-xs text-blue-400 mb-1">IBAN</p>
                        <p className="text-white font-mono font-semibold">{paymentDetails.iban}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(paymentDetails.iban, 'iban')}
                        className="p-2 hover:bg-blue-900/50 rounded transition-all"
                        title="Copy"
                      >
                        {copied === 'iban' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-blue-400" />
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-blue-900/30 rounded-lg">
                      <p className="text-xs text-blue-400 mb-1">Bank</p>
                      <p className="text-white font-semibold">{paymentDetails.bank}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-sm text-yellow-300">
                      💡 <strong>Tip:</strong> Use online/mobile banking for instant transfer. Keep your transaction ID/receipt for verification.
                    </p>
                  </div>
                </div>

                {/* Transaction ID Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Enter Transaction ID / Reference Number: <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g., FT23010712345678 or TRX123456789"
                    className="w-full px-4 py-3 rounded-lg bg-blue-950/30 border-2 border-blue-900/30 text-white placeholder:text-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  <p className="text-xs text-blue-400 mt-2">
                    ✓ You'll receive this after completing the bank transfer
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-4 flex items-start gap-2">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={handleSubmitPayment}
                  disabled={loading || !transactionId.trim()}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:from-blue-400 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Payment for Verification
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 text-sm text-blue-400 mt-6 bg-blue-950/30 p-3 rounded-lg">
            <Shield className="w-4 h-4" />
            <span>100% Secure • Payment verified within 24 hours • Bank-level encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}