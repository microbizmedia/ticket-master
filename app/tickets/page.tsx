//customer tickets page
import { getEvents } from '@/lib/db/night-events'
import Events from '@/components/events-customer'

export default async function Book() {
  const events = await getEvents(10)
  return (
    <section className='mx-[1rem] pb-24 pt-40  '>
      <h1 className='text-2xl text-center'>UPCOMING EVENTS</h1>
      {events?.length > 0 ? (
        <Events events={events} />
      ) : (
        <div className='mt-6 text-sm text-muted-foreground'>
          No events found.
        </div>
      )}
    </section>
  )
}
