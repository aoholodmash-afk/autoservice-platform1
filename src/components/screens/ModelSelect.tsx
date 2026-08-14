'use client'

import { getBrandById } from '@/data/vaz'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface ModelSelectProps {
  brandId: string
  onSelect: (id: string, name: string) => void
}

export function ModelSelect({ brandId, onSelect }: ModelSelectProps) {
  const brand = getBrandById(brandId)
  if (!brand) return null

  const handleSelect = (id: string, name: string) => {
    haptic('medium')
    onSelect(id, name)
  }

  // Group by era
  const classic = brand.models.filter(m => m.yearEnd && m.yearEnd < 2005)
  const modern = brand.models.filter(m => !m.yearEnd || m.yearEnd >= 2005)

  return (
    <div className="px-4 pt-6">
      <h1 className="text-[34px] font-bold text-[var(--ink)] mb-6">
        {t('wizard.model')}
      </h1>

      {/* Modern models */}
      {modern.length > 0 && (
        <>
          <div className="section-header-ios">Современные</div>
          <div className="space-y-2 mb-6">
            {modern.map((model, index) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id, model.name)}
                className="w-full flex items-center gap-4 p-4 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform duration-200 text-left spring-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[var(--accent)] bg-opacity-10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                    <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 2h1l1-2M19 17l1 2h-1l-1-2"/>
                    <circle cx="7.5" cy="17" r="1.5"/>
                    <circle cx="16.5" cy="17" r="1.5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-medium text-[var(--ink)]">
                    {model.name}
                  </div>
                  <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5">
                    {model.yearStart}–{model.yearEnd || 'н.в.'} • {model.engines.length} двигателей
                  </div>
                </div>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
                  <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Classic models */}
      {classic.length > 0 && (
        <>
          <div className="section-header-ios">Классика</div>
          <div className="space-y-2">
            {classic.map((model, index) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id, model.name)}
                className="w-full flex items-center gap-4 p-4 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform duration-200 text-left spring-up"
                style={{ animationDelay: `${(modern.length + index) * 50}ms` }}
              >
                <div className="w-[44px] h-[44px] rounded-[10px] bg-[var(--fill)] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink-secondary)" strokeWidth="2">
                    <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 2h1l1-2M19 17l1 2h-1l-1-2"/>
                    <circle cx="7.5" cy="17" r="1.5"/>
                    <circle cx="16.5" cy="17" r="1.5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-medium text-[var(--ink)]">
                    {model.name}
                  </div>
                  <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5">
                    {model.yearStart}–{model.yearEnd} • {model.engines.length} двигателей
                  </div>
                </div>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
                  <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
