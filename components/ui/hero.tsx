import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Hero() {
    return (
        <main className='relative  isolate'>
            <div className=" min-h-screen flex justify-center items-center">
                <Link
                    href="/tickets" >
                    <Button className="cursor-pointer px-16 py-6">Tickets</Button>
                </Link>
            </div>
        </main>
    )
}
