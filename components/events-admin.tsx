// components/night-events.tsx
import Link from 'next/link'
import { NightEvent } from '@prisma/client'
import EventItem from '@/components/event-item'

interface NightEventsProps {
  events: NightEvent[]
}

export default function NightEvents({ events }: NightEventsProps) {
  return (
   
      <ul className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-6 max-w-7xl mx-auto'>
        {events.map(event => (
          <li
            key={event.id}
            className=' w-full md:max-w-[450px] mx-auto
    
              relative overflow-hidden rounded-2xl'
          >
            <Link href={`/admin/events/${event.id}/edit`}>
              <EventItem event={event} />
            </Link>
          </li>
        ))}
      </ul>
  )
}