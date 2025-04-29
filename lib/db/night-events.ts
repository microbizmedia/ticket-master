import prisma from '@/lib/db/prisma'


export async function getEvents(limit?: number) {
  return await prisma.nightEvent.findMany({
    orderBy: { date: 'asc' }, // or 'name' if you prefer sorting alphabetically
    ...(limit ? { take: limit } : {})
  });
}


export async function createNightEvent(data: {
  djName: string
  description: string
  imageUrl?: string
  date: Date
  price: number
}) {
  try {
    return await prisma.nightEvent.create({
      data
    })
  } catch (error) {
    console.error('Failed to create night event:', error)
    return { error: 'Something went wrong while creating the event.' }
  }
}

export async function getEventById(id: string) {
  return await prisma.nightEvent.findFirst({
    where: { id }, // change `id` to whatever your ID field is
  })
}



export function formatCurrency({
  amount,
  local = 'en-US',
  currency = 'USD',
  decimalPlaces = 2
}: {
  amount: number
  local?: string
  currency?: string
  decimalPlaces?: number
}) {
  if (typeof amount !== 'number' || isNaN(amount)) return

  const { format } = new Intl.NumberFormat(local, {
    style: 'currency',
    currency,
    maximumFractionDigits: decimalPlaces
  })

  return format(amount)
}

export function createUniqueSlugFromName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const uniqueIdentifier = Date.now().toString().slice(-6)
  return `${slug}-${uniqueIdentifier}`
}
