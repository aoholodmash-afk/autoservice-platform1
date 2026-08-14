'use client'

import { getModelById, getYears } from '@/data/vaz'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface YearSelectProps {
  brandId: string
  modelId: string
  onSelect: (year: number) => void
}

export function YearSelect({ brandId, modelId, onSelect }: YearSelectProps) {
  const model = getModelById(brandId, modelId)
  if (!model) return null

  const years = getYears(model)

  const handleSelect = (year: number) => {
    haptic('medium')
    onSelect(year)
  }

  // Group decades
  const decades = new Map<number, number[]>()
  years.forEach(year => {
    const decade = Math.floor(year / 10) * 10
    if (!decades.has(decade)) decades.set(decade, [])
    decades.get(decade)!.push(year)
  })

  return (
    <div className="px-4 pt-6">
      <h1 className="text-[34px] font-bold text-[var(--ink)] mb-2">
        {t('wizard.year')}
      </h1>
      <p className="text-[15px] text-[var(--ink-secondary)] mb-6">
        {model.name}
      </p>

      {/* Year grid by decade */}
      <div className="space-y-6">
        {Array.from(decades.entries()).map(([decade, decadeYears]) => (
          <div key={decade}>
            <div className="section-header-ios">{decade}-е</div>
            <div className="grid grid-cols-4 gap-2">
              {decadeYears.map((year, index) => (
                <button
                  key={year}
                  onClick={() => handleSelect(year)}
                  className="h-[50px] bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] flex items-center justify-center text-[17px] font-medium text-[var(--ink)] active:bg-[var(--accent)] active:text-white transition-colors duration-150 spring-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
