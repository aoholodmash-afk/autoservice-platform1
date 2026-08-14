'use client'

import { useState } from 'react'
import { BRANDS, getPopularBrands } from '@/data/vehicles'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface BrandSelectProps {
  onSelect: (id: string, name: string) => void
}

export function BrandSelect({ onSelect }: BrandSelectProps) {
  const [search, setSearch] = useState('')

  const popularBrands = getPopularBrands()
  const allBrands = BRANDS

  const filtered = search
    ? allBrands.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
    : allBrands

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
          placeholder="Поиск марки..."
          className="w-full h-[40px] pl-10 pr-4 bg-[var(--fill)] rounded-[10px] text-[15px] text-[var(--ink)] placeholder-[var(--ink-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30"
        />
      </div>

      {/* Popular brands (when not searching) */}
      {!search && (
        <div className="mb-6">
          <div className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-3 tracking-wider">Популярные</div>
          <div className="grid grid-cols-2 gap-2">
            {popularBrands.slice(0, 8).map((brand, i) => (
              <button
                key={brand.id}
                onClick={() => handleSelect(brand.id, brand.name)}
                className="flex items-center gap-3 p-3 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.97] transition-transform spring-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="text-[24px]">{brand.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-[var(--ink)] truncate">{brand.name}</div>
                  <div className="text-[11px] text-[var(--ink-secondary)]">{brand.models.length} моделей</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All brands */}
      <div>
        <div className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-3 tracking-wider">
          {search ? 'Результаты' : 'Все марки'}
        </div>
        <div className="space-y-2">
          {filtered.map((brand, index) => (
            <button
              key={brand.id}
              onClick={() => handleSelect(brand.id, brand.name)}
              className="w-full flex items-center gap-4 p-4 bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform duration-200 text-left spring-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="w-[44px] h-[44px] rounded-[10px] bg-[var(--fill)] flex items-center justify-center text-[22px]">
                {brand.logo}
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-semibold text-[var(--ink)]">{brand.name}</div>
                <div className="text-[12px] text-[var(--ink-secondary)]">{brand.country} • {brand.models.length} моделей</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
