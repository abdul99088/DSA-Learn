'use client'

import { useState, useEffect } from 'react'
import { Check, X, Clock, Search, RefreshCw, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

interface Payment {
  id: string
  user_id: string
  user_email: string
  plan_type: string
  payment_method: string
  transaction_id: string
  amount: number
  status: string
  created_at: string
  verified_at: string | null
}

export default function AdminPaymentPanel() {
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'rejected'>('pending')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchPayments()
  }, [filter])

  const fetchPayments = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('payment_verifications')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching payments:', error)
        throw error
      }
      
      setPayments(data || [])
    } catch (error: any) {
      console.error('Error fetching payments:', error)
      alert('Error loading payments: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const updatePaymentStatus = async (paymentId: string, userId: string, newStatus: string) => {
    setProcessing(paymentId)
    
    try {
      // Update payment status
      const { error: paymentError } = await supabase
        .from('payment_verifications')
        .update({ 
          status: newStatus,
          verified_at: new Date().toISOString()
        })
        .eq('id', paymentId)

      if (paymentError) {
        console.error('Payment update error:', paymentError)
        throw paymentError
      }

      // If approved, create/update subscription
      if (newStatus === 'active') {
        const payment = payments.find(p => p.id === paymentId)
        if (!payment) throw new Error('Payment not found')
        
        const daysToAdd = payment.plan_type === 'yearly' ? 365 : 30
        const currentPeriodEnd = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString()

        // Check if subscription exists
        const { data: existingSub } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', userId)
          .single()

        if (existingSub) {
          // Update existing subscription
          const { error: updateError } = await supabase
            .from('user_subscriptions')
            .update({
              status: 'active',
              plan_type: payment.plan_type,
              current_period_end: currentPeriodEnd,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userId)

          if (updateError) {
            console.error('Subscription update error:', updateError)
            throw updateError
          }
        } else {
          // Create new subscription
          const { error: insertError } = await supabase
            .from('user_subscriptions')
            .insert({
              user_id: userId,
              status: 'active',
              plan_type: payment.plan_type,
              current_period_end: currentPeriodEnd,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })

          if (insertError) {
            console.error('Subscription insert error:', insertError)
            throw insertError
          }
        }
      }

      alert(`✅ Payment ${newStatus === 'active' ? 'approved' : 'rejected'} successfully!`)
      await fetchPayments()
      
    } catch (error: any) {
      console.error('Error updating payment:', error)
      alert('❌ Error: ' + (error.message || 'Failed to update payment'))
    } finally {
      setProcessing(null)
    }
  }

  const filteredPayments = payments.filter(p => 
    p.user_email.toLowerCase().includes(search.toLowerCase()) ||
    p.transaction_id.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    pending: payments.filter(p => p.status === 'pending').length,
    active: payments.filter(p => p.status === 'active').length,
    rejected: payments.filter(p => p.status === 'rejected').length,
    total: payments.length
  }

  const totalRevenue = payments
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen bg-[#0A0E27] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              💰 Payment Verification Panel
            </h1>
            <p className="text-blue-300">Review and approve premium subscriptions</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to App
            </button>
            <button
              onClick={fetchPayments}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-blue-300">Total Requests</div>
          </div>
          <div className="bg-yellow-950/30 border border-yellow-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-sm text-yellow-300">⏳ Pending</div>
          </div>
          <div className="bg-green-950/30 border border-green-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">{stats.active}</div>
            <div className="text-sm text-green-300">✅ Approved</div>
          </div>
          <div className="bg-red-950/30 border border-red-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
            <div className="text-sm text-red-300">❌ Rejected</div>
          </div>
          <div className="bg-cyan-950/30 border border-cyan-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">₨{totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-cyan-300">💵 Revenue</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'active', 'rejected'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-950/30 text-blue-300 hover:bg-blue-900/30'
                }`}
              >
                {status === 'all' && '📋 All'}
                {status === 'pending' && '⏳ Pending'}
                {status === 'active' && '✅ Approved'}
                {status === 'rejected' && '❌ Rejected'}
              </button>
            ))}
          </div>

          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search by email or transaction ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-950/30 border border-blue-900/30 text-white placeholder:text-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-blue-300">Loading payments...</p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-blue-300 text-lg">
                {search ? '🔍 No payments found matching your search' : '📭 No payments yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900/20 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">User Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-blue-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/20">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-blue-900/10 transition-colors">
                      <td className="px-4 py-4 text-sm text-white font-medium">{payment.user_email}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 capitalize">
                          {payment.plan_type === 'monthly' && '📅 Monthly'}
                          {payment.plan_type === 'yearly' && '🗓️ Yearly'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <code className="text-sm text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded font-mono">
                          {payment.transaction_id}
                        </code>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-white">
                        ₨{payment.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-blue-300">
                        {new Date(payment.created_at).toLocaleDateString('en-PK', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                          payment.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : payment.status === 'active'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {payment.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                          {payment.status === 'active' && <Check className="w-3.5 h-3.5" />}
                          {payment.status === 'rejected' && <X className="w-3.5 h-3.5" />}
                          {payment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {payment.status === 'pending' ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => updatePaymentStatus(payment.id, payment.user_id, 'active')}
                              disabled={processing === payment.id}
                              className="p-2.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Approve Payment"
                            >
                              {processing === payment.id ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => updatePaymentStatus(payment.id, payment.user_id, 'rejected')}
                              disabled={processing === payment.id}
                              className="p-2.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Reject Payment"
                            >
                              {processing === payment.id ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-blue-500 text-sm">
                            {payment.verified_at && new Date(payment.verified_at).toLocaleDateString('en-PK')}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 p-6 bg-blue-950/30 border border-blue-500/30 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            📝 Verification Instructions
          </h3>
          <ol className="space-y-2 text-sm text-blue-300 list-decimal list-inside">
            <li>Check your Meezan Bank account for incoming transactions</li>
            <li>Match the transaction ID from your bank with the one shown here</li>
            <li>Verify the amount matches exactly</li>
            <li>Click ✅ (green checkmark) to approve or ❌ (red X) to reject</li>
            <li>User will get premium access immediately after approval!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}