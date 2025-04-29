import { getEvents } from '@/lib/db/night-events'
import Events from '@/components/events-admin'


export default async function BookingForm() {
    const events = await getEvents(10)
    return (
        <section className=" min-h-screen px-10 max-w-[1200px]">
            <h1>UPCOMING EVENTS</h1>
            <div className=''>
                {events?.length > 0 ? (
                    <Events events={events} />
                ) : (
                    <div className='mt-6 text-sm text-muted-foreground'>
                        No events found.
                    </div>
                )}
            </div>

        </section>
    )
}