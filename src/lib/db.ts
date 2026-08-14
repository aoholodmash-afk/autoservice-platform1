import { supabase } from './supabase'
import type { DbTenant, DbClient, DbVehicle, DbService, DbBooking, DbOrder, DbReview } from './supabase'

// ===== TENANTS =====
export async function fetchTenants(): Promise<DbTenant[]> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function fetchTenantBySlug(slug: string): Promise<DbTenant | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  if (error) return null
  return data
}

export async function createTenant(tenant: Omit<DbTenant, 'id' | 'created_at'>): Promise<DbTenant> {
  const { data, error } = await supabase
    .from('tenants')
    .insert(tenant)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateTenant(id: string, updates: Partial<DbTenant>): Promise<void> {
  const { error } = await supabase
    .from('tenants')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

// ===== CLIENTS =====
export async function fetchOrCreateClient(phone: string, name?: string): Promise<DbClient> {
  // Try to find existing
  const { data: existing } = await supabase
    .from('clients')
    .select('*')
    .eq('phone', phone)
    .single()

  if (existing) return existing

  // Create new
  const { data, error } = await supabase
    .from('clients')
    .insert({ phone, name, verified: true })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchClientsByTenant(tenantId: string): Promise<DbClient[]> {
  // Clients who have bookings or orders at this tenant
  const { data: bookings } = await supabase
    .from('bookings')
    .select('client_id')
    .eq('tenant_id', tenantId)

  const clientIds = [...new Set(bookings?.map(b => b.client_id).filter(Boolean))]

  if (clientIds.length === 0) return []

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .in('id', clientIds)
  if (error) throw error
  return data || []
}

// ===== VEHICLES =====
export async function fetchVehiclesByClient(clientId: string): Promise<DbVehicle[]> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createVehicle(vehicle: Omit<DbVehicle, 'id' | 'created_at'>): Promise<DbVehicle> {
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicle)
    .select()
    .single()
  if (error) throw error
  return data
}

// ===== SERVICES =====
export async function fetchServicesByTenant(tenantId: string): Promise<DbService[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('category')
  if (error) throw error
  return data || []
}

export async function createService(service: Omit<DbService, 'id' | 'created_at'>): Promise<DbService> {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateService(id: string, updates: Partial<DbService>): Promise<void> {
  const { error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
  if (error) throw error
}

// ===== BOOKINGS =====
export async function createBooking(booking: Omit<DbBooking, 'id' | 'created_at'>): Promise<DbBooking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchBookingsByTenant(tenantId: string, date?: string): Promise<DbBooking[]> {
  let query = supabase
    .from('bookings')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('date')
    .order('time')

  if (date) {
    query = query.eq('date', date)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function updateBookingStatus(id: string, status: DbBooking['status']): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

// ===== ORDERS =====
export async function createOrder(order: Omit<DbOrder, 'id' | 'created_at'>): Promise<DbOrder> {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchOrdersByTenant(tenantId: string): Promise<DbOrder[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function fetchOrdersByClient(clientId: string): Promise<DbOrder[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateOrderStatus(id: string, status: DbOrder['status']): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ status, completed_at: status === 'completed' ? new Date().toISOString() : undefined })
    .eq('id', id)
  if (error) throw error
}

// ===== REVIEWS =====
export async function createReview(review: Omit<DbReview, 'id' | 'created_at'>): Promise<DbReview> {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchReviewsByTenant(tenantId: string): Promise<DbReview[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ===== STOCK =====
export async function fetchStockByTenant(tenantId: string) {
  const { data, error } = await supabase
    .from('stock_items')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('category')
  if (error) throw error
  return data || []
}

export async function createStockItem(item: any) {
  const { data, error } = await supabase
    .from('stock_items')
    .insert(item)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateStockQuantity(id: string, quantity: number): Promise<void> {
  const { error } = await supabase
    .from('stock_items')
    .update({ quantity })
    .eq('id', id)
  if (error) throw error
}
