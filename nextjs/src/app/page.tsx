import { EventModel } from '../models'
import { EventCard } from './components/EventCard'
import { Title } from './components/Title'
export async function getEvents(): Promise<EventModel[]> {
  const response = await fetch(`http://localhost:3000/events`, {
    // headers: {
    //   apikey: process.env.GOLANG_API_TOKEN as string,
    // },
    cache: 'no-store',
    next: {
      tags: ['events'],
    },
  })

  return await response.json()
}
export default async function HomePage() {
  const events = await getEvents()
  console.warn('🚀 ~ file: page.tsx:19 ~ HomePage ~ events:', events)
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
