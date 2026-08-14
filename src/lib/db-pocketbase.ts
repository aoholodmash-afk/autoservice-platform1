import { getPocketBase } from './pocketbase'
import type { Tenant, Client, Vehicle, Service, Booking, Order, Review, StockItem, InviteToken } from './pocketbase'

const pb = getPocketBase()

// ===== TENANTS =====
export async function fetchTenants(): Promise<Tenant[]> {
  const records = await pb.collection('tenants').getFullList({ filter: 'is_active = true', sort: '-created' })
  return records as unknown as Tenant[]
}

export async function fetchTenantBySlug(slug: string): Promise<Tenant | null> {
  try {
    const record = await pb.collection('tenants').getFirstListItem(`slug = "${slug}" && is_active = true`)
    return record as unknown as Tenant
  } catch { return null }
}

export async function createTenant(data: Partial<Tenant>): Promise<Tenant> {
  const record = await pb.collection('tenants').create(data)
  return record as unknown as Tenant
}

export async function updateTenant(id: string, data: Partial<Tenant>): Promise<void> {
  await pb.collection('tenants').update(id, data)
}

// ===== AUTH =====
export async function registerSuperAdmin(login: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if exists
    const existing = await pb.collection('admin_users').getFirstListItem('role = "super_admin"').catch(() => null)
    if (existing) return { success: false, error: 'Super Admin уже зарегистрирован' }

    await pb.collection('admin_users').create({
      name,
      login,
      password, // PocketBase handles hashing
      role: 'super_admin',
      is_active: true,
    })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

export async function loginSuperAdmin(login: string, password: string): Promise<{ success: boolean; error?: string; user?: any }> {
  try {
    const record = await pb.collection('admin_users').authWithPassword(login, password)
    return { success: true, user: record.record }
  } catch (e: any) {
    return { success: false, error: 'Неверный логин или пароль' }
  }
}

export async function loginAdmin(login: string, password: string, tenantId: string): Promise<{ success: boolean; error?: string; user?: any }> {
  try {
    const record = await pb.collection('admin_users').authWithPassword(login, password)
    if (record.record.tenant_id !== tenantId) {
      return { success: false, error: 'Нет доступа к этому филиалу' }
    }
    return { success: true, user: record.record }
  } catch (e: any) {
    return { success: false, error: 'Неверный логин или пароль' }
  }
}

export async function registerAdmin(inviteToken: string, login: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
  try {
    const invite = await pb.collection('invite_tokens').getFirstListItem(`token = "${inviteToken}" && is_used = false`)
    
    await pb.collection('admin_users').create({
      tenant_id: invite.tenant_id,
      name,
      login,
      password,
      role: invite.role || 'admin',
      is_active: true,
    })

    await pb.collection('invite_tokens').update(invite.id, { is_used: true, used_by: name })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

// ===== CLIENTS =====
export async function fetchOrCreateClient(phone: string, name?: string): Promise<Client> {
  try {
    const existing = await pb.collection('clients').getFirstListItem(`phone = "${phone}"`)
    return existing as unknown as Client
  } catch {
    const record = await pb.collection('clients').create({ phone, name, verified: true })
    return record as unknown as Client
  }
}

export async function fetchClientsByTenant(tenantId: string): Promise<Client[]> {
  const bookings = await pb.collection('bookings').getFullList({ filter: `tenant_id = "${tenantId}"`, fields: 'client_id' })
  const clientIds = [...new Set(bookings.map(b => b.client_id).filter(Boolean))]
  if (clientIds.length === 0) return []
  const filter = clientIds.map(id => `id = "${id}"`).join(' || ')
  const records = await pb.collection('clients').getFullList({ filter })
  return records as unknown as Client[]
}

// ===== VEHICLES =====
export async function fetchVehiclesByClient(clientId: string): Promise<Vehicle[]> {
  const records = await pb.collection('vehicles').getFullList({ filter: `client_id = "${clientId}"`, sort: '-created' })
  return records as unknown as Vehicle[]
}

export async function createVehicle(data: Partial<Vehicle>): Promise<Vehicle> {
  const record = await pb.collection('vehicles').create(data)
  return record as unknown as Vehicle
}

// ===== SERVICES =====
export async function fetchServicesByTenant(tenantId: string): Promise<Service[]> {
  const records = await pb.collection('services').getFullList({
    filter: `tenant_id = "${tenantId}" && is_active = true`,
    sort: 'category',
  })
  return records as unknown as Service[]
}

export async function createService(data: Partial<Service>): Promise<Service> {
  const record = await pb.collection('services').create(data)
  return record as unknown as Service
}

export async function updateService(id: string, data: Partial<Service>): Promise<void> {
  await pb.collection('services').update(id, data)
}

// ===== BOOKINGS =====
export async function createBooking(data: Partial<Booking>): Promise<Booking> {
  const record = await pb.collection('bookings').create(data)
  return record as unknown as Booking
}

export async function fetchBookingsByTenant(tenantId: string, date?: string): Promise<Booking[]> {
  let filter = `tenant_id = "${tenantId}"`
  if (date) filter += ` && date = "${date}"`
  const records = await pb.collection('bookings').getFullList({ filter, sort: 'date,time' })
  return records as unknown as Booking[]
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
  await pb.collection('bookings').update(id, { status })
}

// ===== ORDERS =====
export async function createOrder(data: Partial<Order>): Promise<Order> {
  const record = await pb.collection('orders').create(data)
  return record as unknown as Order
}

export async function fetchOrdersByTenant(tenantId: string): Promise<Order[]> {
  const records = await pb.collection('orders').getFullList({
    filter: `tenant_id = "${tenantId}"`,
    sort: '-created',
  })
  return records as unknown as Order[]
}

export async function fetchOrdersByClient(clientId: string): Promise<Order[]> {
  const records = await pb.collection('orders').getFullList({
    filter: `client_id = "${clientId}"`,
    sort: '-created',
  })
  return records as unknown as Order[]
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  await pb.collection('orders').update(id, {
    status,
    completed_at: status === 'completed' ? new Date().toISOString() : undefined,
  })
}

// ===== REVIEWS =====
export async function createReview(data: Partial<Review>): Promise<Review> {
  const record = await pb.collection('reviews').create(data)
  return record as unknown as Review
}

export async function fetchReviewsByTenant(tenantId: string): Promise<Review[]> {
  const records = await pb.collection('reviews').getFullList({
    filter: `tenant_id = "${tenantId}"`,
    sort: '-created',
  })
  return records as unknown as Review[]
}

// ===== STOCK =====
export async function fetchStockByTenant(tenantId: string): Promise<StockItem[]> {
  const records = await pb.collection('stock_items').getFullList({
    filter: `tenant_id = "${tenantId}"`,
    sort: 'category',
  })
  return records as unknown as StockItem[]
}

export async function createStockItem(data: Partial<StockItem>): Promise<StockItem> {
  const record = await pb.collection('stock_items').create(data)
  return record as unknown as StockItem
}

export async function updateStockQuantity(id: string, quantity: number): Promise<void> {
  await pb.collection('stock_items').update(id, { quantity })
}

// ===== INVITE TOKENS =====
export async function createInvite(tenantId: string, role: 'admin' | 'mechanic' = 'admin'): Promise<string> {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let token = 'INV-'
  for (let i = 0; i < 6; i++) token += chars.charAt(Math.floor(Math.random() * chars.length))

  await pb.collection('invite_tokens').create({
    token,
    tenant_id: tenantId,
    role,
    is_used: false,
  })
  return token
}

export async function getInvites(tenantId?: string): Promise<InviteToken[]> {
  let filter = ''
  if (tenantId) filter = `tenant_id = "${tenantId}"`
  const records = await pb.collection('invite_tokens').getFullList({ filter, sort: '-created' })
  return records as unknown as InviteToken[]
}
