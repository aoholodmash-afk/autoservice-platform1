'use client'

export interface StoredReview {
  id: string
  clientName: string
  rating: number
  text: string
  date: string
  serviceName: string
}

const STORAGE_KEY = 'autoservice_reviews'

export function getReviews(): StoredReview[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

export function saveReview(review: Omit<StoredReview, 'id' | 'date'>): StoredReview {
  const newReview: StoredReview = { ...review, id: `r${Date.now()}`, date: new Date().toISOString().split('T')[0] }
  const reviews = getReviews()
  reviews.unshift(newReview)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
  return newReview
}
