import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug } = extractSlugFromUrl(request.url)

    const service = await prisma.autoService.findUnique({ where: { slug: body.autoServiceSlug || slug } })
    if (!service) return NextResponse.json({ error: 'Автосервис не найден' }, { status: 404 })

    const code = Math.floor(1000 + Math.random() * 9000).toString()

    await prisma.authSession.create({
      data: {
        phone: body.phone,
        code,
        purpose: 'CLIENT_ACCESS',
        autoServiceId: service.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    console.log(`[DEV] SMS code for ${body.phone}: ${code}`)
    return NextResponse.json({ message: 'Код отправлен', expiresIn: 600, devCode: code })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}

function extractSlugFromUrl(url: string) {
  return { slug: '' }
}
