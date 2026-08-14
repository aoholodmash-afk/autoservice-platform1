export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  cars: ClientCar[]
  totalOrders: number
  totalSpent: number
  lastVisit: string
  notes?: string
  status: 'active' | 'inactive' | 'vip'
}

export interface ClientCar {
  brand: string
  model: string
  year: number
  plate: string
  vin?: string
  mileage?: number
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Козлов Дмитрий',
    phone: '+7 916 123-45-67',
    email: 'kozlov@mail.ru',
    cars: [
      { brand: 'Lada', model: 'Vesta', year: 2020, plate: 'А123ВС777', mileage: 45000 },
    ],
    totalOrders: 8,
    totalSpent: 42500,
    lastVisit: '2026-08-10',
    status: 'vip',
  },
  {
    id: 'c2',
    name: 'Петрова Мария',
    phone: '+7 916 987-65-43',
    cars: [
      { brand: 'Lada', model: 'Granta', year: 2019, plate: 'В456ЕК777', mileage: 62000 },
    ],
    totalOrders: 5,
    totalSpent: 18700,
    lastVisit: '2026-08-08',
    status: 'active',
  },
  {
    id: 'c3',
    name: 'Смирнов Олег',
    phone: '+7 903 111-22-33',
    cars: [
      { brand: 'Lada', model: 'XRAY', year: 2021, plate: 'С789АТ777', mileage: 31000 },
      { brand: 'Lada', model: 'Niva', year: 2018, plate: 'С789АТ777', mileage: 78000 },
    ],
    totalOrders: 12,
    totalSpent: 67800,
    lastVisit: '2026-08-12',
    status: 'vip',
  },
  {
    id: 'c4',
    name: 'Иванов Сергей',
    phone: '+7 903 222-33-44',
    cars: [
      { brand: 'Lada', model: 'Priora', year: 2015, plate: 'Е567КМ777', mileage: 120000 },
    ],
    totalOrders: 3,
    totalSpent: 9200,
    lastVisit: '2026-07-25',
    status: 'active',
  },
  {
    id: 'c5',
    name: 'Алексеева Анна',
    phone: '+7 916 555-66-77',
    email: 'alekseeva@yandex.ru',
    cars: [
      { brand: 'Lada', model: 'Kalina', year: 2016, plate: 'Р321НТ777', mileage: 85000 },
    ],
    totalOrders: 6,
    totalSpent: 23400,
    lastVisit: '2026-08-05',
    status: 'active',
  },
  {
    id: 'c6',
    name: 'Волков Андрей',
    phone: '+7 903 777-88-99',
    cars: [
      { brand: 'Lada', model: 'Largus', year: 2020, plate: 'Т654УК777', mileage: 55000 },
    ],
    totalOrders: 2,
    totalSpent: 5600,
    lastVisit: '2026-06-15',
    status: 'inactive',
  },
]
