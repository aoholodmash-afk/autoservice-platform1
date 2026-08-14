export interface ChecklistItem {
  id: string
  name: string
  category: string
  status: 'ok' | 'warning' | 'critical' | 'not_checked'
  comment?: string
  photo?: string
  recommendation?: string
}

export interface ChecklistTemplate {
  id: string
  name: string
  items: Omit<ChecklistItem, 'status' | 'comment' | 'photo' | 'recommendation'>[]
}

export const CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    id: 'full-inspection',
    name: 'Полный осмотр',
    items: [
      // Двигатель
      { id: 'engine-oil', name: 'Масло двигателя', category: 'engine' },
      { id: 'engine-coolant', name: 'Охлаждающая жидкость', category: 'engine' },
      { id: 'engine-belts', name: 'Ремни привода', category: 'engine' },
      { id: 'engine-leaks', name: 'Подтёки масла', category: 'engine' },
      { id: 'engine-noise', name: 'Посторонние звуки', category: 'engine' },
      // Тормоза
      { id: 'brake-pads-front', name: 'Колодки передние', category: 'brakes' },
      { id: 'brake-pads-rear', name: 'Колодки задние', category: 'brakes' },
      { id: 'brake-discs', name: 'Тормозные диски', category: 'brakes' },
      { id: 'brake-fluid', name: 'Тормозная жидкость', category: 'brakes' },
      { id: 'brake-lines', name: 'Тормозные шланги', category: 'brakes' },
      // Подвеска
      { id: 'suspension-shocks', name: 'Амортизаторы', category: 'suspension' },
      { id: 'suspension-springs', name: 'Пружины', category: 'suspension' },
      { id: 'suspension-bushings', name: 'Сайлентблоки', category: 'suspension' },
      { id: 'suspension-stabilizer', name: 'Стойки стабилизатора', category: 'suspension' },
      // Рулевое
      { id: 'steering-tie', name: 'Рулевые наконечники', category: 'steering' },
      { id: 'steering-rack', name: 'Рулевая рейка', category: 'steering' },
      // Колёса
      { id: 'tires-front', name: 'Шины передние', category: 'wheels' },
      { id: 'tires-rear', name: 'Шины задние', category: 'wheels' },
      { id: 'tires-pressure', name: 'Давление в шинах', category: 'wheels' },
      // Электрика
      { id: 'lights-headlights', name: 'Фары', category: 'electrical' },
      { id: 'lights-signals', name: 'Поворотники/стопы', category: 'electrical' },
      { id: 'battery', name: 'Аккумулятор', category: 'electrical' },
      // Кузов
      { id: 'body-lacquer', name: 'Лакокрасочное покрытие', category: 'body' },
      { id: 'body-corrosion', name: 'Коррозия', category: 'body' },
    ],
  },
  {
    id: 'quick-check',
    name: 'Быстрая проверка',
    items: [
      { id: 'engine-oil', name: 'Масло двигателя', category: 'engine' },
      { id: 'engine-coolant', name: 'Охлаждающая жидкость', category: 'engine' },
      { id: 'brake-pads-front', name: 'Колодки передние', category: 'brakes' },
      { id: 'brake-pads-rear', name: 'Колодки задние', category: 'brakes' },
      { id: 'tires-front', name: 'Шины передние', category: 'wheels' },
      { id: 'tires-pressure', name: 'Давление в шинах', category: 'wheels' },
      { id: 'lights-headlights', name: 'Фары', category: 'electrical' },
      { id: 'battery', name: 'Аккумулятор', category: 'electrical' },
    ],
  },
]

export function createChecklist(templateId: string): ChecklistItem[] {
  const template = CHECKLIST_TEMPLATES.find(t => t.id === templateId)
  if (!template) return []
  return template.items.map(item => ({
    ...item,
    status: 'not_checked' as const,
  }))
}

export const CHECKLIST_CATEGORIES: Record<string, { name: string; icon: string }> = {
  engine: { name: 'Двигатель', icon: '⚡' },
  brakes: { name: 'Тормоза', icon: '🔴' },
  suspension: { name: 'Подвеска', icon: '🔩' },
  steering: { name: 'Рулевое', icon: '🎯' },
  wheels: { name: 'Колёса', icon: '🛞' },
  electrical: { name: 'Электрика', icon: '💡' },
  body: { name: 'Кузов', icon: '🚗' },
}
