export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
  birthday?: string
  cars: ClientCar[]
  totalOrders: number
  totalSpent: number
  lastVisit: string
  notes?: string
  status: 'active' | 'inactive' | 'vip'
  orders: ClientOrder[]
}

export interface ClientCar {
  brand: string
  model: string
  year: number
  plate: string
  vin?: string
  mileage?: number
  color?: string
}

export interface ClientOrder {
  id: string
  date: string
  car: string
  services: string[]
  parts: string[]
  laborPrice: number
  partsPrice: number
  total: number
  status: 'completed' | 'in_progress' | 'cancelled'
  mechanic?: string
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Козлов Дмитрий',
    phone: '+7 916 123-45-67',
    email: 'kozlov@mail.ru',
    address: 'ул. Пушкина, д. 10, кв. 25',
    birthday: '1985-03-15',
    cars: [
      { brand: 'Lada', model: 'Vesta', year: 2020, plate: 'А123ВС777', vin: 'XTAGL2109LY123456', mileage: 45000, color: 'Белый' },
    ],
    totalOrders: 8,
    totalSpent: 42500,
    lastVisit: '2026-08-10',
    status: 'vip',
    notes: 'Предпочитает оригинальные запчасти. Приезжает по субботам.',
    orders: [
      { id: 'WO-047', date: '2026-08-10', car: 'Lada Vesta 2020', services: ['Замена масла', 'Замена воздушного фильтра'], parts: ['Масло 5W-30 Lada 4L', 'Фильтр воздушный Lada'], laborPrice: 900, partsPrice: 2900, total: 3800, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-041', date: '2026-07-15', car: 'Lada Vesta 2020', services: ['Замена тормозных колодок (перед)'], parts: ['Колодки передние TRW GDB1448'], laborPrice: 1200, partsPrice: 1500, total: 2700, status: 'completed', mechanic: 'Иванов П.' },
      { id: 'WO-035', date: '2026-06-20', car: 'Lada Vesta 2020', services: ['Замена масла', 'Замена свечей'], parts: ['Масло 5W-30 Lada 4L', 'Свечи NGK BPR6ES ×4'], laborPrice: 1100, partsPrice: 2200, total: 3300, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-028', date: '2026-05-10', car: 'Lada Vesta 2020', services: ['Комплексное ТО'], parts: ['Масло 5W-30', 'Фильтр масляный', 'Фильтр воздушный', 'Фильтр салонный'], laborPrice: 3500, partsPrice: 3200, total: 6700, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-022', date: '2026-04-05', car: 'Lada Vesta 2020', services: ['Замена тормозной жидкости'], parts: ['Жидкость DOT-4 ROS 1L'], laborPrice: 800, partsPrice: 400, total: 1200, status: 'completed', mechanic: 'Иванов П.' },
      { id: 'WO-018', date: '2026-03-12', car: 'Lada Vesta 2020', services: ['Замена масла', 'Замена охлаждающей жидкости'], parts: ['Масло 5W-30 Lada 4L', 'Антифриз Lada 5L'], laborPrice: 1600, partsPrice: 2400, total: 4000, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-012', date: '2026-02-18', car: 'Lada Vesta 2020', services: ['Замена ремня ГРМ', 'Замена помпы'], parts: ['Ремень ГРМ Gates 5521', 'Ролик натяжной Gates', 'Помпа LUZAR BW0011'], laborPrice: 3000, partsPrice: 2800, total: 5800, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-005', date: '2026-01-20', car: 'Lada Vesta 2020', services: ['Замена масла', 'Диагностика ходовой'], parts: ['Масло 5W-30 Lada 4L', 'Фильтр масляный Lada'], laborPrice: 1400, partsPrice: 2100, total: 3500, status: 'completed', mechanic: 'Иванов П.' },
    ],
  },
  {
    id: 'c2',
    name: 'Петрова Мария',
    phone: '+7 916 987-65-43',
    email: 'petrova@mail.ru',
    address: 'пр. Мира, д. 45, кв. 12',
    birthday: '1990-07-22',
    cars: [
      { brand: 'Lada', model: 'Granta', year: 2019, plate: 'В456ЕК777', vin: 'XTAGE2190KY654321', mileage: 62000, color: 'Серебристый' },
    ],
    totalOrders: 5,
    totalSpent: 18700,
    lastVisit: '2026-08-08',
    status: 'active',
    orders: [
      { id: 'WO-045', date: '2026-08-08', car: 'Lada Granta 2019', services: ['Замена тормозных колодок (зад)'], parts: ['Колодки задние Lada'], laborPrice: 1500, partsPrice: 700, total: 2200, status: 'completed', mechanic: 'Иванов П.' },
      { id: 'WO-038', date: '2026-07-02', car: 'Lada Granta 2019', services: ['Замена масла', 'Замена салонного фильтра'], parts: ['Масло 5W-40 Лукойл 4L', 'Фильтр салонный Lada'], laborPrice: 700, partsPrice: 1900, total: 2600, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-030', date: '2026-05-20', car: 'Lada Granta 2019', services: ['Замена свечей', 'Замена топливного фильтра'], parts: ['Свечи NGK BPR6ES ×4', 'Фильтр топливный Lada'], laborPrice: 800, partsPrice: 700, total: 1500, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-020', date: '2026-03-15', car: 'Lada Granta 2019', services: ['Комплексное ТО'], parts: ['Масло 5W-40', 'Фильтр масляный', 'Фильтр воздушный'], laborPrice: 3500, partsPrice: 2200, total: 5700, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-008', date: '2026-01-25', car: 'Lada Granta 2019', services: ['Замена масла'], parts: ['Масло 5W-40 Лукойл 4L', 'Фильтр масляный Lada'], laborPrice: 600, partsPrice: 1800, total: 2400, status: 'completed', mechanic: 'Иванов П.' },
    ],
  },
  {
    id: 'c3',
    name: 'Смирнов Олег',
    phone: '+7 903 111-22-33',
    address: 'ул. Ленина, д. 78, кв. 5',
    birthday: '1978-11-03',
    cars: [
      { brand: 'Lada', model: 'XRAY', year: 2021, plate: 'С789АТ777', vin: 'XTAHF2110NY789012', mileage: 31000, color: 'Чёрный' },
      { brand: 'Lada', model: 'Niva', year: 2018, plate: 'М456АВ777', vin: 'XTAGN21230M345678', mileage: 78000, color: 'Зелёный' },
    ],
    totalOrders: 12,
    totalSpent: 67800,
    lastVisit: '2026-08-12',
    status: 'vip',
    notes: 'Два автомобиля. Niva — для охоты и рыбалки. VIP-скидка 10%.',
    orders: [
      { id: 'WO-048', date: '2026-08-12', car: 'Lada XRAY 2021', services: ['Замена масла', 'Замена воздушного фильтра', 'Замена свечей'], parts: ['Масло 5W-30 Shell 4L', 'Фильтр воздушный Lada', 'Свечи NGK BPR6ES ×4'], laborPrice: 1100, partsPrice: 3300, total: 4400, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-043', date: '2026-08-05', car: 'Lada Niva 2018', services: ['Замена сцепления'], parts: ['Комплект сцепления Valeo'], laborPrice: 5000, partsPrice: 10500, total: 15500, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-039', date: '2026-07-10', car: 'Lada XRAY 2021', services: ['Замена тормозных колодок (перед)'], parts: ['Колодки передние Brembo P 83 020'], laborPrice: 1200, partsPrice: 1800, total: 3000, status: 'completed', mechanic: 'Иванов П.' },
      { id: 'WO-033', date: '2026-06-15', car: 'Lada Niva 2018', services: ['Замена масла', 'Замена ремня ГРМ'], parts: ['Масло 5W-30 Lada 4L', 'Ремень ГРМ Gates 5521', 'Ролик натяжной'], laborPrice: 3600, partsPrice: 2800, total: 6400, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-027', date: '2026-05-08', car: 'Lada XRAY 2021', services: ['Комплексное ТО'], parts: ['Масло 5W-30', 'Все фильтры', 'Свечи'], laborPrice: 3500, partsPrice: 4500, total: 8000, status: 'completed', mechanic: 'Сидоров А.' },
    ],
  },
  {
    id: 'c4',
    name: 'Иванов Сергей',
    phone: '+7 903 222-33-44',
    address: 'ул. Гагарина, д. 33',
    birthday: '1995-01-10',
    cars: [
      { brand: 'Lada', model: 'Priora', year: 2015, plate: 'Е567КМ777', mileage: 120000, color: 'Синий' },
    ],
    totalOrders: 3,
    totalSpent: 9200,
    lastVisit: '2026-07-25',
    status: 'active',
    orders: [
      { id: 'WO-042', date: '2026-07-25', car: 'Lada Priora 2015', services: ['Замена ГРМ', 'Замена помпы'], parts: ['Ремень ГРМ Gates', 'Помпа LUZAR'], laborPrice: 3000, partsPrice: 2400, total: 5400, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-025', date: '2026-04-18', car: 'Lada Priora 2015', services: ['Замена масла', 'Замена колодок (перед)'], parts: ['Масло 5W-40', 'Колодки передние Lada'], laborPrice: 1800, partsPrice: 2600, total: 4400, status: 'completed', mechanic: 'Иванов П.' },
      { id: 'WO-010', date: '2026-02-05', car: 'Lada Priora 2015', services: ['Диагностика ходовой'], parts: [], laborPrice: 1500, partsPrice: 0, total: 1500, status: 'completed', mechanic: 'Иванов П.' },
    ],
  },
  {
    id: 'c5',
    name: 'Алексеева Анна',
    phone: '+7 916 555-66-77',
    email: 'alekseeva@yandex.ru',
    address: 'ул. Чехова, д. 15, кв. 8',
    birthday: '1992-05-30',
    cars: [
      { brand: 'Lada', model: 'Kalina', year: 2016, plate: 'Р321НТ777', mileage: 85000, color: 'Красный' },
    ],
    totalOrders: 6,
    totalSpent: 23400,
    lastVisit: '2026-08-05',
    status: 'active',
    orders: [
      { id: 'WO-046', date: '2026-08-05', car: 'Lada Kalina 2016', services: ['Комплексное ТО'], parts: ['Масло 5W-30', 'Все фильтры', 'Свечи', 'Антифриз'], laborPrice: 3500, partsPrice: 5000, total: 8500, status: 'completed', mechanic: 'Сидоров А.' },
      { id: 'WO-036', date: '2026-06-28', car: 'Lada Kalina 2016', services: ['Замена тормозной жидкости', 'Замена колодок (зад)'], parts: ['Жидкость DOT-4', 'Колодки задние Lada'], laborPrice: 2300, partsPrice: 1100, total: 3400, status: 'completed', mechanic: 'Иванов П.' },
      { id: 'WO-029', date: '2026-05-15', car: 'Lada Kalina 2016', services: ['Замена масла', 'Замена свечей'], parts: ['Масло 5W-30 Lada 4L', 'Свечи NGK ×4'], laborPrice: 1100, partsPrice: 2200, total: 3300, status: 'completed', mechanic: 'Сидоров А.' },
    ],
  },
  {
    id: 'c6',
    name: 'Волков Андрей',
    phone: '+7 903 777-88-99',
    address: 'пр. Победы, д. 92',
    cars: [
      { brand: 'Lada', model: 'Largus', year: 2020, plate: 'Т654УК777', mileage: 55000, color: 'Белый' },
    ],
    totalOrders: 2,
    totalSpent: 5600,
    lastVisit: '2026-06-15',
    status: 'inactive',
    orders: [
      { id: 'WO-034', date: '2026-06-15', car: 'Lada Largus 2020', services: ['Замена масла', 'Замена воздушного фильтра'], parts: ['Масло 5W-40 Лукойл 4L', 'Фильтр воздушный Lada'], laborPrice: 900, partsPrice: 1900, total: 2800, status: 'completed', mechanic: 'Иванов П.' },
      { id: 'WO-015', date: '2026-02-28', car: 'Lada Largus 2020', services: ['Замена масла'], parts: ['Масло 5W-40 Лукойл 4L', 'Фильтр масляный Lada'], laborPrice: 600, partsPrice: 1800, total: 2400, status: 'completed', mechanic: 'Сидоров А.' },
    ],
  },
]
