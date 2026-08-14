'use client'

import { useState, useRef } from 'react'
import { haptic } from '@/lib/constants'

interface ReferralScreenProps {
  onBack: () => void
}

export function ReferralScreen({ onBack }: ReferralScreenProps) {
  const [copied, setCopied] = useState(false)
  // FIX: useRef so code doesn't regenerate on every render
  const referralCode = useRef('AUTO-' + Math.random().toString(36).slice(2, 8).toUpperCase()).current
  const referralLink = `https://autoservice.app/ref/${referralCode}`

  const handleCopy = () => {
    haptic('light')
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const referrals = [
    { name: 'Дмитрий К.', date: '2026-08-05', reward: 500, status: 'completed' },
    { name: 'Мария П.', date: '2026-07-20', reward: 500, status: 'completed' },
    { name: 'Олег С.', date: '2026-08-10', reward: 500, status: 'pending' },
  ]

  const totalEarned = referrals.filter(r => r.status === 'completed').reduce((s, r) => s + r.reward, 0)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">Реферальная программа</div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Referral card */}
        <div className="bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-[13px] p-5 text-white mb-4 spring-in">
          <div className="text-[13px] opacity-80 mb-1">Пригласите друга</div>
          <div className="text-[22px] font-bold mb-2">Получите 500 ₽ на счёт</div>
          <div className="text-[13px] opacity-80">Друг получит скидку 10% на первое обслуживание</div>
        </div>

        {/* Referral code */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 mb-4">
          <div className="text-[12px] text-[var(--ink-secondary)] mb-2">Ваш реферальный код</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[44px] bg-[var(--fill)] rounded-[10px] flex items-center justify-center">
              <span className="text-[18px] font-bold text-[var(--ink)] tracking-[0.1em]">{referralCode}</span>
            </div>
            <button onClick={handleCopy}
              className={`h-[44px] px-4 rounded-[10px] font-semibold text-[14px] transition-all ${
                copied ? 'bg-[#34C759] text-white' : 'bg-[var(--accent)] text-white'
              }`}>
              {copied ? '✓' : 'Копировать'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 text-center">
            <div className="text-[22px] font-bold text-[var(--ink)]">{referrals.length}</div>
            <div className="text-[11px] text-[var(--ink-secondary)]">Приглашено</div>
          </div>
          <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 text-center">
            <div className="text-[22px] font-bold text-[#34C759]">{totalEarned.toLocaleString('ru-RU')} ₽</div>
            <div className="text-[11px] text-[var(--ink-secondary)]">Заработано</div>
          </div>
        </div>

        {/* Referral history */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden">
          <div className="px-4 py-3 bg-[var(--fill)]">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">История</h3>
          </div>
          <div className="divide-y divide-[var(--separator)]">
            {referrals.map((ref, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-medium text-[var(--ink)]">{ref.name}</div>
                  <div className="text-[11px] text-[var(--ink-secondary)]">{new Date(ref.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</div>
                </div>
                <div className="text-right">
                  <div className={`text-[14px] font-semibold ${ref.status === 'completed' ? 'text-[#34C759]' : 'text-[#FF9500]'}`}>
                    +{ref.reward} ₽
                  </div>
                  <div className="text-[10px] text-[var(--ink-secondary)]">{ref.status === 'completed' ? 'Получено' : 'Ожидает'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
