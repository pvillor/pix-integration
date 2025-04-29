import { api, canviApi } from '@/lib/axios'

export interface GetPixRequest {
  id_invoice_pix?: number
  id_invoice_pix_documento?: number
  type: 'dinamic' | 'static'
}

export interface GetPixResponse {
  data: {
    id: number
    qrcode: {
      data: number[]
    }
    brcode: string
    vencimento: string
    valor: string
    status: 'created' | 'expired' | 'paid' | 'credited'
    nome_pagador: string
    data_efetivacao: string
    codigo_rastreio: string
  }
}

export async function getPix({
  id_invoice_pix,
  id_invoice_pix_documento,
  type,
}: GetPixRequest) {
  const { data: tokenData } = await api.post('login')

  const endpoint =
    type === 'dinamic' ? 'dinamico/consulta' : 'estatico/documento'

  const { data } = await canviApi.post<GetPixResponse>(
    `pix/${endpoint}`,
    {
      id_invoice_pix: type === 'dinamic' ? id_invoice_pix : undefined,
      id_documento: type === 'static' ? id_invoice_pix_documento : undefined,
    },
    {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    }
  )

  return data
}
