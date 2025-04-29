import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { Check, Clipboard, LoaderPinwheel, Siren } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { simulatePayment } from '@/http/simulate-payment'
import { queryClient } from '@/lib/react-query'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface PayChargeInfoProps {
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
  brcode: string
  qrcode: string
}

export function PayChargeInfo({ data, brcode, qrcode }: PayChargeInfoProps) {
  const [copied, setCopied] = useState(false)

  const { mutateAsync: simulatePaymentFn, isPending } = useMutation({
    mutationFn: simulatePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charge'] })

      if (data.type === 'dinamic' && new Date(data.dueDate) < new Date()) {
        toast.error('Ocorreu um erro no pagamento')
      } else {
        toast.success('Pagamento efetuado com sucesso!')
      }
    },
  })

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(brcode)
      setCopied(true)
      toast.success('Pix copiado com sucesso!')

      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Erro ao copiar Pix')
    }
  }

  // const convertedQrCodeBuffer = convertBufferToImage(data.qrcode.data)

  async function handleSimulatePayment() {
    const { pixId, amount, type } = data

    await simulatePaymentFn({
      id: pixId,
      type,
      value: String((amount / 100).toFixed(2)),
    })
  }

  return (
    <>
      {data.status === 'PAID' ? (
        <DialogHeader>
          <DialogTitle>
            Você já realizou um pagamento para essa cobrança{' '}
            <Siren className="fill-rose-600 text-zinc-600" />
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja realizar outro pagamento?
          </DialogDescription>
        </DialogHeader>
      ) : (
        <DialogHeader>
          <DialogTitle>Cobrança pix gerada!</DialogTitle>
          <DialogDescription>
            Veja abaixo detalhes da cobrança
          </DialogDescription>
        </DialogHeader>
      )}

      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col items-center">
          <img src={qrcode} alt="" width={240} height={240} />

          <span className="text-lg font-semibold">
            Valor:{' '}
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(data.amount / 100)}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Pix copia e cola</span>
          <div className="flex items-center gap-2 rounded-md border p-2">
            <p className="text-sm break-all">{brcode}</p>
            <Button size="icon" variant="outline" onClick={copyPix}>
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {data.dueDate && (
          <p>Vencimento: {format(data.dueDate, 'PPP', { locale: ptBR })}</p>
        )}

        <Button
          variant={data.status === 'PAID' ? 'secondary' : 'default'}
          onClick={handleSimulatePayment}
        >
          {isPending ? (
            <LoaderPinwheel className="animate-spin" />
          ) : (
            'Simular pagamento'
          )}
        </Button>
      </div>
    </>
  )
}
