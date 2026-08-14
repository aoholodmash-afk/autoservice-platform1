'use client'

import { SavedCar } from '@/hooks/useCarStore'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface MainMenuScreenProps {
  car: SavedCar
  onOpenRepair: (categoryId?: string) => void
  onOpenCalculator: () => void
  onOpenReviews: () => void
  onOpenChecklist: () => void
  onOpenLoyalty: () => void
  onOpenHistory: () => void
  onOpenChat: () => void
  onOpenReferral: () => void
  onOpenWarranty: () => void
  onOpenLocation: () => void
}

const MENU_ITEMS = [
  { id: 'to', icon: '🛢', name: 'ТО', desc: 'Масло, фильтры, жидкости', category: 'to' },
  { id: 'repair', icon: '🔧', name: 'Ремонт', desc: 'Запчасти, цены, запись', category: null },
  { id: 'diagnostic', icon: '🔍', name: 'Диагностика', desc: 'Компьютерная проверка', category: 'electrical' },
  { id: 'tires', icon: '🛞', name: 'Шиномонтаж', desc: 'Замена и ремонт шин', category: null },
  { id: 'calculator', icon: '🧮', name: 'Калькулятор ТО', desc: 'Что менять по пробегу', category: null },
  { id: 'reviews', icon: '⭐', name: 'Отзывы', desc: 'Оценки клиентов', category: null },
  { id: 'checklist', icon: '📋', name: 'Чек-лист', desc: 'Цифровой осмотр', category: null },
  { id: 'loyalty', icon: '💎', name: 'Лояльность', desc: 'Баллы и скидки', category: null },
  { id: 'history', icon: '📜', name: 'История ТО', desc: 'Все записи', category: null },
  { id: 'chat', icon: '💬', name: 'Чат', desc: 'Связь с мастером', category: null },
  { id: 'referral', icon: '🎁', name: 'Рефералы', desc: 'Приведи друга', category: null },
  { id: 'warranty', icon: '🛡', name: 'Гарантия', desc: 'Гарантийные талоны', category: null },
]

export function MainMenuScreen({
  car, onOpenRepair, onOpenCalculator, onOpenReviews, onOpenChecklist,
  onOpenLoyalty, onOpenHistory, onOpenChat, onOpenReferral, onOpenWarranty, onOpenLocation
}: MainMenuScreenProps) {

  const handleClick = (item: typeof MENU_ITEMS[0]) => {
    haptic('medium')
    switch (item.id) {
      case 'to': onOpenRepair(item.category!); break
      case 'repair': onOpenRepair(); break
      case 'diagnostic': onOpenRepair(); break
      case 'tires': onOpenRepair(); break
      case 'calculator': onOpenCalculator(); break
      case 'reviews': onOpenReviews(); break
      case 'checklist': onOpenChecklist(); break
      case 'loyalty': onOpenLoyalty(); break
      case 'history': onOpenHistory(); break
      case 'chat': onOpenChat(); break
      case 'referral': onOpenReferral(); break
      case 'warranty': onOpenWarranty(); break
    }
  }

  // Primary items (2x2 grid)
  const primaryItems = MENU_ITEMS.slice(0, 4)
  // Secondary items (list)
  const secondaryItems = MENU_ITEMS.slice(4)

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-[34px] font-bold text-[var(--ink)] mb-1">Что нужно?</h1>
      </div>

      {/* Selected car indicator */}
      <div className="px-4 mb-5">
        <button onClick={onOpenLocation}
          className="w-full flex items-center gap-3 p-3 bg-[var(--accent)] bg-opacity-10 rounded-[13px] active:scale-[0.98] transition-transform">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
              <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
            </svg>
          </div>
          <div className="flex-1 text-left">
            <div className="text-[14px] font-medium text-[var(--accent)]">{car.brandName} {car.modelName}</div>
            <div className="text-[12px] text-[var(--accent)] opacity-70">{car.year} • {car.engineName}</div>
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30"><path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Primary categories (2x2 grid) */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-2 gap-3">
          {primaryItems.map((item, index) => (
            <button key={item.id} onClick={() => handleClick(item)}
              className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 text-left active:scale-[0.97] transition-transform duration-200 spring-up"
              style={{ animationDelay: `${index * 80}ms` }}>
              <div className="text-[34px] mb-3">{item.icon}</div>
              <div className="text-[17px] font-semibold text-[var(--ink)] mb-1">{item.name}</div>
              <div className="text-[13px] text-[var(--ink-secondary)] leading-[1.3]">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Secondary services (list) */}
      <div className="px-4">
        <div className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-2 px-1">Сервисы</div>
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden">
          {secondaryItems.map((item, index) => (
            <button key={item.id} onClick={() => handleClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left active:bg-[var(--fill)] transition-colors ${
                index < secondaryItems.length - 1 ? 'border-b border-[var(--separator)]' : ''
              }`}>
              <span className="text-[20px] w-8 text-center">{item.icon}</span>
              <div className="flex-1">
                <div className="text-[15px] font-medium text-[var(--ink)]">{item.name}</div>
                <div className="text-[11px] text-[var(--ink-secondary)]">{item.desc}</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-20"><path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
