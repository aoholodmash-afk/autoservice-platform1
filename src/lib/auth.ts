'use client'

// ============================================
// AUTH MODULE — Хеширование, коды, JWT (localStorage-based demo)
// ============================================

// Simple hash for demo (use bcrypt in production)
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

// 6-digit code generation
export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function verifyCode(input: string, expected: string): boolean {
  return input === expected
}

// Simple JWT-like token (base64 encoded, not cryptographically secure — demo only)
export interface TokenPayload {
  userId: string
  role: 'super_admin' | 'admin' | 'mechanic' | 'client'
  tenantId?: string
  exp: number
}

export function generateToken(payload: Omit<TokenPayload, 'exp'>): string {
  const token = { ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 } // 24h
  return btoa(JSON.stringify(token))
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const payload = JSON.parse(atob(token)) as TokenPayload
    if (payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

// Session management
const SESSION_KEY = 'autoservice_session'

export function saveSession(payload: Omit<TokenPayload, 'exp'>): void {
  localStorage.setItem(SESSION_KEY, generateToken(payload))
}

export function getSession(): TokenPayload | null {
  const token = localStorage.getItem(SESSION_KEY)
  if (!token) return null
  return verifyToken(token)
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function hasRole(role: TokenPayload['role']): boolean {
  const session = getSession()
  return session?.role === role
}

export function getCurrentTenantId(): string | null {
  return getSession()?.tenantId || null
}

// Invite token generation
export function generateInviteToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = 'INV-'
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
