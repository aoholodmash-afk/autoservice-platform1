'use client'

import { CATEGORIES } from '@/data/services'
import { SavedCar } from '@/hooks/useCarStore'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface MainMenuScreenProps {
  car: SavedCar
  onOpenRepair: (categoryId?: string) => void
}

const MENU_ITEMS = [
  { id: 'to', icon: '🛢', nameKey: 'menu.to', descKey: 'menu.to.desc', repairCategory: 'to' },
  { id: 'repair', icon: '🔧', nameKey: 'Ремонт', descKey: 'Запчасти, цены, запись', repairCategory: null },
  { id: 'diagnostic', icon: '🔍', nameKey: 'menu.diagnostic', descKey: 'menu.diagnostic.desc', repairCategory: null },
  { id: 'tires', icon: '🛞', nameKey: 'menu.tires', descKey: 'menu.tires.desc', repairCategory: null },
]

export function MainMenuScreen({ car, onOpenRepair }: MainMenuScreenProps) {
  const handleSelect = (item: typeof MENU_ITEMS[0]) => {
    haptic('medium')
    onOpenRepair(item.repairCategory || undefined)
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-[34px] font-bold text-[var(--ink)] mb-1">
          {t('menu.title')}
        </h1>
      </div>

      {/* Selected car indicator */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-[var(--accent)] bg-opacity-10 rounded-[13px]">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
              <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
            </svg>
          </div>
          <div>
            <div className="text-[15px] font-medium text-[var(--accent)]">{car.modelName}</div>
            <div className="text-[13px] text-[var(--accent)] opacity-70">{car.year} • {car.engineName}</div>
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 text-left active:scale-[0.97] transition-transform duration-200 spring-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="text-[34px] mb-3">{item.icon}</div>
              <div className="text-[17px] font-semibold text-[var(--ink)] mb-1">
                {item.nameKey.startsWith('menu.') ? t(item.nameKey) : item.nameKey}
              </div>
              <div className="text-[13px] text-[var(--ink-secondary)] leading-[1.3]">
                {item.descKey.startsWith('menu.') ? t(item.descKey) : item.descKey}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
