'use client'

export interface AdminUser {
  id: string
  tenantId: string
  name: string
  phone: string
  role: 'super_admin' | 'admin' | 'mechanic'
  isActive: boolean
}

export interface AuthState {
  isAuthenticated: boolean
  user: AdminUser | null
}

const STORAGE_KEY = 'autoservice_admin_user'

export function getAdminUsers(): AdminUser[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('autoservice_admin_users')
    return stored ? JSON.parse(stored) : getDefaultAdminUsers()
  } catch { return getDefaultAdminUsers() }
}

export function getAuthState(): AuthState {
  if (typeof window === 'undefined') return { isAuthenticated: false, user: null }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { isAuthenticated: false, user: null }
  } catch { return { isAuthenticated: false, user: null } }
}

export function loginAdmin(phone: string, code: string): AdminUser | null {
  // Demo: any 4-digit code works
  if (code.length !== 4) return null
  const users = getAdminUsers()
  const user = users.find(u => u.phone === phone && u.isActive)
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated: true, user }))
    return user
  }
  // If phone not found, create a demo admin
  const demoUser: AdminUser = {
    id: 'admin_demo',
    tenantId: 't_default',
    name: 'Администратор',
    phone,
    role: 'admin',
    isActive: true,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated: true, user: demoUser }))
  return demoUser
}

export function loginSuperAdmin(phone: string, code: string): AdminUser | null {
  if (code.length !== 4) return null
  const superAdmin: AdminUser = {
    id: 'super_admin',
    tenantId: '*',
    name: 'Главный администратор',
    phone,
    role: 'super_admin',
    isActive: true,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated: true, user: superAdmin }))
  return superAdmin
}

export function logoutAdmin(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function isSuperAdmin(): boolean {
  const state = getAuthState()
  return state.isAuthenticated && state.user?.role === 'super_admin'
}

export function getCurrentTenantId(): string | null {
  const state = getAuthState()
  return state.user?.tenantId || null
}

function getDefaultAdminUsers(): AdminUser[] {
  return []
}
