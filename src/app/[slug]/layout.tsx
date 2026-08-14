'use client'

import { use } from 'react'
import { getTenantBySlug, Tenant } from '@/lib/tenantStore'
import { notFound } from 'next/navigation'

export default function TenantLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const tenant = getTenantBySlug(slug)

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <div className="text-[44px] mb-4">🏪</div>
          <h1 className="text-[22px] font-bold text-[var(--ink)] mb-2">Филиал не найден</h1>
          <p className="text-[15px] text-[var(--ink-secondary)] mb-6">Автосервис по адресу /{slug} не существует</p>
          <a href="/" className="inline-block h-[44px] px-6 bg-[var(--accent)] text-white rounded-[13px] font-semibold leading-[44px]">
            На главную
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
