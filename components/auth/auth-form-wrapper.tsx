"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"


interface AuthFormWrapperProps{
    children:React.ReactNode,
    pageTitle?:string;
    description?:string;
}

export default function AuthFormWrapper({children,pageTitle,description}:AuthFormWrapperProps) {

  return (
    <div className="container flex min-h-screen flex-col
     items-center justify-center py-10 
     bg-gradient-to-b from-primary/10 to-background ">
      <motion.div 
       initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      className="mx-auto flex w-full flex-col justify-center
       space-y-6 sm:w-[450px]"
       >
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/">

            <Image src="/images/napowwa-logo.png?height=100&width=100"
            alt="NAPOWA Logo" width={100} height={100} />
          </Link>
          <h1 className="text-3xl font-bold text-napowa-red">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        {children}
        
      </motion.div>
    </div>
  )
}
