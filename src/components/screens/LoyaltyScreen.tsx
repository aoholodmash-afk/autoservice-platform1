'use client'

import { useState, useEffect } from 'react'
import { LOYALTY_LEVELS, getLoyaltyLevel, getNextLevel, getPointsForNextLevel } from '@/data/loyalty'
import { getTotalSpent } from '@/lib/orderStore'
import { haptic } from '@/lib/constants'

interface LoyaltyScreenProps {
  onBack: () => void
}

export function LoyaltyScreen({ onBack }: LoyaltyScreenProps) {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    setTotalSpent(getTotalSpent())
  }, [])
  const currentLevel = getLoyaltyLevel(totalSpent)
  const nextLevel = getNextLevel(currentLevel)
  const pointsNeeded = getPointsForNextLevel(totalSpent, currentLevel)
  const progress = nextLevel ? ((totalSpent - currentLevel.minSpent) / (nextLevel.minSpent - currentLevel.minSpent)) * 100 : 100

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">Программа лояльности</div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Current level card */}
        <div className="bg-gradient-to-br from-[var(--accent)] to-[#5856D6] rounded-[13px] p-5 text-white mb-4 spring-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[34px]">{currentLevel.icon}</span>
            <div>
              <div className="text-[22px] font-bold">{currentLevel.name}</div>
              <div className="text-[13px] opacity-80">Скидка {currentLevel.discount}%</div>
            </div>
          </div>
          <div className="text-[13px] opacity-80 mb-1">Потрачено всего</div>
          <div className="text-[28px] font-bold">{totalSpent.toLocaleString('ru-RU')} ₽</div>
        </div>

        {/* Progress to next level */}
        {nextLevel && (
          <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-[var(--ink-secondary)]">До уровня {nextLevel.name}</span>
              <span className="text-[13px] font-medium text-[var(--accent)]">{pointsNeeded.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="h-3 bg-[var(--fill)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--accent)] rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[11px] text-[var(--ink-secondary)]">{currentLevel.icon} {currentLevel.name}</span>
              <span className="text-[11px] text-[var(--ink-secondary)]">{nextLevel.icon} {nextLevel.name}</span>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden mb-4">
          <div className="px-4 py-3 bg-[var(--fill)]">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">Ваши привилегии</h3>
          </div>
          <div className="divide-y divide-[var(--separator)]">
            {currentLevel.benefits.map((benefit, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <span className="text-[16px]">✓</span>
                <span className="text-[14px] text-[var(--ink)]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All levels */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden">
          <div className="px-4 py-3 bg-[var(--fill)]">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">Все уровни</h3>
          </div>
          <div className="divide-y divide-[var(--separator)]">
            {LOYALTY_LEVELS.map(level => {
              const isCurrent = level.id === currentLevel.id
              return (
                <div key={level.id} className={`px-4 py-3 flex items-center gap-3 ${isCurrent ? 'bg-[var(--accent)] bg-opacity-5' : ''}`}>
                  <span className="text-[20px]">{level.icon}</span>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[var(--ink)]">
                      {level.name} {isCurrent && <span className="text-[11px] text-[var(--accent)]">(текущий)</span>}
                    </div>
                    <div className="text-[11px] text-[var(--ink-secondary)]">от {level.minSpent.toLocaleString('ru-RU')} ₽ • скидка {level.discount}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
