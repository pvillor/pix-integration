import { canviApi } from '@/lib/axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(_: NextRequest) {
  const { data: tokenData } = await canviApi.post('token', {
    client_id: process.env.CANVI_CLIENT_ID,
    private_key: process.env.CANVI_PRIVATE_KEY,
  })

  const { token } = tokenData

  return NextResponse.json({ token }, { status: 200 })
}
