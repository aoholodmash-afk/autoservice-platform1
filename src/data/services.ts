export interface PartItem {
  name: string
  article?: string       // артикул
  brand: string          // производитель
  priceMin: number       // цена от, ₽
  priceMax: number       // цена до, ₽
}

export interface ServiceItem {
  id: string
  nameKey: string
  descKey: string
  icon: string
  duration: number       // минуты
  laborPrice: number     // работа, ₽
  partsPriceMin: number  // запчасти от, ₽
  partsPriceMax: number  // запчасти до, ₽
  parts: PartItem[]      // список запчастей
  category: ServiceCategory
}

export type ServiceCategory = 'to' | 'repair' | 'diagnostic' | 'tires'

export interface CategoryInfo {
  id: ServiceCategory
  nameKey: string
  descKey: string
  icon: string
  color: string
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
  // ========== ЗАМЕНА МАСЛА ДВИГАТЕЛЯ ==========
  {
    id: 'oil-change',
    nameKey: 'to.oil',
    descKey: 'to.oil.desc',
    icon: '🛢',
    duration: 30,
    laborPrice: 600,
    partsPriceMin: 2200,
    partsPriceMax: 4200,
    parts: [
      { name: 'Масло моторное 4L (5W-30)', brand: 'Lada Original', priceMin: 1800, priceMax: 2500, article: '000015W304' },
      { name: 'Масло моторное 4L (5W-40)', brand: 'Лукойл Genesis', priceMin: 1600, priceMax: 2200, article: '19299' },
      { name: 'Масло моторное 4L (5W-30)', brand: 'Shell Helix HX8', priceMin: 2200, priceMax: 3000, article: '550040740' },
      { name: 'Масляный фильтр', brand: 'Lada Original', priceMin: 250, priceMax: 350, article: '21080101200500' },
      { name: 'Масляный фильтр', brand: 'MANN W914/2', priceMin: 400, priceMax: 550, article: 'W914/2' },
      { name: 'Масляный фильтр', brand: 'BOSCH P7200', priceMin: 350, priceMax: 500, article: '0986AF0055' },
      { name: 'Прокладка сливной пробки', brand: 'Lada Original', priceMin: 30, priceMax: 60, article: '21080101200501' },
    ],
    category: 'to',
  },

  // ========== ВОЗДУШНЫЙ ФИЛЬТР ==========
  {
    id: 'air-filter',
    nameKey: 'to.airFilter',
    descKey: 'to.airFilter.desc',
    icon: '💨',
    duration: 10,
    laborPrice: 300,
    partsPriceMin: 300,
    partsPriceMax: 900,
    parts: [
      { name: 'Фильтр воздушный', brand: 'Lada Original', priceMin: 300, priceMax: 450, article: '21120110901000' },
      { name: 'Фильтр воздушный', brand: 'MANN C27009', priceMin: 500, priceMax: 750, article: 'C27009' },
      { name: 'Фильтр воздушный', brand: 'BOSCH S0244', priceMin: 450, priceMax: 650, article: '0986AF0044' },
      { name: 'Фильтр воздушный', brand: 'Filtron AP 184/1', priceMin: 350, priceMax: 500, article: 'AP184/1' },
    ],
    category: 'to',
  },

  // ========== ТОПЛИВНЫЙ ФИЛЬТР ==========
  {
    id: 'fuel-filter',
    nameKey: 'to.fuelFilter',
    descKey: 'to.fuelFilter.desc',
    icon: '⛽',
    duration: 40,
    laborPrice: 800,
    partsPriceMin: 350,
    partsPriceMax: 1200,
    parts: [
      { name: 'Фильтр топливный', brand: 'Lada Original', priceMin: 350, priceMax: 500, article: '21120111701000' },
      { name: 'Фильтр топливный', brand: 'MANN WK 512', priceMin: 600, priceMax: 900, article: 'WK512' },
      { name: 'Фильтр топливный', brand: 'BOSCH F026402017', priceMin: 500, priceMax: 800, article: 'F026402017' },
      { name: 'Фильтр топливный', brand: 'Filtron PS 816', priceMin: 400, priceMax: 600, article: 'PS816' },
    ],
    category: 'to',
  },

  // ========== САЛОННЫЙ ФИЛЬТР ==========
  {
    id: 'cabin-filter',
    nameKey: 'to.cabinFilter',
    descKey: 'to.cabinFilter.desc',
    icon: '❄️',
    duration: 15,
    laborPrice: 400,
    partsPriceMin: 300,
    partsPriceMax: 1000,
    parts: [
      { name: 'Фильтр салонный', brand: 'Lada Original', priceMin: 300, priceMax: 450, article: '21100812201000' },
      { name: 'Фильтр салонный угольный', brand: 'MANN CUK 8430', priceMin: 700, priceMax: 1000, article: 'CUK8430' },
      { name: 'Фильтр салонный', brand: 'Filtron K 1053A', priceMin: 350, priceMax: 500, article: 'K1053A' },
      { name: 'Фильтр салонный угольный', brand: 'BOSCH 1987435536', priceMin: 600, priceMax: 850, article: '1987435536' },
    ],
    category: 'to',
  },

  // ========== ТОРМОЗНЫЕ КОЛОДКИ ПЕРЕДНИЕ ==========
  {
    id: 'brake-pads-front',
    nameKey: 'to.brakePadsFront',
    descKey: 'to.brakePadsFront.desc',
    icon: '🛑',
    duration: 45,
    laborPrice: 1200,
    partsPriceMin: 800,
    partsPriceMax: 3500,
    parts: [
      { name: 'Колодки тормозные передние', brand: 'Lada Original', priceMin: 800, priceMax: 1200, article: '21100350108000' },
      { name: 'Колодки тормозные передние', brand: 'TRW GDB1448', priceMin: 1500, priceMax: 2200, article: 'GDB1448' },
      { name: 'Колодки тормозные передние', brand: 'Brembo P 83 020', priceMin: 1800, priceMax: 2800, article: 'P83020' },
      { name: 'Колодки тормозные передние', brand: 'ATE 13.0460-7156', priceMin: 2000, priceMax: 3200, article: '13.0460-7156' },
      { name: 'Колодки тормозные передние', brand: 'Fenox BP43001', priceMin: 700, priceMax: 1000, article: 'BP43001' },
    ],
    category: 'to',
  },

  // ========== ТОРМОЗНЫЕ КОЛОДКИ ЗАДНИЕ ==========
  {
    id: 'brake-pads-rear',
    nameKey: 'to.brakePadsRear',
    descKey: 'to.brakePadsRear.desc',
    icon: '🛑',
    duration: 60,
    laborPrice: 1500,
    partsPriceMin: 700,
    partsPriceMax: 3000,
    parts: [
      { name: 'Колодки тормозные задние', brand: 'Lada Original', priceMin: 700, priceMax: 1100, article: '21080350209000' },
      { name: 'Колодки тормозные задние', brand: 'TRW GDB1449', priceMin: 1200, priceMax: 1800, article: 'GDB1449' },
      { name: 'Колодки тормозные задние', brand: 'Brembo S 83 021', priceMin: 1500, priceMax: 2500, article: 'S83021' },
      { name: 'Колодки тормозные задние', brand: 'Fenox BP43002', priceMin: 600, priceMax: 900, article: 'BP43002' },
    ],
    category: 'to',
  },

  // ========== ТОРМОЗНАЯ ЖИДКОСТЬ ==========
  {
    id: 'brake-fluid',
    nameKey: 'to.brakeFluid',
    descKey: 'to.brakeFluid.desc',
    icon: '💧',
    duration: 30,
    laborPrice: 800,
    partsPriceMin: 400,
    partsPriceMax: 1200,
    parts: [
      { name: 'Жидкость тормозная DOT-4 1L', brand: 'ROS DOT-4', priceMin: 400, priceMax: 600, article: 'ROS DOT-4' },
      { name: 'Жидкость тормозная DOT-4 1L', brand: 'Castrol React DOT-4', priceMin: 600, priceMax: 900, article: '1523D4' },
      { name: 'Жидкость тормозная DOT-4 1L', brand: 'Pentosin DOT-4', priceMin: 800, priceMax: 1200, article: '8403107' },
    ],
    category: 'to',
  },

  // ========== ОХЛАЖДАЮЩАЯ ЖИДКОСТЬ ==========
  {
    id: 'coolant',
    nameKey: 'to.coolant',
    descKey: 'to.coolant.desc',
    icon: '🧊',
    duration: 45,
    laborPrice: 1000,
    partsPriceMin: 600,
    partsPriceMax: 2000,
    parts: [
      { name: 'Антифриз 5L (красный)', brand: 'Lada Original', priceMin: 600, priceMax: 900, article: '000015E304' },
      { name: 'Антифриз 5L (красный)', brand: 'Felix Energy', priceMin: 700, priceMax: 1000, article: 'FE5L' },
      { name: 'Антифриз 5L (зелёный)', brand: 'Coolstream Premium', priceMin: 900, priceMax: 1300, article: 'CP5L' },
      { name: 'Тосол 5L', brand: 'ОЖ-40', priceMin: 400, priceMax: 600, article: 'OZH40' },
    ],
    category: 'to',
  },

  // ========== СВЕЧИ ЗАЖИГАНИЯ ==========
  {
    id: 'spark-plugs',
    nameKey: 'to.sparkPlugs',
    descKey: 'to.sparkPlugs.desc',
    icon: '⚡',
    duration: 20,
    laborPrice: 500,
    partsPriceMin: 400,
    partsPriceMax: 2400,
    parts: [
      { name: 'Свечи зажигания ×4 (8V)', brand: 'NGK BPR6ES', priceMin: 400, priceMax: 600, article: '7822' },
      { name: 'Свечи зажигания ×4 (8V)', brand: 'DENSO W20EPR-U', priceMin: 500, priceMax: 700, article: '3143' },
      { name: 'Свечи зажигания ×4 (16V)', brand: 'NGK BKR6E-11', priceMin: 600, priceMax: 900, article: '2288' },
      { name: 'Свечи зажигания ×4 (16V)', brand: 'DENSO K20TT', priceMin: 800, priceMax: 1200, article: '3182' },
      { name: 'Свечи зажигания ×4 (иридиевые)', brand: 'NGK BKR6EIX', priceMin: 1600, priceMax: 2400, article: '6241' },
    ],
    category: 'to',
  },

  // ========== РЕМЕНЬ ГРМ ==========
  {
    id: 'timing-belt',
    nameKey: 'to.timingBelt',
    descKey: 'to.timingBelt.desc',
    icon: '⚙️',
    duration: 120,
    laborPrice: 3000,
    partsPriceMin: 1200,
    partsPriceMax: 4500,
    parts: [
      { name: 'Ремень ГРМ', brand: 'Gates 5521', priceMin: 800, priceMax: 1200, article: '5521' },
      { name: 'Ремень ГРМ', brand: 'Contitech CT527', priceMin: 900, priceMax: 1400, article: 'CT527' },
      { name: 'Ремень ГРМ', brand: 'Lada Original', priceMin: 500, priceMax: 800, article: '21126100604000' },
      { name: 'Ролик натяжной', brand: 'Gates T42145', priceMin: 600, priceMax: 1000, article: 'T42145' },
      { name: 'Ролик натяжной', brand: 'Lada Original', priceMin: 400, priceMax: 700, article: '21126100612000' },
      { name: 'Ролик обводной', brand: 'Gates T42144', priceMin: 500, priceMax: 900, article: 'T42144' },
      { name: 'Помпа (насос водяной)', brand: 'LUZAR BW0011', priceMin: 1200, priceMax: 1800, article: 'BW0011' },
      { name: 'Помпа (насос водяной)', brand: 'HEPU 2112-1307010', priceMin: 1800, priceMax: 2800, article: '2112-1307010' },
    ],
    category: 'to',
  },

  // ========== КОМПЛЕКСНОЕ ТО ==========
  {
    id: 'full-to',
    nameKey: 'to.fullTo',
    descKey: 'to.fullTo.desc',
    icon: '✅',
    duration: 150,
    laborPrice: 3500,
    partsPriceMin: 5500,
    partsPriceMax: 12000,
    parts: [
      { name: 'Масло моторное 4L (5W-30)', brand: 'Lada Original', priceMin: 1800, priceMax: 2500, article: '000015W304' },
      { name: 'Масляный фильтр', brand: 'Lada Original', priceMin: 250, priceMax: 350, article: '21080101200500' },
      { name: 'Фильтр воздушный', brand: 'Lada Original', priceMin: 300, priceMax: 450, article: '21120110901000' },
      { name: 'Фильтр салонный', brand: 'Lada Original', priceMin: 300, priceMax: 450, article: '21100812201000' },
      { name: 'Свечи зажигания ×4', brand: 'NGK BPR6ES', priceMin: 400, priceMax: 600, article: '7822' },
      { name: 'Жидкость тормозная DOT-4 1L', brand: 'ROS DOT-4', priceMin: 400, priceMax: 600, article: 'ROS DOT-4' },
      { name: 'Антифриз 5L', brand: 'Lada Original', priceMin: 600, priceMax: 900, article: '000015E304' },
      { name: 'Жидкость омывателя 5L', brand: 'Лукойл', priceMin: 200, priceMax: 350, article: 'LU5L' },
      { name: 'Прокладка сливной пробки', brand: 'Lada Original', priceMin: 30, priceMax: 60, article: '21080101200501' },
    ],
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

export function getTotalPriceMin(service: ServiceItem): number {
  return service.laborPrice + service.partsPriceMin
}

export function getTotalPriceMax(service: ServiceItem): number {
  return service.laborPrice + service.partsPriceMax
}
