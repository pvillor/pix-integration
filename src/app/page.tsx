import { CreateChargeForm } from './components/create-charge-form'

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen p-24">
      <h1 className="text-2xl font-bold">Gerar cobrança pix</h1>

      <CreateChargeForm />
    </div>
  )
}
