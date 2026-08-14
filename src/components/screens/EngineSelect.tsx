'use client'

import { getModelById } from '@/data/vaz'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface EngineSelectProps {
  brandId: string
  modelId: string
  onSelect: (id: string, name: string) => void
}

export function EngineSelect({ brandId, modelId, onSelect }: EngineSelectProps) {
  const model = getModelById(brandId, modelId)
  if (!model) return null

  const handleSelect = (id: string, name: string) => {
    haptic('medium')
    onSelect(id, name)
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-[34px] font-bold text-[var(--ink)] mb-2">
        {t('wizard.engine')}
      </h1>
      <p className="text-[15px] text-[var(--ink-secondary)] mb-6">
        {model.name}
      </p>

      <div className="space-y-3">
        {model.engines.map((engine, index) => (
          <button
            key={engine.id}
            onClick={() => handleSelect(engine.id, engine.name)}
            className="w-full flex items-center gap-4 p-4 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform duration-200 text-left spring-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {/* Engine icon */}
            <div className="w-[44px] h-[44px] rounded-[10px] bg-[var(--fill)] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink-secondary)" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </div>

            {/* Engine info */}
            <div className="flex-1">
              <div className="text-[17px] font-medium text-[var(--ink)]">
                {engine.name}
              </div>
              <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5">
                {engine.volume}L • {engine.power} л.с. • {engine.type === 'carburetor' ? 'карбюратор' : 'инжектор'}
              </div>
            </div>

            {/* Arrow */}
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
