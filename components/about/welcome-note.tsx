import Image from 'next/image'
import React from 'react'

export const WelcomeNote = () => {
  return (
    <section className="w-full py-16 md:py-24">
        <div className="container">
            <div className="max-w-4xl 
             md:items-center mx-auto">
                <h2 className="mb-6 text-3xl font-bold capitalize
                text-center md:text-start
                tracking-tight md:text-4xl text-napowa-orange">Welcome Note</h2>
            <div className="grid gap-2 grid-cols-1 h-full md:grid-cols-2 ">
                <div className="relative h-[550px] overflow-hidden rounded-lg
                w-[350px] mx-auto md:mx-0 flex flex-col gap-4">
                   <div className="h-[98%] rounded-md relative">
                     <Image
                    src="/images/welcome-note-image.jpg?height=800&width=600"
                    alt="NAPOWA members at a community event"
                    fill
                    className="object-cover rounded-md aspect-square"
                    />
                   </div>
                    <div className="p-2">
                        <h4 className="text-napowa-red">Jenetrix Aoko Orwa Otieno</h4>
                        <h6 className="flex items-center gap-1 text-sm">
                            <p className="text-napowa-red">Founder,</p>
                            <p>
                            National Police Wives Welfare Association
                            </p>
                        </h6>

                    </div>
                </div>
                <div className="space-y-4 text-muted-foreground">
                <p>
                    It is with great pleasure and
                    delight that I welcome you to
                    National Police Wives Welfare
                    Association , an initiative on
                    the mission to empower
                    underprivileged Police Wives
                    and young widows through
                    relevant education, skills
                    development, innovative
                    healthcare and focused
                    livelihood programs.
                </p>
                <p>
                    This we have done over the past
                    10 years and have recorded
                    significant impact through various
                    activities that have been beneficial
                    to many Police Wives and young
                    widows.
                </p>
                <p>
                 As founder and visioner, inspite of
                the many challenges we are faced
                with as a not-for-profit organisation,
                the vision still remains clear in sight
                and we continually do our best to
                make sure these underprivileged
                Police Wives and Police Widows are
                empowered, upskilled and uplifted.
                </p>
                <p>
                I welcome you on this journey and
                look forward to your continued
                support and contribution to this
                noble cause.

                </p>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}
