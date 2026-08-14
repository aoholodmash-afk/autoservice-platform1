'use client'

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
  serviceCategories: string[]   // ['to', 'repair', 'diagnostic', 'tires']
  tariff: 'start' | 'business' | 'pro'
  isActive: boolean
  createdAt: string
  city?: string
}

const STORAGE_KEY = 'autoservice_tenants'

function generateId(): string {
  return 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30)
}

export function getTenants(): Tenant[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : getDefaultTenants()
  } catch { return getDefaultTenants() }
}

export function getTenantBySlug(slug: string): Tenant | undefined {
  return getTenants().find(t => t.slug === slug && t.isActive)
}

export function getTenantById(id: string): Tenant | undefined {
  return getTenants().find(t => t.id === id)
}

export function saveTenant(tenant: Omit<Tenant, 'id' | 'createdAt'>): Tenant {
  const newTenant: Tenant = {
    ...tenant,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  const tenants = getTenants()
  tenants.push(newTenant)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tenants))
  return newTenant
}

export function updateTenant(id: string, updates: Partial<Tenant>): void {
  const tenants = getTenants().map(t => t.id === id ? { ...t, ...updates } : t)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tenants))
}

export function deleteTenant(id: string): void {
  const tenants = getTenants().filter(t => t.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tenants))
}

export function getDefaultTenants(): Tenant[] {
  return [
    {
      id: 't_default',
      slug: 'avtomaster-pro',
      name: 'Автомастер Про',
      address: 'ул. Пушкина, д. 10',
      phone: '+7 (999) 123-45-67',
      email: 'info@avtomaster.pro',
      description: 'Профессиональный ремонт и обслуживание автомобилей',
      workHours: '09:00–20:00',
      boxes: 4,
      serviceCategories: ['to', 'repair', 'diagnostic', 'tires'],
      tariff: 'pro',
      isActive: true,
      createdAt: '2026-01-15T10:00:00',
      city: 'Москва',
    },
    {
      id: 't_south',
      slug: 'autoservice-yug',
      name: 'АвтоСервис Юг',
      address: 'пр. Победы, д. 45',
      phone: '+7 (999) 234-56-78',
      email: 'info@auto-yug.ru',
      description: 'Быстрый и качественный ремонт',
      workHours: '08:00–19:00',
      boxes: 3,
      serviceCategories: ['to', 'repair', 'tires'],
      tariff: 'business',
      isActive: true,
      createdAt: '2026-03-20T10:00:00',
      city: 'Москва',
    },
    {
      id: 't_north',
      slug: 'autoservice-sever',
      name: 'АвтоСервис Север',
      address: 'ул. Ленина, д. 78',
      phone: '+7 (999) 345-67-89',
      email: 'info@auto-sever.ru',
      description: 'Специалисты по ВАЗ и Lada',
      workHours: '09:00–21:00',
      boxes: 5,
      serviceCategories: ['to', 'repair', 'diagnostic'],
      tariff: 'start',
      isActive: true,
      createdAt: '2026-05-10T10:00:00',
      city: 'Санкт-Петербург',
    },
  ]
}
