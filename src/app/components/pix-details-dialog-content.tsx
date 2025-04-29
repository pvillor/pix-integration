import { DialogContent } from '@/components/ui/dialog'
import { PaidCharge } from './paid-charge'
import { PayChargeInfo } from './pay-charge-info'
import { useQuery } from '@tanstack/react-query'
import { getChargeInfo } from '@/http/get-charge-info'
import { SparklesIcon } from 'lucide-react'

interface PixDetailsDialogContentProps {
  data: {
    id?: number
    id_documento?: number
    brcode: string
  }
  qrcode: string
}

export function PixDetailsDialogContent({
  data,
  qrcode,
}: PixDetailsDialogContentProps) {
  const idFromCharge = data.id ? data.id : data.id_documento

  const { data: charge, isLoading } = useQuery({
    queryKey: ['charge', data],
    queryFn: () => getChargeInfo({ id: idFromCharge as number }),
  })

  if (isLoading || !charge) {
    return null
  }

  return (
    <DialogContent>
      {(charge.status === 'CREATED' || charge.status === 'PAID') && (
        <PayChargeInfo data={charge} qrcode={qrcode} brcode={data.brcode} />
      )}

      {charge.status === 'CREDITED' && <PaidCharge data={charge} />}

      {charge.status === 'EXPIRED' && <PaidCharge data={charge} />}
    </DialogContent>
  )
}
