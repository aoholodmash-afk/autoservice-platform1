export interface Review {
  id: string
  clientName: string
  clientInitial: string
  carModel: string
  rating: number
  text: string
  date: string
  serviceName: string
  mechanicName: string
  photos?: string[]
  reply?: string
  replyDate?: string
}

export const MOCK_REVIEWS: Review[] = []

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach(r => dist[r.rating]++)
  return dist
}
