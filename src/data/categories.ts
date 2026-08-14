export interface Category {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'to',
    name: 'ТО и расходники',
    icon: '🛢️',
    color: 'green',
    description: 'Масла, фильтры, свечи, ремни',
  },
  {
    id: 'suspension',
    name: 'Подвеска',
    icon: '🔩',
    color: 'blue',
    description: 'Амортизаторы, рычаги, сайлентблоки, стойки',
  },
  {
    id: 'brakes',
    name: 'Тормоза',
    icon: '🔴',
    color: 'red',
    description: 'Колодки, диски, суппорта, тормозная жидкость',
  },
  {
    id: 'clutch',
    name: 'Сцепление',
    icon: '⚙️',
    color: 'purple',
    description: 'Корзина, диск, выжимной подшипник, КПП',
  },
  {
    id: 'engine',
    name: 'Двигатель',
    icon: '⚡',
    color: 'orange',
    description: 'ГРМ, прокладки, цепь, маслосъёмные кольца',
  },
  {
    id: 'electrical',
    name: 'Электрика',
    icon: '💡',
    color: 'yellow',
    description: 'Генератор, стартер, проводка, датчики',
  },
  {
    id: 'exhaust',
    name: 'Выхлоп',
    icon: '💨',
    color: 'slate',
    description: 'Катализатор, глушитель, лямбда-зонд',
  },
  {
    id: 'body',
    name: 'Кузов',
    icon: '🚗',
    color: 'gray',
    description: 'Бампера, крылья, стёкла, зеркала',
  },
  {
    id: 'steering',
    name: 'Рулевое',
    icon: '🎯',
    color: 'cyan',
    description: 'Рулевая рейка, наконечники, ГУР, ЭУР',
  },
  {
    id: 'cooling',
    name: 'Охлаждение',
    icon: '❄️',
    color: 'teal',
    description: 'Радиатор, термостат, помпа, патрубки',
  },
]

export function findCategory(query: string): Category | undefined {
  const q = query.toLowerCase().trim()
  return CATEGORIES.find(c =>
    c.id.includes(q) ||
    c.name.toLowerCase().includes(q) ||
    q.includes(c.name.toLowerCase())
  )
}
