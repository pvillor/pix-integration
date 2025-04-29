import { api, canviApi } from '@/lib/axios'
import { prisma } from '@/lib/prisma'
import { type NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { data: tokenData } = await api.post('login')

  const externalId = randomUUID()
  const transactionId = randomUUID()

  const { data: charge } = await canviApi.post(
    'pix',
    {
      valor: body.amount,
      descricao: body.description,
      tipo_transacao: body.type === 'dinamic' ? 'pixCashin' : 'pixStaticCashin',
      texto_instrucao: 'Instruções',
      identificador_externo: externalId,
      identificador_movimento: transactionId,
      enviar_qr_code: true,
    },
    {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    }
  )

  const pixId =
    body.type === 'dinamic'
      ? charge.data.id_invoice_pix
      : charge.data.id_invoice_pix_documento

  await prisma.charge.create({
    data: {
      pixId,
      type: body.type,
      amount: body.amount,
      description: body.description,
      externalId,
      instructionText: 'Instructions',
      transactionId: charge.data.tx_id,
      dueDate: body.type === 'dinamic' ? body.dueDate : undefined,
    },
  })

  await prisma.chargeBackup.create({
    data: {
      pixId,
      type: body.type,
      amount: body.amount,
      description: body.description,
      externalId,
      instructionText: 'Instructions',
      transactionId: charge.data.tx_id,
      dueDate: body.type === 'dinamic' ? charge.data.vencimento : undefined,
    },
  })

  return NextResponse.json(
    {
      charge: {
        pixId,
        type: body.type,
        qrcode: charge.data.qrcode,
      },
    },
    { status: 200 }
  )
}
