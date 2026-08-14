export interface StockItem {
  id: string
  name: string
  article: string
  brand: string
  category: string
  quantity: number
  minQuantity: number
  purchasePrice: number
  sellPrice: number
  supplier?: string
  lastDelivery?: string
  status: 'in_stock' | 'low' | 'out_of_stock' | 'ordered'
}

export interface StockMovement {
  id: string
  itemId: string
  itemName: string
  itemArticle: string
  type: 'incoming' | 'outgoing'
  quantity: number
  price: number
  total: number
  date: string
  document?: string
  supplier?: string
  orderNumber?: string
  responsible: string
  note?: string
}

export const MOCK_STOCK: StockItem[] = []
export const MOCK_MOVEMENTS: StockMovement[] = []

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
