import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { XCircle } from 'lucide-react'

interface ExpiredChargeProps {
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

export function ExpiredCharge({ data }: ExpiredChargeProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Pagamento expirado.</DialogTitle>
        <DialogDescription>
          O pagamento desta cobrança passou do prazo de validade.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center">
        <XCircle className="fill-rose-600 text-zinc-50 size-32" />
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

      <div className="flex justify-between">
        <h3>Prazo</h3>
        <span className="text-md font-semibold">
          {format(data.dueDate, 'PPP', { locale: ptBR })}
        </span>
      </div>
    </>
  )
}
