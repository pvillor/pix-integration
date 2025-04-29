'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createCharge,
  type CreateChargeInput,
  createChargeSchema,
} from '@/http/create-charge'
import { useMutation } from '@tanstack/react-query'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { PixDetailsDialog } from './pix-details-dialog'
import { CalendarIcon, LoaderPinwheel } from 'lucide-react'
import { toast } from 'sonner'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'

export function CreateChargeForm() {
  const [date, setDate] = useState<Date>()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateChargeInput>({
    resolver: zodResolver(createChargeSchema),
  })

  const {
    data,
    mutateAsync: createChargeFn,
    variables,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createCharge,
    onSuccess: () => {
      toast.success('Cobrança pix gerada com sucesso!')
    },
  })

  async function handleCreateCharge({
    amount,
    description,
    type,
    customerDocument,
    customerEmail,
    customerName,
    dueDate,
  }: CreateChargeInput) {
    await createChargeFn({
      amount,
      description,
      type,
      customerDocument,
      customerEmail,
      customerName,
      dueDate,
    })
  }

  const chargeType = watch('type')

  return (
    <div className="space-y-5">
      <form
        onSubmit={handleSubmit(handleCreateCharge)}
        className="space-y-6 w-2xs"
      >
        <div className="space-y-2">
          <Label className="">Valor</Label>
          <div className="flex items-center px-2 focus-within:rounded-md focus-within:ring-2 focus-within:ring-zinc-400/50">
            <span className="text-xs text-zinc-400 shrink-0">
              R$ (centavos)
            </span>
            <Input
              className="border-0 focus-visible:ring-transparent"
              placeholder="4000"
              {...register('amount')}
            />
          </div>

          <span className="text-xs text-zinc-400">
            Digite o valor em centavos. Ex: R$ 40 é 4000
          </span>

          {errors.amount && (
            <span className="text-xs text-red-600">
              {errors.amount.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label className="">Descrição</Label>
          <Input
            className="border-0"
            placeholder="Deixe uma descrição"
            {...register('description')}
          />
          {errors.description && (
            <span className="text-xs text-red-600">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label className="">Tipo</Label>

          <Select
            onValueChange={value =>
              setValue('type', value as 'dinamic' | 'static')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipos de pagamento</SelectLabel>

                <SelectItem value="dinamic">Dinâmico</SelectItem>
                <SelectItem value="static">Estático</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.type && (
            <span className="text-xs text-red-600">{errors.type.message}</span>
          )}
        </div>

        {chargeType === 'dinamic' && (
          <div className="space-y-2">
            <Label htmlFor="date">Data de vencimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-zinc-100"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, 'PPP', { locale: ptBR })
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={selectedDate => {
                    if (selectedDate) {
                      setDate(selectedDate)
                      setValue('dueDate', selectedDate)
                    }
                  }}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-xs text-zinc-400">
              Coloque a data de hoje ou antes para testar o modal de cobrança
              expirada.
            </span>
          </div>
        )}

        <Button type="submit" className="w-full">
          {isPending ? <LoaderPinwheel className="animate-spin" /> : 'Gerar'}
        </Button>
      </form>

      {isSuccess && (
        <PixDetailsDialog
          pixId={data.charge.pixId}
          type={variables.type}
          qrcode={data.charge.qrcode}
        />
      )}
    </div>
  )
}
