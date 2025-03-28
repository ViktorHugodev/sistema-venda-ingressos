import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'
import { EventModel } from '../../models'
import { CheckoutForm } from './CheckoutForm'
import { Title } from '../components/Title'

export async function getEvent(eventId: string): Promise<EventModel> {
  console.log('🚀 ~ file: page.tsx:9 ~ getEvent ~ eventId:', eventId)
  try {
    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      cache: 'no-store',
      next: {
        tags: [`events/${eventId}`]
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar evento: ${response.status}`)
    }

    const text = await response.text()
    if (!text) {
      throw new Error('Resposta vazia do servidor')
    }

    try {
      return JSON.parse(text)
    } catch (e) {
      console.error('Erro ao parsear JSON:', text)
      throw new Error('Resposta inválida do servidor')
    }
  } catch (error) {
    console.error('Erro ao buscar evento:', error)
    // Retornar um modelo de evento padrão em caso de erro
    return {
      id: eventId,
      name: 'Não foi possível carregar os detalhes deste evento',
      date: new Date().toISOString(),
      price: 0,
      location: 'Indisponível',
      organization: 'Indisponível',
      rating: 'Indisponível',
      image_url: 'Indisponível',
    }
  }
}
export default async function CheckoutPage() {
  const cookiesStore = cookies()
  const eventId = cookiesStore.get('eventId')?.value || 'fe3a63bd-cd8f-4b13-b329-161f03f445a5'
  console.log('🚀 ~ file: page.tsx:31 ~ CheckoutPage ~ eventId:', eventId)
  if (!eventId) {
    return redirect('/')
  }
  const event = await getEvent(eventId)
  const selectedSpots = JSON.parse(cookiesStore.get('spots')?.value || '[]')
  let totalPrice = selectedSpots.length * event.price
  const ticketKind = cookiesStore.get('ticketKind')?.value
  if (ticketKind === 'half') {
    totalPrice = totalPrice / 2
  }
  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
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
            year: 'numeric'
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
              defaultValue={'test@test.com'}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='titular'>Nome no cartão</label>
            <input
              type='text'
              name='card_name'
              className='mt-2 border-solid rounded p-2 h-10 bg-input'
              defaultValue={'Teste Teste'}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='cc'>Numero do cartão</label>
            <input
              type='card_number'
              name='cc'
              className='mt-2 border-solid rounded p-2 h-10 bg-input'
              defaultValue={'4111111111111111'}
            />
          </div>
          <div className='flex flex-wrap sm:justify-between'>
            <div className='flex w-full flex-col md:w-auto'>
              <label htmlFor='expire'>Vencimento</label>
              <input
                type='text'
                name='expire_date'
                className='mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input'
                defaultValue={'12/2024'}
              />
            </div>
            <div className='flex w-full flex-col md:w-auto'>
              <label htmlFor='cvv'>CVV</label>
              <input
                type='text'
                name='cvv'
                className='mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input'
                defaultValue={'123'}
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
