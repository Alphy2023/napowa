import React from 'react'
import { PageTitle } from './page-title';

interface HeroContentProps{
  title: string;
  description:string;
}

export const HeroContent = ({description,title}:HeroContentProps) => {
  return (
    <div className="w-full">
    <div className="napowa-stripes-top"></div>
      <section className="w-full bg-gradient-to-b from-orange/20 to-background py-20 md:py-28">
        <div className="container">
           <PageTitle
            title={title}
            description={description}
            />
          {/* <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold 
            tracking-tight md:text-5xl">{title}</h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {description}
            </p>
          </div> */}
        </div>
      </section>
    </div>
  )
}
