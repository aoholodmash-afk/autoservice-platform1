import type { Metadata } from 'next'
import { getTenantBySlug } from '@/lib/tenantStore'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tenant = getTenantBySlug(params.slug)
  
  if (!tenant) {
    return {
      title: 'Филиал не найден',
      robots: { index: false, follow: false },
    }
  }

  const title = `${tenant.name} — Запись на ТО и ремонт`
  const description = `${tenant.description || 'Профессиональный ремонт и обслуживание автомобилей'}. ${tenant.address}, ${tenant.city}. Запись онлайн, прозрачные цены.`

  return {
    title,
    description,
    keywords: [
      tenant.name, tenant.city || '', 'автосервис', 'запись на ТО',
      'ремонт автомобиля', 'техобслуживание', 'ВАЗ', 'Lada',
    ],
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: `https://autoservice.app/${tenant.slug}`,
      siteName: tenant.name,
      title,
      description,
    },
    alternates: {
      canonical: `https://autoservice.app/${tenant.slug}`,
    },
  }
}

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
