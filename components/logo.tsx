import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
      <Link href="/" className="flex items-center space-x-2 ">
            <Image
            src="/images/napowwa-logo.png?height=40&width=40"
            alt="NAPOWA Logo"
            width={40}
            height={40}
            className="rounded-md bg-white"
            />
            <span className="hidden font-bold sm:inline-block">NAPOWA</span>
        </Link>
    
  )
}
