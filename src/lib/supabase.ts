import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface DbTenant {
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
  created_at: string
}

export interface DbAdminUser {
  id: string
  tenant_id: string
  name: string
  login: string
  password_hash: string
  role: 'super_admin' | 'admin' | 'mechanic'
  is_active: boolean
  created_at: string
}

export interface DbClient {
  id: string
  phone: string
  name?: string
  email?: string
  telegram_chat_id?: string
  verified: boolean
  created_at: string
}

export interface DbVehicle {
  id: string
  client_id: string
  brand: string
  model: string
  year: number
  engine: string
  plate?: string
  vin?: string
  mileage?: number
  created_at: string
}

export interface DbService {
  id: string
  tenant_id: string
  name: string
  category: string
  description?: string
  labor_price: number
  duration: number
  is_active: boolean
  created_at: string
}

export interface DbBooking {
  id: string
  tenant_id: string
  client_id: string
  vehicle_id: string
  service_ids: string[]
  date: string
  time?: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  total_price: number
  notes?: string
  created_at: string
}

export interface DbOrder {
  id: string
  tenant_id: string
  client_id: string
  vehicle_id: string
  booking_id?: string
  services: { name: string; price: number }[]
  parts: { name: string; brand: string; price: number; quantity: number }[]
  labor_total: number
  parts_total: number
  total: number
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  mechanic_id?: string
  notes?: string
  created_at: string
  completed_at?: string
}
