'use client'

import { useState, useEffect } from 'react'
import { getTenants, Tenant } from '@/lib/tenantStore'
import { haptic } from '@/lib/constants'

export default function HomePage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setTenants(getTenants().filter(t => t.isActive))
  }, [])

  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.city && t.city.toLowerCase().includes(search.toLowerCase()))
  )

  const cities = Array.from(new Set(tenants.map(t => t.city).filter((c): c is string => !!c)))

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)' }}>
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full bg-white opacity-10 blur-[60px]" />
        </div>
        <div className="relative px-5 pt-12 pb-8 text-white">
          <h1 className="text-[34px] font-bold mb-2">AutoService</h1>
          <p className="text-[15px] opacity-80">Найдите ближайший автосервис</p>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10 pb-24">
        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink-secondary)]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию или городу..."
            className="w-full h-[44px] pl-10 pr-4 bg-white rounded-[13px] text-[15px] outline-none shadow-sm border border-[var(--separator)] focus:border-[var(--accent)]" />
        </div>

        {/* Cities */}
        {cities.length > 1 && !search && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {cities.map(city => (
              <button key={city} onClick={() => setSearch(city!)}
                className="px-3 py-1.5 bg-white rounded-full text-[13px] font-medium text-[var(--ink)] shadow-sm whitespace-nowrap">
                📍 {city}
              </button>
            ))}
          </div>
        )}

        {/* Tenants list */}
        <div className="space-y-3">
          {filtered.map((tenant, i) => (
            <a key={tenant.id} href={`/${tenant.slug}`}
              className="block bg-white rounded-[16px] shadow-sm overflow-hidden spring-up active:scale-[0.98] transition-transform"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #007AFF, #5856D6)' }}>
                    🔧
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[17px] font-semibold text-[var(--ink)]">{tenant.name}</h3>
                    <p className="text-[13px] text-[var(--ink-secondary)] mt-0.5">{tenant.address}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[12px] text-[var(--ink-secondary)]">📍 {tenant.city}</span>
                      <span className="text-[12px] text-[var(--ink-secondary)]">🕐 {tenant.workHours}</span>
                      <span className="text-[12px] text-[var(--ink-secondary)]">🔧 {tenant.boxes} боксов</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tenant.serviceCategories.map(cat => (
                        <span key={cat} className="px-2 py-0.5 bg-[var(--fill)] rounded-full text-[10px] text-[var(--ink-secondary)]">
                          {cat === 'to' ? 'ТО' : cat === 'repair' ? 'Ремонт' : cat === 'diagnostic' ? 'Диагностика' : 'Шины'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-20 mt-4">
                    <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[44px] mb-3">🔍</div>
            <p className="text-[15px] text-[var(--ink-secondary)]">Ничего не найдено</p>
          </div>
        )}

        {/* Admin link */}
        <div className="mt-8 text-center">
          <a href="/super" className="text-[13px] text-[var(--ink-secondary)] hover:text-[var(--accent)]">
            Панель управления →
          </a>
        </div>
      </div>
    </div>
  )
}
