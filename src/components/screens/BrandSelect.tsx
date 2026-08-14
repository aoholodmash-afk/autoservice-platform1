'use client'

import { useState } from 'react'
import { BRANDS } from '@/data/vaz'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface BrandSelectProps {
  onSelect: (id: string, name: string) => void
}

export function BrandSelect({ onSelect }: BrandSelectProps) {
  const [search, setSearch] = useState('')

  const filtered = BRANDS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.nameEn.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (id: string, name: string) => {
    haptic('medium')
    onSelect(id, name)
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-[34px] font-bold text-[var(--ink)] mb-6">
        {t('wizard.brand')}
      </h1>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink-secondary)]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('wizard.brand.search')}
          className="w-full h-[36px] pl-10 pr-4 bg-[var(--fill)] rounded-[10px] text-[15px] text-[var(--ink)] placeholder-[var(--ink-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30"
        />
      </div>

      {/* Brand list */}
      <div className="space-y-3">
        {filtered.map((brand, index) => (
          <button
            key={brand.id}
            onClick={() => handleSelect(brand.id, brand.name)}
            className="w-full flex items-center gap-4 p-4 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform duration-200 text-left spring-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Brand icon */}
            <div className="w-[55px] h-[55px] rounded-[13px] bg-[var(--fill)] flex items-center justify-center text-[28px]">
              {brand.id === 'vaz' ? '🇷🇺' : '🚗'}
            </div>

            {/* Brand info */}
            <div className="flex-1">
              <div className="text-[17px] font-semibold text-[var(--ink)]">
                {brand.name}
              </div>
              {brand.models.length > 0 && (
                <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5">
                  {brand.models.length} моделей
                </div>
              )}
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
