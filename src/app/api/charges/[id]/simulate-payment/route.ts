import { canviApi } from '@/lib/axios'
import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { randomUUID } from 'node:crypto'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const { data: tokenData } = await canviApi.post('token', {
    client_id: process.env.CANVI_CLIENT_ID,
    private_key: process.env.CANVI_PRIVATE_KEY,
  })

  const { token } = tokenData

  const { id } = await params

  await canviApi.post(
    '/desenvolvedor/simular_baixa',
    {
      id: Number(id),
      tipo_transacao: body.type === 'dinamic' ? 'pixCashin' : 'pixStaticCashin',
      pix: {
        pagamento: {
          valor: body.value,
          pagador: {
            id: randomUUID(),
            nome: 'John Doe',
          },
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const charge = await prisma.charge.findUnique({
    where: {
      pixId: Number(id),
    },
  })

  const chargeBackup = await prisma.chargeBackup.findUnique({
    where: {
      pixId: Number(id),
    },
  })

  if (!charge || !chargeBackup) {
    return NextResponse.json({ message: 'Charge not found' }, { status: 404 })
  }

  await prisma.charge.update({
    where: {
      id: charge.id,
    },
    data: {
      status:
        charge.type === 'dinamic'
          ? (charge.dueDate as Date) < new Date()
            ? 'EXPIRED'
            : 'CREDITED'
          : 'PAID',
    },
  })

  await prisma.chargeBackup.update({
    where: {
      id: chargeBackup.id,
    },
    data: {
      status:
        chargeBackup.type === 'dinamic'
          ? (chargeBackup.dueDate as Date) < new Date()
            ? 'EXPIRED'
            : 'CREDITED'
          : 'PAID',
    },
  })

  return new NextResponse(null, { status: 204 })
}
