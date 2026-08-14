export interface StockItem {
  id: string
  name: string
  article: string
  brand: string
  category: string
  quantity: number
  minQuantity: number       // минимальный остаток
  purchasePrice: number     // закупочная цена
  sellPrice: number         // продажная цена
  supplier?: string
  lastDelivery?: string
  status: 'in_stock' | 'low' | 'out_of_stock' | 'ordered'
}

export const MOCK_STOCK: StockItem[] = [
  // Масла и жидкости
  {
    id: 's1', name: 'Масло моторное 5W-30 4L', article: '000015W304', brand: 'Lada Original',
    category: 'Масла', quantity: 24, minQuantity: 10, purchasePrice: 1400, sellPrice: 1800,
    supplier: 'АвтоДок', lastDelivery: '2026-08-10', status: 'in_stock',
  },
  {
    id: 's2', name: 'Масло моторное 5W-40 4L', article: '19299', brand: 'Лукойл Genesis',
    category: 'Масла', quantity: 8, minQuantity: 10, purchasePrice: 1200, sellPrice: 1600,
    supplier: 'АвтоДок', lastDelivery: '2026-08-05', status: 'low',
  },
  {
    id: 's3', name: 'Антифриз красный 5L', article: '000015E304', brand: 'Lada Original',
    category: 'Жидкости', quantity: 15, minQuantity: 5, purchasePrice: 500, sellPrice: 600,
    supplier: 'АвтоДок', lastDelivery: '2026-08-08', status: 'in_stock',
  },
  {
    id: 's4', name: 'Жидкость тормозная DOT-4 1L', article: 'ROS DOT-4', brand: 'ROS',
    category: 'Жидкости', quantity: 12, minQuantity: 5, purchasePrice: 300, sellPrice: 400,
    supplier: 'АвтоДок', lastDelivery: '2026-08-03', status: 'in_stock',
  },

  // Фильтры
  {
    id: 's5', name: 'Фильтр масляный', article: '21080101200500', brand: 'Lada Original',
    category: 'Фильтры', quantity: 30, minQuantity: 15, purchasePrice: 180, sellPrice: 250,
    supplier: 'АвтоДок', lastDelivery: '2026-08-12', status: 'in_stock',
  },
  {
    id: 's6', name: 'Фильтр масляный', article: 'W914/2', brand: 'MANN',
    category: 'Фильтры', quantity: 18, minQuantity: 10, purchasePrice: 320, sellPrice: 450,
    supplier: 'АвтоДок', lastDelivery: '2026-08-10', status: 'in_stock',
  },
  {
    id: 's7', name: 'Фильтр воздушный', article: '21120110901000', brand: 'Lada Original',
    category: 'Фильтры', quantity: 22, minQuantity: 10, purchasePrice: 220, sellPrice: 300,
    supplier: 'АвтоДок', lastDelivery: '2026-08-10', status: 'in_stock',
  },
  {
    id: 's8', name: 'Фильтр салонный', article: '21100812201000', brand: 'Lada Original',
    category: 'Фильтры', quantity: 3, minQuantity: 10, purchasePrice: 200, sellPrice: 300,
    supplier: 'АвтоДок', lastDelivery: '2026-07-28', status: 'ordered',
  },
  {
    id: 's9', name: 'Фильтр топливный', article: '21120111701000', brand: 'Lada Original',
    category: 'Фильтры', quantity: 14, minQuantity: 8, purchasePrice: 280, sellPrice: 350,
    supplier: 'АвтоДок', lastDelivery: '2026-08-08', status: 'in_stock',
  },

  // Тормозная система
  {
    id: 's10', name: 'Колодки передние', article: '21100350108000', brand: 'Lada Original',
    category: 'Тормоза', quantity: 12, minQuantity: 6, purchasePrice: 600, sellPrice: 800,
    supplier: 'АвтоДок', lastDelivery: '2026-08-12', status: 'in_stock',
  },
  {
    id: 's11', name: 'Колодки передние', article: 'GDB1448', brand: 'TRW',
    category: 'Тормоза', quantity: 6, minQuantity: 4, purchasePrice: 1100, sellPrice: 1500,
    supplier: 'АвтоДок', lastDelivery: '2026-08-14', status: 'in_stock',
  },
  {
    id: 's12', name: 'Колодки задние', article: '21080350209000', brand: 'Lada Original',
    category: 'Тормоза', quantity: 8, minQuantity: 6, purchasePrice: 500, sellPrice: 700,
    supplier: 'АвтоДок', lastDelivery: '2026-08-08', status: 'in_stock',
  },

  // Свечи
  {
    id: 's13', name: 'Свечи зажигания BPR6ES ×4', article: '7822', brand: 'NGK',
    category: 'Зажигание', quantity: 20, minQuantity: 10, purchasePrice: 300, sellPrice: 400,
    supplier: 'АвтоДок', lastDelivery: '2026-08-10', status: 'in_stock',
  },

  // ГРМ
  {
    id: 's14', name: 'Ремень ГРМ', article: '5521', brand: 'Gates',
    category: 'ГРМ', quantity: 5, minQuantity: 3, purchasePrice: 600, sellPrice: 800,
    supplier: 'АвтоДок', lastDelivery: '2026-08-01', status: 'in_stock',
  },
  {
    id: 's15', name: 'Ролик натяжной ГРМ', article: 'T42145', brand: 'Gates',
    category: 'ГРМ', quantity: 4, minQuantity: 3, purchasePrice: 450, sellPrice: 600,
    supplier: 'АвтоДок', lastDelivery: '2026-08-01', status: 'in_stock',
  },
  {
    id: 's16', name: 'Помпа водяная', article: 'BW0011', brand: 'LUZAR',
    category: 'ГРМ', quantity: 0, minQuantity: 2, purchasePrice: 900, sellPrice: 1200,
    supplier: 'АвтоДок', lastDelivery: '2026-07-20', status: 'out_of_stock',
  },

  // Прочее
  {
    id: 's17', name: 'Прокладка сливной пробки', article: '21080101200501', brand: 'Lada Original',
    category: 'Прочее', quantity: 50, minQuantity: 20, purchasePrice: 15, sellPrice: 30,
    supplier: 'АвтоДок', lastDelivery: '2026-08-10', status: 'in_stock',
  },
  {
    id: 's18', name: 'Жидкость омывателя 5L', article: 'LU5L', brand: 'Лукойл',
    category: 'Жидкости', quantity: 10, minQuantity: 5, purchasePrice: 150, sellPrice: 200,
    supplier: 'АвтоДок', lastDelivery: '2026-08-05', status: 'in_stock',
  },
]

export interface StockMovement {
  id: string
  itemId: string
  itemName: string
  itemArticle: string
  type: 'incoming' | 'outgoing'
  quantity: number
  price: number              // цена за единицу
  total: number              // итого
  date: string
  document?: string          // номер документа
  supplier?: string          // поставщик (для прихода)
  orderNumber?: string       // номер заказа (для расхода)
  responsible: string        // ответственный
  note?: string
}

export const MOCK_MOVEMENTS: StockMovement[] = [
  // Приход
  { id: 'm1', itemId: 's1', itemName: 'Масло моторное 5W-30 4L', itemArticle: '000015W304', type: 'incoming', quantity: 12, price: 1400, total: 16800, date: '2026-08-10T10:00:00', document: 'ПРХ-001', supplier: 'АвтоДок', responsible: 'Админ', note: 'Плановая поставка' },
  { id: 'm2', itemId: 's5', itemName: 'Фильтр масляный Lada', itemArticle: '21080101200500', type: 'incoming', quantity: 30, price: 180, total: 5400, date: '2026-08-12T11:30:00', document: 'ПРХ-002', supplier: 'АвтоДок', responsible: 'Админ' },
  { id: 'm3', itemId: 's10', itemName: 'Колодки передние Lada', itemArticle: '21100350108000', type: 'incoming', quantity: 10, price: 600, total: 6000, date: '2026-08-12T14:00:00', document: 'ПРХ-003', supplier: 'АвтоДок', responsible: 'Админ' },
  { id: 'm4', itemId: 's11', itemName: 'Колодки передние TRW', itemArticle: 'GDB1448', type: 'incoming', quantity: 6, price: 1100, total: 6600, date: '2026-08-14T09:00:00', document: 'ПРХ-004', supplier: 'АвтоДок', responsible: 'Админ', note: 'Срочный заказ' },
  { id: 'm5', itemId: 's13', itemName: 'Свечи NGK BPR6ES', itemArticle: '7822', type: 'incoming', quantity: 20, price: 300, total: 6000, date: '2026-08-10T15:00:00', document: 'ПРХ-005', supplier: 'АвтоДок', responsible: 'Админ' },
  { id: 'm6', itemId: 's7', itemName: 'Фильтр воздушный Lada', itemArticle: '21120110901000', type: 'incoming', quantity: 15, price: 220, total: 3300, date: '2026-08-10T10:30:00', document: 'ПРХ-006', supplier: 'АвтоДок', responsible: 'Админ' },

  // Расход
  { id: 'm7', itemId: 's1', itemName: 'Масло моторное 5W-30 4L', itemArticle: '000015W304', type: 'outgoing', quantity: 1, price: 1800, total: 1800, date: '2026-08-14T09:30:00', orderNumber: 'WO-044', responsible: 'Сидоров А.', note: 'Замена масла Vesta' },
  { id: 'm8', itemId: 's5', itemName: 'Фильтр масляный Lada', itemArticle: '21080101200500', type: 'outgoing', quantity: 1, price: 250, total: 250, date: '2026-08-14T09:30:00', orderNumber: 'WO-044', responsible: 'Сидоров А.' },
  { id: 'm9', itemId: 's10', itemName: 'Колодки передние Lada', itemArticle: '21100350108000', type: 'outgoing', quantity: 1, price: 800, total: 800, date: '2026-08-13T14:00:00', orderNumber: 'WO-043', responsible: 'Иванов П.' },
  { id: 'm10', itemId: 's14', itemName: 'Ремень ГРМ Gates', itemArticle: '5521', type: 'outgoing', quantity: 1, price: 800, total: 800, date: '2026-08-13T10:00:00', orderNumber: 'WO-042', responsible: 'Сидоров А.' },
  { id: 'm11', itemId: 's15', itemName: 'Ролик натяжной Gates', itemArticle: 'T42145', type: 'outgoing', quantity: 1, price: 600, total: 600, date: '2026-08-13T10:00:00', orderNumber: 'WO-042', responsible: 'Сидоров А.' },
  { id: 'm12', itemId: 's4', itemName: 'Жидкость тормозная DOT-4', itemArticle: 'ROS DOT-4', type: 'outgoing', quantity: 1, price: 400, total: 400, date: '2026-08-12T16:00:00', orderNumber: 'WO-041', responsible: 'Иванов П.' },
  { id: 'm13', itemId: 's3', itemName: 'Антифриз красный 5L', itemArticle: '000015E304', type: 'outgoing', quantity: 1, price: 600, total: 600, date: '2026-08-12T11:00:00', orderNumber: 'WO-040', responsible: 'Сидоров А.' },
  { id: 'm14', itemId: 's17', itemName: 'Прокладка сливной пробки', itemArticle: '21080101200501', type: 'outgoing', quantity: 2, price: 30, total: 60, date: '2026-08-14T09:30:00', orderNumber: 'WO-044', responsible: 'Сидоров А.' },
]

export function getStockByCategory(category: string): StockItem[] {
  if (category === 'all') return MOCK_STOCK
  return MOCK_STOCK.filter(item => item.category === category)
}

export function getLowStockItems(): StockItem[] {
  return MOCK_STOCK.filter(item => item.quantity <= item.minQuantity)
}

export function getStockCategories(): string[] {
  return Array.from(new Set(MOCK_STOCK.map(item => item.category)))
}

export function getStockStatus(item: StockItem): { label: string; color: string } {
  if (item.quantity === 0) return { label: 'Нет в наличии', color: 'bg-red-100 text-red-700' }
  if (item.quantity <= item.minQuantity) return { label: 'Мало', color: 'bg-yellow-100 text-yellow-700' }
  if (item.status === 'ordered') return { label: 'Заказано', color: 'bg-blue-100 text-blue-700' }
  return { label: 'В наличии', color: 'bg-green-100 text-green-700' }
}

export function getMovementsByType(type: 'incoming' | 'outgoing'): StockMovement[] {
  return MOCK_MOVEMENTS.filter(m => m.type === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getMovementsByItem(itemId: string): StockMovement[] {
  return MOCK_MOVEMENTS.filter(m => m.itemId === itemId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getTotalStockValue(): number {
  return MOCK_STOCK.reduce((sum, item) => sum + (item.quantity * item.purchasePrice), 0)
}

export function getIncomingTotal(): number {
  return MOCK_MOVEMENTS.filter(m => m.type === 'incoming').reduce((sum, m) => sum + m.total, 0)
}

export function getOutgoingTotal(): number {
  return MOCK_MOVEMENTS.filter(m => m.type === 'outgoing').reduce((sum, m) => sum + m.total, 0)
}
