import { prisma } from '@/lib/prisma'
import axios from 'axios'
import { type NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { data: tokenData } = await axios.post(
    'https://gateway-homol.service-canvi.com.br/bt/token',
    {
      client_id: process.env.CANVI_CLIENT_ID,
      private_key: process.env.CANVI_PRIVATE_KEY,
    }
  )

  const { token } = tokenData

  const externalId = randomUUID()
  const transactionId = randomUUID()

  const { data: charge } = await axios.post(
    'https://gateway-homol.service-canvi.com.br/bt/pix',
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
        Authorization: `Bearer ${token}`,
      },
    }
  )

  await prisma.charge.create({
    data: {
      type: body.type,
      amount: body.amount,
      description: body.description,
      externalId,
      instructionText: 'Instructions',
      transactionId: charge.data.tx_id,
    },
  })

  await prisma.chargeBackup.create({
    data: {
      type: body.type,
      amount: body.amount,
      description: body.description,
      externalId,
      instructionText: 'Instructions',
      transactionId: charge.data.tx_id,
    },
  })

  return NextResponse.json({ charge: charge.data }, { status: 200 })
}
