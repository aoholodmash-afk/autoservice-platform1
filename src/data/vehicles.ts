export interface Vehicle {
  id: string
  name: string
  years: string
  engines: Engine[]
  transmission: string[]
  popular?: boolean
}

export interface Engine {
  id: string
  name: string
  volume?: string
}

export const AVTOVAZ_MODELS: Vehicle[] = [
  {
    id: 'granta',
    name: 'Lada Granta',
    years: '2011–2023',
    engines: [
      { id: '8v', name: '8-клапанный', volume: '1.6' },
      { id: '16v', name: '16-клапанный', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.', 'МКПП тросиковая', 'АМТ (робот)'],
    popular: true,
  },
  {
    id: 'vesta',
    name: 'Lada Vesta',
    years: '2015–н.в.',
    engines: [
      { id: '1.6', name: '1.6 л', volume: '1.6' },
      { id: '1.8', name: '1.8 л', volume: '1.8' },
    ],
    transmission: ['МКПП 5ст.', 'АМТ (робот)', 'CVT (вариатор)'],
    popular: true,
  },
  {
    id: 'xray',
    name: 'Lada XRAY',
    years: '2016–н.в.',
    engines: [
      { id: '1.6', name: '1.6 л', volume: '1.6' },
      { id: '1.8', name: '1.8 л', volume: '1.8' },
    ],
    transmission: ['МКПП 5ст.', 'АМТ (робот)'],
    popular: true,
  },
  {
    id: 'niva',
    name: 'Lada Niva (4x4)',
    years: '1977–н.в.',
    engines: [
      { id: '1.7', name: '1.7 л', volume: '1.7' },
    ],
    transmission: ['МКПП 5ст.'],
    popular: true,
  },
  {
    id: 'niva-travel',
    name: 'Lada Niva Travel',
    years: '2020–н.в.',
    engines: [
      { id: '1.7', name: '1.7 л', volume: '1.7' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: 'largus',
    name: 'Lada Largus',
    years: '2012–н.в.',
    engines: [
      { id: '1.6-8v', name: '1.6 л (8V)', volume: '1.6' },
      { id: '1.6-16v', name: '1.6 л (16V)', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: 'priora',
    name: 'Lada Priora',
    years: '2007–2018',
    engines: [
      { id: '8v', name: '8-клапанный', volume: '1.6' },
      { id: '16v', name: '16-клапанный', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.', 'АМТ (робот)'],
  },
  {
    id: 'kalina',
    name: 'Lada Kalina',
    years: '2004–2018',
    engines: [
      { id: '8v', name: '8-клапанный', volume: '1.6' },
      { id: '16v', name: '16-клапанный', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.', 'АМТ (робот)'],
  },
  {
    id: 'kalina-2',
    name: 'Lada Kalina 2',
    years: '2013–2018',
    engines: [
      { id: '8v', name: '8-клапанный', volume: '1.6' },
      { id: '16v', name: '16-клапанный', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.', 'АМТ (робот)'],
  },
  {
    id: '2107',
    name: 'ВАЗ-2107 (Классика)',
    years: '1982–2012',
    engines: [
      { id: '1.5', name: '1.5 л', volume: '1.5' },
      { id: '1.6', name: '1.6 л', volume: '1.6' },
      { id: '1.7i', name: '1.7 л инж.', volume: '1.7' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: '2109',
    name: 'ВАЗ-2109 (Спутник)',
    years: '1987–2004',
    engines: [
      { id: '1.3', name: '1.3 л', volume: '1.3' },
      { id: '1.5', name: '1.5 л', volume: '1.5' },
      { id: '1.5i', name: '1.5 л инж.', volume: '1.5' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: '2110',
    name: 'ВАЗ-2110',
    years: '1996–2009',
    engines: [
      { id: '1.5', name: '1.5 л', volume: '1.5' },
      { id: '1.5i', name: '1.5 л инж.', volume: '1.5' },
      { id: '1.6', name: '1.6 л', volume: '1.6' },
      { id: '1.6-16v', name: '1.6 л (16V)', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: '2112',
    name: 'ВАЗ-2112',
    years: '1999–2008',
    engines: [
      { id: '1.5-16v', name: '1.5 л (16V)', volume: '1.5' },
      { id: '1.6', name: '1.6 л', volume: '1.6' },
      { id: '1.6-16v', name: '1.6 л (16V)', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: '2114',
    name: 'ВАЗ-2114 (Самара-2)',
    years: '2001–2013',
    engines: [
      { id: '1.5', name: '1.5 л', volume: '1.5' },
      { id: '1.6', name: '1.6 л', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: '2115',
    name: 'ВАЗ-2115 (Самара-2)',
    years: '1997–2012',
    engines: [
      { id: '1.5', name: '1.5 л', volume: '1.5' },
      { id: '1.6', name: '1.6 л', volume: '1.6' },
    ],
    transmission: ['МКПП 5ст.'],
  },
  {
    id: '2121',
    name: 'ВАЗ-2121 (Нива)',
    years: '1977–2006',
    engines: [
      { id: '1.6', name: '1.6 л', volume: '1.6' },
      { id: '1.7', name: '1.7 л', volume: '1.7' },
    ],
    transmission: ['МКПП 5ст.'],
  },
]

export function findModel(query: string): Vehicle | undefined {
  const q = query.toLowerCase().trim()
  return AVTOVAZ_MODELS.find(m =>
    m.id.includes(q) ||
    m.name.toLowerCase().includes(q) ||
    q.includes(m.id)
  )
}
