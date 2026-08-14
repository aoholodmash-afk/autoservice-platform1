'use client'

import { MOCK_ORDERS, TrackingOrder, STATUS_LABELS, STATUS_ORDER } from '@/data/tracking'
import { haptic } from '@/lib/constants'

interface ServiceHistoryProps {
  onBack: () => void
  onExportPDF?: () => void
}

export function ServiceHistory({ onBack, onExportPDF }: ServiceHistoryProps) {
  const orders = MOCK_ORDERS.filter(o => o.status === 'completed')

  const handleExport = () => {
    haptic('medium')
    onExportPDF?.()
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">История ТО</div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Export button */}
        <button onClick={handleExport}
          className="w-full h-[44px] bg-[var(--accent)] text-white rounded-[13px] font-semibold text-[15px] mb-4 active:scale-[0.97] transition-transform">
          📄 Скачать PDF отчёт
        </button>

        {/* Orders list */}
        <div className="space-y-3">
          {orders.map((order, i) => (
            <div key={order.id} className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 spring-up"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-[15px] font-semibold text-[var(--ink)]">{order.serviceName}</div>
                  <div className="text-[12px] text-[var(--ink-secondary)]">{order.vehicle} • {order.licensePlate}</div>
                </div>
                <span className="text-[12px] text-[var(--ink-secondary)]">
                  {new Date(order.updatedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] text-[var(--ink-secondary)]">{order.id}</span>
                <span className="text-[11px] text-[var(--ink-secondary)]">•</span>
                <span className="text-[11px] text-[var(--ink-secondary)]">{order.mechanicName}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--separator)]">
                <span className="text-[13px] text-[var(--ink-secondary)]">Итого</span>
                <span className="text-[16px] font-bold text-[var(--accent)]">{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[44px] mb-3">📋</div>
            <p className="text-[15px] text-[var(--ink-secondary)]">Нет истории обслуживания</p>
          </div>
        )}
      </div>
    </div>
  )
}
