'use client'

import { X, Check, Crown, Shield, Upload, Copy, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

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
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    console.log('🎯 PremiumModal isOpen changed to:', isOpen)
  }, [isOpen])

  if (!isOpen) {
    console.log('❌ Modal is closed, returning null')
    return null
  }

  console.log('✅ Modal is rendering!')

  const paymentDetails = {
    accountTitle: 'ABDUL VASSAY KHALIQ',
    accountNumber: '0805 0108944223',
    iban: 'PK36 MEZN 0008 0501 0894 4223',
    bank: 'Meezan Bank',
    branch: 'Main Branch'
  }

  const prices = {
    monthly: { pkr: 699, usd: 2.99 },
   yearly: { pkr: 9999, usd: 59.99 }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0])
      console.log('File selected:', e.target.files[0].name)
    }
  }

  const handleSubmit = async () => {
    if (!selectedPlan || !transactionId || !screenshot) {
      setError('Please fill all fields and upload payment proof')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error('Please log in first')
      }

      const fileExt = screenshot.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, screenshot)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw new Error('Failed to upload screenshot')
      }

      const { data: { publicUrl } } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(fileName)

      const { error: insertError } = await supabase
        .from('payment_requests')
        .insert({
          user_id: user.id,
          transaction_id: transactionId,
          plan: selectedPlan,
          amount: selectedPlan === 'monthly' ? prices.monthly.pkr : prices.yearly.pkr,
          screenshot_url: publicUrl,
          status: 'pending'
        })

      if (insertError) {
        console.error('Insert error:', insertError)
        throw new Error('Failed to submit payment request')
      }

      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 2000)
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '896px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))',
          padding: '24px',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Crown style={{ width: '32px', height: '32px', color: '#fde047' }} />
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                Upgrade to Premium
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Success Message */}
          {success && (
            <div style={{
              marginBottom: '24px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle style={{ width: '24px', height: '24px', color: '#16a34a' }} />
              <p style={{ color: '#166534', fontWeight: 500, margin: 0 }}>
                Payment submitted successfully! We'll verify and activate your premium account within 24 hours.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              marginBottom: '24px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <p style={{ color: '#991b1b', margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Premium Features */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#111827'
            }}>
              <Shield style={{ width: '20px', height: '20px', color: '#9333ea' }} />
              Premium Features
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {[
                'Access to 40+ premium problems',
                'Detailed solution explanations',
                'Video walkthroughs',
                'Advanced algorithm techniques',
                'Interview preparation guides',
                'Priority support',
                'Certificate of completion',
                'Lifetime updates'
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Check style={{ width: '20px', height: '20px', color: '#16a34a', flexShrink: 0 }} />
                  <span style={{ color: '#374151' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#111827' }}>
              Choose Your Plan
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {/* Monthly Plan */}
              <div
                onClick={() => setSelectedPlan('monthly')}
                style={{
                  border: selectedPlan === 'monthly' ? '2px solid #9333ea' : '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  backgroundColor: selectedPlan === 'monthly' ? '#faf5ff' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Monthly</h4>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>Billed monthly</p>
                  </div>
                  {selectedPlan === 'monthly' && (
                    <CheckCircle style={{ width: '24px', height: '24px', color: '#9333ea' }} />
                  )}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>PKR {prices.monthly.pkr}</span>
                  <span style={{ color: '#6b7280' }}>/month</span>
                </div>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>≈ ${prices.monthly.usd} USD</p>
              </div>

              {/* Yearly Plan */}
              <div
                onClick={() => setSelectedPlan('yearly')}
                style={{
                  border: selectedPlan === 'yearly' ? '2px solid #9333ea' : '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  backgroundColor: selectedPlan === 'yearly' ? '#faf5ff' : 'white',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '16px',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '4px 12px',
                  borderRadius: '9999px'
                }}>
                  BEST VALUE
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Yearly</h4>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>Billed annually</p>
                  </div>
                  {selectedPlan === 'yearly' && (
                    <CheckCircle style={{ width: '24px', height: '24px', color: '#9333ea' }} />
                  )}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>PKR {prices.yearly.pkr}</span>
                  <span style={{ color: '#6b7280' }}>/year</span>
                </div>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>≈ ${prices.yearly.usd} USD</p>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          {selectedPlan && (
            <div style={{
              marginBottom: '32px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '16px',
                color: '#111827'
              }}>Payment Instructions</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Account Title</p>
                    <p style={{ fontWeight: 600, color: '#111827', margin: '4px 0 0 0' }}>{paymentDetails.accountTitle}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentDetails.accountTitle, 'title')}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {copied === 'title' ? (
                      <Check style={{ width: '20px', height: '20px', color: '#16a34a' }} />
                    ) : (
                      <Copy style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                    )}
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Account Number</p>
                    <p style={{ fontWeight: 600, color: '#111827', margin: '4px 0 0 0' }}>{paymentDetails.accountNumber}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentDetails.accountNumber, 'account')}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {copied === 'account' ? (
                      <Check style={{ width: '20px', height: '20px', color: '#16a34a' }} />
                    ) : (
                      <Copy style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                    )}
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>IBAN</p>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: '#111827', margin: '4px 0 0 0' }}>{paymentDetails.iban}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentDetails.iban, 'iban')}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {copied === 'iban' ? (
                      <Check style={{ width: '20px', height: '20px', color: '#16a34a' }} />
                    ) : (
                      <Copy style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                    )}
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Bank</p>
                    <p style={{ fontWeight: 600, color: '#111827', margin: '4px 0 0 0' }}>{paymentDetails.bank}</p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#fefce8',
                  border: '1px solid #fde047',
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '16px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#854d0e',
                    margin: '0 0 8px 0'
                  }}>
                    Amount to Pay: PKR {selectedPlan === 'monthly' ? prices.monthly.pkr : prices.yearly.pkr}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#a16207',
                    margin: 0
                  }}>
                    Please transfer the exact amount and upload the payment screenshot below
                  </p>
                </div>
              </div>

              {/* Transaction ID */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Transaction ID / Reference Number *
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter your transaction ID"
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#111827',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Screenshot Upload */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Payment Screenshot *
                </label>
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="screenshot-upload"
                  />
                  <label htmlFor="screenshot-upload" style={{ cursor: 'pointer' }}>
                    <Upload style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 8px' }} />
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                      {screenshot ? screenshot.name : 'Click to upload payment proof'}
                    </p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !selectedPlan || !transactionId || !screenshot}
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))',
                  color: 'white',
                  fontWeight: 600,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: loading || !selectedPlan || !transactionId || !screenshot ? 'not-allowed' : 'pointer',
                  opacity: loading || !selectedPlan || !transactionId || !screenshot ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle style={{ width: '20px', height: '20px' }} />
                    Submit Payment
                  </>
                )}
              </button>
            </div>
          )}

          {/* Help Text */}
          <div className="text-center text-sm text-gray-600 mt-6">
            <p>Need help? Contact us at support@dsalearn.com</p>
            <p className="mt-1">Your premium access will be activated within 24 hours of verification</p>
          </div>
        </div>
      </div>
    </div>
  )
}