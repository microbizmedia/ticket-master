'use server'
// lib/actions/night-event.ts
import { NewEventSchema } from '@/lib/schemas'
import { createNightEvent } from '@/lib/db/night-events'

export async function createNightEventAction(data: unknown) {
  const result = NewEventSchema.safeParse(data)

  if (!result.success) {
    console.error('Validation errors:', result.error.flatten());
    return { error: 'Form validation error.' }
  }

  try {
    await createNightEvent(result.data)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Something went wrong' }
  }
}


