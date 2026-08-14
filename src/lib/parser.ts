import { AVTOVAZ_MODELS, Vehicle } from '@/data/vehicles'
import { CATEGORIES, Category } from '@/data/categories'
import { REPAIRS, Repair } from '@/data/repairs'

export interface ParsedRequest {
  vehicle: Vehicle | null
  year: number | null
  category: Category | null
  repairs: Repair[]
  confidence: number
  needsClarification: boolean
  clarification?: {
    question: string
    field: string
    options: string[]
  }
}

// Маппинг ключевых слов → категории
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'to': ['масл', 'фильтр', 'свеч', 'ремень грм', 'расходник', 'то ', 'техобслуж', 'обслужив'],
  'brakes': ['тормоз', 'колодк', 'диск тормоз', 'суппорт'],
  'clutch': ['сцеплен', 'корзин', 'диск сцеп', 'выжимн', 'мкпп'],
  'suspension': ['подвеск', 'амортизатор', 'рычаг', 'сайлентблок', 'стойк', 'стабилизатор', 'развал', 'схожд'],
  'engine': ['двигатель', 'грм', 'ремень', 'цепь', 'прокладк', 'маслосъёмн', 'колец', 'поршен'],
  'electrical': ['генератор', 'стартер', 'аккумулятор', 'датчик', 'проводк', 'электр', 'зажиган'],
  'exhaust': ['глушител', 'катализатор', 'лямбда', 'выхлоп'],
  'body': ['шин', 'резин', 'колес', 'бампер', 'крыло', 'стекл', 'зеркал', 'кузов'],
  'steering': ['рулев', 'рейк', 'наконечник', 'гур', 'эур', 'руль'],
  'cooling': ['радиатор', 'термостат', 'помпа', 'охлажд', 'патрубок', 'тосол', 'антифриз'],
}

// Синонимы моделей
const MODEL_ALIASES: Record<string, string> = {
  'гранта': 'granta',
  'vesta': 'vesta',
  'веста': 'vesta',
  'xray': 'xray',
  'иксрей': 'xray',
  'niva': 'niva',
  'нива': 'niva',
  'largus': 'largus',
  'ларгус': 'largus',
  'priora': 'priora',
  'приора': 'priora',
  'kalina': 'kalina',
  'калина': 'kalina',
  '2107': '2107',
  'семёрка': '2107',
  '2109': '2109',
  'девятка': '2109',
  '2110': '2110',
  'десятка': '2110',
  '2112': '2112',
  '2114': '2114',
  '2115': '2115',
}

export function parseUserInput(input: string): ParsedRequest {
  const text = input.toLowerCase().trim()
  let confidence = 0

  // 1. Извлечь модель
  let vehicle: Vehicle | null = null
  for (const [alias, modelId] of Object.entries(MODEL_ALIASES)) {
    if (text.includes(alias)) {
      vehicle = AVTOVAZ_MODELS.find(m => m.id === modelId) || null
      confidence += 40
      break
    }
  }
  // Попробовать прямое совпадение
  if (!vehicle) {
    vehicle = AVTOVAZ_MODELS.find(m =>
      text.includes(m.id) || text.includes(m.name.toLowerCase())
    ) || null
    if (vehicle) confidence += 40
  }

  // 2. Извлечь год
  let year: number | null = null
  const yearMatch = text.match(/(?:19|20)\d{2}/)
  if (yearMatch) {
    year = parseInt(yearMatch[0])
    confidence += 10
  }

  // 3. Определить категорию
  let category: Category | null = null
  for (const [catId, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      category = CATEGORIES.find(c => c.id === catId) || null
      if (category) {
        confidence += 30
        break
      }
    }
  }

  // 4. Найти конкретные работы
  let repairs: Repair[] = []
  if (vehicle) {
    const modelRepairs = REPAIRS.filter(r =>
      r.modelId === vehicle!.id || r.modelId === 'any'
    )

    if (category) {
      repairs = modelRepairs.filter(r => r.category === category!.id)
    } else {
      // Fuzzy search по названию работ
      repairs = modelRepairs.filter(r => {
        const words = text.split(/\s+/)
        return words.some(w =>
          w.length > 3 && (
            r.name.toLowerCase().includes(w) ||
            r.parts.some(p => p.name.toLowerCase().includes(w))
          )
        )
      })
    }
  }

  // 5. Определить нужна ли уточнение
  let needsClarification = false
  let clarification: ParsedRequest['clarification']

  if (repairs.length > 0 && repairs[0].clarifications && repairs[0].clarifications.length > 0) {
    const firstRepair = repairs[0]
    const cl = firstRepair.clarifications![0]
    // Проверяем, не указано ли уже значение
    const alreadySpecified = cl.options.some(opt =>
      text.includes(opt.toLowerCase())
    )
    if (!alreadySpecified) {
      needsClarification = true
      clarification = {
        question: cl.question,
        field: cl.field,
        options: cl.options,
      }
    }
  }

  // Если не нашли работы, но есть категория — покажем все работы категории
  if (repairs.length === 0 && vehicle && category) {
    repairs = REPAIRS.filter(r =>
      (r.modelId === vehicle!.id || r.modelId === 'any') &&
      r.category === category!.id
    )
  }

  return {
    vehicle,
    year,
    category,
    repairs,
    confidence,
    needsClarification,
    clarification,
  }
}

// Быстрый поиск для подсказок
export function getSearchSuggestions(query: string): string[] {
  const text = query.toLowerCase().trim()
  const suggestions: string[] = []

  // Модели
  for (const model of AVTOVAZ_MODELS) {
    if (model.name.toLowerCase().includes(text) || model.id.includes(text)) {
      suggestions.push(model.name)
    }
  }

  // Категории
  for (const cat of CATEGORIES) {
    if (cat.name.toLowerCase().includes(text)) {
      suggestions.push(cat.name)
    }
  }

  // Работы
  for (const repair of REPAIRS) {
    if (repair.name.toLowerCase().includes(text)) {
      suggestions.push(repair.name)
    }
  }

  return suggestions.slice(0, 8)
}
