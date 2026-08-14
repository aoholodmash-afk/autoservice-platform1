import type { Metadata } from 'next'

const SERVICES_DATA: Record<string, { title: string; desc: string; price: string; duration: string; keywords: string[] }> = {
  'zamena-masla': {
    title: 'Замена масла в двигателе',
    desc: 'Профессиональная замена масла и масляного фильтра. Работа за 30 минут. Все марки автомобилей.',
    price: 'от 1 500 ₽',
    duration: '30 мин',
    keywords: ['замена масла', 'масляный фильтр', 'ТО масло', 'масло двигатель', 'масло ВАЗ', 'масло Lada'],
  },
  'zamena-kolodok': {
    title: 'Замена тормозных колодок',
    desc: 'Замена передних и задних тормозных колодок. Проверка тормозных дисков. Безопасность — приоритет.',
    price: 'от 2 000 ₽',
    duration: '45 мин',
    keywords: ['тормозные колодки', 'замена колодок', 'тормоза', 'передние колодки', 'задние колодки'],
  },
  'zamena-grm': {
    title: 'Замена ремня ГРМ',
    desc: 'Замена ремня и роликов ГРМ. Проверка помпы. Гарантия на работы.',
    price: 'от 3 500 ₽',
    duration: '120 мин',
    keywords: ['ремень ГРМ', 'замена ГРМ', 'ролики ГРМ', 'ГРМ ВАЗ', 'ГРМ Lada'],
  },
  'diagnostika': {
    title: 'Компьютерная диагностика',
    desc: 'Полная компьютерная диагностика автомобиля. Считывание ошибок, проверка всех систем.',
    price: 'от 1 000 ₽',
    duration: '30 мин',
    keywords: ['диагностика', 'компьютерная диагностика', 'сканирование ошибок', 'чек двигателя'],
  },
  'shinomontazh': {
    title: 'Шиномонтаж',
    desc: 'Замена и ремонт шин. Балансировка. Хранение шин.',
    price: 'от 1 200 ₽',
    duration: '60 мин',
    keywords: ['шиномонтаж', 'замена шин', 'балансировка', 'ремонт шин', 'зимние шины', 'летние шины'],
  },
  'tekhobsluzhivanie': {
    title: 'Комплексное техобслуживание',
    desc: 'Полное ТО: масло, фильтры, свечи, жидкости, диагностика. Всё в одном визите.',
    price: 'от 5 000 ₽',
    duration: '120 мин',
    keywords: ['техобслуживание', 'ТО', 'комплексное ТО', 'полное ТО', 'обслуживание авто'],
  },
}

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICES_DATA[params.slug]
  if (!service) return { title: 'Услуга не найдена' }

  return {
    title: `${service.title} — AutoService`,
    description: service.desc,
    keywords: service.keywords,
    openGraph: {
      title: `${service.title} — AutoService`,
      description: service.desc,
      type: 'website',
      locale: 'ru_RU',
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = SERVICES_DATA[params.slug]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1>Услуга не найдена</h1>
          <a href="/">На главную</a>
        </div>
      </div>
    )
  }

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.desc,
    provider: {
      '@type': 'AutoRepair',
      name: 'AutoService',
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'RUB',
    },
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }} />

      {/* Header */}
      <header className="bg-white border-b border-[#E5E5EA] sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="/" className="text-[#007AFF] text-[14px]">← Назад</a>
          <h1 className="text-[17px] font-semibold text-[#1C1C1E]">{service.title}</h1>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-[16px] p-6 text-white mb-6">
          <h1 className="text-[28px] font-bold mb-2">{service.title}</h1>
          <p className="text-[15px] opacity-80 mb-4">{service.desc}</p>
          <div className="flex gap-4">
            <div className="bg-white/20 rounded-[10px] px-4 py-2">
              <p className="text-[11px] opacity-70">Стоимость</p>
              <p className="text-[18px] font-bold">{service.price}</p>
            </div>
            <div className="bg-white/20 rounded-[10px] px-4 py-2">
              <p className="text-[11px] opacity-70">Время</p>
              <p className="text-[18px] font-bold">{service.duration}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-[16px] shadow-sm p-6 text-center">
          <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-2">Запишитесь онлайн</h2>
          <p className="text-[14px] text-[#8E8E93] mb-4">Выберите удобное время и мы вас ждём</p>
          <a href="/avtomaster-pro"
            className="inline-block h-[50px] px-8 bg-[#007AFF] text-white rounded-[13px] font-semibold text-[17px] leading-[50px]">
            Записаться
          </a>
        </div>

        {/* Related services */}
        <div className="mt-8">
          <h2 className="text-[18px] font-bold text-[#1C1C1E] mb-4">Другие услуги</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(SERVICES_DATA)
              .filter(([key]) => key !== params.slug)
              .slice(0, 4)
              .map(([key, s]) => (
                <a key={key} href={`/services/${key}`}
                  className="bg-white rounded-[13px] shadow-sm p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-[14px] font-semibold text-[#1C1C1E]">{s.title}</h3>
                  <p className="text-[12px] text-[#8E8E93] mt-1">{s.price}</p>
                </a>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
