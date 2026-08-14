import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutoService — Админ-панель',
  description: 'Панель управления автосервисом',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {children}
    </div>
  )
}
