export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
  birthday?: string
  cars: ClientCar[]
  totalOrders: number
  totalSpent: number
  lastVisit: string
  notes?: string
  status: 'active' | 'inactive' | 'vip'
  orders: ClientOrder[]
}

export interface ClientCar {
  brand: string
  model: string
  year: number
  plate: string
  vin?: string
  mileage?: number
  color?: string
}

export interface ClientOrder {
  id: string
  date: string
  car: string
  services: string[]
  parts: string[]
  laborPrice: number
  partsPrice: number
  total: number
  status: 'completed' | 'in_progress' | 'cancelled'
  mechanic?: string
}

export const MOCK_CLIENTS: Client[] = []
