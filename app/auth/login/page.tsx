"use client"

import React, { useEffect } from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { LoginForm } from "@/components/auth/login-form"
import { AuthCard } from "@/components/auth/auth-card"
import AuthFormWrapper from "@/components/auth/auth-form-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginPayload, loginSchema } from "@/schemas/auth.schema"
import { useAuthForm } from "@/contexts/auth-form-context"

export default function LoginPage() {
  const { setTotalSteps,nextStep,formStep,resetFields } = useAuthForm()

  const form = useForm<LoginPayload>({
      resolver: zodResolver(loginSchema),
      mode: "onTouched",
      defaultValues: {
        email: "",
        password: "",
      },
  })
   const onSubmit = async (data: LoginPayload) => {
      console.log(data)
    }

  const handleNextStep = async () => {
    const stepFields: Record<number, (keyof LoginPayload)[]> = {
      0: ["email"],
      1: ["password"],
    }

    const valid = await form.trigger(stepFields[formStep])
    if (valid) {
      nextStep(() => Promise.resolve(true))
    }
  }
  
  useEffect(()=>{
    resetFields()
    setTotalSteps(2)
  },[setTotalSteps])


  return (
      <AuthFormWrapper
        pageTitle={"Account Login"}
        description={"Procced to access your NAPOWA account"}
      >
        <AuthCard
          authType="login"
          form={form}
          handleNextStep={handleNextStep}
          onSubmit={onSubmit}
          cardTitle={"Login"}
          cardDescription={"Enter your credentials to access your account"}
          >
          <LoginForm
          form={form}
          />
          </AuthCard>

      </AuthFormWrapper>
  )
}
