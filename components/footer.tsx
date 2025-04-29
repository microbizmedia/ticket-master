import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='py-4'>
      <div className='flexitems-center justify-between text-center text-sm font-light text-muted-foreground sm:flex-row'>
        <p>
          <span className='text-base font-medium text-primary'>
            MicroBiz Media LLC
          </span>{' '}
          &copy;{new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
