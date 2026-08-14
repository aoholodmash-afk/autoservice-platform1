export interface MaintenanceInterval {
  id: string
  name: string
  category: string
  intervalKm: number       // интервал в км
  intervalMonths: number   // интервал в месяцах
  description: string
  estimatedCost: { min: number; max: number }
  difficulty: 'easy' | 'medium' | 'hard'
}

export const MAINTENANCE_INTERVALS: MaintenanceInterval[] = [
  { id: 'oil', name: 'Замена масла двигателя', category: 'to', intervalKm: 10000, intervalMonths: 12, description: 'Масло + масляный фильтр', estimatedCost: { min: 1500, max: 3500 }, difficulty: 'easy' },
  { id: 'air-filter', name: 'Замена воздушного фильтра', category: 'to', intervalKm: 20000, intervalMonths: 24, description: 'Фильтр воздухозаборника', estimatedCost: { min: 400, max: 800 }, difficulty: 'easy' },
  { id: 'cabin-filter', name: 'Замена салонного фильтра', category: 'to', intervalKm: 15000, intervalMonths: 12, description: 'Фильтр климат-системы', estimatedCost: { min: 400, max: 900 }, difficulty: 'easy' },
  { id: 'fuel-filter', name: 'Замена топливного фильтра', category: 'to', intervalKm: 30000, intervalMonths: 24, description: 'Фильтр топливной системы', estimatedCost: { min: 500, max: 1200 }, difficulty: 'medium' },
  { id: 'spark-plugs', name: 'Замена свечей зажигания', category: 'to', intervalKm: 20000, intervalMonths: 24, description: 'Комплект свечей', estimatedCost: { min: 400, max: 2000 }, difficulty: 'easy' },
  { id: 'brake-pads-front', name: 'Замена тормозных колодок (перед)', category: 'brakes', intervalKm: 30000, intervalMonths: 24, description: 'Передние тормозные колодки', estimatedCost: { min: 1200, max: 3500 }, difficulty: 'medium' },
  { id: 'brake-pads-rear', name: 'Замена тормозных колодок (зад)', category: 'brakes', intervalKm: 40000, intervalMonths: 36, description: 'Задние тормозные колодки', estimatedCost: { min: 1000, max: 3000 }, difficulty: 'medium' },
  { id: 'brake-fluid', name: 'Замена тормозной жидкости', category: 'brakes', intervalKm: 40000, intervalMonths: 24, description: 'Полная замена ТЖ', estimatedCost: { min: 600, max: 1200 }, difficulty: 'medium' },
  { id: 'coolant', name: 'Замена охлаждающей жидкости', category: 'cooling', intervalKm: 60000, intervalMonths: 36, description: 'Антифриз/тосол', estimatedCost: { min: 800, max: 1800 }, difficulty: 'medium' },
  { id: 'timing-belt', name: 'Замена ремня ГРМ', category: 'engine', intervalKm: 75000, intervalMonths: 60, description: 'Ремень + ролики', estimatedCost: { min: 2500, max: 5000 }, difficulty: 'hard' },
  { id: 'timing-chain', name: 'Замена цепи ГРМ', category: 'engine', intervalKm: 150000, intervalMonths: 120, description: 'Цепь + натяжитель + успокоители', estimatedCost: { min: 5000, max: 12000 }, difficulty: 'hard' },
  { id: 'transmission-oil', name: 'Замена масла в КПП', category: 'transmission', intervalKm: 60000, intervalMonths: 48, description: 'Масло трансмиссионное', estimatedCost: { min: 800, max: 2000 }, difficulty: 'medium' },
  { id: 'wheel-alignment', name: 'Развал-схождение', category: 'suspension', intervalKm: 15000, intervalMonths: 12, description: 'Регулировка углов установки колёс', estimatedCost: { min: 1500, max: 3000 }, difficulty: 'medium' },
  { id: 'battery', name: 'Замена аккумулятора', category: 'electrical', intervalKm: 0, intervalMonths: 48, description: 'АКБ', estimatedCost: { min: 4000, max: 8000 }, difficulty: 'easy' },
]

export function getRequiredMaintenance(currentKm: number, lastServiceKm: number = 0): MaintenanceInterval[] {
  return MAINTENANCE_INTERVALS.filter(item => {
    if (item.intervalKm === 0) return false
    const kmSinceService = currentKm - lastServiceKm
    return kmSinceService >= item.intervalKm * 0.8 // 80% от интервала = рекомендация
  })
}

export function getUpcomingMaintenance(currentKm: number, lastServiceKm: number = 0): MaintenanceInterval[] {
  return MAINTENANCE_INTERVALS.filter(item => {
    if (item.intervalKm === 0) return false
    const kmSinceService = currentKm - lastServiceKm
    return kmSinceService >= item.intervalKm * 0.6 && kmSinceService < item.intervalKm * 0.8
  })
}

export function getMaintenanceCost(items: MaintenanceInterval[]): { min: number; max: number } {
  return items.reduce((acc, item) => ({
    min: acc.min + item.estimatedCost.min,
    max: acc.max + item.estimatedCost.max,
  }), { min: 0, max: 0 })
}
