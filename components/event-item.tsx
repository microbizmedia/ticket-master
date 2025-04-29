import Image from 'next/image'
import { formatCurrency } from '@/lib/db/night-events'
import { NightEvent } from '@prisma/client'

interface EventProps {
  event: NightEvent
}

export default function EventItem({ event }: EventProps) {
  return (
    <div>
      {/* Image card */}
      <div className='relative h-72 overflow-hidden bg-muted sm:h-64 rounded-lg  '>
        {event.imageUrl && (
          <Image
            src={event.imageUrl}
            alt={event.djName}
            className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
            sizes='25vw'
            priority
            fill
          />
        )}
        <div className='absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/70' />
      </div>

      {/* Content below card */}
     
        {/* Title and Price */}
        <div className='flex justify-between items-center bg-white px-2 py-3 rounded-b-lg'>
          <h3 className='text-xl font-semibold text-gray-900'>
            {event.djName}
          </h3>
          <p className='mt-1 text-xl text-gray-500'>
             {/* Date */}
          {new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
        </div>
    </div>
  )
}
