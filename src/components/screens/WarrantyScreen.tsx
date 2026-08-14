'use client'

import { useState } from 'react'
import { haptic } from '@/lib/constants'

interface WarrantyItem {
  id: string
  orderId: string
  serviceName: string
  carModel: string
  date: string
  warrantyMonths: number
  expiresAt: string
  mechanicName: string
}

const MOCK_WARRANTIES: WarrantyItem[] = []

interface WarrantyScreenProps {
  onBack: () => void
}

export function WarrantyScreen({ onBack }: WarrantyScreenProps) {
  const getWarrantyStatus = (expiresAt: string) => {
    const now = new Date()
    const exp = new Date(expiresAt)
    const daysLeft = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    if (daysLeft <= 0) return { label: 'Истекла', color: 'text-[#FF3B30]', bg: 'bg-[#FF3B30] bg-opacity-15' }
    if (daysLeft <= 30) return { label: `${daysLeft} дн.`, color: 'text-[#FF9500]', bg: 'bg-[#FF9500] bg-opacity-15' }
    return { label: `до ${new Date(expiresAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}`, color: 'text-[#34C759]', bg: 'bg-[#34C759] bg-opacity-15' }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">🛡 Гарантия</div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        <div className="space-y-3">
          {MOCK_WARRANTIES.map((warranty, i) => {
            const status = getWarrantyStatus(warranty.expiresAt)
            return (
              <div key={warranty.id} className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 spring-up"
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-[15px] font-semibold text-[var(--ink)]">{warranty.serviceName}</div>
                    <div className="text-[12px] text-[var(--ink-secondary)]">{warranty.carModel} • {warranty.orderId}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${status.bg} ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <span className="text-[10px] text-[var(--ink-secondary)]">Дата работы</span>
                    <p className="text-[13px] text-[var(--ink)]">{new Date(warranty.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--ink-secondary)]">Гарантия</span>
                    <p className="text-[13px] text-[var(--ink)]">{warranty.warrantyMonths} мес.</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--ink-secondary)]">Мастер</span>
                    <p className="text-[13px] text-[var(--ink)]">{warranty.mechanicName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--ink-secondary)]">Истекает</span>
                    <p className="text-[13px] text-[var(--ink)]">{new Date(warranty.expiresAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
