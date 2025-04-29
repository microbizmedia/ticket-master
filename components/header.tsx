'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/20 py-6 backdrop-blur-sm">
      <nav className="flex items-center justify-evenly">
        {/* Logo as Home */}
        <Link href="/" className="text-xl font-bold text-primary">
        Neon Dreams Nightclub 
        </Link>
        {/* Admin Button */}
        <Link
          href="/admin/dashboard"
          className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Admin
        </Link>
      </nav>
    </header>
  )
}
