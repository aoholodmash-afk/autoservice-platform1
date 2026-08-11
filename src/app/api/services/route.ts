import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'АвтоМастер Pro', slug: 'avtomaster-pro', city: 'Москва', address: 'ул. Автомобильная, 42', phone: '+7 (999) 123-45-67', description: 'Профессиональный ремонт и обслуживание автомобилей' }
  ])
}
