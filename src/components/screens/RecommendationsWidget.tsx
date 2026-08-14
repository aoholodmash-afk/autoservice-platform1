'use client'

import { MOCK_REVIEWS, Review } from '@/data/reviews'
import { MAINTENANCE_INTERVALS } from '@/data/maintenance-intervals'
import { SavedCar } from '@/hooks/useCarStore'
import { haptic } from '@/lib/constants'

interface RecommendationsWidgetProps {
  car: SavedCar
  onSelectService: (serviceId: string) => void
}

export function RecommendationsWidget({ car, onSelectService }: RecommendationsWidgetProps) {
  const mileage = car.mileage || 0

  // Generate recommendations based on mileage
  const recommendations = MAINTENANCE_INTERVALS
    .filter(item => {
      if (item.intervalKm === 0) return false
      const estimatedLastService = mileage - (mileage % item.intervalKm)
      const kmSinceService = mileage - estimatedLastService
      return kmSinceService >= item.intervalKm * 0.7
    })
    .slice(0, 3)

  if (recommendations.length === 0) return null

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-[var(--ink)]">💡 Рекомендации</h3>
      </div>
      <div className="space-y-2">
        {recommendations.map((item, i) => (
          <button key={item.id} onClick={() => { haptic('light'); onSelectService(item.id) }}
            className="w-full bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 text-left active:scale-[0.98] transition-transform spring-up"
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#FF9500] bg-opacity-10 flex items-center justify-center text-[18px]">
                ⚠️
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-medium text-[var(--ink)]">{item.name}</div>
                <div className="text-[11px] text-[var(--ink-secondary)]">каждые {item.intervalKm.toLocaleString('ru-RU')} км • {item.estimatedCost.min.toLocaleString('ru-RU')}–{item.estimatedCost.max.toLocaleString('ru-RU')} ₽</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
