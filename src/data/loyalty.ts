export interface LoyaltyLevel {
  id: string
  name: string
  minSpent: number
  discount: number
  color: string
  icon: string
  benefits: string[]
}

export const LOYALTY_LEVELS: LoyaltyLevel[] = [
  { id: 'bronze', name: 'Бронза', minSpent: 0, discount: 3, color: '#CD7F32', icon: '🥉', benefits: ['Скидка 3% на все услуги', 'Бесплатная диагностика'] },
  { id: 'silver', name: 'Серебро', minSpent: 5000, discount: 5, color: '#C0C0C0', icon: '🥈', benefits: ['Скидка 5% на все услуги', 'Бесплатная диагностика', 'Приоритетная запись'] },
  { id: 'gold', name: 'Золото', minSpent: 20000, discount: 8, color: '#FFD700', icon: '🥇', benefits: ['Скидка 8% на все услуги', 'Бесплатная диагностика', 'Приоритетная запись', 'Бесплатный выезд мастера'] },
  { id: 'platinum', name: 'Платина', minSpent: 50000, discount: 10, color: '#E5E4E2', icon: '💎', benefits: ['Скидка 10% на все услуги', 'Бесплатная диагностика', 'Приоритетная запись', 'Бесплатный выезд мастера', 'Персональный менеджер'] },
]

export function getLoyaltyLevel(totalSpent: number): LoyaltyLevel {
  for (let i = LOYALTY_LEVELS.length - 1; i >= 0; i--) {
    if (totalSpent >= LOYALTY_LEVELS[i].minSpent) return LOYALTY_LEVELS[i]
  }
  return LOYALTY_LEVELS[0]
}

export function getNextLevel(currentLevel: LoyaltyLevel): LoyaltyLevel | null {
  const idx = LOYALTY_LEVELS.findIndex(l => l.id === currentLevel.id)
  return idx < LOYALTY_LEVELS.length - 1 ? LOYALTY_LEVELS[idx + 1] : null
}

export function getPointsForNextLevel(totalSpent: number, currentLevel: LoyaltyLevel): number {
  const next = getNextLevel(currentLevel)
  if (!next) return 0
  return next.minSpent - totalSpent
}
