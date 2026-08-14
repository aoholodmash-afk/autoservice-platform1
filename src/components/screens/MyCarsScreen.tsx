'use client'

import { useCarStore, SavedCar } from '@/hooks/useCarStore'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface MyCarsScreenProps {
  onSelectCar: (car: SavedCar) => void
  onAddCar: () => void
}

export function MyCarsScreen({ onSelectCar, onAddCar }: MyCarsScreenProps) {
  const { cars, removeCar } = useCarStore()

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    haptic('heavy')
    if (confirm('Удалить автомобиль?')) {
      removeCar(id)
    }
  }

  if (cars.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-[34px] font-bold text-[var(--ink)]">
            {t('myCars.title')}
          </h1>
        </div>
        <EmptyState
          icon="🚗"
          title={t('myCars.empty.title')}
          description={t('myCars.empty.desc')}
          action={
            <Button onClick={onAddCar} size="default">
              {t('myCars.add')}
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-[34px] font-bold text-[var(--ink)]">
          {t('myCars.title')}
        </h1>
      </div>

      <div className="px-4 space-y-3">
        {cars.map((car, index) => (
          <div
            key={car.id}
            onClick={() => {
              haptic('light')
              onSelectCar(car)
            }}
            className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 cursor-pointer active:scale-[0.98] transition-transform duration-200 spring-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-center gap-4">
              {/* Car icon */}
              <div className="w-[55px] h-[55px] rounded-[13px] bg-[var(--accent)] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 2h1l1-2M19 17l1 2h-1l-1-2"/>
                  <circle cx="7.5" cy="17" r="1.5"/>
                  <circle cx="16.5" cy="17" r="1.5"/>
                </svg>
              </div>

              {/* Car info */}
              <div className="flex-1 min-w-0">
                <div className="text-[17px] font-semibold text-[var(--ink)] truncate">
                  {car.modelName}
                </div>
                <div className="text-[15px] text-[var(--ink-secondary)] mt-0.5">
                  {car.year} • {car.engineName}
                </div>
                {car.mileage && (
                  <div className="text-[13px] text-[var(--ink-secondary)] mt-1">
                    {t('myCars.mileage')}: {car.mileage.toLocaleString('ru-RU')} {t('myCars.km')}
                  </div>
                )}
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => handleDelete(e, car.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--danger)] opacity-50 hover:opacity-100 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Add another car */}
        <button
          onClick={() => {
            haptic('light')
            onAddCar()
          }}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-[13px] border-2 border-dashed border-[var(--separator)] text-[var(--accent)] text-[17px] font-medium active:bg-[var(--fill)] transition-colors duration-150"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {t('myCars.add')}
        </button>
      </div>
    </div>
  )
}
