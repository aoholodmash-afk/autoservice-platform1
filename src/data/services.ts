export interface ServiceItem {
  id: string
  nameKey: string       // i18n key
  descKey: string       // i18n key
  icon: string          // emoji or SVG id
  duration: number      // minutes
  priceFrom: number     // rubles
  category: ServiceCategory
}

export type ServiceCategory = 'to' | 'repair' | 'diagnostic' | 'tires'

export interface CategoryInfo {
  id: ServiceCategory
  nameKey: string
  descKey: string
  icon: string
  color: string   // iOS system color
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'to',
    nameKey: 'menu.to',
    descKey: 'menu.to.desc',
    icon: '🛢',
    color: '#007AFF',
  },
  {
    id: 'repair',
    nameKey: 'menu.repair',
    descKey: 'menu.repair.desc',
    icon: '🔧',
    color: '#FF9500',
  },
  {
    id: 'diagnostic',
    nameKey: 'menu.diagnostic',
    descKey: 'menu.diagnostic.desc',
    icon: '🔍',
    color: '#5856D6',
  },
  {
    id: 'tires',
    nameKey: 'menu.tires',
    descKey: 'menu.tires.desc',
    icon: '🛞',
    color: '#34C759',
  },
]

export const SERVICES: ServiceItem[] = [
  // ТО
  {
    id: 'oil-change',
    nameKey: 'to.oil',
    descKey: 'to.oil.desc',
    icon: '🛢',
    duration: 30,
    priceFrom: 1500,
    category: 'to',
  },
  {
    id: 'air-filter',
    nameKey: 'to.airFilter',
    descKey: 'to.airFilter.desc',
    icon: '💨',
    duration: 15,
    priceFrom: 500,
    category: 'to',
  },
  {
    id: 'fuel-filter',
    nameKey: 'to.fuelFilter',
    descKey: 'to.fuelFilter.desc',
    icon: '⛽',
    duration: 30,
    priceFrom: 800,
    category: 'to',
  },
  {
    id: 'cabin-filter',
    nameKey: 'to.cabinFilter',
    descKey: 'to.cabinFilter.desc',
    icon: '❄️',
    duration: 15,
    priceFrom: 600,
    category: 'to',
  },
  {
    id: 'brake-pads-front',
    nameKey: 'to.brakePadsFront',
    descKey: 'to.brakePadsFront.desc',
    icon: '🛑',
    duration: 45,
    priceFrom: 2000,
    category: 'to',
  },
  {
    id: 'brake-pads-rear',
    nameKey: 'to.brakePadsRear',
    descKey: 'to.brakePadsRear.desc',
    icon: '🛑',
    duration: 60,
    priceFrom: 2500,
    category: 'to',
  },
  {
    id: 'brake-fluid',
    nameKey: 'to.brakeFluid',
    descKey: 'to.brakeFluid.desc',
    icon: '💧',
    duration: 30,
    priceFrom: 1200,
    category: 'to',
  },
  {
    id: 'coolant',
    nameKey: 'to.coolant',
    descKey: 'to.coolant.desc',
    icon: '🧊',
    duration: 45,
    priceFrom: 1800,
    category: 'to',
  },
  {
    id: 'spark-plugs',
    nameKey: 'to.sparkPlugs',
    descKey: 'to.sparkPlugs.desc',
    icon: '⚡',
    duration: 20,
    priceFrom: 800,
    category: 'to',
  },
  {
    id: 'timing-belt',
    nameKey: 'to.timingBelt',
    descKey: 'to.timingBelt.desc',
    icon: '⚙️',
    duration: 120,
    priceFrom: 3500,
    category: 'to',
  },
  {
    id: 'full-to',
    nameKey: 'to.fullTo',
    descKey: 'to.fullTo.desc',
    icon: '✅',
    duration: 120,
    priceFrom: 5000,
    category: 'to',
  },
]

export function getServicesByCategory(category: ServiceCategory): ServiceItem[] {
  return SERVICES.filter(s => s.category === category)
}

export function getServiceById(id: string): ServiceItem | undefined {
  return SERVICES.find(s => s.id === id)
}

export function getCategoryById(id: ServiceCategory): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.id === id)
}
