'use client'

import PocketBase from 'pocketbase'

const PB_URL = typeof window !== 'undefined' 
  ? (window as any).__PB_URL || 'http://localhost:8090'
  : 'http://localhost:8090'

let pb: PocketBase | null = null

function getPB(): PocketBase {
  if (!pb) {
    pb = new PocketBase(PB_URL)
    pb.autoCancellation(false)
  }
  return pb
}

export interface Tenant {
  id: string
  slug: string
  name: string
  address: string
  phone: string
  email: string
  description?: string
  logo?: string
  workHours: string
  boxes: number
  serviceCategories: string[]
  tariff: 'start' | 'business' | 'pro'
  isActive: boolean
  createdAt: string
  city?: string
}

// Map PocketBase record to Tenant
function mapRecord(record: any): Tenant {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    address: record.address,
    phone: record.phone,
    email: record.email || '',
    description: record.description,
    logo: record.logo,
    workHours: record.work_hours || '09:00-20:00',
    boxes: record.boxes || 2,
    serviceCategories: record.service_categories || [],
    tariff: record.tariff || 'start',
    isActive: record.is_active !== false,
    createdAt: record.created,
    city: record.city,
  }
}

// ===== READ =====

export async function getTenants(): Promise<Tenant[]> {
  try {
    const records = await getPB().collection('tenants').getFullList({
      filter: 'is_active = true',
      sort: '-created',
    })
    return records.map(mapRecord)
  } catch {
    return []
  }
}

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  try {
    const record = await getPB().collection('tenants').getFirstListItem(`slug = "${slug}" && is_active = true`)
    return mapRecord(record)
  } catch {
    return null
  }
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  try {
    const record = await getPB().collection('tenants').getOne(id)
    return mapRecord(record)
  } catch {
    return null
  }
}

// ===== WRITE =====

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30)
}

export async function saveTenant(data: {
  name: string
  slug: string
  address: string
  phone: string
  email?: string
  description?: string
  workHours?: string
  boxes?: number
  serviceCategories?: string[]
  tariff?: string
  city?: string
}): Promise<Tenant> {
  const record = await getPB().collection('tenants').create({
    name: data.name,
    slug: data.slug,
    address: data.address,
    phone: data.phone,
    email: data.email || '',
    description: data.description || '',
    work_hours: data.workHours || '09:00-20:00',
    boxes: data.boxes || 2,
    service_categories: data.serviceCategories || [],
    tariff: data.tariff || 'start',
    is_active: true,
    city: data.city || '',
  })
  return mapRecord(record)
}

export async function updateTenant(id: string, updates: Partial<Tenant>): Promise<void> {
  const pbData: any = {}
  if (updates.name !== undefined) pbData.name = updates.name
  if (updates.slug !== undefined) pbData.slug = updates.slug
  if (updates.address !== undefined) pbData.address = updates.address
  if (updates.phone !== undefined) pbData.phone = updates.phone
  if (updates.email !== undefined) pbData.email = updates.email
  if (updates.description !== undefined) pbData.description = updates.description
  if (updates.workHours !== undefined) pbData.work_hours = updates.workHours
  if (updates.boxes !== undefined) pbData.boxes = updates.boxes
  if (updates.serviceCategories !== undefined) pbData.service_categories = updates.serviceCategories
  if (updates.tariff !== undefined) pbData.tariff = updates.tariff
  if (updates.isActive !== undefined) pbData.is_active = updates.isActive
  if (updates.city !== undefined) pbData.city = updates.city

  await getPB().collection('tenants').update(id, pbData)
}

export async function deleteTenant(id: string): Promise<void> {
  await getPB().collection('tenants').update(id, { is_active: false })
}
