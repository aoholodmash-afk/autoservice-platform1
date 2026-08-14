import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_NAME = 'AutoService'
const SITE_DESCRIPTION = 'Запись на техническое обслуживание и ремонт автомобиля. ВАЗ, Lada, Toyota, Hyundai, Kia и другие марки. Онлайн-запись, прозрачные цены, отзывы клиентов.'
const SITE_URL = 'https://autoservice.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AutoService — Запись на ТО и ремонт автомобилей',
    template: '%s | AutoService',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'автосервис', 'запись на ТО', 'ремонт автомобиля', 'техобслуживание',
    'замена масла', 'тормозные колодки', 'шиномонтаж', 'диагностика',
    'ВАЗ', 'Lada', 'Toyota', 'Hyundai', 'Kia', 'BMW', 'Mercedes',
    'ходовая', 'ГРМ', 'подвеска', 'масло', 'фильтры',
    'онлайн запись', 'авторемонт', 'станция техобслуживания',
    'ближайший автосервис', 'автосервис рядом',
  ],
  authors: [{ name: 'AutoService Team' }],
  creator: 'AutoService',
  publisher: 'AutoService',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'AutoService — Запись на ТО и ремонт автомобилей',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AutoService — Запись на ТО',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoService — Запись на ТО и ремонт',
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  verification: {
    // yandex: 'your-yandex-verification-code',
    // google: 'your-google-verification-code',
  },
  category: 'automotive',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F2F2F7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased overscroll-y-contain">
        {children}
      </body>
    </html>
  )
}
