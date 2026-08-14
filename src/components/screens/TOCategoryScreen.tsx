'use client'

import { getServicesByCategory, getCategoryById, ServiceCategory } from '@/data/services'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface TOCategoryScreenProps {
  category: ServiceCategory
  onSelectService: (serviceId: string) => void
  onBack: () => void
}

export function TOCategoryScreen({ category, onSelectService, onBack }: TOCategoryScreenProps) {
  const categoryInfo = getCategoryById(category)
  const services = getServicesByCategory(category)

  const handleSelect = (serviceId: string) => {
    haptic('medium')
    onSelectService(serviceId)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button
            onClick={() => {
              haptic('light')
              onBack()
            }}
            className="text-[var(--accent)] text-[17px] font-medium flex items-center gap-1"
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('common.back')}
          </button>
          <div className="flex-1 text-center text-[17px] font-semibold text-[var(--ink)] pr-10">
            {categoryInfo ? t(categoryInfo.nameKey) : ''}
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="px-4 pt-4 pb-24">
        <div className="space-y-3">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleSelect(service.id)}
              className="w-full bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 text-left active:scale-[0.98] transition-transform duration-200 spring-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[var(--fill)] flex items-center justify-center text-[22px] flex-shrink-0">
                  {service.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[17px] font-medium text-[var(--ink)]">
                    {t(service.nameKey)}
                  </div>
                  <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5">
                    {t(service.descKey)}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[13px] text-[var(--ink-secondary)]">
                      {service.duration} {t('to.minutes')}
                    </span>
                    <span className="text-[15px] font-semibold text-[var(--accent)]">
                      {t('to.from')} {service.priceFrom.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                {/* Book button */}
                <div className="flex-shrink-0 self-center">
                  <div className="px-3 py-1.5 bg-[var(--accent)] rounded-[8px] text-white text-[13px] font-medium">
                    {t('to.book')}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
