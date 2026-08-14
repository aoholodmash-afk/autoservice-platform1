import { getTenantBySlug } from '@/lib/tenantStore'
import { generateAutoRepairLD, generateBreadcrumbLD } from '@/lib/seo'
import TenantClientApp from './client-app'

type Props = { params: { slug: string } }

// Server Component — renders SEO content visible to crawlers
export default function TenantPage({ params }: Props) {
  const tenant = getTenantBySlug(params.slug)

  if (!tenant) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Филиал не найден</h1>
        <p>Автосервис по адресу /{params.slug} не существует</p>
        <a href="/">На главную</a>
      </div>
    )
  }

  const autoRepairLD = generateAutoRepairLD(tenant)
  const breadcrumbLD = generateBreadcrumbLD([
    { name: 'Главная', url: 'https://autoservice.app/' },
    { name: tenant.name, url: `https://autoservice.app/${tenant.slug}` },
  ])

  return (
    <>
      {/* JSON-LD for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(autoRepairLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      {/* SEO-visible content (hidden visually, visible to crawlers) */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h1>{tenant.name} — Запись на ТО и ремонт</h1>
        <p>{tenant.description || 'Профессиональный ремонт и обслуживание автомобилей'}</p>
        <p>Адрес: {tenant.address}, {tenant.city}</p>
        <p>Телефон: {tenant.phone}</p>
        <p>Часы работы: {tenant.workHours}</p>
        <p>Количество боксов: {tenant.boxes}</p>
        <h2>Услуги</h2>
        <ul>
          <li>Техническое обслуживание (ТО)</li>
          <li>Замена масла и фильтров</li>
          <li>Замена тормозных колодок</li>
          <li>Диагностика автомобиля</li>
          <li>Шиномонтаж</li>
          <li>Замена ремня ГРМ</li>
          <li>Подвеска и ходовая</li>
          <li>Электрика и диагностика</li>
        </ul>
        <h2>Марки автомобилей</h2>
        <ul>
          <li>ВАЗ / Lada</li>
          <li>Toyota</li>
          <li>Hyundai</li>
          <li>Kia</li>
          <li>Volkswagen</li>
          <li>BMW</li>
          <li>Mercedes-Benz</li>
          <li>Renault</li>
          <li>Ford</li>
          <li>Chevrolet</li>
        </ul>
      </div>

      {/* Client app — all interactive UI */}
      <TenantClientApp tenant={tenant} />
    </>
  )
}
