import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutoService — Супер-админ',
  description: 'Управление филиалами автосервисов',
}

export default function SuperLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>
}
