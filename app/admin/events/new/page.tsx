import BackButton from '@/components/back-button'
import NewEventForm from '@/components/new-event-form' // updated form component name

export default function NewEvent() {
  return (
    <section>
      <BackButton href='/admin/events' text='Back' />

      <div className='mt-4 max-w-2xl'>
        <h2 className='text-2xl font-semibold tracking-tight'>New Event</h2>

        <NewEventForm />
      </div>
    </section>
  )
}
