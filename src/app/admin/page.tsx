'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'

interface PaymentRequest {
  id: string
  user_id: string
  transaction_id: string
  plan: string
  amount: number
  screenshot_url: string
  status: string
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([])
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/')
        return
      }

      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'avassayk@gmail.com'
      
      if (user.email !== adminEmail) {
        alert('Access denied. Admin only.')
        router.push('/')
        return
      }

      setIsAdmin(true)
      await fetchPaymentRequests()
    } catch (error) {
      console.error('Admin check error:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const fetchPaymentRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPaymentRequests(data || [])
    } catch (error) {
      console.error('Error fetching payment requests:', error)
    }
  }

  const handleApprove = async (requestId: string, userId: string, plan: string) => {
    try {
      const { error: updateError } = await supabase
        .from('payment_requests')
        .update({ status: 'approved' })
        .eq('id', requestId)

      if (updateError) throw updateError

      const expiresAt = plan === 'yearly' 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

      const { error: subError } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: userId,
          plan: plan,
          status: 'active',
          expires_at: expiresAt,
          updated_at: new Date().toISOString()
        })

      if (subError) throw subError

      alert('Payment approved and premium activated!')
      await fetchPaymentRequests()
    } catch (error) {
      console.error('Approval error:', error)
      alert('Failed to approve payment')
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('payment_requests')
        .update({ status: 'rejected' })
        .eq('id', requestId)

      if (error) throw error
      alert('Payment rejected')
      await fetchPaymentRequests()
    } catch (error) {
      console.error('Rejection error:', error)
      alert('Failed to reject payment')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="text-white text-xl">Loading Admin Panel...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const filteredRequests = paymentRequests.filter(req => req.status === activeTab)

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 rounded-lg bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-blue-300 text-sm">Manage payment requests and subscriptions</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-blue-300">Pending</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {paymentRequests.filter(r => r.status === 'pending').length}
            </div>
          </div>

          <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-blue-300">Approved</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {paymentRequests.filter(r => r.status === 'approved').length}
            </div>
          </div>

          <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-sm text-blue-300">Rejected</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {paymentRequests.filter(r => r.status === 'rejected').length}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['pending', 'approved', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-950/30 text-blue-300 hover:bg-blue-900/30'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Payment Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-12 text-center">
              <p className="text-blue-300">No {activeTab} payment requests</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-semibold mb-1">
                      Transaction ID: {request.transaction_id}
                    </p>
                    <p className="text-sm text-blue-300">User ID: {request.user_id}</p>
                    <p className="text-sm text-blue-300">
                      {new Date(request.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white mb-1">
                      PKR {request.amount}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                      {request.plan}
                    </div>
                  </div>
                </div>

                {request.screenshot_url && (
                  <div className="mb-4">
                    <a
                      href={request.screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      View Payment Screenshot →
                    </a>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(request.id, request.user_id, request.plan)}
                      className="flex-1 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}