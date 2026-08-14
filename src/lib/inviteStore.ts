'use client'

import { generateInviteToken } from './auth'

export interface InviteToken {
  id: string
  token: string
  tenantId?: string
  tenantSlug?: string
  role: 'admin' | 'mechanic'
  isUsed: boolean
  usedByName?: string
  createdAt: string
}

const STORAGE_KEY = 'autoservice_invites'

export function getInvites(): InviteToken[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

export function createInvite(role: 'admin' | 'mechanic', tenantId?: string, tenantSlug?: string): InviteToken {
  const invite: InviteToken = {
    id: 'inv_' + Date.now().toString(36),
    token: generateInviteToken(),
    tenantId,
    tenantSlug,
    role,
    isUsed: false,
    createdAt: new Date().toISOString(),
  }
  const invites = getInvites()
  invites.push(invite)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invites))
  return invite
}

export function getInviteByToken(token: string): InviteToken | undefined {
  return getInvites().find(i => i.token === token && !i.isUsed)
}

export function useInvite(token: string, userName: string): boolean {
  const invites = getInvites()
  const idx = invites.findIndex(i => i.token === token && !i.isUsed)
  if (idx === -1) return false
  invites[idx].isUsed = true
  invites[idx].usedByName = userName
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invites))
  return true
}

export function deleteInvite(id: string): void {
  const invites = getInvites().filter(i => i.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invites))
}
