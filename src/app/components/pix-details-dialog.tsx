import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useMutation } from '@tanstack/react-query'
import { getPix, type GetPixRequest } from '@/http/get-pix'
import { PixDetailsDialogContent } from './pix-details-dialog-content'
import { LoaderPinwheel } from 'lucide-react'

interface PixDetailsDialogProps {
  pixId: number
  type: 'dinamic' | 'static'
  qrcode: string
}

export function PixDetailsDialog({
  pixId,
  type,
  qrcode,
}: PixDetailsDialogProps) {
  const {
    data: pix,
    mutateAsync: getPixFn,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: getPix,
    mutationKey: ['pix-details'],
  })

  async function handleGetPixInfo({
    id_invoice_pix,
    id_invoice_pix_documento,
    type,
  }: GetPixRequest) {
    await getPixFn({ id_invoice_pix, id_invoice_pix_documento, type })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="submit"
          className="w-full"
          onClick={() =>
            handleGetPixInfo({
              id_invoice_pix: pixId,
              id_invoice_pix_documento: pixId,
              type,
            })
          }
        >
          {isPending ? (
            <LoaderPinwheel className="animate-spin" />
          ) : (
            'Ver detalhes'
          )}
        </Button>
      </DialogTrigger>

      {isSuccess && <PixDetailsDialogContent data={pix.data} qrcode={qrcode} />}
    </Dialog>
  )
}
