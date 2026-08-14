'use client'

import { useState } from 'react'
import { AVTOVAZ_MODELS, Vehicle } from '@/data/vehicles'
import { MAINTENANCE_INTERVALS, getRequiredMaintenance, getUpcomingMaintenance, getMaintenanceCost, MaintenanceInterval } from '@/data/maintenance-intervals'
import { SavedCar } from '@/hooks/useCarStore'
import { haptic } from '@/lib/constants'

interface TOCalculatorScreenProps {
  car: SavedCar | null
  onBack: () => void
  onBook: (items: MaintenanceInterval[]) => void
}

export function TOCalculatorScreen({ car, onBack, onBook }: TOCalculatorScreenProps) {
  const [mileage, setMileage] = useState(car?.mileage?.toString() || '')
  const [lastServiceKm, setLastServiceKm] = useState('')
  const [result, setResult] = useState<{ required: MaintenanceInterval[]; upcoming: MaintenanceInterval[]; cost: { min: number; max: number } } | null>(null)

  const calculate = () => {
    haptic('medium')
    const km = parseInt(mileage) || 0
    const lastKm = parseInt(lastServiceKm) || 0
    const required = getRequiredMaintenance(km, lastKm)
    const upcoming = getUpcomingMaintenance(km, lastKm)
    const cost = getMaintenanceCost(required)
    setResult({ required, upcoming, cost })
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">
            🧮 Калькулятор ТО
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Car info */}
        {car && (
          <div className="flex items-center gap-3 p-3 bg-[var(--accent)] bg-opacity-10 rounded-[13px] mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>
            </div>
            <div>
              <div className="text-[14px] font-medium text-[var(--accent)]">{car.brandName} {car.modelName}</div>
              <div className="text-[12px] text-[var(--accent)] opacity-70">{car.year} • {car.engineName}</div>
            </div>
          </div>
        )}

        {/* Input form */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 mb-4">
          <h2 className="text-[18px] font-bold text-[var(--ink)] mb-4">Введите данные</h2>

          <div className="space-y-4">
            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Текущий пробег (км) *</label>
              <input type="number" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="Например: 45000"
                className="w-full h-[44px] px-4 bg-[var(--fill)] rounded-[13px] text-[16px] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30" />
            </div>
            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Пробег на последнем ТО</label>
              <input type="number" value={lastServiceKm} onChange={e => setLastServiceKm(e.target.value)} placeholder="Оставьте пустым, если не знаете"
                className="w-full h-[44px] px-4 bg-[var(--fill)] rounded-[13px] text-[16px] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30" />
            </div>
            <button onClick={calculate} disabled={!mileage}
              className="w-full h-[50px] bg-[var(--accent)] text-white rounded-[13px] font-semibold text-[17px] disabled:opacity-40 active:scale-[0.97] transition-transform">
              Рассчитать
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4 spring-in">
            {/* Total cost */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 text-center">
              <div className="text-[13px] text-[var(--ink-secondary)] mb-1">Стоимость ТО</div>
              <div className="text-[28px] font-bold text-[var(--accent)]">
                {result.cost.min.toLocaleString('ru-RU')} – {result.cost.max.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-[12px] text-[var(--ink-secondary)] mt-1">
                {result.required.length} работ • запчасти + работа
              </div>
            </div>

            {/* Required maintenance */}
            {result.required.length > 0 && (
              <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="px-4 py-3 bg-[#FF3B30] bg-opacity-10 border-b border-[var(--separator)]">
                  <h3 className="text-[14px] font-semibold text-[#FF3B30]">⚠️ Требуется замена</h3>
                </div>
                <div className="divide-y divide-[var(--separator)]">
                  {result.required.map(item => (
                    <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-[14px] font-medium text-[var(--ink)]">{item.name}</div>
                        <div className="text-[11px] text-[var(--ink-secondary)]">каждые {item.intervalKm.toLocaleString('ru-RU')} км</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[14px] font-semibold text-[var(--ink)]">{item.estimatedCost.min.toLocaleString('ru-RU')}–{item.estimatedCost.max.toLocaleString('ru-RU')} ₽</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming maintenance */}
            {result.upcoming.length > 0 && (
              <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="px-4 py-3 bg-[#FF9500] bg-opacity-10 border-b border-[var(--separator)]">
                  <h3 className="text-[14px] font-semibold text-[#FF9500]">🔔 Скоро потребуется</h3>
                </div>
                <div className="divide-y divide-[var(--separator)]">
                  {result.upcoming.map(item => (
                    <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-[14px] font-medium text-[var(--ink)]">{item.name}</div>
                        <div className="text-[11px] text-[var(--ink-secondary)]">каждые {item.intervalKm.toLocaleString('ru-RU')} км</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[14px] font-semibold text-[var(--ink-secondary)]">{item.estimatedCost.min.toLocaleString('ru-RU')}–{item.estimatedCost.max.toLocaleString('ru-RU')} ₽</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book button */}
            {result.required.length > 0 && (
              <button onClick={() => onBook(result.required)}
                className="w-full h-[50px] bg-[#34C759] text-white rounded-[13px] font-semibold text-[17px] active:scale-[0.97] transition-transform">
                Записаться на ТО
              </button>
            )}
          </div>
        )}

        {/* Info */}
        {!result && (
          <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 mt-4">
            <h3 className="text-[14px] font-semibold text-[var(--ink)] mb-2">Как это работает?</h3>
            <div className="space-y-2 text-[13px] text-[var(--ink-secondary)]">
              <p>• Введите текущий пробег вашего автомобиля</p>
              <p>• Система рассчитает какие работы нужны прямо сейчас</p>
              <p>• Покажет что скоро потребуется замена</p>
              <p>• Выберите работы и запишитесь онлайн</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
