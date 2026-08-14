import PocketBase from 'pocketbase'

const PB_URL = process.env.NEXT_PUBLIC_PB_URL || 'http://localhost:8090'

// Singleton PocketBase instance
let pb: PocketBase | null = null

export function getPocketBase(): PocketBase {
  if (!pb) {
    pb = new PocketBase(PB_URL)
    pb.autoCancellation(false)
  }
  return pb
}

// Collection types
export interface Tenant {
  id: string
  slug: string
  name: string
  address: string
  phone: string
  email: string
  description?: string
  logo?: string
  work_hours: string
  boxes: number
  service_categories: string[]
  tariff: 'start' | 'business' | 'pro'
  is_active: boolean
  city?: string
  created: string
  updated: string
}

export interface AdminUser {
  id: string
  tenant_id: string
  name: string
  login: string
  role: 'super_admin' | 'admin' | 'mechanic'
  is_active: boolean
  created: string
}

export interface Client {
  id: string
  phone: string
  name?: string
  email?: string
  telegram_chat_id?: string
  verified: boolean
  created: string
}

export interface Vehicle {
  id: string
  client_id: string
  brand: string
  model: string
  year: number
  engine: string
  plate?: string
  vin?: string
  mileage?: number
  created: string
}

export interface Service {
  id: string
  tenant_id: string
  name: string
  category: string
  description?: string
  labor_price: number
  duration: number
  is_active: boolean
  created: string
}

export interface Booking {
  id: string
  tenant_id: string
  client_id?: string
  vehicle_id?: string
  client_name: string
  client_phone: string
  service_name: string
  date: string
  time?: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  created: string
}

export interface Order {
  id: string
  tenant_id: string
  client_id?: string
  vehicle_id?: string
  order_number: string
  client_name: string
  client_phone: string
  vehicle_name?: string
  services: { name: string; price: number }[]
  parts: { name: string; brand: string; price: number; quantity: number }[]
  labor_total: number
  parts_total: number
  total: number
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  mechanic_id?: string
  notes?: string
  created: string
  completed_at?: string
}

export interface Review {
  id: string
  tenant_id: string
  client_id?: string
  order_id?: string
  client_name: string
  rating: number
  text: string
  created: string
}

export interface StockItem {
  id: string
  tenant_id: string
  name: string
  article?: string
  brand?: string
  category?: string
  quantity: number
  min_quantity: number
  purchase_price: number
  sell_price: number
  supplier?: string
  created: string
}

export interface InviteToken {
  id: string
  token: string
  tenant_id?: string
  role: 'admin' | 'mechanic'
  is_used: boolean
  used_by?: string
  created: string
}
