import Link from 'next/link'
import { EventImage } from './EventImage'
import { EventModel } from '@/models'

export type EventCardProps = {
  event: EventModel
}

export function EventCard(props: EventCardProps) {
  return (
    <Link href={`/event/${props.event.id}/spots-layout`}>
      <div className="card group h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-card">
          <EventImage
            src={
              'https://images.unsplash.com/photo-1729850219812-45733c1c0acc?q=80&w=1293&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={props.event.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-sympla-primary text-white text-xs font-bold px-2 py-1 rounded">
            DESTAQUE
          </div>
        </div>
        
        <div className="flex flex-col gap-y-2 p-4 flex-grow">
          <p className="text-sm font-medium text-sympla-secondary">
            {new Date(props.event.date).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
            })}
          </p>
          <h3 className="font-bold text-sympla-dark text-lg">{props.event.name}</h3>
          <div className="flex items-center text-sm text-sympla-text mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-sympla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{props.event.location}</span>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sympla-primary">
                R$ {Math.floor(Math.random() * 200) + 50},00
              </span>
              <span className="bg-sympla-primary/10 text-sympla-primary text-xs font-medium px-2 py-1 rounded">
                {Math.floor(Math.random() * 100) + 10} ingressos
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
