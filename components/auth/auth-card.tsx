"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Check } from "lucide-react"
import { useAuthForm } from "@/contexts/auth-form-context"
import { UseFormReturn } from "react-hook-form"
import { Form } from "../ui/form"

interface AuthCardProps{
    children:React.ReactNode,
    onSubmit: (data: any) => void;
    authType:string;
    cardTitle?:string;
    cardDescription?:string;
    form:UseFormReturn<any>,
    handleNextStep?:()=>void;
    loading?:boolean;
    btnTitle:string;
}

export const AuthCard = ({children,form,
     handleNextStep,loading=false,
     btnTitle,
    authType, onSubmit,cardTitle,cardDescription
}:AuthCardProps) => {
    const { formStep, totalSteps, nextStep, prevStep } = useAuthForm()
    
  const fallbackNextStep = () => {
    nextStep(() => Promise.resolve(true))
  }
  return (
    <Card>
        <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>
            {cardDescription}
        </CardDescription>
        </CardHeader>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                <div className="flex w-full items-center justify-between">
                    {(formStep ?? 0) > 0 && (
                        <Button type="button" variant="outline" onClick={prevStep}>
                            Back
                        </Button>
                        )}

                    {formStep < totalSteps - 1 ? (
                        <div className="ml-auto">
                        <Button type="button" onClick={handleNextStep ?? fallbackNextStep}>
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        </div>
                    ) : (
                        <Button type="submit" 
                        loading={loading}
                        className="ml-auto"
                        onClick={form.handleSubmit(onSubmit)}>
                        {btnTitle}
                        <Check className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                
                </div>
                <div className="text-center text-sm">
                    {authType?.includes('signup') ? "Already have an account?" 
                    : "Don't have an account?"} {" "}
                    <Link href={authType?.includes('signup') ? "/auth/login":
                        "/auth/signup"
                    } className="text-primary underline">
                    {authType?.includes('signup') ? "Login" : "Sign up"}
                    </Link>
                </div>
                </CardFooter>
            </form>
        </Form>
    </Card>
  )
}
