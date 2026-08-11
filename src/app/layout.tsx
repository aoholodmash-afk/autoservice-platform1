import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AutoService — Платформа для автосервисов',
  description: 'ИИ-диагностика, история обслуживания, онлайн-запись',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gradient-to-b from-blue-50 to-white">{children}</body>
    </html>
  )
}
