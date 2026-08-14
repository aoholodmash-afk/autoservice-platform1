export interface TrackingOrder {
  id: string
  token: string
  clientName: string
  clientPhone: string
  vehicle: string
  licensePlate: string
  serviceName: string
  status: TrackingStatus
  statusHistory: StatusEntry[]
  mechanicName: string
  estimatedCompletion: string
  totalParts: number
  totalLabor: number
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export type TrackingStatus =
  | 'accepted'      // Принято
  | 'diagnosis'     // Диагностика
  | 'waiting_parts' // Ожидание запчастей
  | 'in_progress'   // В работе
  | 'quality_check' // Проверка качества
  | 'completed'     // Готово
  | 'delivered'     // Выдано клиенту

export interface StatusEntry {
  status: TrackingStatus
  timestamp: string
  comment?: string
  photo?: string
}

export const STATUS_LABELS: Record<TrackingStatus, { name: string; icon: string; color: string; description: string }> = {
  accepted: {
    name: 'Принято в работу',
    icon: '📋',
    color: 'blue',
    description: 'Ваш автомобиль принят. Мастер осмотрит его и составит план работ.',
  },
  diagnosis: {
    name: 'Диагностика',
    icon: '🔍',
    color: 'purple',
    description: 'Проводится диагностика. Мастер определяет необходимые работы.',
  },
  waiting_parts: {
    name: 'Ожидание запчастей',
    icon: '📦',
    color: 'yellow',
    description: 'Заказаны запчасти. Ожидаем доставку.',
  },
  in_progress: {
    name: 'В работе',
    icon: '🔧',
    color: 'orange',
    description: 'Мастер выполняет ремонтные работы.',
  },
  quality_check: {
    name: 'Проверка качества',
    icon: '✅',
    color: 'teal',
    description: 'Работы завершены. Проводится финальная проверка.',
  },
  completed: {
    name: 'Готово',
    icon: '🎉',
    color: 'green',
    description: 'Ремонт завершён! Можете забрать автомобиль.',
  },
  delivered: {
    name: 'Выдано',
    icon: '🚗',
    color: 'gray',
    description: 'Автомобиль выдан клиенту.',
  },
}

export const STATUS_ORDER: TrackingStatus[] = [
  'accepted',
  'diagnosis',
  'waiting_parts',
  'in_progress',
  'quality_check',
  'completed',
  'delivered',
]

// Mock данные для демо
export const MOCK_ORDERS: TrackingOrder[] = []

export function getOrderByToken(token: string): TrackingOrder | undefined {
  return MOCK_ORDERS.find(o => o.token === token)
}

export function getOrderById(id: string): TrackingOrder | undefined {
  return MOCK_ORDERS.find(o => o.id === id)
}
