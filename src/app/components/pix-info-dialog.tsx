import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { CreateChargeResponse } from '@/http/create-charge'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { Check, Clipboard } from 'lucide-react'
import { toast } from 'sonner'

export function PixInfoDialog({ charge }: CreateChargeResponse) {
  const [copied, setCopied] = useState(false)

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(charge.brcode)
      setCopied(true)
      toast.success('Pix copiado com sucesso!')

      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Erro ao copiar Pix')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="submit" className="w-full">
          Ver detalhes
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cobrança pix gerada!</DialogTitle>
          <DialogDescription>
            Veja abaixo detalhes da cobrança
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col items-center">
            <Image src={charge.qrcode} alt="" width={240} height={240} />

            <span className="text-lg font-semibold">
              Valor:{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(charge.valor))}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Pix copia e cola</span>
            <div className="flex items-center gap-2 rounded-md border p-2">
              <p className="text-sm break-all">{charge.brcode}</p>
              <Button size="icon" variant="outline" onClick={copyPix}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {charge.vencimento && (
            <p>
              Vencimento: {format(charge.vencimento, 'PPP', { locale: ptBR })}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
