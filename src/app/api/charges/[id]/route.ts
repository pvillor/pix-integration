import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params

  const charge = await prisma.charge.findUnique({
    where: {
      pixId: Number(id),
    },
  })

  if (!charge) {
    return NextResponse.json({ message: 'Charge not found' }, { status: 404 })
  }

  return NextResponse.json({ charge })
}
