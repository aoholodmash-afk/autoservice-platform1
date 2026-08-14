export interface JournalEntry {
  id: string
  timestamp: string
  type: 'order' | 'booking' | 'payment' | 'status' | 'stock' | 'system'
  title: string
  description: string
  user?: string
  amount?: number
}

export const MOCK_JOURNAL: JournalEntry[] = []
