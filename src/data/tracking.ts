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
export const MOCK_ORDERS: TrackingOrder[] = [
  {
    id: 'wo-001',
    token: 'track-abc123',
    clientName: 'Козлов Дмитрий',
    clientPhone: '+7 916 123-45-67',
    vehicle: 'Toyota Camry',
    licensePlate: 'А123ВС777',
    serviceName: 'Замена масла и фильтров',
    status: 'in_progress',
    statusHistory: [
      { status: 'accepted', timestamp: '2026-08-05T09:00:00', comment: 'Автомобиль принят, заказ-наряд WO-001' },
      { status: 'diagnosis', timestamp: '2026-08-05T09:15:00', comment: 'Проведена диагностика. Рекомендована замена масла, фильтров, колодок.' },
      { status: 'in_progress', timestamp: '2026-08-05T10:00:00', comment: 'Начата замена масла и фильтров' },
    ],
    mechanicName: 'Сидоров Алексей',
    estimatedCompletion: '2026-08-05T14:00:00',
    totalParts: 5700,
    totalLabor: 2500,
    totalAmount: 8200,
    createdAt: '2026-08-05T09:00:00',
    updatedAt: '2026-08-05T10:00:00',
  },
  {
    id: 'wo-002',
    token: 'track-def456',
    clientName: 'Петрова Мария',
    clientPhone: '+7 916 987-65-43',
    vehicle: 'BMW X5',
    licensePlate: 'В456ЕК777',
    serviceName: 'Замена тормозных колодок',
    status: 'completed',
    statusHistory: [
      { status: 'accepted', timestamp: '2026-08-04T10:00:00' },
      { status: 'diagnosis', timestamp: '2026-08-04T10:30:00', comment: 'Передние колодки изношены на 80%. Задние — 60%.' },
      { status: 'waiting_parts', timestamp: '2026-08-04T11:00:00', comment: 'Заказаны передние колодки TRW. Доставка завтра.' },
      { status: 'in_progress', timestamp: '2026-08-05T09:00:00', comment: 'Замена передних тормозных колодок' },
      { status: 'quality_check', timestamp: '2026-08-05T11:00:00', comment: 'Проверка тормозной системы. Всё в норме.' },
      { status: 'completed', timestamp: '2026-08-05T11:30:00', comment: 'Ремонт завершён. Автомобиль готов к выдаче.' },
    ],
    mechanicName: 'Иванов Петр',
    estimatedCompletion: '2026-08-05T12:00:00',
    totalParts: 4400,
    totalLabor: 2000,
    totalAmount: 6400,
    createdAt: '2026-08-04T10:00:00',
    updatedAt: '2026-08-05T11:30:00',
  },
  {
    id: 'wo-003',
    token: 'track-ghi789',
    clientName: 'Смирнов Олег',
    clientPhone: '+7 903 111-22-33',
    vehicle: 'Hyundai Solaris',
    licensePlate: 'С789АТ777',
    serviceName: 'Замена комплекта сцепления',
    status: 'waiting_parts',
    statusHistory: [
      { status: 'accepted', timestamp: '2026-08-05T08:00:00' },
      { status: 'diagnosis', timestamp: '2026-08-05T08:30:00', comment: 'Сцепление буксует. Необходима полная замена комплекта.' },
      { status: 'waiting_parts', timestamp: '2026-08-05T09:00:00', comment: 'Заказан комплект сцепления Valeo. Доставка 2-3 дня.' },
    ],
    mechanicName: 'Сидоров Алексей',
    estimatedCompletion: '2026-08-08T18:00:00',
    totalParts: 10500,
    totalLabor: 5000,
    totalAmount: 15500,
    createdAt: '2026-08-05T08:00:00',
    updatedAt: '2026-08-05T09:00:00',
  },
]

export function getOrderByToken(token: string): TrackingOrder | undefined {
  return MOCK_ORDERS.find(o => o.token === token)
}

export function getOrderById(id: string): TrackingOrder | undefined {
  return MOCK_ORDERS.find(o => o.id === id)
}
