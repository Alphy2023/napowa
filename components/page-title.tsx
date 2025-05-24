import React from 'react'

interface PageTitleProps{
    title:string;
    description?:string;
}

export const PageTitle = ({title,description}:PageTitleProps) => {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold 
        tracking-tight md:text-4xl text-napowa-red dark:text-whitep">{title}</h2>
        <p className="text-muted-foreground">
        {description}
        </p>
    </div>
  )
}
