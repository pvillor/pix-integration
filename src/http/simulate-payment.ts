import { api } from '@/lib/axios'

interface SimulatePaymentRequest {
  id: number
  type: 'dinamic' | 'static'
  value: string
}

export async function simulatePayment({
  id,
  type,
  value,
}: SimulatePaymentRequest) {
  return await api.patch(`charges/${id}/simulate-payment`, {
    type,
    value,
  })
}
