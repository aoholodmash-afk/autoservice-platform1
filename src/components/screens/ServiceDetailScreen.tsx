'use client'

import { getServiceById, getTotalPriceMin, getTotalPriceMax } from '@/data/services'
import { SavedCar } from '@/hooks/useCarStore'
import { Button } from '@/components/ui/Button'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface ServiceDetailScreenProps {
  serviceId: string
  car: SavedCar
  onBook: () => void
  onBack: () => void
}

export function ServiceDetailScreen({ serviceId, car, onBook, onBack }: ServiceDetailScreenProps) {
  const service = getServiceById(serviceId)
  if (!service) return null

  const totalMin = getTotalPriceMin(service)
  const totalMax = getTotalPriceMax(service)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button
            onClick={() => { haptic('light'); onBack() }}
            className="text-[var(--accent)] text-[17px] font-medium flex items-center gap-1"
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('common.back')}
          </button>
          <div className="flex-1 text-center text-[17px] font-semibold text-[var(--ink)] pr-10">
            {t(service.nameKey)}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Service header card */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 mb-4 spring-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-[55px] h-[55px] rounded-[13px] bg-[var(--accent)] bg-opacity-10 flex items-center justify-center text-[28px]">
              {service.icon}
            </div>
            <div>
              <h2 className="text-[22px] font-semibold text-[var(--ink)]">{t(service.nameKey)}</h2>
              <p className="text-[15px] text-[var(--ink-secondary)]">{t(service.descKey)}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[var(--fill)] rounded-[10px] p-3 text-center">
              <div className="text-[13px] text-[var(--ink-secondary)] mb-1">⏱ Время</div>
              <div className="text-[17px] font-semibold text-[var(--ink)]">{service.duration} мин</div>
            </div>
            <div className="bg-[var(--fill)] rounded-[10px] p-3 text-center">
              <div className="text-[13px] text-[var(--ink-secondary)] mb-1">🔧 Работа</div>
              <div className="text-[17px] font-semibold text-[var(--ink)]">{service.laborPrice.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="bg-[var(--fill)] rounded-[10px] p-3 text-center">
              <div className="text-[13px] text-[var(--ink-secondary)] mb-1">💰 Итого</div>
              <div className="text-[17px] font-semibold text-[var(--accent)]">{totalMin.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>
        </div>

        {/* Car info */}
        <div className="bg-[var(--accent)] bg-opacity-10 rounded-[13px] p-3 mb-4 flex items-center gap-3 spring-in" style={{ animationDelay: '100ms' }}>
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
              <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
            </svg>
          </div>
          <div className="text-[15px] text-[var(--accent)] font-medium">{car.modelName} • {car.year}</div>
        </div>

        {/* Parts breakdown */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden mb-4 spring-in" style={{ animationDelay: '150ms' }}>
          <div className="px-4 py-3 border-b border-[var(--separator)]">
            <h3 className="text-[15px] font-semibold text-[var(--ink)]">📦 Запчасти и расходники</h3>
          </div>

          {/* Parts grouped by type */}
          {groupPartsByName(service.parts).map((group, i) => (
            <div key={i}>
              <div className="px-4 py-2 bg-[var(--fill-secondary)]">
                <span className="text-[13px] font-medium text-[var(--ink-secondary)]">{group.name}</span>
              </div>
              {group.items.map((part, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between px-4 py-3 border-b border-[var(--separator)] last:border-b-0"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <div className="text-[15px] text-[var(--ink)]">{part.brand}</div>
                    {part.article && (
                      <div className="text-[11px] text-[var(--ink-secondary)] mt-0.5">арт. {part.article}</div>
                    )}
                  </div>
                  <div className="text-[15px] font-medium text-[var(--ink)] whitespace-nowrap">
                    {part.priceMin === part.priceMax
                      ? `${part.priceMin.toLocaleString('ru-RU')} ₽`
                      : `${part.priceMin.toLocaleString('ru-RU')}–${part.priceMax.toLocaleString('ru-RU')} ₽`
                    }
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Total breakdown */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 mb-6 spring-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-[15px] font-semibold text-[var(--ink)] mb-3">💰 Стоимость</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[15px] text-[var(--ink-secondary)]">Запчасти</span>
              <span className="text-[15px] text-[var(--ink)]">
                {service.partsPriceMin === service.partsPriceMax
                  ? `${service.partsPriceMin.toLocaleString('ru-RU')} ₽`
                  : `от ${service.partsPriceMin.toLocaleString('ru-RU')} до ${service.partsPriceMax.toLocaleString('ru-RU')} ₽`
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[15px] text-[var(--ink-secondary)]">Работа</span>
              <span className="text-[15px] text-[var(--ink)]">{service.laborPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[15px] text-[var(--ink-secondary)]">Время</span>
              <span className="text-[15px] text-[var(--ink)]">~{service.duration} мин</span>
            </div>
            <div className="border-t border-[var(--separator)] pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-[17px] font-semibold text-[var(--ink)]">Итого</span>
                <span className="text-[17px] font-bold text-[var(--accent)]">
                  от {totalMin.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-[var(--warning)] bg-opacity-10 rounded-[13px] p-3 mb-6 spring-in" style={{ animationDelay: '250ms' }}>
          <p className="text-[13px] text-[var(--ink-secondary)] leading-[1.4]">
            💡 Цены указаны на основе среднерыночных. Точная стоимость зависит от выбранного бренда запчастей и модели автомобиля.
          </p>
        </div>

        {/* Book button */}
        <div className="spring-in" style={{ animationDelay: '300ms' }}>
          <Button onClick={() => { haptic('medium'); onBook() }} size="large">
            Записаться — от {totalMin.toLocaleString('ru-RU')} ₽
          </Button>
        </div>
      </div>
    </div>
  )
}

// Group parts by name for display
function groupPartsByName(parts: { name: string; brand: string; article?: string; priceMin: number; priceMax: number }[]) {
  const groups: { name: string; items: typeof parts }[] = []
  const seen = new Set<string>()

  for (const part of parts) {
    if (seen.has(part.name)) {
      const group = groups.find(g => g.name === part.name)
      if (group) group.items.push(part)
    } else {
      seen.add(part.name)
      groups.push({ name: part.name, items: [part] })
    }
  }

  return groups
}
