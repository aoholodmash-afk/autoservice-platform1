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
