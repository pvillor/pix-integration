import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CheckCircle2 } from 'lucide-react'

interface PaidChargeProps {
  data: {
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

export function PaidCharge({ data }: PaidChargeProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Pagamento realizado com sucesso!</DialogTitle>
        <DialogDescription>
          Você pagou a cobrança e recebemos seu pagamento.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center">
        <CheckCircle2 className="mt-2 -mb-6 fill-emerald-500 text-zinc-50 size-32 animate-bounce" />
      </div>

      <div className="flex justify-between">
        <h3>Descrição</h3>
        <h3>{data.description}</h3>
      </div>

      <div className="flex justify-between">
        <h3>Valor</h3>
        <span className="text-md font-semibold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(data.amount / 100)}
        </span>
      </div>
    </>
  )
}
