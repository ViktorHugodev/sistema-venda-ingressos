import { EventModel } from '../models'
import { EventCard } from './components/EventCard'
import { Title } from './components/Title'

export default async function HomePage() {
  const events: EventModel[] = [
    {
      id: '1',
      name: 'Copa do Mundo 2024',
      organization: 'Copa do Mundo',
      date: '2024-10-30',
      price: 99,
      location: 'Montes Claros',
      image_url: '',
      rating: '5.5',
    },
    {
      id: '1',
      name: 'Copa do Mundo 2024',
      organization: 'Copa do Mundo',
      date: '2024-10-30',
      price: 99,
      location: 'Montes Claros',
      image_url: '',
      rating: '5.5',
    },
    {
      id: '1',
      name: 'Copa do Mundo 2024',
      organization: 'Copa do Mundo',
      date: '2024-10-30',
      price: 99,
      location: 'Montes Claros',
      image_url: '',
      rating: '5.5',
    },
  ]
  console.log(events)
  return (
    <main className='mt-10 flex flex-col'>
      <Title>Eventos disponíveis</Title>
      <div className='mt-8 sm:grid sm:grid-cols-auto-fit-cards flex flex-wrap justify-center gap-x-2 gap-y-4'>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  )
}
