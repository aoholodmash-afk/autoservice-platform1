'use client'

export interface StoredLocation {
  id: string
  name: string
  address: string
  phone: string
}

const STORAGE_KEY = 'autoservice_location'

export function getLocation(): StoredLocation | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch { return null }
}

export function saveLocation(location: StoredLocation): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
}
