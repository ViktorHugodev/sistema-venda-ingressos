import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { EventModel } from '../../models'
import { Title } from '../components/Title'
import { CheckoutForm } from './CheckoutForm'

export async function getEvent(eventId: string): Promise<EventModel> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`, {
    cache: 'no-store',
    next: {
      tags: [`events/${eventId}`]
    }
  })
  console.log('🚀 ~ file: page.tsx:10 ~ getEvent ~ response:', response)

  return response.json()
}

export default async function CheckoutPage() {
  const cookiesStore = cookies()
  // const eventId = cookiesStore.get('eventId')?.value
  const eventId = '4bae0a8e-8049-41f2-ab36-03472373b27e'
  console.warn('🚀 ~ file: page.tsx:20 ~ CheckoutPage ~ eventId:', eventId)

  if (!eventId) {
    return redirect('/')
  }
  const event = await getEvent(eventId)
  console.warn('🚀 ~ file: page.tsx:27 ~ CheckoutPage ~ event:', event)
  const selectedSpots = JSON.parse(cookiesStore.get('spots')?.value || '[]')
  let totalPrice = selectedSpots.length * event.price
  const ticketKind = cookiesStore.get('ticketKind')?.value
  if (ticketKind === 'half') {
    totalPrice = totalPrice / 2
  }
  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice)
  return (
    <main className='mt-10 flex flex-wrap justify-center md:justify-between'>
      <div className='mb-4 flex max-h-[250px] w-full max-w-[478px] flex-col gap-y-6 rounded-2xl bg-secondary p-4'>
        <Title>Resumo da compra</Title>
        <p className='font-semibold'>
          {event.name}
          <br />
          {event.location}
          <br />
          {new Date(event.date).toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
        <p className='font-semibold text-white'>{formattedTotalPrice}</p>
      </div>
      <div className='w-full max-w-[650px] rounded-2xl bg-secondary p-4'>
        <Title>Informações de pagamento</Title>
        <CheckoutForm className='mt-6 flex flex-col gap-y-3'>
          <div className='flex flex-col'>
            <label htmlFor='titular'>E-mail</label>
            <input
              type='email'
              name='email'
              className='mt-2 border-solid rounded p-2 h-10 bg-input'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='titular'>Nome no cartão</label>
            <input
              type='text'
              name='card_name'
              className='mt-2 border-solid rounded p-2 h-10 bg-input'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='cc'>Numero do cartão</label>
            <input
              type='card_number'
              name='cc'
              className='mt-2 border-solid rounded p-2 h-10 bg-input'
            />
          </div>
          <div className='flex flex-wrap sm:justify-between'>
            <div className='flex w-full flex-col md:w-auto'>
              <label htmlFor='expire'>Vencimento</label>
              <input
                type='text'
                name='expire_date'
                className='mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input'
              />
            </div>
            <div className='flex w-full flex-col md:w-auto'>
              <label htmlFor='cvv'>CVV</label>
              <input
                type='text'
                name='cvv'
                className='mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input'
              />
            </div>
          </div>
          <button className='rounded-lg bg-btn-primary py-4 px-4 text-sm font-semibold uppercase text-btn-primary'>
            Finalizar pagamento
          </button>
        </CheckoutForm>
      </div>
    </main>
  )
}
