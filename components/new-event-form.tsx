'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { z } from 'zod'

import { NewEventSchema } from '@/lib/schemas'
import { createNightEventAction } from '@/lib/actions/night-event'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import ImageUploader from '@/components/image-uploader'

type Inputs = z.infer<typeof NewEventSchema>

export default function NewEventForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(NewEventSchema)
  })

  const [filePickerIsOpen, setFilePickerIsOpen] = useState(false)

  function setImageUrl(url: string) {
    setValue('imageUrl', url)
    setFilePickerIsOpen(false)
  }

  const onSubmit = async (data: Inputs) => {
    try {
      // 1. Validate and parse the form data
      const validationResult = NewEventSchema.safeParse(data);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0]?.message;
        toast.error(firstError || 'Invalid input');
        return;
      }
  
      // 2. Convert the validated string date to a Date object
      const eventDate = new Date(validationResult.data.date);
      
      if (isNaN(eventDate.getTime())) {
        toast.error('Invalid date');
        return;
      }
  
      // 3. Prepare the final event data
      const eventData = {
        ...validationResult.data,
        date: eventDate.toISOString() // Send as ISO string (or just eventDate if your DB accepts Date objects)
      };
  
      // 4. Create the event
      const result = await createNightEventAction(eventData);
      
      if (result?.error) {
        throw new Error(result.error);
      }
  
      toast.success('Night event created!');
    } catch (error) {
      console.error('Event creation failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="DJ Name" {...register('djName')} />
      {errors.djName && <p className="text-sm text-red-500">{errors.djName.message}</p>}

      <Textarea placeholder="Event description" {...register('description')} rows={5} />
      {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

      <div className="flex gap-2">
        <Input disabled placeholder="Image URL" {...register('imageUrl')} />
        <Dialog open={filePickerIsOpen} onOpenChange={setFilePickerIsOpen}>
          <DialogTrigger asChild>
            <Button type="button">Select Image</Button>
          </DialogTrigger>
          <DialogContent>
            <ImageUploader setImageUrl={setImageUrl} />
          </DialogContent>
        </Dialog>
      </div>
      {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}

      <Input type="datetime-local" {...register('date')} />
      {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}

      <Input type="number" step="0.01" placeholder="Ticket Price (€)" {...register('price')} />
      {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Event'}
      </Button>
    </form>
  )
}
