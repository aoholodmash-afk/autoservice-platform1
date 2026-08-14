'use client'

import { useState } from 'react'
import { haptic } from '@/lib/constants'

interface PaymentScreenProps {
  amount: number
  serviceName: string
  onConfirm: () => void
  onBack: () => void
}

export function PaymentScreen({ amount, serviceName, onConfirm, onBack }: PaymentScreenProps) {
  const [method, setMethod] = useState<'card' | 'cash' | 'sbp'>('card')
  const [loading, setLoading] = useState(false)
  const deposit = 500

  const handlePay = async () => {
    haptic('heavy')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    onConfirm()
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">Оплата</div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Summary */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 mb-4">
          <div className="text-[13px] text-[var(--ink-secondary)] mb-1">{serviceName}</div>
          <div className="text-[28px] font-bold text-[var(--ink)]">{amount.toLocaleString('ru-RU')} ₽</div>
          <div className="text-[12px] text-[var(--ink-secondary)] mt-1">Предоплата: {deposit} ₽ (списывается из итого)</div>
        </div>

        {/* Payment methods */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden mb-4">
          <div className="px-4 py-3 bg-[var(--fill)]">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">Способ оплаты</h3>
          </div>
          <div className="divide-y divide-[var(--separator)]">
            {[
              { id: 'card' as const, icon: '💳', name: 'Банковская карта' },
              { id: 'sbp' as const, icon: '📱', name: 'СБП (Система быстрых платежей)' },
              { id: 'cash' as const, icon: '💵', name: 'Наличные при визите' },
            ].map(m => (
              <button key={m.id} onClick={() => { haptic('light'); setMethod(m.id) }}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left ${method === m.id ? 'bg-[var(--accent)] bg-opacity-5' : ''}`}>
                <span className="text-[20px]">{m.icon}</span>
                <span className="flex-1 text-[14px] text-[var(--ink)]">{m.name}</span>
                {method === m.id && (
                  <div className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handlePay} disabled={loading}
          className="w-full h-[50px] bg-[#34C759] text-white rounded-[13px] font-semibold text-[17px] disabled:opacity-40 active:scale-[0.97] transition-transform">
          {loading ? 'Обработка...' : `Оплатить ${deposit} ₽`}
        </button>
      </div>
    </div>
  )
}
