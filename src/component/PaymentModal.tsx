'use client'

import { useState } from 'react'
import { X, Shield, CheckCircle, Copy, Check, Upload, AlertCircle } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<'details' | 'upload' | 'success'>('details')
  const [email, setEmail] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const bankDetails = {
    accountTitle: "DSA Learn",
    accountNumber: "0123456789012345",
    bank: "HBL",
    iban: "PK36HABB0123456789012345"
  }

  const jazzcashDetails = {
    number: "0300-1234567",
    name: "DSA Learn"
  }

  const easyPaisaDetails = {
    number: "0300-1234567",
    name: "DSA Learn"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    // Here you would upload to Supabase Storage and save record
    setStep('success')
    
    // Send email notification to admin
    // In production, use Supabase Edge Functions or API route
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeInUp">
      <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-[#13131A] to-[#0A0A0F] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Success State */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Submitted!</h2>
              <p className="text-zinc-400 mb-6">
                Your payment is under review. We'll verify and activate your premium account within 24 hours.
              </p>
              <p className="text-sm text-zinc-500 mb-6">
                Check your email <span className="text-white font-semibold">{email}</span> for confirmation.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold"
              >
                Done
              </button>
            </div>
          )}

          {/* Payment Details */}
          {step === 'details' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
                <p className="text-zinc-400">Premium - PKR 2,700/month</p>
              </div>

              {/* Security Badge */}
              <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">100% Secure Payment</span>
              </div>

              {/* Bank Transfer Instructions */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-lg">Bank Transfer Details</h3>
                
                <div className="space-y-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500">Bank Name</div>
                      <div className="font-semibold">{bankDetails.bank}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.bank)}
                      className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500">Account Title</div>
                      <div className="font-semibold">{bankDetails.accountTitle}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountTitle)}
                      className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500">Account Number</div>
                      <div className="font-mono font-semibold">{bankDetails.accountNumber}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountNumber)}
                      className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500">IBAN</div>
                      <div className="font-mono text-sm font-semibold">{bankDetails.iban}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.iban)}
                      className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="pt-3 border-t border-zinc-800">
                    <div className="text-xs text-zinc-500">Amount to Transfer</div>
                    <div className="text-2xl font-bold text-emerald-400">PKR 2,700</div>
                  </div>
                </div>

                {/* Mobile Payment Options */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <div className="text-sm font-semibold mb-2">JazzCash</div>
                    <div className="text-xs text-zinc-500 mb-1">Number</div>
                    <div className="font-mono text-sm">{jazzcashDetails.number}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <div className="text-sm font-semibold mb-2">EasyPaisa</div>
                    <div className="text-xs text-zinc-500 mb-1">Number</div>
                    <div className="font-mono text-sm">{easyPaisaDetails.number}</div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200">
                  <div className="font-semibold mb-1">Important:</div>
                  After making payment, click "Next" to upload your payment proof for verification.
                </div>
              </div>

              <button
                onClick={() => setStep('upload')}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 transition-all font-bold text-lg"
              >
                Next: Upload Payment Proof
              </button>
            </>
          )}

          {/* Upload Proof */}
          {step === 'upload' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Upload Payment Proof</h2>
                <p className="text-zinc-400">Upload screenshot of your transaction</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl outline-none focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Transaction ID (Optional)</label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g., TRX123456789"
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Payment Screenshot *</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot-upload"
                      required
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="block w-full p-6 border-2 border-dashed border-zinc-700 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer text-center"
                    >
                      {screenshot ? (
                        <div className="flex items-center justify-center gap-2 text-emerald-400">
                          <CheckCircle className="w-5 h-5" />
                          <span>{screenshot.name}</span>
                        </div>
                      ) : (
                        <div className="text-zinc-400">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-sm">Click to upload screenshot</div>
                          <div className="text-xs mt-1">PNG, JPG up to 5MB</div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-all font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!email || !screenshot}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit for Verification
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}