//admin event page
import Link from 'next/link'

import { PlusCircledIcon } from '@radix-ui/react-icons'
import { getEvents } from '@/lib/db/night-events'

import { Button } from '@/components/ui/button'
import Events from '@/components/events-admin'

export default async function EventsPage() {
  const events = await getEvents(10)

  return (
    <section>
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-semibold tracking-tight'>Events</h2>
          </div>
          <Button size='sm' className='h-7 gap-2' asChild>
            <Link href='/admin/events/new'>
              <PlusCircledIcon className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Event
              </span>
            </Link>
          </Button>
        </div>

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
