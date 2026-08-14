export interface Engine {
  id: string
  name: string
  volume: number       // литры
  power: number        // л.с.
  type: 'carburetor' | 'injection' | 'turbo'
  fuel: 'petrol' | 'diesel'
}

export interface CarModel {
  id: string
  name: string
  nameEn: string
  yearStart: number
  yearEnd: number | null  // null = still in production
  engines: Engine[]
  generation?: string
}

export interface CarBrand {
  id: string
  name: string
  nameEn: string
  logo?: string
  models: CarModel[]
}

// ===== ВАЗ / LADA =====

const VAZ_ENGINES: Record<string, Engine[]> = {
  '2101': [
    { id: '2101-1.2', name: '1.2L карбюратор', volume: 1.2, power: 64, type: 'carburetor', fuel: 'petrol' },
  ],
  '2106': [
    { id: '2106-1.3', name: '1.3L карбюратор', volume: 1.3, power: 71, type: 'carburetor', fuel: 'petrol' },
    { id: '2106-1.5', name: '1.5L карбюратор', volume: 1.5, power: 77, type: 'carburetor', fuel: 'petrol' },
    { id: '2106-1.6', name: '1.6L карбюратор', volume: 1.6, power: 80, type: 'carburetor', fuel: 'petrol' },
  ],
  '2107': [
    { id: '2107-1.5', name: '1.5L карбюратор', volume: 1.5, power: 77, type: 'carburetor', fuel: 'petrol' },
    { id: '2107-1.6', name: '1.6L карбюратор', volume: 1.6, power: 80, type: 'carburetor', fuel: 'petrol' },
    { id: '2107-1.6i', name: '1.6L инжектор', volume: 1.6, power: 82, type: 'injection', fuel: 'petrol' },
  ],
  '2109': [
    { id: '2109-1.3', name: '1.3L карбюратор', volume: 1.3, power: 64, type: 'carburetor', fuel: 'petrol' },
    { id: '2109-1.5', name: '1.5L карбюратор', volume: 1.5, power: 78, type: 'carburetor', fuel: 'petrol' },
    { id: '2109-1.5i', name: '1.5L инжектор', volume: 1.5, power: 78, type: 'injection', fuel: 'petrol' },
  ],
  '2110': [
    { id: '2110-1.5', name: '1.5L 8V инжектор', volume: 1.5, power: 78, type: 'injection', fuel: 'petrol' },
    { id: '2110-1.5i16', name: '1.5L 16V инжектор', volume: 1.5, power: 93, type: 'injection', fuel: 'petrol' },
    { id: '2110-1.6', name: '1.6L 8V инжектор', volume: 1.6, power: 82, type: 'injection', fuel: 'petrol' },
    { id: '2110-1.6i16', name: '1.6L 16V инжектор', volume: 1.6, power: 98, type: 'injection', fuel: 'petrol' },
  ],
  '2112': [
    { id: '2112-1.5', name: '1.5L 16V инжектор', volume: 1.5, power: 93, type: 'injection', fuel: 'petrol' },
    { id: '2112-1.6', name: '1.6L 16V инжектор', volume: 1.6, power: 98, type: 'injection', fuel: 'petrol' },
  ],
  '2114': [
    { id: '2114-1.5', name: '1.5L 8V инжектор', volume: 1.5, power: 78, type: 'injection', fuel: 'petrol' },
    { id: '2114-1.6', name: '1.6L 8V инжектор', volume: 1.6, power: 82, type: 'injection', fuel: 'petrol' },
  ],
  '2115': [
    { id: '2115-1.5', name: '1.5L 8V инжектор', volume: 1.5, power: 78, type: 'injection', fuel: 'petrol' },
    { id: '2115-1.6', name: '1.6L 8V инжектор', volume: 1.6, power: 82, type: 'injection', fuel: 'petrol' },
  ],
  'granta': [
    { id: 'granta-87', name: '1.6L 8V 87 л.с.', volume: 1.6, power: 87, type: 'injection', fuel: 'petrol' },
    { id: 'granta-98', name: '1.6L 8V 98 л.с.', volume: 1.6, power: 98, type: 'injection', fuel: 'petrol' },
    { id: 'granta-106', name: '1.6L 16V 106 л.с.', volume: 1.6, power: 106, type: 'injection', fuel: 'petrol' },
  ],
  'kalina': [
    { id: 'kalina-87', name: '1.6L 8V 87 л.с.', volume: 1.6, power: 87, type: 'injection', fuel: 'petrol' },
    { id: 'kalina-98', name: '1.6L 8V 98 л.с.', volume: 1.6, power: 98, type: 'injection', fuel: 'petrol' },
    { id: 'kalina-106', name: '1.6L 16V 106 л.с.', volume: 1.6, power: 106, type: 'injection', fuel: 'petrol' },
  ],
  'priora': [
    { id: 'priora-98', name: '1.6L 8V 98 л.с.', volume: 1.6, power: 98, type: 'injection', fuel: 'petrol' },
    { id: 'priora-106', name: '1.6L 16V 106 л.с.', volume: 1.6, power: 106, type: 'injection', fuel: 'petrol' },
  ],
  'vesta': [
    { id: 'vesta-106', name: '1.6L 16V 106 л.с.', volume: 1.6, power: 106, type: 'injection', fuel: 'petrol' },
    { id: 'vesta-122', name: '1.8L 16V 122 л.с.', volume: 1.8, power: 122, type: 'injection', fuel: 'petrol' },
    { id: 'vesta-cvt', name: '1.8L CVT 122 л.с.', volume: 1.8, power: 122, type: 'injection', fuel: 'petrol' },
  ],
  'xray': [
    { id: 'xray-106', name: '1.6L 16V 106 л.с.', volume: 1.6, power: 106, type: 'injection', fuel: 'petrol' },
    { id: 'xray-122', name: '1.8L 16V 122 л.с.', volume: 1.8, power: 122, type: 'injection', fuel: 'petrol' },
  ],
  'niva': [
    { id: 'niva-83', name: '1.7L 83 л.с.', volume: 1.7, power: 83, type: 'injection', fuel: 'petrol' },
  ],
  'largus': [
    { id: 'largus-84', name: '1.6L 8V 84 л.с.', volume: 1.6, power: 84, type: 'injection', fuel: 'petrol' },
    { id: 'largus-105', name: '1.6L 16V 105 л.с.', volume: 1.6, power: 105, type: 'injection', fuel: 'petrol' },
  ],
}

export const BRANDS: CarBrand[] = [
  {
    id: 'vaz',
    name: 'ВАЗ / Lada',
    nameEn: 'VAZ / Lada',
    models: [
      {
        id: '2101',
        name: 'ВАЗ-2101 «Копейка»',
        nameEn: 'VAZ-2101',
        yearStart: 1970,
        yearEnd: 1988,
        engines: VAZ_ENGINES['2101'],
      },
      {
        id: '2106',
        name: 'ВАЗ-2106 «Шестёрка»',
        nameEn: 'VAZ-2106',
        yearStart: 1976,
        yearEnd: 2006,
        engines: VAZ_ENGINES['2106'],
      },
      {
        id: '2107',
        name: 'ВАЗ-2107',
        nameEn: 'VAZ-2107',
        yearStart: 1982,
        yearEnd: 2012,
        engines: VAZ_ENGINES['2107'],
      },
      {
        id: '2109',
        name: 'ВАЗ-2109 «Девятка»',
        nameEn: 'VAZ-2109',
        yearStart: 1987,
        yearEnd: 2004,
        engines: VAZ_ENGINES['2109'],
      },
      {
        id: '2110',
        name: 'ВАЗ-2110 «Десятка»',
        nameEn: 'VAZ-2110',
        yearStart: 1996,
        yearEnd: 2009,
        engines: VAZ_ENGINES['2110'],
      },
      {
        id: '2112',
        name: 'ВАЗ-2112',
        nameEn: 'VAZ-2112',
        yearStart: 1999,
        yearEnd: 2008,
        engines: VAZ_ENGINES['2112'],
      },
      {
        id: '2114',
        name: 'ВАЗ-2114 «Самара»',
        nameEn: 'VAZ-2114',
        yearStart: 2001,
        yearEnd: 2013,
        engines: VAZ_ENGINES['2114'],
      },
      {
        id: '2115',
        name: 'ВАЗ-2115',
        nameEn: 'VAZ-2115',
        yearStart: 1997,
        yearEnd: 2012,
        engines: VAZ_ENGINES['2115'],
      },
      {
        id: 'granta',
        name: 'Lada Granta',
        nameEn: 'Lada Granta',
        yearStart: 2011,
        yearEnd: null,
        engines: VAZ_ENGINES['granta'],
      },
      {
        id: 'kalina',
        name: 'Lada Kalina',
        nameEn: 'Lada Kalina',
        yearStart: 2004,
        yearEnd: 2018,
        engines: VAZ_ENGINES['kalina'],
      },
      {
        id: 'priora',
        name: 'Lada Priora',
        nameEn: 'Lada Priora',
        yearStart: 2007,
        yearEnd: 2018,
        engines: VAZ_ENGINES['priora'],
      },
      {
        id: 'vesta',
        name: 'Lada Vesta',
        nameEn: 'Lada Vesta',
        yearStart: 2015,
        yearEnd: null,
        engines: VAZ_ENGINES['vesta'],
      },
      {
        id: 'xray',
        name: 'Lada XRAY',
        nameEn: 'Lada XRAY',
        yearStart: 2016,
        yearEnd: null,
        engines: VAZ_ENGINES['xray'],
      },
      {
        id: 'niva',
        name: 'Lada Niva',
        nameEn: 'Lada Niva',
        yearStart: 1977,
        yearEnd: null,
        engines: VAZ_ENGINES['niva'],
      },
      {
        id: 'largus',
        name: 'Lada Largus',
        nameEn: 'Lada Largus',
        yearStart: 2012,
        yearEnd: null,
        engines: VAZ_ENGINES['largus'],
      },
    ],
  },
  // Placeholder for future brands
  {
    id: 'other',
    name: 'Другие марки',
    nameEn: 'Other brands',
    models: [],
  },
]

export function getBrandById(id: string): CarBrand | undefined {
  return BRANDS.find(b => b.id === id)
}

export function getModelById(brandId: string, modelId: string): CarModel | undefined {
  const brand = getBrandById(brandId)
  return brand?.models.find(m => m.id === modelId)
}

export function getYears(model: CarModel): number[] {
  const currentYear = new Date().getFullYear()
  const endYear = model.yearEnd || currentYear
  const years: number[] = []
  for (let y = endYear; y >= model.yearStart; y--) {
    years.push(y)
  }
  return years
}
