'use client'

import { supabase } from './supabase'

// ============================================
// AUTH MODULE — Supabase-backed authentication
// ============================================

// Password hashing (SHA-256 with salt)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'autoservice_salt_2026')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Code generation
export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function verifyCode(input: string, expected: string): boolean {
  return input === expected
}

// Token payload
export interface TokenPayload {
  userId: string
  role: 'super_admin' | 'admin' | 'mechanic' | 'client'
  tenantId?: string
  name?: string
  exp: number
}

// Session management (localStorage for client-side session)
const SESSION_KEY = 'autoservice_session'

export function saveSession(payload: TokenPayload): void {
  const token = { ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 }
  localStorage.setItem(SESSION_KEY, btoa(JSON.stringify(token)))
}

export function getSession(): TokenPayload | null {
  if (typeof window === 'undefined') return null
  const token = localStorage.getItem(SESSION_KEY)
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token)) as TokenPayload
    if (payload.exp < Date.now()) { clearSession(); return null }
    return payload
  } catch { return null }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function hasRole(role: TokenPayload['role']): boolean {
  return getSession()?.role === role
}

export function getCurrentTenantId(): string | null {
  return getSession()?.tenantId || null
}

// ===== SUPER ADMIN REGISTRATION =====
export async function registerSuperAdmin(login: string, password: string, email: string): Promise<{ success: boolean; error?: string }> {
  // Check if already exists
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('role', 'super_admin')
    .limit(1)
    .single()

  if (existing) {
    return { success: false, error: 'Super Admin уже зарегистрирован' }
  }

  const passwordHash = await hashPassword(password)

  const { error } = await supabase
    .from('admin_users')
    .insert({
      name: 'Super Admin',
      login,
      password_hash: passwordHash,
      role: 'super_admin',
      is_active: true,
    })

  if (error) return { success: false, error: error.message }
  return { success: true }
}

// ===== SUPER ADMIN LOGIN =====
export async function loginSuperAdmin(login: string, password: string): Promise<{ success: boolean; error?: string; needs2FA?: boolean }> {
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('login', login)
    .eq('role', 'super_admin')
    .eq('is_active', true)
    .single()

  if (error || !user) {
    return { success: false, error: 'Неверный логин' }
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return { success: false, error: 'Неверный пароль' }
  }

  return { success: true, needs2FA: true }
}

// ===== ADMIN LOGIN =====
export async function loginAdmin(login: string, password: string, tenantId: string): Promise<{ success: boolean; error?: string; user?: any }> {
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('login', login)
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .single()

  if (error || !user) {
    return { success: false, error: 'Неверный логин' }
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return { success: false, error: 'Неверный пароль' }
  }

  saveSession({
    userId: user.id,
    role: user.role as TokenPayload['role'],
    tenantId: user.tenant_id,
    name: user.name,
  })

  return { success: true, user }
}

// ===== ADMIN REGISTRATION (via invite) =====
export async function registerAdmin(
  inviteToken: string,
  login: string,
  password: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  // Verify invite
  const { data: invite, error: inviteError } = await supabase
    .from('invite_tokens')
    .select('*')
    .eq('token', inviteToken)
    .eq('is_used', false)
    .single()

  if (inviteError || !invite) {
    return { success: false, error: 'Недействительный или использованный токен' }
  }

  const passwordHash = await hashPassword(password)

  // Create admin user
  const { error: createError } = await supabase
    .from('admin_users')
    .insert({
      tenant_id: invite.tenant_id,
      name,
      login,
      password_hash: passwordHash,
      role: invite.role || 'admin',
      is_active: true,
    })

  if (createError) {
    return { success: false, error: 'Логин уже занят' }
  }

  // Mark invite as used
  await supabase
    .from('invite_tokens')
    .update({ is_used: true, used_by: name })
    .eq('id', invite.id)

  return { success: true }
}

// ===== CLIENT AUTH (phone + code) =====
export async function sendClientCode(phone: string): Promise<{ success: boolean; code?: string; error?: string }> {
  // Generate code
  const code = generateCode()

  // Store code in Supabase (for demo, we return it directly)
  // In production: send via Telegram bot
  const { error } = await supabase
    .from('auth_codes')
    .insert({
      phone,
      code,
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 min
    })

  if (error) {
    // Fallback: just return the code for demo
    console.warn('Auth code storage error:', error)
  }

  return { success: true, code } // In production: don't return code, send via Telegram
}

export async function verifyClientCode(phone: string, code: string): Promise<{ success: boolean; clientId?: string; error?: string }> {
  // Find or create client
  const { data: client, error } = await supabase
    .from('clients')
    .upsert({ phone, verified: true }, { onConflict: 'phone' })
    .select()
    .single()

  if (error) {
    return { success: false, error: 'Ошибка верификации' }
  }

  saveSession({
    userId: client.id,
    role: 'client',
    name: client.name || undefined,
  })

  return { success: true, clientId: client.id }
}

// ===== INVITE TOKENS =====
export function generateInviteToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = 'INV-'
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function createInvite(tenantId: string, role: 'admin' | 'mechanic' = 'admin'): Promise<string> {
  const token = generateInviteToken()
  await supabase
    .from('invite_tokens')
    .insert({
      token,
      tenant_id: tenantId,
      role,
      is_used: false,
    })
  return token
}

export async function getInvites(tenantId?: string) {
  let query = supabase.from('invite_tokens').select('*').order('created_at', { ascending: false })
  if (tenantId) {
    query = query.eq('tenant_id', tenantId)
  }
  const { data } = await query
  return data || []
}
