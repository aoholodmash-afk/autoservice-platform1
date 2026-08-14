export function generateAutoRepairLD(tenant: {
  name: string
  address: string
  phone: string
  city?: string
  workHours: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: tenant.name,
    description: `Профессиональный ремонт и обслуживание автомобилей в ${tenant.city || 'вашем городе'}`,
    url: `https://autoservice.app/${tenant.slug}`,
    telephone: tenant.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: tenant.address,
      addressLocality: tenant.city || '',
      addressCountry: 'RU',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: tenant.workHours.split('–')[0] || '09:00',
      closes: tenant.workHours.split('–')[1] || '20:00',
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги автосервиса',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Техническое обслуживание (ТО)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Замена масла и фильтров' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Замена тормозных колодок' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Диагностика автомобиля' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Шиномонтаж' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Замена ремня ГРМ' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Подвеска и ходовая' } },
      ],
    },
  }
}

export function generateOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AutoService',
    url: 'https://autoservice.app',
    description: 'Платформа для записи на техническое обслуживание и ремонт автомобилей',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'English'],
    },
  }
}

export function generateBreadcrumbLD(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Как записаться на ТО?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Выберите ваш автомобиль, выберите нужную услугу, удобную дату и время — и подтвердите запись. Мы свяжемся с вами для подтверждения.',
        },
      },
      {
        '@type': 'Question',
        name: 'Сколько стоит замена масла?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Стоимость замены масла зависит от модели автомобиля и выбранного масла. В среднем от 1500 до 3500 рублей с учётом масла и фильтра.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие автомобили вы обслуживаете?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Мы обслуживаем все марки автомобилей: ВАЗ, Lada, Toyota, Hyundai, Kia, Volkswagen, BMW, Mercedes, Audi, Renault, Ford, Chevrolet и другие.',
        },
      },
      {
        '@type': 'Question',
        name: 'Нужно ли присутствовать при ремонте?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Нет, вы можете оставить автомобиль и отслеживать статус ремонта онлайн через нашу систему трекинга.',
        },
      },
    ],
  }
}
