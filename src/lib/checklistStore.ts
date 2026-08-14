'use client'

import { ChecklistItem } from '@/data/checklist'

export interface StoredChecklist {
  id: string
  templateId: string
  items: ChecklistItem[]
  date: string
  vehicleName: string
}

const STORAGE_KEY = 'autoservice_checklists'

export function getChecklists(): StoredChecklist[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

export function saveChecklist(templateId: string, items: ChecklistItem[], vehicleName: string): StoredChecklist {
  const newChecklist: StoredChecklist = {
    id: `cl${Date.now()}`, templateId, items, vehicleName,
    date: new Date().toISOString(),
  }
  const checklists = getChecklists()
  checklists.unshift(newChecklist)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checklists))
  return newChecklist
}
