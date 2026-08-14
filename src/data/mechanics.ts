export interface Mechanic {
  id: string
  name: string
  phone: string
  boxNumber: number
  specializations: string[]   // IDs категорий: 'to', 'brakes', 'clutch'...
  skills: string[]            // Конкретные работы: 'Замена масла', 'Замена ГРМ'...
  maxOrders: number           // Максимум заказов одновременно
  currentOrders: number       // Текущая загрузка
  rating: number              // Рейтинг (1-5)
  isActive: boolean
  schedule: WorkSchedule
  stats: MechanicStats
}

export interface WorkSchedule {
  monday: { start: string; end: string } | null
  tuesday: { start: string; end: string } | null
  wednesday: { start: string; end: string } | null
  thursday: { start: string; end: string } | null
  friday: { start: string; end: string } | null
  saturday: { start: string; end: string } | null
  sunday: { start: string; end: string } | null
}

export interface MechanicStats {
  totalOrders: number
  completedOrders: number
  avgCompletionTime: number   // в часах
  avgRating: number
  specialization: string      // основная специализация
}

export interface MechanicAssignment {
  orderId: string
  mechanicId: string
  assignedAt: string
  assignedBy: 'manual' | 'auto'
  reason?: string             // Причина автоматического назначения
}

// Данные механиков (mock)
export const MECHANICS: Mechanic[] = [
  {
    id: 'mech-1',
    name: 'Иванов Петр Сергеевич',
    phone: '+7 999 111-22-33',
    boxNumber: 1,
    specializations: ['to', 'brakes', 'suspension'],
    skills: ['Замена масла', 'Замена фильтров', 'Замена колодок', 'Замена дисков', 'Замена амортизаторов', 'Замена сайлентблоков', 'Замена рулевых наконечников', 'Развал-схождение'],
    maxOrders: 4,
    currentOrders: 2,
    rating: 4.8,
    isActive: true,
    schedule: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: null,
    },
    stats: {
      totalOrders: 247,
      completedOrders: 239,
      avgCompletionTime: 2.5,
      avgRating: 4.8,
      specialization: 'ТО и подвеска',
    },
  },
  {
    id: 'mech-2',
    name: 'Сидоров Алексей Николаевич',
    phone: '+7 999 222-33-44',
    boxNumber: 2,
    specializations: ['engine', 'clutch'],
    skills: ['Замена ГРМ', 'Замена цепи', 'Замена помпы', 'Замена термостата', 'Замена сцепления', 'Замена КПП', 'Замена прокладки ГБЦ', 'Капитальный ремонт двигателя'],
    maxOrders: 3,
    currentOrders: 1,
    rating: 4.9,
    isActive: true,
    schedule: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: null,
      sunday: null,
    },
    stats: {
      totalOrders: 189,
      completedOrders: 185,
      avgCompletionTime: 4.2,
      avgRating: 4.9,
      specialization: 'Двигатель и сцепление',
    },
  },
  {
    id: 'mech-3',
    name: 'Козлов Дмитрий Валерьевич',
    phone: '+7 999 333-44-55',
    boxNumber: 3,
    specializations: ['electrical', 'brakes'],
    skills: ['Замена генератора', 'Замена стартера', 'Замена датчиков', 'Диагностика электрики', 'Замена колодок', 'Замена суппортов', 'Прокачка тормозов', 'Замена тросов ручника'],
    maxOrders: 4,
    currentOrders: 3,
    rating: 4.6,
    isActive: true,
    schedule: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: null,
    },
    stats: {
      totalOrders: 156,
      completedOrders: 150,
      avgCompletionTime: 2.1,
      avgRating: 4.6,
      specialization: 'Электрика и тормоза',
    },
  },
  {
    id: 'mech-4',
    name: 'Петров Максим Андреевич',
    phone: '+7 999 444-55-66',
    boxNumber: 4,
    specializations: ['to', 'suspension', 'steering'],
    skills: ['Замена масла', 'Замена свечей', 'Замена ШРУС', 'Замена ступичных подшипников', 'Замена рулевой рейки', 'Замена пружин', 'Компьютерная диагностика'],
    maxOrders: 4,
    currentOrders: 0,
    rating: 4.5,
    isActive: true,
    schedule: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
      wednesday: { start: '08:00', end: '17:00' },
      thursday: { start: '08:00', end: '17:00' },
      friday: { start: '08:00', end: '17:00' },
      saturday: null,
      sunday: null,
    },
    stats: {
      totalOrders: 98,
      completedOrders: 95,
      avgCompletionTime: 2.8,
      avgRating: 4.5,
      specialization: 'ТО и подвеска',
    },
  },
]

// Все доступные категории работ
export const WORK_CATEGORIES = [
  { id: 'to', name: 'ТО и расходники', icon: '🛢️' },
  { id: 'brakes', name: 'Тормоза', icon: '🔴' },
  { id: 'clutch', name: 'Сцепление', icon: '⚙️' },
  { id: 'suspension', name: 'Подвеска', icon: '🔩' },
  { id: 'engine', name: 'Двигатель', icon: '⚡' },
  { id: 'electrical', name: 'Электрика', icon: '💡' },
  { id: 'steering', name: 'Рулевое', icon: '🎯' },
  { id: 'cooling', name: 'Охлаждение', icon: '❄️' },
  { id: 'exhaust', name: 'Выхлоп', icon: '💨' },
  { id: 'body', name: 'Кузов', icon: '🚗' },
]

// Все доступные навыки
export const AVAILABLE_SKILLS = [
  // ТО
  'Замена масла', 'Замена фильтров', 'Замена свечей', 'Замена ремня навесного',
  'Замена тормозной жидкости', 'Замена антифриза', 'Компьютерная диагностика',
  // Тормоза
  'Замена колодок', 'Замена дисков', 'Замена суппортов', 'Прокачка тормозов',
  'Замена тросов ручника',
  // Сцепление
  'Замена сцепления', 'Замена КПП', 'Замена масла в КПП', 'Замена сцепления АМТ',
  // Подвеска
  'Замена амортизаторов', 'Замена сайлентблоков', 'Замена рулевых наконечников',
  'Замена ШРУС', 'Замена ступичных подшипников', 'Замена пружин', 'Развал-схождение',
  // Двигатель
  'Замена ГРМ', 'Замена цепи', 'Замена помпы', 'Замена термостата',
  'Замена прокладки ГБЦ', 'Замена маслосъёмных колец',
  // Электрика
  'Замена генератора', 'Замена стартера', 'Замена датчиков', 'Диагностика электрики',
  // Рулевое
  'Замена рулевой рейки', 'Замена ГУР', 'Замена ЭУР',
  // Охлаждение
  'Замена радиатора', 'Замена патрубков',
  // Выхлоп
  'Замена катализатора', 'Замена глушителя',
]

// Текущие назначения
export const ASSIGNMENTS: MechanicAssignment[] = [
  { orderId: 'wo-001', mechanicId: 'mech-1', assignedAt: '2026-08-05T09:00:00', assignedBy: 'manual' },
  { orderId: 'wo-003', mechanicId: 'mech-2', assignedAt: '2026-08-05T08:00:00', assignedBy: 'auto', reason: 'Специализация: сцепление' },
]

// ===== АЛГОРИТМ АВТОРАСПРЕДЕЛЕНИЯ =====

export interface WorkOrder {
  id: string
  category: string
  repairName: string
  estimatedHours: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export function autoAssignOrder(order: WorkOrder): Mechanic | null {
  const now = new Date()
  const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()]
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  // Фильтруем доступных механиков
  const available = MECHANICS.filter(m => {
    if (!m.isActive) return false

    // Проверяем загрузку
    if (m.currentOrders >= m.maxOrders) return false

    // Проверяем расписание
    const daySchedule = m.schedule[currentDay as keyof WorkSchedule]
    if (!daySchedule) return false

    const [startH, startM] = daySchedule.start.split(':').map(Number)
    const [endH, endM] = daySchedule.end.split(':').map(Number)
    const currentTotal = currentHour * 60 + currentMinute
    if (currentTotal < startH * 60 + startM || currentTotal > endH * 60 + endM) return false

    return true
  })

  if (available.length === 0) return null

  // Сортируем по приоритету:
  // 1. Специализация (категория)
  // 2. Конкретный навык
  // 3. Загрузка (меньше = лучше)
  // 4. Рейтинг (выше = лучше)
  const scored = available.map(m => {
    let score = 0

    // Специализация (+50)
    if (m.specializations.includes(order.category)) {
      score += 50
    }

    // Конкретный навык (+30)
    if (m.skills.some(s => order.repairName.toLowerCase().includes(s.toLowerCase()))) {
      score += 30
    }

    // Загрузка (+0-20, чем меньше заказов тем больше баллов)
    const loadPercent = m.currentOrders / m.maxOrders
    score += (1 - loadPercent) * 20

    // Рейтинг (+0-10)
    score += (m.rating - 4) * 10

    return { mechanic: m, score }
  })

  // Сортируем по убыванию баллов
  scored.sort((a, b) => b.score - a.score)

  return scored[0].mechanic
}

// Автоматическое распределение всех нераспределённых заказов
export function autoAssignAll(orders: WorkOrder[]): MechanicAssignment[] {
  const newAssignments: MechanicAssignment[] = []

  for (const order of orders) {
    // Проверяем, не назначен ли уже
    const existing = ASSIGNMENTS.find(a => a.orderId === order.id)
    if (existing) continue

    const mechanic = autoAssignOrder(order)
    if (mechanic) {
      const assignment: MechanicAssignment = {
        orderId: order.id,
        mechanicId: mechanic.id,
        assignedAt: new Date().toISOString(),
        assignedBy: 'auto',
        reason: buildAssignmentReason(mechanic, order),
      }
      newAssignments.push(assignment)
      ASSIGNMENTS.push(assignment)
      mechanic.currentOrders++
    }
  }

  return newAssignments
}

function buildAssignmentReason(mechanic: Mechanic, order: WorkOrder): string {
  const reasons: string[] = []

  if (mechanic.specializations.includes(order.category)) {
    reasons.push(`специализация: ${order.category}`)
  }
  if (mechanic.skills.some(s => order.repairName.toLowerCase().includes(s.toLowerCase()))) {
    reasons.push('соответствующий навык')
  }
  reasons.push(`загрузка: ${mechanic.currentOrders}/${mechanic.maxOrders}`)
  reasons.push(`рейтинг: ${mechanic.rating}`)

  return reasons.join(', ')
}

// Получить механика по ID
export function getMechanicById(id: string): Mechanic | undefined {
  return MECHANICS.find(m => m.id === id)
}

// Получить механика по номеру бокса
export function getMechanicByBox(boxNumber: number): Mechanic | undefined {
  return MECHANICS.find(m => m.boxNumber === boxNumber)
}

// Получить заказы механика
export function getMechanicOrders(mechanicId: string): MechanicAssignment[] {
  return ASSIGNMENTS.filter(a => a.mechanicId === mechanicId)
}
