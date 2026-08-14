'use client'

import { getBrandById, getModelsByBrand } from '@/data/vehicles'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface YearSelectProps {
  brandId: string
  modelId: string
  onSelect: (year: number) => void
}

function parseYears(yearsStr: string): number[] {
  const match = yearsStr.match(/(\d{4})[–-](\d{4}|н\.в\.)/)
  if (!match) return []
  const start = parseInt(match[1])
  const end = match[2] === 'н.в.' ? new Date().getFullYear() : parseInt(match[2])
  const result: number[] = []
  for (let y = end; y >= start; y--) {
    result.push(y)
  }
  return result
}

export function YearSelect({ brandId, modelId, onSelect }: YearSelectProps) {
  const brand = getBrandById(brandId)
  const model = brand?.models.find(m => m.id === modelId)
  if (!model) return null

  const years = parseYears(model.years)

  const handleSelect = (year: number) => {
    haptic('medium')
    onSelect(year)
  }

  // Group by decade
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
      <p className="text-[15px] text-[var(--ink-secondary)] mb-6">{model.name}</p>

      <div className="space-y-6">
        {Array.from(decades.entries()).map(([decade, decadeYears]) => (
          <div key={decade}>
            <div className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-2 tracking-wider">{decade}-е</div>
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
