'use client'

import { getBrandById, getModelsByBrand } from '@/data/vehicles'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface ModelSelectProps {
  brandId: string
  onSelect: (id: string, name: string) => void
}

export function ModelSelect({ brandId, onSelect }: ModelSelectProps) {
  const brand = getBrandById(brandId)
  if (!brand) return null

  const models = getModelsByBrand(brandId)
  const popular = models.filter(m => m.popular)
  const other = models.filter(m => !m.popular)

  const handleSelect = (id: string, name: string) => {
    haptic('medium')
    onSelect(id, name)
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-[34px] font-bold text-[var(--ink)] mb-2">
        {t('wizard.model')}
      </h1>
      <p className="text-[15px] text-[var(--ink-secondary)] mb-6">{brand.name}</p>

      {/* Popular models */}
      {popular.length > 0 && (
        <div className="mb-6">
          <div className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-3 tracking-wider">Популярные</div>
          <div className="space-y-2">
            {popular.map((model, index) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id, model.name)}
                className="w-full flex items-center gap-4 p-4 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform text-left spring-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[var(--accent)] bg-opacity-10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                    <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
                    <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-semibold text-[var(--ink)]">{model.name}</div>
                  <div className="text-[12px] text-[var(--ink-secondary)]">{model.years} • {model.engines.length} двигателей</div>
                </div>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
                  <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Other models */}
      {other.length > 0 && (
        <div>
          <div className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-3 tracking-wider">Все модели</div>
          <div className="space-y-2">
            {other.map((model, index) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id, model.name)}
                className="w-full flex items-center gap-4 p-3 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform text-left spring-up"
                style={{ animationDelay: `${(popular.length + index) * 50}ms` }}
              >
                <div className="w-[36px] h-[36px] rounded-[8px] bg-[var(--fill)] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-secondary)" strokeWidth="2">
                    <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
                    <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[var(--ink)]">{model.name}</div>
                  <div className="text-[11px] text-[var(--ink-secondary)]">{model.years}</div>
                </div>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-20">
                  <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
