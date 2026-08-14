export interface JournalEntry {
  id: string
  timestamp: string
  type: 'order' | 'booking' | 'payment' | 'status' | 'stock' | 'system'
  title: string
  description: string
  user?: string
  amount?: number
}

export const MOCK_JOURNAL: JournalEntry[] = [
  {
    id: 'j1',
    timestamp: '2026-08-14T16:30:00',
    type: 'order',
    title: 'Новый заказ WO-047',
    description: 'Козлов Дмитрий — Lada Vesta — Замена масла + фильтры',
    user: 'Админ',
    amount: 3800,
  },
  {
    id: 'j2',
    timestamp: '2026-08-14T15:45:00',
    type: 'booking',
    title: 'Новая запись',
    description: 'Петрова Мария — Lada Granta — Замена колодок (завтра 11:00)',
    user: 'Система',
  },
  {
    id: 'j3',
    timestamp: '2026-08-14T14:20:00',
    type: 'payment',
    title: 'Оплата получена',
    description: 'WO-044 — Смирнов Олег — Наличные',
    user: 'Касса',
    amount: 6300,
  },
  {
    id: 'j4',
    timestamp: '2026-08-14T13:00:00',
    type: 'status',
    title: 'Заказ завершён',
    description: 'WO-043 — Иванов Сергеей — Замена ГРМ — Выдан клиенту',
    user: 'Сидоров А.',
  },
  {
    id: 'j5',
    timestamp: '2026-08-14T11:30:00',
    type: 'stock',
    title: 'Списание со склада',
    description: 'Масляный фильтр MANN W914/2 × 1 — для WO-043',
    user: 'Сидоров А.',
  },
  {
    id: 'j6',
    timestamp: '2026-08-14T10:00:00',
    type: 'order',
    title: 'Новый заказ WO-046',
    description: 'Алексеева Анна — Lada Kalina — Комплексное ТО',
    user: 'Админ',
    amount: 8500,
  },
  {
    id: 'j7',
    timestamp: '2026-08-14T09:15:00',
    type: 'stock',
    title: 'Поступление на склад',
    description: 'Колодки передние TRW GDB1448 × 10 шт — поставка от АвтоДок',
    user: 'Система',
  },
  {
    id: 'j8',
    timestamp: '2026-08-13T18:00:00',
    type: 'system',
    title: 'Закрытие смены',
    description: 'Выручка за день: 24 600 ₽. Заказов: 5. Средний чек: 4 920 ₽',
    user: 'Система',
    amount: 24600,
  },
  {
    id: 'j9',
    timestamp: '2026-08-13T16:45:00',
    type: 'payment',
    title: 'Оплата получена',
    description: 'WO-042 — Волков Андрей — Безнал',
    user: 'Касса',
    amount: 4200,
  },
  {
    id: 'j10',
    timestamp: '2026-08-13T14:00:00',
    type: 'booking',
    title: 'Запись подтверждена',
    description: 'Козлов Дмитрий — замена масла — 14.08 09:00',
    user: 'Админ',
  },
]
