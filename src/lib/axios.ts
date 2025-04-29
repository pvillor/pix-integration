import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api`,
})

export const canviApi = axios.create({
  baseURL: 'https://gateway-homol.service-canvi.com.br/bt',
})
