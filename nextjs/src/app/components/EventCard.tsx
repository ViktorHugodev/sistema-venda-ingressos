import Link from 'next/link'
import { EventImage } from './EventImage'
import { EventModel } from '@/models'

export type EventCardProps = {
  event: EventModel
}

export function EventCard(props: EventCardProps) {
  return (
    <Link href={`/event/${props.event.id}/spots-layout`}>
      <div className='flex w-[277px] flex-col rounded-2xl bg-secondary'>
        <EventImage
          src={
            'https://images.unsplash.com/photo-1729850219812-45733c1c0acc?q=80&w=1293&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={props.event.name}
        />
        <div className='flex flex-col gap-y-2 px-4 py-6'>
          <p className='text-sm uppercase text-subtitle'>
            {new Date(props.event.date).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
          <p className='font-semibold'>{props.event.name}</p>
          <p className='text-sm font-normal'>{props.event.location}</p>
        </div>
      </div>
    </Link>
  )
}
