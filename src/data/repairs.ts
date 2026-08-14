export interface Repair {
  id: string
  modelId: string
  category: string
  name: string
  description: string
  laborPrice: number
  laborHours: number
  difficulty: 'easy' | 'medium' | 'hard'
  parts: Part[]
  kits: Kit[]
  clarifications?: Clarification[]
}

export interface Part {
  name: string
  article: string
  variants: PartVariant[]
}

export interface PartVariant {
  brand: string
  article: string
  price: number
  source: string
  inStock: boolean
  deliveryDays: number
}

export interface Kit {
  name: string
  price: number
  includes: string[]
}

export interface Clarification {
  question: string
  field: string
  options: string[]
}

export const REPAIRS: Repair[] = [
  // =====================================================
  // LADA GRANTA (granta)
  // =====================================================
  {
    id: 'granta-to',
    modelId: 'granta',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного, воздушного и салонного фильтров',
    laborPrice: 1000,
    laborHours: 0.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Моторное масло 5W-30 (4 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 2200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Shell Helix HX8', article: '550040744', price: 2800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
          { brand: 'Mobil Super 3000', article: '152526', price: 3100, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '21900-1012005',
        variants: [
          { brand: 'LADA Original', article: '21900-1012005', price: 220, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LYNXauto', article: 'GB-1022', price: 130, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'W68/3', price: 480, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '21900-1109013',
        variants: [
          { brand: 'LADA Original', article: '21900-1109013', price: 320, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'C27009', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'BIG Filter', article: 'GB-9972', price: 280, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Фильтр салонный',
        article: '21900-8122068',
        variants: [
          { brand: 'LADA Original', article: '21900-8122068', price: 280, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'CU1829', price: 520, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 3000, includes: ['масло 4л', 'масляный фильтр', 'воздушный фильтр', 'салонный фильтр'] },
      { name: 'ТО-комплект MANN + Shell', price: 4350, includes: ['масло 4л', 'масляный фильтр', 'воздушный фильтр', 'салонный фильтр'] },
    ],
  },
  {
    id: 'granta-brakes',
    modelId: 'granta',
    category: 'brakes',
    name: 'Замена тормозных колодок и дисков',
    description: 'Замена передних и задних тормозных колодок, при необходимости — дисков',
    laborPrice: 2000,
    laborHours: 1.5,
    difficulty: 'easy',
    clarifications: [
      { question: 'Какие тормоза меняем?', field: 'brakes', options: ['Передние колодки', 'Задние колодки', 'Передние диски', 'Всё вместе'] },
    ],
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '21900-3501090',
        variants: [
          { brand: 'LADA Original', article: '21900-3501090', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Pilenga', article: 'FD-P2003', price: 480, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'TRIALLI', article: '—', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
          { brand: 'LYNXauto', article: '—', price: 420, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Задние тормозные колодки',
        article: '21900-3502090',
        variants: [
          { brand: 'LADA Original', article: '21900-3502090', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'TRIALLI', article: '—', price: 450, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Тормозной диск передний',
        article: '21900-3501070',
        variants: [
          { brand: 'LADA Original', article: '21900-3501070', price: 1850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'TRIALLI', article: '—', price: 1150, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [
      { name: 'Передние колодки LADA', price: 700, includes: ['колодки 4 шт.'] },
      { name: 'Передние колодки + диски', price: 4400, includes: ['колодки 4 шт.', 'диски 2 шт.'] },
    ],
  },
  {
    id: 'granta-clutch',
    modelId: 'granta',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника сцепления',
    laborPrice: 4500,
    laborHours: 3.5,
    difficulty: 'hard',
    clarifications: [
      { question: 'Какой тип КПП?', field: 'transmission', options: ['МКПП тросиковая', 'МКПП тяговая'] },
    ],
    parts: [
      {
        name: 'Корзина сцепления (нажимной диск)',
        article: '21900-1601085',
        variants: [
          { brand: 'LADA Original', article: '21900-1601085', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '835053', price: 5200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Ведомый диск сцепления',
        article: '21900-1601130',
        variants: [
          { brand: 'LADA Original', article: '21900-1601130', price: 2750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '835052', price: 3200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Выжимной подшипник',
        article: '21900-1601182',
        variants: [
          { brand: 'LADA Original', article: '21900-1601182', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LuK', article: '500044610', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [
      { name: 'LADA Original комплект', price: 7100, includes: ['корзина', 'диск', 'выжимной'] },
      { name: 'Valeo полный комплект', price: 9600, includes: ['корзина', 'диск', 'выжимной'] },
    ],
  },
  {
    id: 'granta-suspension',
    modelId: 'granta',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, рычагов, стоек стабилизатора',
    laborPrice: 3000,
    laborHours: 2,
    difficulty: 'medium',
    clarifications: [
      { question: 'Что меняем?', field: 'suspension', options: ['Амортизаторы передние', 'Амортизаторы задние', 'Рычаги', 'Стойки стабилизатора'] },
    ],
    parts: [
      {
        name: 'Амортизатор передний',
        article: '21900-2901068',
        variants: [
          { brand: 'LADA Original', article: '21900-2901068', price: 4000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'HOLA', article: '—', price: 3750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
          { brand: 'TRIALLI', article: '—', price: 4000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
          { brand: 'ZEKKERT', article: '—', price: 5000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 3 },
        ],
      },
      {
        name: 'Рычаг передний нижний',
        article: '21900-2904054',
        variants: [
          { brand: 'LADA Original', article: '21900-2904054', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'TRIALLI', article: '—', price: 2800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Стойка стабилизатора',
        article: '21900-2906050',
        variants: [
          { brand: 'LADA Original', article: '21900-2906050', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LYNXauto', article: '—', price: 450, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Передние амортизаторы LADA (2 шт.)', price: 8000, includes: ['амортизатор x2'] },
      { name: 'Передние амортизаторы HOLA (2 шт.)', price: 7500, includes: ['амортизатор x2'] },
    ],
  },
  {
    id: 'granta-engine',
    modelId: 'granta',
    category: 'engine',
    name: 'Замена ремня ГРМ и роликов',
    description: 'Замена ремня привода ГРМ, натяжного и обводного роликов',
    laborPrice: 3500,
    laborHours: 2.5,
    difficulty: 'medium',
    parts: [
      {
        name: 'Ремень ГРМ',
        article: '21126-1006040',
        variants: [
          { brand: 'Gates', article: '5631XS', price: 1150, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LYNXauto', article: '—', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LADA Original', article: '21126-1006040', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ролик натяжной ГРМ',
        article: '21126-1006120',
        variants: [
          { brand: 'LADA Original', article: '21126-1006120', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'SKF', article: 'VKM16103', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Ролик обводной ГРМ',
        article: '21126-1006135',
        variants: [
          { brand: 'LADA Original', article: '21126-1006135', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Gates комплект (ремень + ролик)', price: 2050, includes: ['ремень ГРМ', 'натяжной ролик'] },
      { name: 'LADA Original комплект', price: 1800, includes: ['ремень ГРМ', 'натяжной ролик'] },
    ],
  },

  // =====================================================
  // LADA VESTA (vesta)
  // =====================================================
  {
    id: 'vesta-to',
    modelId: 'vesta',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного, воздушного и салонного фильтров',
    laborPrice: 1000,
    laborHours: 0.5,
    difficulty: 'easy',
    clarifications: [
      { question: 'Какой двигатель?', field: 'engine', options: ['1.6 л', '1.8 л'] },
    ],
    parts: [
      {
        name: 'Моторное масло 5W-30 (4.4 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 2400, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Shell Helix HX8', article: '550040744', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '21129-1012005',
        variants: [
          { brand: 'LADA Original', article: '21129-1012005', price: 275, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'W71945', price: 520, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '21800-1109013',
        variants: [
          { brand: 'LADA Original', article: '21800-1109013', price: 400, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'C25014', price: 620, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Фильтр салонный',
        article: '8450006839',
        variants: [
          { brand: 'LADA Original', article: '8450006839', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'CU2131', price: 680, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 3425, includes: ['масло 4.4л', 'масляный фильтр', 'воздушный фильтр', 'салонный фильтр'] },
    ],
  },
  {
    id: 'vesta-brakes',
    modelId: 'vesta',
    category: 'brakes',
    name: 'Замена тормозных колодок и дисков',
    description: 'Замена передних тормозных колодок, при необходимости — дисков',
    laborPrice: 2000,
    laborHours: 1.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '8450006891',
        variants: [
          { brand: 'LADA Original', article: '8450006891', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'ATE', article: '—', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
          { brand: 'TRIALLI', article: '—', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Тормозной диск передний',
        article: '8450006875',
        variants: [
          { brand: 'LADA Original', article: '8450006875', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'TRIALLI', article: '—', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [
      { name: 'Передние колодки + диски LADA', price: 5400, includes: ['колодки 4 шт.', 'диски 2 шт.'] },
    ],
  },
  {
    id: 'vesta-clutch',
    modelId: 'vesta',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника сцепления',
    laborPrice: 5000,
    laborHours: 4,
    difficulty: 'hard',
    clarifications: [
      { question: 'Какой двигатель?', field: 'engine', options: ['1.6 л', '1.8 л'] },
      { question: 'Какая КПП?', field: 'transmission', options: ['МКПП', 'АМТ (робот)'] },
    ],
    parts: [
      {
        name: 'Корзина сцепления',
        article: '8450006987',
        variants: [
          { brand: 'LADA Original', article: '8450006987', price: 4250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '835053', price: 5800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Диск сцепления',
        article: '8450006988',
        variants: [
          { brand: 'LADA Original', article: '8450006988', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '835052', price: 3800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Выжимной подшипник',
        article: '8450006989',
        variants: [
          { brand: 'LADA Original', article: '8450006989', price: 1000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LuK', article: '500044610', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [
      { name: 'LADA Original комплект', price: 8750, includes: ['корзина', 'диск', 'выжимной'] },
      { name: 'Valeo полный комплект', price: 11100, includes: ['корзина', 'диск', 'выжимной'] },
      { name: 'Комплект LADA (Яндекс Маркет)', price: 7750, includes: ['корзина', 'диск', 'выжимной'] },
    ],
  },
  {
    id: 'vesta-suspension',
    modelId: 'vesta',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, стоек стабилизатора',
    laborPrice: 3000,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '8450006973',
        variants: [
          { brand: 'LADA Original', article: '8450006973', price: 5500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'SACHS', article: '—', price: 6200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Стойка стабилизатора',
        article: '8450006961',
        variants: [
          { brand: 'LADA Original', article: '8450006961', price: 750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LYNXauto', article: '—', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Передние амортизаторы LADA (2 шт.)', price: 11000, includes: ['амортизатор x2'] },
    ],
  },
  {
    id: 'vesta-engine',
    modelId: 'vesta',
    category: 'engine',
    name: 'Замена ремня ГРМ и роликов',
    description: 'Замена ремня привода ГРМ, натяжного ролика',
    laborPrice: 3500,
    laborHours: 2.5,
    difficulty: 'medium',
    clarifications: [
      { question: 'Какой двигатель?', field: 'engine', options: ['1.6 л (21129)', '1.8 л (21179)'] },
    ],
    parts: [
      {
        name: 'Ремень ГРМ (1.6)',
        article: '21129-1006040',
        variants: [
          { brand: 'Gates', article: '5631XS', price: 1784, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Sufix', article: '—', price: 1600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
          { brand: 'LYNXauto', article: '—', price: 1450, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ремень ГРМ (1.8)',
        article: '21179-1006040',
        variants: [
          { brand: 'Gates', article: '—', price: 1850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ролик натяжной ГРМ',
        article: '21129-1006120',
        variants: [
          { brand: 'LADA Original', article: '21129-1006120', price: 1150, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Gates комплект (ремень + ролик)', price: 2934, includes: ['ремень ГРМ', 'натяжной ролик'] },
    ],
  },

  // =====================================================
  // LADA NIVA (niva)
  // =====================================================
  {
    id: 'niva-to',
    modelId: 'niva',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного и воздушного фильтров',
    laborPrice: 1000,
    laborHours: 0.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Моторное масло 5W-30 (3.75 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 2000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Shell Helix HX8', article: '550040744', price: 2600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '21010-1012005',
        variants: [
          { brand: 'LADA Original', article: '21010-1012005', price: 215, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'W68/1', price: 380, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '21210-1109013',
        variants: [
          { brand: 'LADA Original', article: '21210-1109013', price: 325, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 2540, includes: ['масло 3.75л', 'масляный фильтр', 'воздушный фильтр'] },
    ],
  },
  {
    id: 'niva-brakes',
    modelId: 'niva',
    category: 'brakes',
    name: 'Замена тормозных колодок и дисков',
    description: 'Замена передних и задних тормозных колодок',
    laborPrice: 2000,
    laborHours: 1.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '21210-3501090',
        variants: [
          { brand: 'LADA Original', article: '21210-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'TRIALLI', article: '—', price: 400, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Задние тормозные колодки',
        article: '21010-3502090',
        variants: [
          { brand: 'LADA Original', article: '21010-3502090', price: 450, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Тормозной диск передний',
        article: '21210-3501070',
        variants: [
          { brand: 'LADA Original', article: '21210-3501070', price: 1600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Передние колодки + диски LADA', price: 3750, includes: ['колодки 4 шт.', 'диски 2 шт.'] },
    ],
  },
  {
    id: 'niva-clutch',
    modelId: 'niva',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника',
    laborPrice: 5500,
    laborHours: 4.5,
    difficulty: 'hard',
    parts: [
      {
        name: 'Корзина сцепления',
        article: '21210-1601085',
        variants: [
          { brand: 'LADA Original', article: '21210-1601085', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '835022', price: 4500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Диск сцепления',
        article: '21210-1601130',
        variants: [
          { brand: 'LADA Original', article: '21210-1601130', price: 2600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '—', price: 4000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
          { brand: 'HOLA', article: '—', price: 2500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Выжимной подшипник',
        article: '21210-1601182',
        variants: [
          { brand: 'LADA Original', article: '21210-1601182', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'LADA Original комплект', price: 6300, includes: ['корзина', 'диск', 'выжимной'] },
      { name: 'Valeo комплект', price: 9200, includes: ['корзина', 'диск', 'выжимной'] },
    ],
  },
  {
    id: 'niva-suspension',
    modelId: 'niva',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, шаровых опор',
    laborPrice: 3000,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '21210-2901068',
        variants: [
          { brand: 'LADA Original', article: '21210-2901068', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Амортизатор задний',
        article: '21210-2902068',
        variants: [
          { brand: 'LADA Original', article: '21210-2902068', price: 3100, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Шаровая опора',
        article: '21210-2904124',
        variants: [
          { brand: 'LADA Original', article: '21210-2904124', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'ТРЕК', article: '—', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [
      { name: 'Передние амортизаторы LADA (2 шт.)', price: 7000, includes: ['амортизатор x2'] },
    ],
  },
  {
    id: 'niva-engine',
    modelId: 'niva',
    category: 'engine',
    name: 'Замена цепи/ремня ГРМ',
    description: 'Замена цепи привода ГРМ, натяжителя, успокоителя',
    laborPrice: 4000,
    laborHours: 3,
    difficulty: 'hard',
    parts: [
      {
        name: 'Цепь привода ГРМ',
        article: '21214-1006040',
        variants: [
          { brand: 'LADA Original', article: '21214-1006040', price: 1100, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Morse', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Натяжитель цепи',
        article: '21214-1006135',
        variants: [
          { brand: 'LADA Original', article: '21214-1006135', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Комплект ГРМ LADA', price: 1700, includes: ['цепь', 'натяжитель'] },
    ],
  },

  // =====================================================
  // ВАЗ-2107 (2107) — Классика
  // =====================================================
  {
    id: '2107-to',
    modelId: '2107',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного и воздушного фильтров',
    laborPrice: 800,
    laborHours: 0.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Моторное масло 10W-40 (4 л)',
        article: '10W-40',
        variants: [
          { brand: 'Лукойл Стандарт', article: '153134', price: 1600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '21010-1012005',
        variants: [
          { brand: 'LADA Original', article: '21010-1012005', price: 175, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '21010-1109013',
        variants: [
          { brand: 'LADA Original', article: '21010-1109013', price: 265, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 2040, includes: ['масло 4л', 'масляный фильтр', 'воздушный фильтр'] },
    ],
  },
  {
    id: '2107-brakes',
    modelId: '2107',
    category: 'brakes',
    name: 'Замена тормозных колодок',
    description: 'Замена передних дисковых и задних барабанных колодок',
    laborPrice: 1500,
    laborHours: 1,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '21010-3501090',
        variants: [
          { brand: 'LADA Original', article: '21010-3501090', price: 450, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Pilenga', article: 'FDT2001', price: 289, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Transmaster', article: '—', price: 325, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Задние тормозные колодки',
        article: '21010-3502090',
        variants: [
          { brand: 'LADA Original', article: '21010-3502090', price: 375, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: '2107-clutch',
    modelId: '2107',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника',
    laborPrice: 4000,
    laborHours: 3,
    difficulty: 'hard',
    parts: [
      {
        name: 'Корзина сцепления',
        article: '21010-1601085',
        variants: [
          { brand: 'LADA Original', article: '21010-1601085', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '835001', price: 3800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Диск сцепления',
        article: '21010-1601130',
        variants: [
          { brand: 'LADA Original', article: '21010-1601130', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Выжимной подшипник',
        article: '21010-1601182',
        variants: [
          { brand: 'LADA Original', article: '21010-1601182', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'LADA Original комплект', price: 5450, includes: ['корзина', 'диск', 'выжимной'] },
      { name: 'Valeo комплект', price: 7200, includes: ['корзина', 'диск', 'выжимной'] },
    ],
  },
  {
    id: '2107-suspension',
    modelId: '2107',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, шаровых опор, рычагов',
    laborPrice: 2500,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '21010-2901068',
        variants: [
          { brand: 'LADA Original', article: '21010-2901068', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Амортизатор задний',
        article: '21010-2902068',
        variants: [
          { brand: 'LADA Original', article: '21010-2902068', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Шаровая опора верхняя',
        article: '21010-2904124',
        variants: [
          { brand: 'LADA Original', article: '21010-2904124', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Шаровая опора нижняя',
        article: '21010-2904126',
        variants: [
          { brand: 'LADA Original', article: '21010-2904126', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Передние амортизаторы LADA (2 шт.)', price: 5300, includes: ['амортизатор x2'] },
    ],
  },
  {
    id: '2107-engine',
    modelId: '2107',
    category: 'engine',
    name: 'Замена цепи привода ГРМ',
    description: 'Замена цепи, натяжителя и успокоителя',
    laborPrice: 3500,
    laborHours: 3,
    difficulty: 'hard',
    parts: [
      {
        name: 'Цепь привода ГРМ',
        article: '21010-1006040',
        variants: [
          { brand: 'LADA Original', article: '21010-1006040', price: 1150, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Натяжитель цепи',
        article: '21010-1006135',
        variants: [
          { brand: 'LADA Original', article: '21010-1006135', price: 400, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },

  // =====================================================
  // ВАЗ-2109 (2109) — Самара
  // =====================================================
  {
    id: '2109-to',
    modelId: '2109',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного, воздушного и салонного фильтров',
    laborPrice: 1000,
    laborHours: 0.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Моторное масло 5W-30 (3.5 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 1900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '21080-1012005',
        variants: [
          { brand: 'LADA Original', article: '21080-1012005', price: 185, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '21080-1109013',
        variants: [
          { brand: 'LADA Original', article: '21080-1109013', price: 290, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Фильтр салонный',
        article: '21080-8122068',
        variants: [
          { brand: 'LADA Original', article: '21080-8122068', price: 265, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 2640, includes: ['масло 3.5л', 'масляный фильтр', 'воздушный фильтр', 'салонный фильтр'] },
    ],
  },
  {
    id: '2109-brakes',
    modelId: '2109',
    category: 'brakes',
    name: 'Замена тормозных колодок и дисков',
    description: 'Замена передних колодок и дисков, задних колодок',
    laborPrice: 1800,
    laborHours: 1.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '21080-3501090',
        variants: [
          { brand: 'LADA Original', article: '21080-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Pilenga', article: 'FD-P2003', price: 375, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Тормозной диск передний',
        article: '21080-3501070',
        variants: [
          { brand: 'LADA Original', article: '21080-3501070', price: 1300, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Задние тормозные колодки',
        article: '21080-3502090',
        variants: [
          { brand: 'LADA Original', article: '21080-3502090', price: 375, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: '2109-clutch',
    modelId: '2109',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника',
    laborPrice: 4000,
    laborHours: 3,
    difficulty: 'hard',
    parts: [
      {
        name: 'Корзина сцепления',
        article: '21080-1601085',
        variants: [
          { brand: 'LADA Original', article: '21080-1601085', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Диск сцепления',
        article: '21080-1601130',
        variants: [
          { brand: 'LADA Original', article: '21080-1601130', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Выжимной подшипник',
        article: '21080-1601182',
        variants: [
          { brand: 'LADA Original', article: '21080-1601182', price: 575, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'LADA Original комплект', price: 5475, includes: ['корзина', 'диск', 'выжимной'] },
    ],
  },
  {
    id: '2109-suspension',
    modelId: '2109',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, стоек стабилизатора',
    laborPrice: 2500,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '21080-2901068',
        variants: [
          { brand: 'LADA Original', article: '21080-2901068', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Амортизатор задний',
        article: '21080-2902068',
        variants: [
          { brand: 'LADA Original', article: '21080-2902068', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Стойка стабилизатора',
        article: '21080-2906050',
        variants: [
          { brand: 'LADA Original', article: '21080-2906050', price: 500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Передние амортизаторы LADA (2 шт.)', price: 6000, includes: ['амортизатор x2'] },
    ],
  },
  {
    id: '2109-engine',
    modelId: '2109',
    category: 'engine',
    name: 'Замена ремня ГРМ и роликов',
    description: 'Замена ремня привода ГРМ, натяжного ролика',
    laborPrice: 2500,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Ремень ГРМ',
        article: '21080-1006040',
        variants: [
          { brand: 'Gates', article: '5521-1006040', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LYNXauto', article: '—', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LADA Original', article: '21080-1006040', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ролик натяжной ГРМ',
        article: '21080-1006120',
        variants: [
          { brand: 'LADA Original', article: '21080-1006120', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Gates комплект (ремень + ролик)', price: 1500, includes: ['ремень ГРМ', 'натяжной ролик'] },
    ],
  },

  // =====================================================
  // LADA XRAY (xray)
  // =====================================================
  {
    id: 'xray-to',
    modelId: 'xray',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного, воздушного и салонного фильтров',
    laborPrice: 1000,
    laborHours: 0.5,
    difficulty: 'easy',
    clarifications: [
      { question: 'Какой двигатель?', field: 'engine', options: ['1.6 л', '1.8 л'] },
    ],
    parts: [
      {
        name: 'Моторное масло 5W-30 (4.4 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 2400, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '8450006922',
        variants: [
          { brand: 'LADA Original', article: '8450006922', price: 300, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '8450006923',
        variants: [
          { brand: 'LADA Original', article: '8450006923', price: 425, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 3125, includes: ['масло 4.4л', 'масляный фильтр', 'воздушный фильтр'] },
    ],
  },
  {
    id: 'xray-brakes',
    modelId: 'xray',
    category: 'brakes',
    name: 'Замена тормозных колодок и дисков',
    description: 'Замена передних тормозных колодок и дисков',
    laborPrice: 2000,
    laborHours: 1.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '8450006891',
        variants: [
          { brand: 'LADA Original', article: '8450006891', price: 950, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Тормозной диск передний',
        article: '8450006875',
        variants: [
          { brand: 'LADA Original', article: '8450006875', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'xray-clutch',
    modelId: 'xray',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника',
    laborPrice: 5000,
    laborHours: 4,
    difficulty: 'hard',
    parts: [
      {
        name: 'Комплект сцепления',
        article: '8450006986',
        variants: [
          { brand: 'LADA Original', article: '8450006986', price: 8500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '—', price: 10500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'xray-suspension',
    modelId: 'xray',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, стоек стабилизатора',
    laborPrice: 3000,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '8450006973',
        variants: [
          { brand: 'LADA Original', article: '8450006973', price: 6250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'SACHS', article: '—', price: 7000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Стойка стабилизатора',
        article: '8450006961',
        variants: [
          { brand: 'LADA Original', article: '8450006961', price: 750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'xray-engine',
    modelId: 'xray',
    category: 'engine',
    name: 'Замена ремня ГРМ и роликов',
    description: 'Замена ремня привода ГРМ, натяжного ролика',
    laborPrice: 3500,
    laborHours: 2.5,
    difficulty: 'medium',
    clarifications: [
      { question: 'Какой двигатель?', field: 'engine', options: ['1.6 л (21129)', '1.8 л (21179)'] },
    ],
    parts: [
      {
        name: 'Ремень ГРМ (1.6)',
        article: '21129-1006040',
        variants: [
          { brand: 'Gates', article: '5631XS', price: 1600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ремень ГРМ (1.8)',
        article: '21179-1006040',
        variants: [
          { brand: 'Gates', article: '—', price: 1850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ролик натяжной ГРМ',
        article: '21129-1006120',
        variants: [
          { brand: 'LADA Original', article: '21129-1006120', price: 1150, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },

  // =====================================================
  // LADA PRIORA (priora)
  // =====================================================
  {
    id: 'priora-to',
    modelId: 'priora',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного и воздушного фильтров',
    laborPrice: 1000,
    laborHours: 0.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Моторное масло 5W-30 (4 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 2200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '21120-1012005',
        variants: [
          { brand: 'LADA Original', article: '21120-1012005', price: 215, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '21120-1109013',
        variants: [
          { brand: 'LADA Original', article: '21120-1109013', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 2765, includes: ['масло 4л', 'масляный фильтр', 'воздушный фильтр'] },
    ],
  },
  {
    id: 'priora-brakes',
    modelId: 'priora',
    category: 'brakes',
    name: 'Замена тормозных колодок и дисков',
    description: 'Замена передних колодок и дисков',
    laborPrice: 1800,
    laborHours: 1.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '21120-3501090',
        variants: [
          { brand: 'LADA Original', article: '21120-3501090', price: 675, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Тормозной диск передний',
        article: '21120-3501070',
        variants: [
          { brand: 'LADA Original', article: '21120-3501070', price: 1750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'priora-clutch',
    modelId: 'priora',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника',
    laborPrice: 4500,
    laborHours: 3.5,
    difficulty: 'hard',
    parts: [
      {
        name: 'Комплект сцепления',
        article: '21120-1601000',
        variants: [
          { brand: 'LADA Original', article: '21120-1601000', price: 5750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '—', price: 7500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Выжимной подшипник',
        article: '21120-1601182',
        variants: [
          { brand: 'LADA Original', article: '21120-1601182', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'priora-suspension',
    modelId: 'priora',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, рычагов',
    laborPrice: 3000,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '21120-2901068',
        variants: [
          { brand: 'LADA Original', article: '21120-2901068', price: 4250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Рычаг передний',
        article: '21120-2904054',
        variants: [
          { brand: 'LADA Original', article: '21120-2904054', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'priora-engine',
    modelId: 'priora',
    category: 'engine',
    name: 'Замена ремня ГРМ и роликов',
    description: 'Замена ремня привода ГРМ, натяжного ролика',
    laborPrice: 3000,
    laborHours: 2.5,
    difficulty: 'medium',
    parts: [
      {
        name: 'Ремень ГРМ',
        article: '21120-1006040',
        variants: [
          { brand: 'Gates', article: '5631XS', price: 1050, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LADA Original', article: '21120-1006040', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ролик натяжной ГРМ',
        article: '21120-1006120',
        variants: [
          { brand: 'LADA Original', article: '21120-1006120', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },

  // =====================================================
  // LADA KALINA (kalina)
  // =====================================================
  {
    id: 'kalina-to',
    modelId: 'kalina',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного и воздушного фильтров',
    laborPrice: 1000,
    laborHours: 0.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Моторное масло 5W-30 (3.5 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 1900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '11180-1012005',
        variants: [
          { brand: 'LADA Original', article: '11180-1012005', price: 190, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '11180-1109013',
        variants: [
          { brand: 'LADA Original', article: '11180-1109013', price: 300, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект LADA + Лукойл', price: 2390, includes: ['масло 3.5л', 'масляный фильтр', 'воздушный фильтр'] },
    ],
  },
  {
    id: 'kalina-brakes',
    modelId: 'kalina',
    category: 'brakes',
    name: 'Замена тормозных колодок',
    description: 'Замена передних и задних тормозных колодок',
    laborPrice: 1800,
    laborHours: 1.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '11180-3501090',
        variants: [
          { brand: 'LADA Original', article: '11180-3501090', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Задние тормозные колодки',
        article: '11180-3502090',
        variants: [
          { brand: 'LADA Original', article: '11180-3502090', price: 450, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'kalina-clutch',
    modelId: 'kalina',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника',
    laborPrice: 4000,
    laborHours: 3,
    difficulty: 'hard',
    parts: [
      {
        name: 'Комплект сцепления',
        article: '11180-1601000',
        variants: [
          { brand: 'LADA Original', article: '11180-1601000', price: 5000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'kalina-suspension',
    modelId: 'kalina',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, стоек стабилизатора',
    laborPrice: 2500,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '11180-2901068',
        variants: [
          { brand: 'LADA Original', article: '11180-2901068', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Стойка стабилизатора',
        article: '11180-2906050',
        variants: [
          { brand: 'LADA Original', article: '11180-2906050', price: 500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'kalina-engine',
    modelId: 'kalina',
    category: 'engine',
    name: 'Замена ремня ГРМ и роликов',
    description: 'Замена ремня привода ГРМ, натяжного ролика',
    laborPrice: 2500,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Ремень ГРМ',
        article: '11180-1006040',
        variants: [
          { brand: 'Gates', article: '5521-1006040', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'LADA Original', article: '11180-1006040', price: 750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ролик натяжной ГРМ',
        article: '11180-1006120',
        variants: [
          { brand: 'LADA Original', article: '11180-1006120', price: 750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },

  // =====================================================
  // LADA LARGUS (largus) — на базе Renault
  // =====================================================
  {
    id: 'largus-to',
    modelId: 'largus',
    category: 'to',
    name: 'Замена масла и фильтров (ТО)',
    description: 'Замена моторного масла, масляного, воздушного и салонного фильтров',
    laborPrice: 1200,
    laborHours: 0.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Моторное масло 5W-30 (5 л)',
        article: '5W-30',
        variants: [
          { brand: 'Лукойл Genesis', article: '153134', price: 2800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Elf Evolution', article: '—', price: 3200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Масляный фильтр',
        article: '16400-0Q010',
        variants: [
          { brand: 'Renault Original', article: '16400-0Q010', price: 450, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'MANN-FILTER', article: 'W71294', price: 520, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Воздушный фильтр',
        article: '16546-0Q010',
        variants: [
          { brand: 'Renault Original', article: '16546-0Q010', price: 500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'ТО-комплект Renault + Лукойл', price: 3750, includes: ['масло 5л', 'масляный фильтр', 'воздушный фильтр'] },
    ],
  },
  {
    id: 'largus-brakes',
    modelId: 'largus',
    category: 'brakes',
    name: 'Замена тормозных колодок и дисков',
    description: 'Замена передних и задних тормозных колодок, дисков',
    laborPrice: 2000,
    laborHours: 1.5,
    difficulty: 'easy',
    parts: [
      {
        name: 'Передние тормозные колодки',
        article: '7701207066',
        variants: [
          { brand: 'Renault Original', article: '7701207066', price: 950, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'TRW', article: 'GDB1978', price: 1100, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Задние тормозные колодки',
        article: '7701207068',
        variants: [
          { brand: 'Renault Original', article: '7701207068', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Тормозной диск передний',
        article: '7701207009',
        variants: [
          { brand: 'Renault Original', article: '7701207009', price: 2350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'largus-clutch',
    modelId: 'largus',
    category: 'clutch',
    name: 'Замена комплекта сцепления',
    description: 'Замена корзины, диска и выжимного подшипника',
    laborPrice: 5000,
    laborHours: 4,
    difficulty: 'hard',
    parts: [
      {
        name: 'Комплект сцепления',
        article: '302051496R',
        variants: [
          { brand: 'Renault Original', article: '302051496R', price: 7750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
          { brand: 'Valeo', article: '835053', price: 6500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
      {
        name: 'Диск сцепления',
        article: '302051498R',
        variants: [
          { brand: 'Valeo', article: '302051498R', price: 4250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'largus-suspension',
    modelId: 'largus',
    category: 'suspension',
    name: 'Замена элементов подвески',
    description: 'Замена амортизаторов, рычагов',
    laborPrice: 3000,
    laborHours: 2,
    difficulty: 'medium',
    parts: [
      {
        name: 'Амортизатор передний',
        article: '8200265008',
        variants: [
          { brand: 'Renault Original', article: '8200265008', price: 5750, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Амортизатор задний',
        article: '8200265009',
        variants: [
          { brand: 'Renault Original', article: '8200265009', price: 5000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Рычаг передний',
        article: '545009758R',
        variants: [
          { brand: 'Renault Original', article: '545009758R', price: 4500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [],
  },
  {
    id: 'largus-engine',
    modelId: 'largus',
    category: 'engine',
    name: 'Замена ремня ГРМ и роликов',
    description: 'Замена ремня привода ГРМ, натяжного ролика',
    laborPrice: 4000,
    laborHours: 3,
    difficulty: 'medium',
    parts: [
      {
        name: 'Ремень ГРМ',
        article: '130C17529R',
        variants: [
          { brand: 'Gates', article: '130C17529R', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
      {
        name: 'Ролик натяжной ГРМ',
        article: '130C11591R',
        variants: [
          { brand: 'Renault Original', article: '130C11591R', price: 1600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
        ],
      },
    ],
    kits: [
      { name: 'Gates комплект (ремень + ролик)', price: 3850, includes: ['ремень ГРМ', 'натяжной ролик'] },
    ],
  },

  // =====================================================
  // ВАЗ-2110, 2112, 2114, 2115 — на базе 2109
  // =====================================================
  {
    id: '2110-to', modelId: '2110', category: 'to', name: 'Замена масла и фильтров (ТО)', description: 'Замена моторного масла, масляного и воздушного фильтров', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy',
    parts: [
      { name: 'Моторное масло 5W-30 (3.5 л)', article: '5W-30', variants: [{ brand: 'Лукойл Genesis', article: '153134', price: 1900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
      { name: 'Масляный фильтр', article: '21080-1012005', variants: [{ brand: 'LADA Original', article: '21080-1012005', price: 185, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
      { name: 'Воздушный фильтр', article: '21080-1109013', variants: [{ brand: 'LADA Original', article: '21080-1109013', price: 290, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
    ], kits: [] },
  {
    id: '2110-brakes', modelId: '2110', category: 'brakes', name: 'Замена тормозных колодок', description: 'Замена передних тормозных колодок', laborPrice: 1800, laborHours: 1.5, difficulty: 'easy',
    parts: [
      { name: 'Передние тормозные колодки', article: '21080-3501090', variants: [{ brand: 'LADA Original', article: '21080-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
    ], kits: [] },
  {
    id: '2110-clutch', modelId: '2110', category: 'clutch', name: 'Замена комплекта сцепления', description: 'Замена корзины, диска и выжимного подшипника', laborPrice: 4000, laborHours: 3, difficulty: 'hard',
    parts: [
      { name: 'Корзина сцепления', article: '21080-1601085', variants: [{ brand: 'LADA Original', article: '21080-1601085', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
      { name: 'Диск сцепления', article: '21080-1601130', variants: [{ brand: 'LADA Original', article: '21080-1601130', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
      { name: 'Выжимной подшипник', article: '21080-1601182', variants: [{ brand: 'LADA Original', article: '21080-1601182', price: 575, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
    ], kits: [{ name: 'LADA Original комплект', price: 5475, includes: ['корзина', 'диск', 'выжимной'] }] },
  {
    id: '2110-suspension', modelId: '2110', category: 'suspension', name: 'Замена элементов подвески', description: 'Замена амортизаторов', laborPrice: 2500, laborHours: 2, difficulty: 'medium',
    parts: [
      { name: 'Амортизатор передний', article: '21080-2901068', variants: [{ brand: 'LADA Original', article: '21080-2901068', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
    ], kits: [] },
  {
    id: '2110-engine', modelId: '2110', category: 'engine', name: 'Замена ремня ГРМ', description: 'Замена ремня привода ГРМ', laborPrice: 2500, laborHours: 2, difficulty: 'medium',
    parts: [
      { name: 'Ремень ГРМ', article: '21080-1006040', variants: [{ brand: 'Gates', article: '5521-1006040', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] },
    ], kits: [] },

  // 2112 (та же база)
  { id: '2112-to', modelId: '2112', category: 'to', name: 'Замена масла и фильтров (ТО)', description: 'Замена моторного масла, масляного и воздушного фильтров', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [{ name: 'Моторное масло 5W-30 (3.5 л)', article: '5W-30', variants: [{ brand: 'Лукойл Genesis', article: '153134', price: 1900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Масляный фильтр', article: '21080-1012005', variants: [{ brand: 'LADA Original', article: '21080-1012005', price: 185, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2112-brakes', modelId: '2112', category: 'brakes', name: 'Замена тормозных колодок', description: 'Замена передних тормозных колодок', laborPrice: 1800, laborHours: 1.5, difficulty: 'easy', parts: [{ name: 'Передние тормозные колодки', article: '21080-3501090', variants: [{ brand: 'LADA Original', article: '21080-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2112-clutch', modelId: '2112', category: 'clutch', name: 'Замена комплекта сцепления', description: 'Замена корзины, диска и выжимного подшипника', laborPrice: 4000, laborHours: 3, difficulty: 'hard', parts: [{ name: 'Корзина сцепления', article: '21080-1601085', variants: [{ brand: 'LADA Original', article: '21080-1601085', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Диск сцепления', article: '21080-1601130', variants: [{ brand: 'LADA Original', article: '21080-1601130', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [{ name: 'LADA Original комплект', price: 5475, includes: ['корзина', 'диск', 'выжимной'] }] },
  { id: '2112-suspension', modelId: '2112', category: 'suspension', name: 'Замена элементов подвески', description: 'Замена амортизаторов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Амортизатор передний', article: '21080-2901068', variants: [{ brand: 'LADA Original', article: '21080-2901068', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2112-engine', modelId: '2112', category: 'engine', name: 'Замена ремня ГРМ', description: 'Замена ремня привода ГРМ', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Ремень ГРМ', article: '21080-1006040', variants: [{ brand: 'Gates', article: '5521-1006040', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },

  // 2114 (та же база)
  { id: '2114-to', modelId: '2114', category: 'to', name: 'Замена масла и фильтров (ТО)', description: 'Замена моторного масла, масляного и воздушного фильтров', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [{ name: 'Моторное масло 5W-30 (3.5 л)', article: '5W-30', variants: [{ brand: 'Лукойл Genesis', article: '153134', price: 1900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Масляный фильтр', article: '21080-1012005', variants: [{ brand: 'LADA Original', article: '21080-1012005', price: 185, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2114-brakes', modelId: '2114', category: 'brakes', name: 'Замена тормозных колодок', description: 'Замена передних тормозных колодок', laborPrice: 1800, laborHours: 1.5, difficulty: 'easy', parts: [{ name: 'Передние тормозные колодки', article: '21080-3501090', variants: [{ brand: 'LADA Original', article: '21080-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2114-clutch', modelId: '2114', category: 'clutch', name: 'Замена комплекта сцепления', description: 'Замена корзины, диска и выжимного подшипника', laborPrice: 4000, laborHours: 3, difficulty: 'hard', parts: [{ name: 'Корзина сцепления', article: '21080-1601085', variants: [{ brand: 'LADA Original', article: '21080-1601085', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Диск сцепления', article: '21080-1601130', variants: [{ brand: 'LADA Original', article: '21080-1601130', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2114-suspension', modelId: '2114', category: 'suspension', name: 'Замена элементов подвески', description: 'Замена амортизаторов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Амортизатор передний', article: '21080-2901068', variants: [{ brand: 'LADA Original', article: '21080-2901068', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2114-engine', modelId: '2114', category: 'engine', name: 'Замена ремня ГРМ', description: 'Замена ремня привода ГРМ', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Ремень ГРМ', article: '21080-1006040', variants: [{ brand: 'Gates', article: '5521-1006040', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },

  // 2115 (та же база)
  { id: '2115-to', modelId: '2115', category: 'to', name: 'Замена масла и фильтров (ТО)', description: 'Замена моторного масла, масляного и воздушного фильтров', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [{ name: 'Моторное масло 5W-30 (3.5 л)', article: '5W-30', variants: [{ brand: 'Лукойл Genesis', article: '153134', price: 1900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Масляный фильтр', article: '21080-1012005', variants: [{ brand: 'LADA Original', article: '21080-1012005', price: 185, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2115-brakes', modelId: '2115', category: 'brakes', name: 'Замена тормозных колодок', description: 'Замена передних тормозных колодок', laborPrice: 1800, laborHours: 1.5, difficulty: 'easy', parts: [{ name: 'Передние тормозные колодки', article: '21080-3501090', variants: [{ brand: 'LADA Original', article: '21080-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2115-clutch', modelId: '2115', category: 'clutch', name: 'Замена комплекта сцепления', description: 'Замена корзины, диска и выжимного подшипника', laborPrice: 4000, laborHours: 3, difficulty: 'hard', parts: [{ name: 'Корзина сцепления', article: '21080-1601085', variants: [{ brand: 'LADA Original', article: '21080-1601085', price: 2650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Диск сцепления', article: '21080-1601130', variants: [{ brand: 'LADA Original', article: '21080-1601130', price: 2250, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2115-suspension', modelId: '2115', category: 'suspension', name: 'Замена элементов подвески', description: 'Замена амортизаторов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Амортизатор передний', article: '21080-2901068', variants: [{ brand: 'LADA Original', article: '21080-2901068', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2115-engine', modelId: '2115', category: 'engine', name: 'Замена ремня ГРМ', description: 'Замена ремня привода ГРМ', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Ремень ГРМ', article: '21080-1006040', variants: [{ brand: 'Gates', article: '5521-1006040', price: 850, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },

  // 2121 — Нива (та же база что niva)
  { id: '2121-to', modelId: '2121', category: 'to', name: 'Замена масла и фильтров (ТО)', description: 'Замена моторного масла, масляного и воздушного фильтров', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [{ name: 'Моторное масло 5W-30 (3.75 л)', article: '5W-30', variants: [{ brand: 'Лукойл Genesis', article: '153134', price: 2000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Масляный фильтр', article: '21010-1012005', variants: [{ brand: 'LADA Original', article: '21010-1012005', price: 215, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2121-brakes', modelId: '2121', category: 'brakes', name: 'Замена тормозных колодок', description: 'Замена передних тормозных колодок', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [{ name: 'Передние тормозные колодки', article: '21210-3501090', variants: [{ brand: 'LADA Original', article: '21210-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2121-clutch', modelId: '2121', category: 'clutch', name: 'Замена комплекта сцепления', description: 'Замена корзины, диска и выжимного подшипника', laborPrice: 5500, laborHours: 4.5, difficulty: 'hard', parts: [{ name: 'Корзина сцепления', article: '21210-1601085', variants: [{ brand: 'LADA Original', article: '21210-1601085', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Диск сцепления', article: '21210-1601130', variants: [{ brand: 'LADA Original', article: '21210-1601130', price: 2600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [{ name: 'LADA Original комплект', price: 6300, includes: ['корзина', 'диск', 'выжимной'] }] },
  { id: '2121-suspension', modelId: '2121', category: 'suspension', name: 'Замена элементов подвески', description: 'Замена амортизаторов', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Амортизатор передний', article: '21210-2901068', variants: [{ brand: 'LADA Original', article: '21210-2901068', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: '2121-engine', modelId: '2121', category: 'engine', name: 'Замена цепи привода ГРМ', description: 'Замена цепи, натяжителя', laborPrice: 4000, laborHours: 3, difficulty: 'hard', parts: [{ name: 'Цепь привода ГРМ', article: '21214-1006040', variants: [{ brand: 'LADA Original', article: '21214-1006040', price: 1100, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },

  // =====================================================
  // Niva Travel (niva-travel) — на базе Niva
  // =====================================================
  { id: 'niva-travel-to', modelId: 'niva-travel', category: 'to', name: 'Замена масла и фильтров (ТО)', description: 'Замена моторного масла, масляного и воздушного фильтров', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [{ name: 'Моторное масло 5W-30 (3.75 л)', article: '5W-30', variants: [{ brand: 'Лукойл Genesis', article: '153134', price: 2000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Масляный фильтр', article: '21010-1012005', variants: [{ brand: 'LADA Original', article: '21010-1012005', price: 215, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: 'niva-travel-brakes', modelId: 'niva-travel', category: 'brakes', name: 'Замена тормозных колодок', description: 'Замена передних тормозных колодок', laborPrice: 2000, laborHours: 1.5, difficulty: 'easy', parts: [{ name: 'Передние тормозные колодки', article: '21210-3501090', variants: [{ brand: 'LADA Original', article: '21210-3501090', price: 525, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: 'niva-travel-clutch', modelId: 'niva-travel', category: 'clutch', name: 'Замена комплекта сцепления', description: 'Замена корзины, диска и выжимного подшипника', laborPrice: 5500, laborHours: 4.5, difficulty: 'hard', parts: [{ name: 'Корзина сцепления', article: '21210-1601085', variants: [{ brand: 'LADA Original', article: '21210-1601085', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Диск сцепления', article: '21210-1601130', variants: [{ brand: 'LADA Original', article: '21210-1601130', price: 2600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [{ name: 'LADA Original комплект', price: 6300, includes: ['корзина', 'диск', 'выжимной'] }] },
  { id: 'niva-travel-suspension', modelId: 'niva-travel', category: 'suspension', name: 'Замена элементов подвески', description: 'Замена амортизаторов', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Амортизатор передний', article: '21210-2901068', variants: [{ brand: 'LADA Original', article: '21210-2901068', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: 'niva-travel-engine', modelId: 'niva-travel', category: 'engine', name: 'Замена цепи привода ГРМ', description: 'Замена цепи, натяжителя', laborPrice: 4000, laborHours: 3, difficulty: 'hard', parts: [{ name: 'Цепь привода ГРМ', article: '21214-1006040', variants: [{ brand: 'LADA Original', article: '21214-1006040', price: 1100, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },

  // =====================================================
  // Kalina-2 (kalina-2) — на базе Kalina
  // =====================================================
  { id: 'kalina-2-to', modelId: 'kalina-2', category: 'to', name: 'Замена масла и фильтров (ТО)', description: 'Замена моторного масла, масляного и воздушного фильтров', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [{ name: 'Моторное масло 5W-30 (3.5 л)', article: '5W-30', variants: [{ brand: 'Лукойл Genesis', article: '153134', price: 1900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }, { name: 'Масляный фильтр', article: '11180-1012005', variants: [{ brand: 'LADA Original', article: '11180-1012005', price: 190, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: 'kalina-2-brakes', modelId: 'kalina-2', category: 'brakes', name: 'Замена тормозных колодок', description: 'Замена передних тормозных колодок', laborPrice: 1800, laborHours: 1.5, difficulty: 'easy', parts: [{ name: 'Передние тормозные колодки', article: '11180-3501090', variants: [{ brand: 'LADA Original', article: '11180-3501090', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: 'kalina-2-clutch', modelId: 'kalina-2', category: 'clutch', name: 'Замена комплекта сцепления', description: 'Замена корзины, диска и выжимного подшипника', laborPrice: 4000, laborHours: 3, difficulty: 'hard', parts: [{ name: 'Комплект сцепления', article: '11180-1601000', variants: [{ brand: 'LADA Original', article: '11180-1601000', price: 5000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: 'kalina-2-suspension', modelId: 'kalina-2', category: 'suspension', name: 'Замена элементов подвески', description: 'Замена амортизаторов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Амортизатор передний', article: '11180-2901068', variants: [{ brand: 'LADA Original', article: '11180-2901068', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },
  { id: 'kalina-2-engine', modelId: 'kalina-2', category: 'engine', name: 'Замена ремня ГРМ', description: 'Замена ремня привода ГРМ', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [{ name: 'Ремень ГРМ', article: '11180-1006040', variants: [{ brand: 'Gates', article: '5521-1006040', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 }] }], kits: [] },

  // =====================================================
  // РАСШИРЕННЫЕ РАБОТЫ — ТО (свечи, ОЖ, тормозная жидкость, ремень навесного)
  // =====================================================

  // --- GRANTA ---
  { id: 'granta-spark', modelId: 'granta', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 500, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: 'А17ДВРМ', variants: [
      { brand: 'ЗАЗС', article: 'А17ДВРМ', price: 275, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'NGK', article: 'BCPR6ES', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'granta-brake-fluid', modelId: 'granta', category: 'to', name: 'Замена тормозной жидкости', description: 'Замена тормозной жидкости с прокачкой', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Тормозная жидкость DOT-4 (1 л)', article: 'DOT-4', variants: [
      { brand: 'ROS DOT-4', article: '—', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'Castrol React DOT-4', article: '—', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'granta-coolant', modelId: 'granta', category: 'to', name: 'Замена антифриза (ОЖ)', description: 'Замена охлаждающей жидкости', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Антифриз G12+ (5 л)', article: 'G12+', variants: [
      { brand: 'Sintec G12+', article: '—', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'Luxe G12+', article: '—', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'granta-belt-aux', modelId: 'granta', category: 'to', name: 'Замена ремня навесного оборудования', description: 'Замена приводного ремня навесного оборудования', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Ремень приводной', article: '6PK1115', variants: [
      { brand: 'Gates', article: '6PK1115', price: 950, source: 'ЯӖндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'LADA Original', article: '21900-1041020', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- VESTA ---
  { id: 'vesta-spark', modelId: 'vesta', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 600, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: '—', variants: [
      { brand: 'NGK', article: 'BCPR6ES', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'DENSO', article: 'K20TT', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'vesta-brake-fluid', modelId: 'vesta', category: 'to', name: 'Замена тормозной жидкости', description: 'Замена тормозной жидкости с прокачкой', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Тормозная жидкость DOT-4 (1 л)', article: 'DOT-4', variants: [
      { brand: 'ROS DOT-4', article: '—', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'Castrol React DOT-4', article: '—', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'vesta-coolant', modelId: 'vesta', category: 'to', name: 'Замена антифриза (ОЖ)', description: 'Замена охлаждающей жидкости', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Антифриз G12+ (5 л)', article: 'G12+', variants: [
      { brand: 'Sintec G12+', article: '—', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'vesta-belt-aux', modelId: 'vesta', category: 'to', name: 'Замена ремня навесного оборудования', description: 'Замена приводного ремня', laborPrice: 1200, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Ремень приводной', article: '6PK1115', variants: [
      { brand: 'Gates', article: '6PK1115', price: 1100, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- NIVA ---
  { id: 'niva-spark', modelId: 'niva', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 500, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: 'А17ДВРМ', variants: [
      { brand: 'ЗАЗС', article: 'А17ДВРМ', price: 275, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'niva-brake-fluid', modelId: 'niva', category: 'to', name: 'Замена тормозной жидкости', description: 'Замена тормозной жидкости с прокачкой', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Тормозная жидкость DOT-4 (1 л)', article: 'DOT-4', variants: [
      { brand: 'ROS DOT-4', article: '—', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'niva-coolant', modelId: 'niva', category: 'to', name: 'Замена антифриза (ОЖ)', description: 'Замена охлаждающей жидкости', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Антифриз G12+ (5 л)', article: 'G12+', variants: [
      { brand: 'Sintec G12+', article: '—', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2107 ---
  { id: '2107-spark', modelId: '2107', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 400, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: 'А17ДВРМ', variants: [
      { brand: 'ЗАЗС', article: 'А17ДВРМ', price: 230, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: '2107-brake-fluid', modelId: '2107', category: 'to', name: 'Замена тормозной жидкости', description: 'Замена тормозной жидкости с прокачкой', laborPrice: 1200, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Тормозная жидкость DOT-4 (1 л)', article: 'DOT-4', variants: [
      { brand: 'ROS DOT-4', article: '—', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2109 ---
  { id: '2109-spark', modelId: '2109', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 400, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: 'А17ДВРМ', variants: [
      { brand: 'ЗАЗС', article: 'А17ДВРМ', price: 230, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: '2109-brake-fluid', modelId: '2109', category: 'to', name: 'Замена тормозной жидкости', description: 'Замена тормозной жидкости с прокачкой', laborPrice: 1200, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Тормозная жидкость DOT-4 (1 л)', article: 'DOT-4', variants: [
      { brand: 'ROS DOT-4', article: '—', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- XRAY ---
  { id: 'xray-spark', modelId: 'xray', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 600, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: '—', variants: [
      { brand: 'NGK', article: 'BCPR6ES', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'xray-brake-fluid', modelId: 'xray', category: 'to', name: 'Замена тормозной жидкости', description: 'Замена тормозной жидкости с прокачкой', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Тормозная жидкость DOT-4 (1 л)', article: 'DOT-4', variants: [
      { brand: 'ROS DOT-4', article: '—', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- PRIORA ---
  { id: 'priora-spark', modelId: 'priora', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 500, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: 'А17ДВРМ', variants: [
      { brand: 'ЗАЗС', article: 'А17ДВРМ', price: 275, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'priora-brake-fluid', modelId: 'priora', category: 'to', name: 'Замена тормозной жидкости', description: 'Замена тормозной жидкости с прокачкой', laborPrice: 1500, laborHours: 1, difficulty: 'easy', parts: [
    { name: 'Тормозная жидкость DOT-4 (1 л)', article: 'DOT-4', variants: [
      { brand: 'ROS DOT-4', article: '—', price: 350, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- KALINA ---
  { id: 'kalina-spark', modelId: 'kalina', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 400, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: 'А17ДВРМ', variants: [
      { brand: 'ЗАЗС', article: 'А17ДВРМ', price: 275, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- LARGUS ---
  { id: 'largus-spark', modelId: 'largus', category: 'to', name: 'Замена свечей зажигания', description: 'Замена свечей зажигания (4 шт.)', laborPrice: 600, laborHours: 0.3, difficulty: 'easy', parts: [
    { name: 'Свечи зажигания (компл. 4 шт.)', article: '—', variants: [
      { brand: 'NGK', article: 'BCPR6ES', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // =====================================================
  // РАСШИРЕННЫЕ РАБОТЫ — ТОРМОЗА (суппорта, тросы ручника, прокачка)
  // =====================================================

  // --- GRANTA ---
  { id: 'granta-caliper', modelId: 'granta', category: 'brakes', name: 'Замена тормозных суппортов', description: 'Замена передних тормозных суппортов', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Суппорт передний (2 шт.)', article: '21900-3501012', variants: [
      { brand: 'LADA Original', article: '21900-3501012', price: 4500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
      { brand: 'TRIALLI', article: '—', price: 3200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 3 },
    ]},
  ], kits: [] },
  { id: 'granta-handbrake', modelId: 'granta', category: 'brakes', name: 'Замена тросов ручника', description: 'Замена тросов стояночного тормоза', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Трос ручника (комплект)', article: '21900-3508030', variants: [
      { brand: 'LADA Original', article: '21900-3508030', price: 1800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- VESTA ---
  { id: 'vesta-caliper', modelId: 'vesta', category: 'brakes', name: 'Замена тормозных суппортов', description: 'Замена передних тормозных суппортов', laborPrice: 3500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Суппорт передний (2 шт.)', article: '8450006871', variants: [
      { brand: 'LADA Original', article: '8450006871', price: 5500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },

  // --- NIVA ---
  { id: 'niva-caliper', modelId: 'niva', category: 'brakes', name: 'Замена тормозных суппортов', description: 'Замена передних тормозных суппортов', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Суппорт передний (2 шт.)', article: '21210-3501012', variants: [
      { brand: 'LADA Original', article: '21210-3501012', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },

  // --- 2107 ---
  { id: '2107-caliper', modelId: '2107', category: 'brakes', name: 'Замена тормозных суппортов', description: 'Замена передних тормозных суппортов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Суппорт передний (2 шт.)', article: '21010-3501012', variants: [
      { brand: 'LADA Original', article: '21010-3501012', price: 2800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },

  // --- 2109 ---
  { id: '2109-caliper', modelId: '2109', category: 'brakes', name: 'Замена тормозных суппортов', description: 'Замена передних тормозных суппортов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Суппорт передний (2 шт.)', article: '21080-3501012', variants: [
      { brand: 'LADA Original', article: '21080-3501012', price: 3000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },

  // =====================================================
  // РАСШИРЕННЫЕ РАБОТЫ — ПОДВЕСКА (сайлентблоки, наконечники, ШРУС, ступицы, пружины)
  // =====================================================

  // --- GRANTA ---
  { id: 'granta-bushing', modelId: 'granta', category: 'suspension', name: 'Замена сайлентблоков рычагов', description: 'Замена передних сайлентблоков рычагов подвески', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '21900-2904054-BK', variants: [
      { brand: 'LADA Original', article: '21900-2904054', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'SS20', article: '—', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: 'granta-tie-rod', modelId: 'granta', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '21900-3401070', variants: [
      { brand: 'LADA Original', article: '21900-3401070', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'SS20', article: '—', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: 'granta-wheel-bearing', modelId: 'granta', category: 'suspension', name: 'Замена ступичного подшипника', description: 'Замена переднего ступичного подшипника', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Ступичный подшипник', article: '21900-3103020', variants: [
      { brand: 'LADA Original', article: '21900-3103020', price: 1800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'SKF', article: 'VKBA3596', price: 2800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: 'granta-cv-joint', modelId: 'granta', category: 'suspension', name: 'Замена ШРУСа (гранаты)', description: 'Замена наружного ШРУСа привода колеса', laborPrice: 3500, laborHours: 2.5, difficulty: 'hard', parts: [
    { name: 'ШРУС наружный', article: '21900-2215012', variants: [
      { brand: 'LADA Original', article: '21900-2215012', price: 2500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'ВИС', article: '—', price: 1800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },

  // --- VESTA ---
  { id: 'vesta-bushing', modelId: 'vesta', category: 'suspension', name: 'Замена сайлентблоков рычагов', description: 'Замена передних сайлентблоков', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '8450006963', variants: [
      { brand: 'LADA Original', article: '8450006963', price: 1000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'vesta-tie-rod', modelId: 'vesta', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '8450006955', variants: [
      { brand: 'LADA Original', article: '8450006955', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'vesta-wheel-bearing', modelId: 'vesta', category: 'suspension', name: 'Замена ступичного подшипника', description: 'Замена переднего ступичного подшипника', laborPrice: 3500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Ступичный подшипник', article: '8450006971', variants: [
      { brand: 'LADA Original', article: '8450006971', price: 2500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'vesta-cv-joint', modelId: 'vesta', category: 'suspension', name: 'Замена ШРУСа (гранаты)', description: 'Замена наружного ШРУСа', laborPrice: 4000, laborHours: 2.5, difficulty: 'hard', parts: [
    { name: 'ШРУС наружный', article: '8450006975', variants: [
      { brand: 'LADA Original', article: '8450006975', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- NIVA ---
  { id: 'niva-bushing', modelId: 'niva', category: 'suspension', name: 'Замена сайлентблоков', description: 'Замена сайлентблоков передних рычагов', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '21210-2904054-BK', variants: [
      { brand: 'LADA Original', article: '21210-2904054', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'niva-tie-rod', modelId: 'niva', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '21210-3401070', variants: [
      { brand: 'LADA Original', article: '21210-3401070', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'niva-cv-joint', modelId: 'niva', category: 'suspension', name: 'Замена ШРУСа (гранаты)', description: 'Замена наружного ШРУСа', laborPrice: 4000, laborHours: 2.5, difficulty: 'hard', parts: [
    { name: 'ШРУС наружный', article: '21210-2215012', variants: [
      { brand: 'LADA Original', article: '21210-2215012', price: 2200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2107 ---
  { id: '2107-bushing', modelId: '2107', category: 'suspension', name: 'Замена сайлентблоков', description: 'Замена сайлентблоков рычагов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '21010-2904054-BK', variants: [
      { brand: 'LADA Original', article: '21010-2904054', price: 500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: '2107-tie-rod', modelId: '2107', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 1500, laborHours: 1, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '21010-3401070', variants: [
      { brand: 'LADA Original', article: '21010-3401070', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2109 ---
  { id: '2109-bushing', modelId: '2109', category: 'suspension', name: 'Замена сайлентблоков', description: 'Замена сайлентблоков рычагов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '21080-2904054-BK', variants: [
      { brand: 'LADA Original', article: '21080-2904054', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: '2109-tie-rod', modelId: '2109', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 1500, laborHours: 1, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '21080-3401070', variants: [
      { brand: 'LADA Original', article: '21080-3401070', price: 650, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- XRAY ---
  { id: 'xray-bushing', modelId: 'xray', category: 'suspension', name: 'Замена сайлентблоков', description: 'Замена сайлентблоков рычагов', laborPrice: 3500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '8450006963', variants: [
      { brand: 'LADA Original', article: '8450006963', price: 1000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'xray-tie-rod', modelId: 'xray', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 2500, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '8450006955', variants: [
      { brand: 'LADA Original', article: '8450006955', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- PRIORA ---
  { id: 'priora-bushing', modelId: 'priora', category: 'suspension', name: 'Замена сайлентблоков', description: 'Замена сайлентблоков рычагов', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '21120-2904054-BK', variants: [
      { brand: 'LADA Original', article: '21120-2904054', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'priora-tie-rod', modelId: 'priora', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '21120-3401070', variants: [
      { brand: 'LADA Original', article: '21120-3401070', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- KALINA ---
  { id: 'kalina-bushing', modelId: 'kalina', category: 'suspension', name: 'Замена сайлентблоков', description: 'Замена сайлентблоков рычагов', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '11180-2904054-BK', variants: [
      { brand: 'LADA Original', article: '11180-2904054', price: 550, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'kalina-tie-rod', modelId: 'kalina', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 1500, laborHours: 1, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '11180-3401070', variants: [
      { brand: 'LADA Original', article: '11180-3401070', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- LARGUS ---
  { id: 'largus-bushing', modelId: 'largus', category: 'suspension', name: 'Замена сайлентблоков', description: 'Замена сайлентблоков рычагов', laborPrice: 3500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Сайлентблок рычага (комплект)', article: '545009758R-BK', variants: [
      { brand: 'Renault Original', article: '545009758R', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'largus-tie-rod', modelId: 'largus', category: 'suspension', name: 'Замена рулевых наконечников', description: 'Замена рулевых наконечников (2 шт.)', laborPrice: 2500, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Рулевой наконечник (2 шт.)', article: '8200265010', variants: [
      { brand: 'Renault Original', article: '8200265010', price: 1000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // =====================================================
  // РАСШИРЕННЫЕ РАБОТЫ — ДВИГАТЕЛЬ (помпа, термостат, цепь)
  // =====================================================

  // --- GRANTA ---
  { id: 'granta-water-pump', modelId: 'granta', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса системы охлаждения', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '21126-1307010', variants: [
      { brand: 'LADA Original', article: '21126-1307010', price: 2200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'LUZAR', article: '—', price: 1600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: 'granta-thermostat', modelId: 'granta', category: 'engine', name: 'Замена термостата', description: 'Замена термостата системы охлаждения', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '21900-1306010', variants: [
      { brand: 'LADA Original', article: '21900-1306010', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'LUZAR', article: '—', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },

  // --- VESTA ---
  { id: 'vesta-water-pump', modelId: 'vesta', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 3500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '21129-1307010', variants: [
      { brand: 'LADA Original', article: '21129-1307010', price: 2500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'LUZAR', article: '—', price: 1800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: 'vesta-thermostat', modelId: 'vesta', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 2500, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '8450006939', variants: [
      { brand: 'LADA Original', article: '8450006939', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- NIVA ---
  { id: 'niva-water-pump', modelId: 'niva', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '21214-1307010', variants: [
      { brand: 'LADA Original', article: '21214-1307010', price: 1800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'LUZAR', article: '—', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: 'niva-thermostat', modelId: 'niva', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 1500, laborHours: 1, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '21210-1306010', variants: [
      { brand: 'LADA Original', article: '21210-1306010', price: 800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2107 ---
  { id: '2107-water-pump', modelId: '2107', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '21010-1307010', variants: [
      { brand: 'LADA Original', article: '21010-1307010', price: 1200, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: '2107-thermostat', modelId: '2107', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 1200, laborHours: 1, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '21010-1306010', variants: [
      { brand: 'LADA Original', article: '21010-1306010', price: 600, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2109 ---
  { id: '2109-water-pump', modelId: '2109', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '21080-1307010', variants: [
      { brand: 'LADA Original', article: '21080-1307010', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'LUZAR', article: '—', price: 1000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: '2109-thermostat', modelId: '2109', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 1500, laborHours: 1, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '21080-1306010', variants: [
      { brand: 'LADA Original', article: '21080-1306010', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- XRAY ---
  { id: 'xray-water-pump', modelId: 'xray', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 3500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '21129-1307010', variants: [
      { brand: 'LADA Original', article: '21129-1307010', price: 2500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'xray-thermostat', modelId: 'xray', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 2500, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '8450006939', variants: [
      { brand: 'LADA Original', article: '8450006939', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- PRIORA ---
  { id: 'priora-water-pump', modelId: 'priora', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 3000, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '21120-1307010', variants: [
      { brand: 'LADA Original', article: '21120-1307010', price: 2000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'priora-thermostat', modelId: 'priora', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 2000, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '21120-1306010', variants: [
      { brand: 'LADA Original', article: '21120-1306010', price: 1000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- KALINA ---
  { id: 'kalina-water-pump', modelId: 'kalina', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 2500, laborHours: 2, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '11180-1307010', variants: [
      { brand: 'LADA Original', article: '11180-1307010', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'kalina-thermostat', modelId: 'kalina', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 1500, laborHours: 1, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '11180-1306010', variants: [
      { brand: 'LADA Original', article: '11180-1306010', price: 700, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- LARGUS ---
  { id: 'largus-water-pump', modelId: 'largus', category: 'engine', name: 'Замена помпы (водяного насоса)', description: 'Замена водяного насоса', laborPrice: 4000, laborHours: 2.5, difficulty: 'medium', parts: [
    { name: 'Помпа (водяной насос)', article: '130C11592R', variants: [
      { brand: 'Renault Original', article: '130C11592R', price: 3500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'largus-thermostat', modelId: 'largus', category: 'engine', name: 'Замена термостата', description: 'Замена термостата', laborPrice: 2500, laborHours: 1.5, difficulty: 'medium', parts: [
    { name: 'Термостат', article: '8200408438', variants: [
      { brand: 'Renault Original', article: '8200408438', price: 1800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // =====================================================
  // РАСШИРЕННЫЕ РАБОТЫ — СЦЕПЛЕНИЕ (масло в КПП, АМТ)
  // =====================================================

  // --- GRANTA ---
  { id: 'granta-gearbox-oil', modelId: 'granta', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла в коробке передач', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
      { brand: 'Castrol Syntrans', article: '—', price: 1800, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
  { id: 'granta-amt-clutch', modelId: 'granta', category: 'clutch', name: 'Замена сцепления АМТ (робот)', description: 'Замена комплекта сцепления на роботизированной КПП', laborPrice: 8000, laborHours: 6, difficulty: 'hard', parts: [
    { name: 'Комплект сцепления АМТ', article: '21900-1601000-AMT', variants: [
      { brand: 'LADA Original', article: '21900-1601000-AMT', price: 12000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 3 },
    ]},
  ], kits: [] },

  // --- VESTA ---
  { id: 'vesta-gearbox-oil', modelId: 'vesta', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 1200, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },
  { id: 'vesta-amt-clutch', modelId: 'vesta', category: 'clutch', name: 'Замена сцепления АМТ (робот)', description: 'Замена комплекта сцепления на роботизированной КПП', laborPrice: 10000, laborHours: 7, difficulty: 'hard', parts: [
    { name: 'Комплект сцепления АМТ', article: '8450006986-AMT', variants: [
      { brand: 'LADA Original', article: '8450006986-AMT', price: 15000, source: 'Яндекс Маркет', inStock: true, deliveryDays: 3 },
    ]},
  ], kits: [] },

  // --- NIVA ---
  { id: 'niva-gearbox-oil', modelId: 'niva', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2107 ---
  { id: '2107-gearbox-oil', modelId: '2107', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 800, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- 2109 ---
  { id: '2109-gearbox-oil', modelId: '2109', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 800, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- XRAY ---
  { id: 'xray-gearbox-oil', modelId: 'xray', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 1200, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- PRIORA ---
  { id: 'priora-gearbox-oil', modelId: 'priora', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- KALINA ---
  { id: 'kalina-gearbox-oil', modelId: 'kalina', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 1000, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Лукойл ТМ-4', article: '—', price: 900, source: 'Яндекс Маркет', inStock: true, deliveryDays: 1 },
    ]},
  ], kits: [] },

  // --- LARGUS ---
  { id: 'largus-gearbox-oil', modelId: 'largus', category: 'clutch', name: 'Замена масла в КПП', description: 'Замена трансмиссионного масла', laborPrice: 1500, laborHours: 0.5, difficulty: 'easy', parts: [
    { name: 'Масло трансмиссионное 75W-90 (3 л)', article: '75W-90', variants: [
      { brand: 'Elf Tranself', article: '—', price: 1500, source: 'Яндекс Маркет', inStock: true, deliveryDays: 2 },
    ]},
  ], kits: [] },
]

export function findRepairs(modelId: string, category?: string): Repair[] {
  return REPAIRS.filter(r =>
    (r.modelId === modelId || r.modelId === 'any') &&
    (!category || r.category === category)
  )
}

export function findRepairById(id: string): Repair | undefined {
  return REPAIRS.find(r => r.id === id)
}

export function searchRepairs(query: string): Repair[] {
  const q = query.toLowerCase()
  return REPAIRS.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.parts.some(p => p.name.toLowerCase().includes(q))
  )
}
