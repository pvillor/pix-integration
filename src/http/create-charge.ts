import { api } from '@/lib/axios'
import { z } from 'zod'

export const createChargeSchema = z.object({
  type: z.enum(['dinamic', 'static']),
  amount: z.coerce.number().min(1),
  description: z.string().min(3),
  dueDate: z.date().optional(),
  customerName: z.string().optional(),
  customerDocument: z.string().optional(),
  customerEmail: z.string().email().optional(),
})

export type CreateChargeInput = z.infer<typeof createChargeSchema>

export interface CreateChargeResponse {
  charge: {
    pixId: number
    type: 'dinamic' | 'static'
    qrcode: string
  }
}

export async function createCharge({
  type,
  amount,
  description,
  dueDate,
  customerName,
  customerDocument,
  customerEmail,
}: CreateChargeInput) {
  const { data } = await api.post<CreateChargeResponse>('/charges', {
    type,
    amount,
    description,
    dueDate,
    customerName,
    customerDocument,
    customerEmail,
  })

  return data
}
