import { getEventById } from '@/lib/db/night-events'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import NumberInput from '@/components/ui/input-custom'

interface EventPageProps {
    params: {
        id: string
    }
}

export default async function EventPage({ params }: EventPageProps) {
   
    const event = await getEventById(params.id)
    console.log('typeof params.id:', typeof params.id) // should log "string"
    if (!event) return notFound()

    return (
        <section className='min-h-screen max-w-[1000px] mx-auto px-4 py-16 pt-40 md:flex gap-6' >


            {/* left half */}
            <div className='md:w-2/5 '>
                <div className='relative h-72 overflow-hidden bg-muted sm:h-64 rounded-lg '>
                    {event.imageUrl?.trim() && (
                        <Image
                            src={event.imageUrl}
                            alt={event.djName}
                            className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
                            sizes='25vw'
                            priority
                            fill
                        />
                    )}
                </div>
                <p className='mt-1 text-xl text-gray-500 text-end mb-4'>
                    {/* Date */}
                    {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                    })}
                </p>
                {/* Location */}
                <div className='mb-4'>
                    <h3 className='text-lg font-semibold text-end'>Neon Dreams NightClub</h3>
                    <p className='text-end'>{event.location || 'Address to be announced'}</p>
                </div>
                <p className='text-end mb-4'>Ages 21+</p>

                <p className='text-end'>Share with friends</p>
                <div className='flex justify-end'>
                    <Button className="cursor-pointer px-10 py-1 ">Facebook</Button>
                </div>





            </div>
            {/* right half */}
            <div className='md:w-3/5'>
                <h2 className='text-4xl font-bold text-primary mb-16'>{event.djName}</h2>
                {/* price and nubmer of tickets */}
                <div className='flex place-content-between mb-8'>
                    <p className='text-lg font-semibold'>
                        General admission: ${event.price.toFixed(2)}
                    </p>
                    {/* Tickets Selector */}
                    <NumberInput />
                </div>
                {/* Description */}
                <div className='mb-8'>
                    <h3 className='text-lg font-semibold'>About the Event</h3>
                    <p className='text-muted-foreground'>{event.description}</p>
                </div>

                {/* Terms & Conditions */}
                <div className='mt-6 border-t pt-4 mb-4'>
                    <h3 className='text-lg font-semibold mb-2'>Terms & Conditions</h3>
                    <p className='text-sm text-muted-foreground'>
                        By purchasing a ticket, you agree to our no-refund policy. The event may be rescheduled or relocated due to weather or other unforeseen circumstances. Please bring a valid ID at the entrance.
                    </p>
                </div>
                <div className='flex justify-end'>
                    <Button className="cursor-pointer px-20 py-5 ">Agree & Chekout</Button>
                </div>
            </div>
        </section>
    )
}
