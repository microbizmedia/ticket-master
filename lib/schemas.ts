// lib/schemas.ts
import { z } from 'zod'

export const NewEventSchema = z.object({
  djName: z.string().min(1, 'DJ name is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.union([z.string().url('Invalid URL').optional(), z.literal('')]),
  date: z.string().min(1, 'Date is required'), // Handle string -> Date later
  price: z.coerce.number().positive('Price must be a positive number')
})

