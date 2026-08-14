'use client'

import { useState } from 'react'
import { STATUS_LABELS, STATUS_ORDER, TrackingOrder, TrackingStatus, MOCK_ORDERS } from '@/data/tracking'
import { Button } from '@/components/ui/Button'
import { haptic } from '@/lib/constants'

interface TrackingScreenProps {
  onBack: () => void
}

export function TrackingScreen({ onBack }: TrackingScreenProps) {
  const [token, setToken] = useState('')
  const [order, setOrder] = useState<TrackingOrder | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const trackOrder = async (t: string) => {
    haptic('light')
    setLoading(true)
    setError('')
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 800))
    const found = MOCK_ORDERS.find(o => o.token === t)
    if (found) {
      setOrder(found)
    } else {
      setError('Заказ не найден')
      setOrder(null)
    }
    setLoading(false)
  }

  const handleSubmit = () => {
    if (token.trim()) trackOrder(token.trim())
  }

  const statusColors: Record<string, { bg: string; text: string; ring: string }> = {
    blue: { bg: 'bg-[#007AFF]', text: 'text-[#007AFF]', ring: 'ring-[#007AFF] ring-opacity-30' },
    purple: { bg: 'bg-[#5856D6]', text: 'text-[#5856D6]', ring: 'ring-[#5856D6] ring-opacity-30' },
    yellow: { bg: 'bg-[#FF9500]', text: 'text-[#FF9500]', ring: 'ring-[#FF9500] ring-opacity-30' },
    orange: { bg: 'bg-[#FF9500]', text: 'text-[#FF9500]', ring: 'ring-[#FF9500] ring-opacity-30' },
    teal: { bg: 'bg-[#34C759]', text: 'text-[#34C759]', ring: 'ring-[#34C759] ring-opacity-30' },
    green: { bg: 'bg-[#34C759]', text: 'text-[#34C759]', ring: 'ring-[#34C759] ring-opacity-30' },
    gray: { bg: 'bg-[#8E8E93]', text: 'text-[#8E8E93]', ring: 'ring-[#8E8E93] ring-opacity-30' },
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">
            📍 Трекинг
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Search form */}
        {!order && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-[44px] mb-3">📍</div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">Отследить ремонт</h2>
              <p className="text-[14px] text-[var(--ink-secondary)]">Введите номер заказа или токен</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="WO-XXX или токен"
                className="flex-1 h-[44px] px-4 bg-[var(--card)] rounded-[13px] text-[16px] border border-[var(--separator)] focus:border-[var(--accent)] outline-none"
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !token.trim()}
                className="w-[44px] h-[44px] bg-[var(--accent)] rounded-[13px] flex items-center justify-center disabled:opacity-40"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <div className="bg-[#FF3B30] bg-opacity-10 rounded-[13px] p-3 text-center">
                <p className="text-[14px] text-[#FF3B30]">{error}</p>
              </div>
            )}

            {/* Demo links */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4">
              <p className="text-[12px] text-[var(--ink-secondary)] mb-3 text-center">Демо-заказы:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {MOCK_ORDERS.map(o => (
                  <button
                    key={o.token}
                    onClick={() => { setToken(o.token); trackOrder(o.token) }}
                    className="px-3 py-1.5 bg-[var(--fill)] rounded-[8px] text-[13px] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                  >
                    {o.token}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Order result */}
        {order && (
          <div className="space-y-4">
            {/* Status card */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[18px] font-bold text-[var(--ink)]">{order.vehicle}</h3>
                  <p className="text-[14px] text-[var(--ink-secondary)]">{order.licensePlate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${statusColors[STATUS_LABELS[order.status].color]?.bg} text-white`}>
                  {STATUS_LABELS[order.status].icon} {STATUS_LABELS[order.status].name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-[var(--ink-secondary)]">Заказ</span>
                  <p className="text-[14px] font-medium text-[var(--ink)]">{order.id}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[var(--ink-secondary)]">Услуга</span>
                  <p className="text-[14px] font-medium text-[var(--ink)]">{order.serviceName}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[var(--ink-secondary)]">Мастер</span>
                  <p className="text-[14px] font-medium text-[var(--ink)]">{order.mechanicName}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[var(--ink-secondary)]">Готовность</span>
                  <p className="text-[14px] font-medium text-[var(--ink)]">
                    {new Date(order.estimatedCompletion).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5">
              <h4 className="text-[14px] font-semibold text-[var(--ink)] mb-4">Прогресс</h4>
              <div className="flex items-center gap-1 mb-2">
                {STATUS_ORDER.map((status, i) => {
                  const isCompleted = i <= STATUS_ORDER.indexOf(order.status)
                  const isCurrent = i === STATUS_ORDER.indexOf(order.status)
                  const label = STATUS_LABELS[status]
                  const color = statusColors[label.color]
                  return (
                    <div key={status} className="flex-1 flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] ${
                        isCurrent ? `${color?.bg} text-white ring-4 ${color?.ring}` :
                        isCompleted ? `${color?.bg} text-white` : 'bg-[var(--fill)] text-[var(--ink-secondary)]'
                      }`}>
                        {isCompleted ? '✓' : i + 1}
                      </div>
                      <span className={`text-[8px] mt-1 text-center leading-tight ${isCurrent ? `${color?.text} font-bold` : isCompleted ? 'text-[var(--ink)]' : 'text-[var(--ink-secondary)]'}`}>
                        {label.name.split(' ')[0]}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="h-2 bg-[var(--fill)] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full transition-all" style={{ width: `${(STATUS_ORDER.indexOf(order.status) / (STATUS_ORDER.length - 1)) * 100}%` }} />
              </div>
            </div>

            {/* Cost */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5">
              <h4 className="text-[14px] font-semibold text-[var(--ink)] mb-3">Стоимость</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--ink-secondary)]">Запчасти</span>
                  <span className="text-[14px] text-[var(--ink)]">{order.totalParts.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--ink-secondary)]">Работа</span>
                  <span className="text-[14px] text-[var(--ink)]">{order.totalLabor.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="border-t border-[var(--separator)] pt-2 flex justify-between">
                  <span className="text-[15px] font-semibold text-[var(--ink)]">Итого</span>
                  <span className="text-[18px] font-bold text-[var(--accent)]">{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5">
              <h4 className="text-[14px] font-semibold text-[var(--ink)] mb-3">История</h4>
              <div className="space-y-3">
                {[...order.statusHistory].reverse().map((entry, i) => {
                  const label = STATUS_LABELS[entry.status]
                  const color = statusColors[label.color]
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] ${i === 0 ? `${color?.bg} text-white` : 'bg-[var(--fill)] text-[var(--ink-secondary)]'}`}>
                          {label.icon}
                        </div>
                        {i < order.statusHistory.length - 1 && <div className="w-0.5 h-full bg-[var(--fill)] mt-1" />}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[13px] font-medium ${i === 0 ? color?.text : 'text-[var(--ink)]'}`}>{label.name}</span>
                          <span className="text-[10px] text-[var(--ink-secondary)]">
                            {new Date(entry.timestamp).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {entry.comment && <p className="text-[12px] text-[var(--ink-secondary)] mt-0.5">{entry.comment}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Back button */}
            <button onClick={() => { setOrder(null); setToken('') }}
              className="w-full py-3 text-[var(--accent)] text-[14px] font-medium text-center">
              ← Проверить другой заказ
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
