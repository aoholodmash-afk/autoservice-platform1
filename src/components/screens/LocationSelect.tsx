'use client'

import { useState } from 'react'
import { haptic } from '@/lib/constants'

export interface Location {
  id: string
  name: string
  address: string
  phone: string
  workHours: string
  boxes: number
  rating: number
}

const LOCATIONS: Location[] = [
  { id: 'loc1', name: 'AutoService Центр', address: 'ул. Пушкина, д. 10', phone: '+7 (999) 123-45-67', workHours: '09:00–20:00', boxes: 4, rating: 4.8 },
  { id: 'loc2', name: 'AutoService Юг', address: 'пр. Победы, д. 45', phone: '+7 (999) 234-56-78', workHours: '08:00–19:00', boxes: 3, rating: 4.6 },
  { id: 'loc3', name: 'AutoService Север', address: 'ул. Ленина, д. 78', phone: '+7 (999) 345-67-89', workHours: '09:00–21:00', boxes: 5, rating: 4.9 },
]

interface LocationSelectProps {
  onSelect: (location: Location) => void
  onBack: () => void
  currentLocationId?: string
}

export function LocationSelect({ onSelect, onBack, currentLocationId }: LocationSelectProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">📍 Выбор филиала</div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        <div className="space-y-3">
          {LOCATIONS.map((loc, i) => {
            const isSelected = loc.id === currentLocationId
            return (
              <button key={loc.id} onClick={() => { haptic('medium'); onSelect(loc) }}
                className={`w-full rounded-[13px] p-4 text-left transition-all spring-up ${
                  isSelected ? 'bg-[var(--accent)] bg-opacity-10 border-2 border-[var(--accent)]' : 'bg-[var(--card)] shadow-[var(--shadow-card)] border-2 border-transparent'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-[13px] flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-[var(--accent)]' : 'bg-[var(--fill)]'
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isSelected ? 'white' : 'var(--ink-secondary)'} strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[16px] font-semibold text-[var(--ink)]">{loc.name}</div>
                    <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5">{loc.address}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-[var(--ink-secondary)]">🕐 {loc.workHours}</span>
                      <span className="text-[11px] text-[var(--ink-secondary)]">🔧 {loc.boxes} боксов</span>
                      <span className="text-[11px] text-[#FF9500]">⭐ {loc.rating}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
