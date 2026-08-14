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

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1', clientName: 'Дмитрий К.', clientInitial: 'Д', carModel: 'Lada Vesta 2020',
    rating: 5, text: 'Отличный сервис! Быстро заменили масло и фильтры. Мастер Алексей всё объяснил, показал старые детали. Рекомендую!',
    date: '2026-08-10', serviceName: 'ТО (масло + фильтры)', mechanicName: 'Алексей С.',
  },
  {
    id: 'r2', clientName: 'Мария П.', clientInitial: 'М', carModel: 'Lada Granta 2019',
    rating: 4, text: 'Хорошая работа, но пришлось подождать 20 минут. В остальном всё отлично — колодки заменили быстро.',
    date: '2026-08-08', serviceName: 'Замена тормозных колодок', mechanicName: 'Пётр И.',
  },
  {
    id: 'r3', clientName: 'Олег С.', clientInitial: 'О', carModel: 'Lada XRAY 2021',
    rating: 5, text: 'Делали комплексное ТО. Всё прозрачно — показали фото до/после, объяснили что нужно менять. Цены адекватные.',
    date: '2026-08-05', serviceName: 'Комплексное ТО', mechanicName: 'Алексей С.',
  },
  {
    id: 'r4', clientName: 'Сергей И.', clientInitial: 'С', carModel: 'Lada Priora 2015',
    rating: 5, text: 'Меняли ГРМ на 75000 км. Работа выполнена качественно, дали гарантию. Машина едет как новая!',
    date: '2026-07-25', serviceName: 'Замена ремня ГРМ', mechanicName: 'Алексей С.',
  },
  {
    id: 'r5', clientName: 'Анна А.', clientInitial: 'А', carModel: 'Lada Kalina 2016',
    rating: 4, text: 'Сделали всё быстро. Единственное — хотелось бы больше слотов на вечернее время.',
    date: '2026-08-01', serviceName: 'Замена масла', mechanicName: 'Пётр И.',
  },
]

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach(r => dist[r.rating]++)
  return dist
}
