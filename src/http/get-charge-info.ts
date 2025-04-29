import { api } from '@/lib/axios'

interface GetChargeInfoParams {
  id: number
}

interface GetChargeInfoResponse {
  charge: {
    amount: number
    createdAt: string
    description: string
    dueDate: string
    externalId: string
    id: string
    instructionText: string
    pixId: number
    status: 'CREATED' | 'EXPIRED' | 'CREDITED' | 'PAID'
    transactionId: string
    type: 'dinamic' | 'static'
  }
}

export async function getChargeInfo({ id }: GetChargeInfoParams) {
  const { data } = await api.get<GetChargeInfoResponse>(`charges/${id}`)

  return data.charge
}
