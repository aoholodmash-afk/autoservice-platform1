export interface Engine {
  id: string
  name: string
  volume?: string
}

export interface Vehicle {
  id: string
  name: string
  years: string
  engines: Engine[]
  transmission: string[]
  popular?: boolean
}

export interface Brand {
  id: string
  name: string
  country: string
  logo: string
  popular: boolean
  models: Vehicle[]
}

// ============================================================
// ВСЕ АВТОМОБИЛЬНЫЕ МАРКИ И МОДЕЛИ
// ============================================================

export const BRANDS: Brand[] = [
  // ===== РОССИЯ =====
  {
    id: 'lada', name: 'Lada (ВАЗ)', country: 'Россия', logo: '🇷🇺', popular: true,
    models: [
      { id: 'granta', name: 'Lada Granta', years: '2011–н.в.', engines: [{ id: '8v', name: '8V 1.6 л', volume: '1.6' }, { id: '16v', name: '16V 1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АМТ'], popular: true },
      { id: 'vesta', name: 'Lada Vesta', years: '2015–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '1.8', name: '1.8 л', volume: '1.8' }], transmission: ['МКПП 5ст.', 'АМТ', 'CVT'], popular: true },
      { id: 'xray', name: 'Lada XRAY', years: '2016–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '1.8', name: '1.8 л', volume: '1.8' }], transmission: ['МКПП 5ст.', 'АМТ'], popular: true },
      { id: 'niva', name: 'Lada Niva', years: '1977–н.в.', engines: [{ id: '1.7', name: '1.7 л', volume: '1.7' }], transmission: ['МКПП 5ст.'], popular: true },
      { id: 'niva-travel', name: 'Lada Niva Travel', years: '2020–н.в.', engines: [{ id: '1.7', name: '1.7 л', volume: '1.7' }], transmission: ['МКПП 5ст.'] },
      { id: 'largus', name: 'Lada Largus', years: '2012–н.в.', engines: [{ id: '1.6-8v', name: '1.6 л 8V', volume: '1.6' }, { id: '1.6-16v', name: '1.6 л 16V', volume: '1.6' }], transmission: ['МКПП 5ст.'] },
      { id: 'priora', name: 'Lada Priora', years: '2007–2018', engines: [{ id: '8v', name: '8V 1.6 л', volume: '1.6' }, { id: '16v', name: '16V 1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.'] },
      { id: 'kalina', name: 'Lada Kalina', years: '2004–2018', engines: [{ id: '8v', name: '8V 1.6 л', volume: '1.6' }, { id: '16v', name: '16V 1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АМТ'] },
      { id: '2107', name: 'ВАЗ-2107', years: '1982–2012', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.'] },
      { id: '2109', name: 'ВАЗ-2109', years: '1987–2004', engines: [{ id: '1.3', name: '1.3 л', volume: '1.3' }, { id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['МКПП 5ст.'] },
      { id: '2110', name: 'ВАЗ-2110', years: '1996–2009', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.'] },
      { id: '2114', name: 'ВАЗ-2114', years: '2001–2013', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.'] },
    ],
  },
  {
    id: 'uaz', name: 'УАЗ', country: 'Россия', logo: '🇷🇺', popular: false,
    models: [
      { id: 'patriot', name: 'УАЗ Патриот', years: '2005–н.в.', engines: [{ id: '2.7', name: '2.7 л', volume: '2.7' }], transmission: ['МКПП 5ст.', 'АКПП 6ст.'] },
      { id: 'hunter', name: 'УАЗ Хантер', years: '2003–н.в.', engines: [{ id: '2.7', name: '2.7 л', volume: '2.7' }], transmission: ['МКПП 5ст.'] },
      { id: 'prof', name: 'УАЗ Профи', years: '2017–н.в.', engines: [{ id: '2.7', name: '2.7 л', volume: '2.7' }], transmission: ['МКПП 5ст.'] },
    ],
  },
  {
    id: 'gaz', name: 'ГАЗ', country: 'Россия', logo: '🇷🇺', popular: false,
    models: [
      { id: 'gazelle', name: 'ГАЗель', years: '1994–н.в.', engines: [{ id: '2.4', name: '2.4 л', volume: '2.4' }, { id: '2.7', name: '2.7 л', volume: '2.7' }], transmission: ['МКПП 5ст.'] },
      { id: 'next', name: 'ГАЗель NEXT', years: '2013–н.в.', engines: [{ id: '2.7', name: '2.7 л', volume: '2.7' }], transmission: ['МКПП 5ст.', 'АКПП'] },
    ],
  },

  // ===== ЯПОНИЯ =====
  {
    id: 'toyota', name: 'Toyota', country: 'Япония', logo: '🇯🇵', popular: true,
    models: [
      { id: 'camry', name: 'Toyota Camry', years: '1982–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }, { id: '3.5', name: '3.5 л V6', volume: '3.5' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.', 'CVT'], popular: true },
      { id: 'corolla', name: 'Toyota Corolla', years: '1966–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '1.8', name: '1.8 л', volume: '1.8' }], transmission: ['МКПП 6ст.', 'CVT'], popular: true },
      { id: 'rav4', name: 'Toyota RAV4', years: '1994–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['АКПП 6ст.', 'CVT', 'АКПП 8ст.'], popular: true },
      { id: 'land-cruiser', name: 'Toyota Land Cruiser', years: '1951–н.в.', engines: [{ id: '4.0', name: '4.0 л V6', volume: '4.0' }, { id: '4.5-d', name: '4.5 л TD', volume: '4.5' }, { id: '5.7', name: '5.7 л V8', volume: '5.7' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.'] },
      { id: 'highlander', name: 'Toyota Highlander', years: '2001–н.в.', engines: [{ id: '2.7', name: '2.7 л', volume: '2.7' }, { id: '3.5', name: '3.5 л V6', volume: '3.5' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.'] },
      { id: 'yaris', name: 'Toyota Yaris', years: '1999–н.в.', engines: [{ id: '1.0', name: '1.0 л', volume: '1.0' }, { id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['МКПП 5ст.', 'CVT'] },
      { id: 'c-hr', name: 'Toyota C-HR', years: '2016–н.в.', engines: [{ id: '1.2-t', name: '1.2 л Turbo', volume: '1.2' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['CVT'] },
      { id: 'hilux', name: 'Toyota Hilux', years: '1968–н.в.', engines: [{ id: '2.4-d', name: '2.4 л TD', volume: '2.4' }, { id: '2.8-d', name: '2.8 л TD', volume: '2.8' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'] },
    ],
  },
  {
    id: 'honda', name: 'Honda', country: 'Япония', logo: '🇯🇵', popular: true,
    models: [
      { id: 'civic', name: 'Honda Civic', years: '1972–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 6ст.', 'CVT'], popular: true },
      { id: 'cr-v', name: 'Honda CR-V', years: '1995–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['CVT', 'АКПП 9ст.'] },
      { id: 'accord', name: 'Honda Accord', years: '1976–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['CVT', 'МКПП 6ст.'] },
      { id: 'fit', name: 'Honda Fit', years: '2001–н.в.', engines: [{ id: '1.3', name: '1.3 л', volume: '1.3' }, { id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['МКПП 5ст.', 'CVT'] },
    ],
  },
  {
    id: 'nissan', name: 'Nissan', country: 'Япония', logo: '🇯🇵', popular: true,
    models: [
      { id: 'qashqai', name: 'Nissan Qashqai', years: '2006–н.в.', engines: [{ id: '1.2-t', name: '1.2 л Turbo', volume: '1.2' }, { id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 6ст.', 'CVT'], popular: true },
      { id: 'x-trail', name: 'Nissan X-Trail', years: '2001–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['МКПП 6ст.', 'CVT'], popular: true },
      { id: 'juke', name: 'Nissan Juke', years: '2010–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }], transmission: ['МКПП 6ст.', 'CVT'] },
      { id: 'note', name: 'Nissan Note', years: '2004–н.в.', engines: [{ id: '1.2', name: '1.2 л', volume: '1.2' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'CVT'] },
      { id: 'teana', name: 'Nissan Teana', years: '2003–2020', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л V6', volume: '2.5' }, { id: '3.5', name: '3.5 л V6', volume: '3.5' }], transmission: ['CVT'] },
    ],
  },
  {
    id: 'mazda', name: 'Mazda', country: 'Япония', logo: '🇯🇵', popular: true,
    models: [
      { id: 'mazda3', name: 'Mazda 3', years: '2003–н.в.', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }, { id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'], popular: true },
      { id: 'mazda6', name: 'Mazda 6', years: '2002–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'], popular: true },
      { id: 'cx-5', name: 'Mazda CX-5', years: '2012–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'], popular: true },
      { id: 'cx-30', name: 'Mazda CX-30', years: '2019–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['АКПП 6ст.'] },
    ],
  },
  {
    id: 'subaru', name: 'Subaru', country: 'Япония', logo: '🇯🇵', popular: false,
    models: [
      { id: 'forester', name: 'Subaru Forester', years: '1997–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['МКПП 6ст.', 'CVT'] },
      { id: 'outback', name: 'Subaru Outback', years: '1994–н.в.', engines: [{ id: '2.5', name: '2.5 л', volume: '2.5' }, { id: '3.6', name: '3.6 л', volume: '3.6' }], transmission: ['CVT'] },
      { id: 'xv', name: 'Subaru XV', years: '2012–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 6ст.', 'CVT'] },
    ],
  },
  {
    id: 'mitsubishi', name: 'Mitsubishi', country: 'Япония', logo: '🇯🇵', popular: false,
    models: [
      { id: 'outlander', name: 'Mitsubishi Outlander', years: '2001–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.4', name: '2.4 л', volume: '2.4' }], transmission: ['CVT'] },
      { id: 'pajero', name: 'Mitsubishi Pajero', years: '1982–2021', engines: [{ id: '3.0', name: '3.0 л V6', volume: '3.0' }, { id: '3.2-d', name: '3.2 л TD', volume: '3.2' }, { id: '3.8', name: '3.8 л V6', volume: '3.8' }], transmission: ['АКПП 5ст.', 'АКПП 8ст.'] },
      { id: 'lancer', name: 'Mitsubishi Lancer', years: '1973–2017', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 5ст.', 'CVT'] },
      { id: 'asx', name: 'Mitsubishi ASX', years: '2010–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 5ст.', 'CVT'] },
    ],
  },
  {
    id: 'suzuki', name: 'Suzuki', country: 'Япония', logo: '🇯🇵', popular: false,
    models: [
      { id: 'jimny', name: 'Suzuki Jimny', years: '1970–н.в.', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['МКПП 5ст.', 'АКПП 4ст.'] },
      { id: 'vitara', name: 'Suzuki Vitara', years: '1988–н.в.', engines: [{ id: '1.4-t', name: '1.4 л Turbo', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АКПП 6ст.'] },
      { id: 'sx4', name: 'Suzuki SX4', years: '2006–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 5ст.', 'CVT'] },
    ],
  },

  // ===== КОРЕЯ =====
  {
    id: 'hyundai', name: 'Hyundai', country: 'Корея', logo: '🇰🇷', popular: true,
    models: [
      { id: 'solaris', name: 'Hyundai Solaris', years: '2011–н.в.', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АКПП 4ст.', 'АКПП 6ст.'], popular: true },
      { id: 'creta', name: 'Hyundai Creta', years: '2015–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'], popular: true },
      { id: 'tucson', name: 'Hyundai Tucson', years: '2004–н.в.', engines: [{ id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 8ст.'], popular: true },
      { id: 'sonata', name: 'Hyundai Sonata', years: '1985–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.'], popular: true },
      { id: 'elantra', name: 'Hyundai Elantra', years: '1990–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'] },
      { id: 'kona', name: 'Hyundai Kona', years: '2017–н.в.', engines: [{ id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['АКПП 6ст.', 'АКПП 7ст. DCT'] },
      { id: 'santa-fe', name: 'Hyundai Santa Fe', years: '2000–н.в.', engines: [{ id: '2.2-d', name: '2.2 л Diesel', volume: '2.2' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.'] },
    ],
  },
  {
    id: 'kia', name: 'Kia', country: 'Корея', logo: '🇰🇷', popular: true,
    models: [
      { id: 'rio', name: 'Kia Rio', years: '2000–н.в.', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 4ст.', 'АКПП 6ст.'], popular: true },
      { id: 'sportage', name: 'Kia Sportage', years: '1993–н.в.', engines: [{ id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 8ст.'], popular: true },
      { id: 'ceed', name: 'Kia Ceed', years: '2006–н.в.', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '1.6-d', name: '1.6 л Diesel', volume: '1.6' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 7ст. DCT'] },
      { id: 'cerato', name: 'Kia Cerato', years: '2003–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'] },
      { id: 'sorento', name: 'Kia Sorento', years: '2002–н.в.', engines: [{ id: '2.2-d', name: '2.2 л Diesel', volume: '2.2' }, { id: '2.5', name: '2.5 л', volume: '2.5' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.', 'DCT 8ст.'] },
      { id: 'picanto', name: 'Kia Picanto', years: '2004–н.в.', engines: [{ id: '1.0', name: '1.0 л', volume: '1.0' }, { id: '1.2', name: '1.2 л', volume: '1.2' }], transmission: ['МКПП 5ст.', 'АКПП 4ст.'] },
    ],
  },

  // ===== ГЕРМАНИЯ =====
  {
    id: 'volkswagen', name: 'Volkswagen', country: 'Германия', logo: '🇩🇪', popular: true,
    models: [
      { id: 'polo', name: 'VW Polo', years: '1975–н.в.', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.'], popular: true },
      { id: 'jetta', name: 'VW Jetta', years: '1979–н.в.', engines: [{ id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АКПП 6ст.', 'АКПП 8ст.'] },
      { id: 'tiguan', name: 'VW Tiguan', years: '2007–н.в.', engines: [{ id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }, { id: '2.0-t', name: '2.0 л TSI', volume: '2.0' }, { id: '2.0-d', name: '2.0 л TDI', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 7ст. DSG', 'АКПП 8ст.'], popular: true },
      { id: 'passat', name: 'VW Passat', years: '1973–н.в.', engines: [{ id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }, { id: '1.8-t', name: '1.8 л TSI', volume: '1.8' }, { id: '2.0-t', name: '2.0 л TSI', volume: '2.0' }, { id: '2.0-d', name: '2.0 л TDI', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 7ст. DSG'] },
      { id: 'touareg', name: 'VW Touareg', years: '2002–н.в.', engines: [{ id: '3.0-d', name: '3.0 л TDI', volume: '3.0' }, { id: '3.0-t', name: '3.0 л TSI', volume: '3.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'taos', name: 'VW Taos', years: '2020–н.в.', engines: [{ id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.'] },
    ],
  },
  {
    id: 'bmw', name: 'BMW', country: 'Германия', logo: '🇩🇪', popular: true,
    models: [
      { id: '3-series', name: 'BMW 3 серия', years: '1975–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }, { id: '3.0', name: '3.0 л', volume: '3.0' }], transmission: ['МКПП 6ст.', 'АКПП 8ст.'], popular: true },
      { id: '5-series', name: 'BMW 5 серия', years: '1972–н.в.', engines: [{ id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }, { id: '3.0', name: '3.0 л', volume: '3.0' }, { id: '3.0-d', name: '3.0 л Diesel', volume: '3.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'x3', name: 'BMW X3', years: '2003–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'x5', name: 'BMW X5', years: '1999–н.в.', engines: [{ id: '3.0', name: '3.0 л', volume: '3.0' }, { id: '3.0-d', name: '3.0 л Diesel', volume: '3.0' }, { id: '4.4', name: '4.4 л V8', volume: '4.4' }], transmission: ['АКПП 8ст.'] },
      { id: 'x1', name: 'BMW X1', years: '2009–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['АКПП 7ст. DCT', 'АКПП 8ст.'] },
    ],
  },
  {
    id: 'mercedes', name: 'Mercedes-Benz', country: 'Германия', logo: '🇩🇪', popular: true,
    models: [
      { id: 'c-class', name: 'Mercedes C-класс', years: '1993–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }, { id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }], transmission: ['АКПП 9ст.'], popular: true },
      { id: 'e-class', name: 'Mercedes E-класс', years: '1993–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }, { id: '3.0', name: '3.0 л V6', volume: '3.0' }], transmission: ['АКПП 9ст.'] },
      { id: 'glc', name: 'Mercedes GLC', years: '2015–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }], transmission: ['АКПП 9ст.'] },
      { id: 'gle', name: 'Mercedes GLE', years: '2015–н.в.', engines: [{ id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }, { id: '3.0', name: '3.0 л', volume: '3.0' }], transmission: ['АКПП 9ст.'] },
      { id: 'a-class', name: 'Mercedes A-класс', years: '1997–н.в.', engines: [{ id: '1.3', name: '1.3 л', volume: '1.3' }, { id: '1.5-d', name: '1.5 л Diesel', volume: '1.5' }], transmission: ['АКПП 7ст. DCT', 'АКПП 8ст.'] },
    ],
  },
  {
    id: 'audi', name: 'Audi', country: 'Германия', logo: '🇩🇪', popular: true,
    models: [
      { id: 'a3', name: 'Audi A3', years: '1996–н.в.', engines: [{ id: '1.0-t', name: '1.0 л TFSI', volume: '1.0' }, { id: '1.4-t', name: '1.4 л TFSI', volume: '1.4' }, { id: '2.0-t', name: '2.0 л TFSI', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 7ст. S-tronic'] },
      { id: 'a4', name: 'Audi A4', years: '1994–н.в.', engines: [{ id: '2.0-t', name: '2.0 л TFSI', volume: '2.0' }, { id: '2.0-d', name: '2.0 л TDI', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 7ст. S-tronic', 'АКПП 8ст.'] },
      { id: 'q5', name: 'Audi Q5', years: '2008–н.в.', engines: [{ id: '2.0-t', name: '2.0 л TFSI', volume: '2.0' }, { id: '2.0-d', name: '2.0 л TDI', volume: '2.0' }], transmission: ['АКПП 7ст. S-tronic', 'АКПП 8ст.'] },
      { id: 'q7', name: 'Audi Q7', years: '2005–н.в.', engines: [{ id: '2.0-t', name: '2.0 л TFSI', volume: '2.0' }, { id: '3.0-d', name: '3.0 л TDI', volume: '3.0' }], transmission: ['АКПП 8ст.'] },
    ],
  },
  {
    id: 'porsche', name: 'Porsche', country: 'Германия', logo: '🇩🇪', popular: false,
    models: [
      { id: 'cayenne', name: 'Porsche Cayenne', years: '2002–н.в.', engines: [{ id: '3.0', name: '3.0 л V6', volume: '3.0' }, { id: '4.0-v8', name: '4.0 л V8', volume: '4.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'macan', name: 'Porsche Macan', years: '2014–н.в.', engines: [{ id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.9-v6', name: '2.9 л V6', volume: '2.9' }], transmission: ['АКПП 7ст. PDK'] },
    ],
  },
  {
    id: 'opel', name: 'Opel', country: 'Германия', logo: '🇩🇪', popular: false,
    models: [
      { id: 'astra', name: 'Opel Astra', years: '1991–н.в.', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.'] },
      { id: 'mokka', name: 'Opel Mokka', years: '2012–н.в.', engines: [{ id: '1.4-t', name: '1.4 л Turbo', volume: '1.4' }, { id: '1.6-d', name: '1.6 л Diesel', volume: '1.6' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.'] },
    ],
  },

  // ===== США =====
  {
    id: 'ford', name: 'Ford', country: 'США', logo: '🇺🇸', popular: true,
    models: [
      { id: 'focus', name: 'Ford Focus', years: '1998–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.'], popular: true },
      { id: 'fiesta', name: 'Ford Fiesta', years: '1976–н.в.', engines: [{ id: '1.0-t', name: '1.0 л EcoBoost', volume: '1.0' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.'] },
      { id: 'kuga', name: 'Ford Kuga', years: '2008–н.в.', engines: [{ id: '1.5-t', name: '1.5 л EcoBoost', volume: '1.5' }, { id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '2.0-d', name: '2.0 л TDCi', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 8ст.'] },
      { id: 'explorer', name: 'Ford Explorer', years: '1990–н.в.', engines: [{ id: '2.3-t', name: '2.3 л EcoBoost', volume: '2.3' }, { id: '3.0-v6', name: '3.0 л V6', volume: '3.0' }], transmission: ['АКПП 10ст.'] },
      { id: 'mondeo', name: 'Ford Mondeo', years: '1993–н.в.', engines: [{ id: '1.5-t', name: '1.5 л EcoBoost', volume: '1.5' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 8ст.'] },
    ],
  },
  {
    id: 'chevrolet', name: 'Chevrolet', country: 'США', logo: '🇺🇸', popular: true,
    models: [
      { id: 'lacetti', name: 'Chevrolet Lacetti', years: '2002–2013', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '1.8', name: '1.8 л', volume: '1.8' }], transmission: ['МКПП 5ст.', 'АКПП 4ст.'], popular: true },
      { id: 'aveo', name: 'Chevrolet Aveo', years: '2002–2020', engines: [{ id: '1.2', name: '1.2 л', volume: '1.2' }, { id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АКПП 4ст.', 'АКПП 6ст.'] },
      { id: 'captiva', name: 'Chevrolet Captiva', years: '2006–2018', engines: [{ id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }, { id: '2.4', name: '2.4 л', volume: '2.4' }, { id: '3.0', name: '3.0 л V6', volume: '3.0' }], transmission: ['МКПП 5ст.', 'АКПП 5ст.', 'АКПП 6ст.'] },
      { id: 'cobalt', name: 'Chevrolet Cobalt', years: '2011–2021', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['МКПП 5ст.', 'АКПП 6ст.'] },
    ],
  },

  // ===== ФРАНЦИЯ =====
  {
    id: 'renault', name: 'Renault', country: 'Франция', logo: '🇫🇷', popular: true,
    models: [
      { id: 'logan', name: 'Renault Logan', years: '2004–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АКПП 4ст.'], popular: true },
      { id: 'sandero', name: 'Renault Sandero', years: '2007–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АКПП 4ст.'], popular: true },
      { id: 'duster', name: 'Renault Duster', years: '2010–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }, { id: '1.5-d', name: '1.5 л Diesel', volume: '1.5' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 4ст.', 'АКПП 6ст.'], popular: true },
      { id: 'kaptur', name: 'Renault Kaptur', years: '2016–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 4ст.', 'CVT'] },
      { id: 'arkana', name: 'Renault Arkana', years: '2019–н.в.', engines: [{ id: '1.3-t', name: '1.3 л Turbo', volume: '1.3' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 6ст.', 'CVT'] },
      { id: 'megane', name: 'Renault Megane', years: '1995–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '2.0', name: '2.0 л', volume: '2.0' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 4ст.', 'CVT'] },
    ],
  },
  {
    id: 'peugeot', name: 'Peugeot', country: 'Франция', logo: '🇫🇷', popular: false,
    models: [
      { id: '308', name: 'Peugeot 308', years: '2007–н.в.', engines: [{ id: '1.2-t', name: '1.2 л Turbo', volume: '1.2' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.', 'АКПП 8ст.'] },
      { id: '3008', name: 'Peugeot 3008', years: '2009–н.в.', engines: [{ id: '1.2-t', name: '1.2 л Turbo', volume: '1.2' }, { id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }], transmission: ['МКПП 6ст.', 'АКПП 6ст.', 'АКПП 8ст.'] },
      { id: '408', name: 'Peugeot 408', years: '2010–н.в.', engines: [{ id: '1.6', name: '1.6 л', volume: '1.6' }, { id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }], transmission: ['МКПП 5ст.', 'АКПП 6ст.'] },
    ],
  },
  {
    id: 'citroen', name: 'Citroën', country: 'Франция', logo: '🇫🇷', popular: false,
    models: [
      { id: 'c4', name: 'Citroën C4', years: '2004–н.в.', engines: [{ id: '1.2-t', name: '1.2 л Turbo', volume: '1.2' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.'] },
      { id: 'c5-aircross', name: 'Citroën C5 Aircross', years: '2017–н.в.', engines: [{ id: '1.2-t', name: '1.2 л Turbo', volume: '1.2' }, { id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }], transmission: ['АКПП 6ст.', 'АКПП 8ст.'] },
    ],
  },

  // ===== ИТАЛИЯ =====
  {
    id: 'fiat', name: 'Fiat', country: 'Италия', logo: '🇮🇹', popular: false,
    models: [
      { id: '500', name: 'Fiat 500', years: '1957–н.в.', engines: [{ id: '0.9-t', name: '0.9 л Turbo', volume: '0.9' }, { id: '1.2', name: '1.2 л', volume: '1.2' }, { id: '1.4', name: '1.4 л', volume: '1.4' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 5ст.', 'АКПП 6ст.'] },
      { id: 'tipo', name: 'Fiat Tipo', years: '2015–н.в.', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6-d', name: '1.6 л Diesel', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.'] },
    ],
  },

  // ===== ВЕЛИКОБРИТАНИЯ =====
  {
    id: 'land-rover', name: 'Land Rover', country: 'Великобритания', logo: '🇬🇧', popular: false,
    models: [
      { id: 'range-rover', name: 'Range Rover', years: '1970–н.в.', engines: [{ id: '3.0-d', name: '3.0 л Diesel', volume: '3.0' }, { id: '3.0-sc', name: '3.0 л SC', volume: '3.0' }, { id: '5.0-sc', name: '5.0 л SC', volume: '5.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'range-rover-sport', name: 'Range Rover Sport', years: '2005–н.в.', engines: [{ id: '3.0-d', name: '3.0 л Diesel', volume: '3.0' }, { id: '3.0-sc', name: '3.0 л SC', volume: '3.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'discovery', name: 'Land Rover Discovery', years: '1989–н.в.', engines: [{ id: '2.0-sd4', name: '2.0 л SD4', volume: '2.0' }, { id: '3.0-sc', name: '3.0 л SC', volume: '3.0' }], transmission: ['АКПП 8ст.', 'АКПП 9ст.'] },
      { id: 'defender', name: 'Land Rover Defender', years: '1983–н.в.', engines: [{ id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }, { id: '3.0-sc', name: '3.0 л SC', volume: '3.0' }], transmission: ['МКПП 6ст.', 'АКПП 8ст.'] },
    ],
  },
  {
    id: 'jaguar', name: 'Jaguar', country: 'Великобритания', logo: '🇬🇧', popular: false,
    models: [
      { id: 'f-pace', name: 'Jaguar F-Pace', years: '2016–н.в.', engines: [{ id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }, { id: '3.0-sc', name: '3.0 л SC', volume: '3.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'xe', name: 'Jaguar XE', years: '2015–н.в.', engines: [{ id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['АКПП 8ст.'] },
    ],
  },

  // ===== ШВЕЦИЯ =====
  {
    id: 'volvo', name: 'Volvo', country: 'Швеция', logo: '🇸🇪', popular: false,
    models: [
      { id: 'xc60', name: 'Volvo XC60', years: '2008–н.в.', engines: [{ id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['АКПП 8ст.'] },
      { id: 'xc90', name: 'Volvo XC90', years: '2002–н.в.', engines: [{ id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['АКПП 8ст.'] },
      { id: 's60', name: 'Volvo S60', years: '2000–н.в.', engines: [{ id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }, { id: '2.0-d', name: '2.0 л Diesel', volume: '2.0' }], transmission: ['АКПП 8ст.'] },
    ],
  },

  // ===== КИТАЙ =====
  {
    id: 'chery', name: 'Chery', country: 'Китай', logo: '🇨🇳', popular: true,
    models: [
      { id: 'tiggo4', name: 'Chery Tiggo 4', years: '2017–н.в.', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['МКПП 5ст.', 'CVT'], popular: true },
      { id: 'tiggo7', name: 'Chery Tiggo 7', years: '2016–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }], transmission: ['МКПП 6ст.', 'CVT'], popular: true },
      { id: 'tiggo8', name: 'Chery Tiggo 8', years: '2018–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }], transmission: ['МКПП 6ст.', '6DCT', 'CVT'] },
    ],
  },
  {
    id: 'geely', name: 'Geely', country: 'Китай', logo: '🇨🇳', popular: true,
    models: [
      { id: 'atlas', name: 'Geely Atlas', years: '2017–н.в.', engines: [{ id: '1.8-t', name: '1.8 л Turbo', volume: '1.8' }, { id: '2.4', name: '2.4 л', volume: '2.4' }], transmission: ['МКПП 6ст.', '6DCT', 'АКПП 6ст.'], popular: true },
      { id: 'coolray', name: 'Geely Coolray', years: '2019–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }], transmission: ['7DCT'] },
      { id: 'monjaro', name: 'Geely Monjaro', years: '2022–н.в.', engines: [{ id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['7DCT', 'АКПП 8ст.'] },
    ],
  },
  {
    id: 'haval', name: 'Haval', country: 'Китай', logo: '🇨🇳', popular: true,
    models: [
      { id: 'jolion', name: 'Haval Jolion', years: '2021–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }], transmission: ['7DCT'], popular: true },
      { id: 'f7', name: 'Haval F7', years: '2018–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['7DCT'] },
      { id: 'dargo', name: 'Haval Dargo', years: '2022–н.в.', engines: [{ id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['7DCT'] },
    ],
  },
  {
    id: 'changan', name: 'Changan', country: 'Китай', logo: '🇨🇳', popular: false,
    models: [
      { id: 'cs75', name: 'Changan CS75', years: '2014–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }], transmission: ['6DCT', 'АКПП 6ст.'] },
      { id: 'cs55', name: 'Changan CS55', years: '2017–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }], transmission: ['6DCT'] },
    ],
  },
  {
    id: 'byd', name: 'BYD', country: 'Китай', logo: '🇨🇳', popular: false,
    models: [
      { id: 'song-plus', name: 'BYD Song Plus', years: '2020–н.в.', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['CVT'] },
      { id: 'han', name: 'BYD Han', years: '2020–н.в.', engines: [], transmission: ['АКПП 1ст. (EV)'] },
    ],
  },

  // ===== ДРУГИЕ =====
  {
    id: 'skoda', name: 'Škoda', country: 'Чехия', logo: '🇨🇿', popular: true,
    models: [
      { id: 'octavia', name: 'Škoda Octavia', years: '1996–н.в.', engines: [{ id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }, { id: '1.8-t', name: '1.8 л TSI', volume: '1.8' }, { id: '2.0-d', name: '2.0 л TDI', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 7ст. DSG', 'АКПП 8ст.'], popular: true },
      { id: 'kodiaq', name: 'Škoda Kodiaq', years: '2016–н.в.', engines: [{ id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }, { id: '2.0-t', name: '2.0 л TSI', volume: '2.0' }, { id: '2.0-d', name: '2.0 л TDI', volume: '2.0' }], transmission: ['МКПП 6ст.', 'АКПП 7ст. DSG', 'АКПП 8ст.'] },
      { id: 'rapid', name: 'Škoda Rapid', years: '2012–н.в.', engines: [{ id: '1.4', name: '1.4 л', volume: '1.4' }, { id: '1.6', name: '1.6 л', volume: '1.6' }], transmission: ['МКПП 5ст.', 'МКПП 6ст.', 'АКПП 6ст.', 'АКПП 7ст. DSG'] },
      { id: 'karoq', name: 'Škoda Karoq', years: '2017–н.в.', engines: [{ id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }, { id: '1.6-d', name: '1.6 л TDI', volume: '1.6' }], transmission: ['МКПП 6ст.', 'АКПП 7ст. DSG'] },
    ],
  },
  {
    id: 'seat', name: 'SEAT', country: 'Испания', logo: '🇪🇸', popular: false,
    models: [
      { id: 'leon', name: 'SEAT Leon', years: '1999–н.в.', engines: [{ id: '1.0-t', name: '1.0 л TSI', volume: '1.0' }, { id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }, { id: '1.5-t', name: '1.5 л TSI', volume: '1.5' }], transmission: ['МКПП 6ст.', 'АКПП 7ст. DSG'] },
      { id: 'ateca', name: 'SEAT Ateca', years: '2016–н.в.', engines: [{ id: '1.0-t', name: '1.0 л TSI', volume: '1.0' }, { id: '1.4-t', name: '1.4 л TSI', volume: '1.4' }], transmission: ['МКПП 6ст.', 'АКПП 7ст. DSG'] },
    ],
  },
  {
    id: 'mg', name: 'MG', country: 'Китай', logo: '🇨🇳', popular: false,
    models: [
      { id: 'zs', name: 'MG ZS', years: '2017–н.в.', engines: [{ id: '1.5', name: '1.5 л', volume: '1.5' }], transmission: ['МКПП 5ст.', 'CVT'] },
      { id: 'hs', name: 'MG HS', years: '2018–н.в.', engines: [{ id: '1.5-t', name: '1.5 л Turbo', volume: '1.5' }], transmission: ['6DCT', '7DCT'] },
    ],
  },
  {
    id: 'exeed', name: 'EXEED', country: 'Китай', logo: '🇨🇳', popular: false,
    models: [
      { id: 'txl', name: 'EXEED TXL', years: '2019–н.в.', engines: [{ id: '1.6-t', name: '1.6 л Turbo', volume: '1.6' }, { id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['7DCT'] },
      { id: 'vx', name: 'EXEED VX', years: '2021–н.в.', engines: [{ id: '2.0-t', name: '2.0 л Turbo', volume: '2.0' }], transmission: ['7DCT'] },
    ],
  },
]

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

export function getAllBrands(): Brand[] {
  return BRANDS
}

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find(b => b.id === id)
}

export function getPopularBrands(): Brand[] {
  return BRANDS.filter(b => b.popular)
}

export function getModelsByBrand(brandId: string): Vehicle[] {
  const brand = getBrandById(brandId)
  return brand?.models || []
}

export function getPopularModels(): { brand: Brand; model: Vehicle }[] {
  const result: { brand: Brand; model: Vehicle }[] = []
  for (const brand of BRANDS) {
    for (const model of brand.models) {
      if (model.popular) {
        result.push({ brand, model })
      }
    }
  }
  return result
}

export function findModel(query: string): { brand: Brand; model: Vehicle } | undefined {
  const q = query.toLowerCase().trim()
  for (const brand of BRANDS) {
    const model = brand.models.find(m =>
      m.id.includes(q) ||
      m.name.toLowerCase().includes(q) ||
      q.includes(m.id) ||
      q.includes(m.name.toLowerCase())
    )
    if (model) return { brand, model }
  }
  return undefined
}

export function searchModels(query: string): { brand: Brand; model: Vehicle }[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const results: { brand: Brand; model: Vehicle }[] = []
  for (const brand of BRANDS) {
    for (const model of brand.models) {
      if (
        model.name.toLowerCase().includes(q) ||
        brand.name.toLowerCase().includes(q) ||
        model.id.includes(q)
      ) {
        results.push({ brand, model })
      }
    }
  }
  return results
}

// Backward compatibility — old AVTOVAZ_MODELS format
export const AVTOVAZ_MODELS: Vehicle[] = BRANDS.find(b => b.id === 'lada')?.models || []
