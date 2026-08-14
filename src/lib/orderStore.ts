'use client'

export interface StoredOrder {
  id: string
  token: string
  clientName: string
  clientPhone: string
  vehicleName: string
  serviceName: string
  category: string
  date: string
  time?: string
  laborPrice: number
  partsPrice: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  notes?: string
}

const STORAGE_KEY = 'autoservice_orders'

function generateId(): string {
  return 'WO-' + Math.floor(Math.random() * 9000 + 1000)
}

function generateToken(): string {
  return 'track-' + Math.random().toString(36).slice(2, 8)
}

export function getOrders(): StoredOrder[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveOrder(order: Omit<StoredOrder, 'id' | 'token' | 'createdAt' | 'status'>): StoredOrder {
  const newOrder: StoredOrder = {
    ...order,
    id: generateId(),
    token: generateToken(),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }
  const orders = getOrders()
  orders.unshift(newOrder)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  return newOrder
}

export function getOrderByToken(token: string): StoredOrder | undefined {
  return getOrders().find(o => o.token === token)
}

export function getOrdersByPhone(phone: string): StoredOrder[] {
  return getOrders().filter(o => o.clientPhone === phone)
}

export function getTotalSpent(): number {
  return getOrders()
    .filter(o => o.status === 'completed' || o.status === 'confirmed')
    .reduce((sum, o) => sum + o.totalPrice, 0)
}
