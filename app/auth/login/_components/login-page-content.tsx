"use client"


import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { AuthCard } from "@/components/auth/auth-card"
import AuthFormWrapper from "@/components/auth/auth-form-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginPayload, loginSchema } from "@/schemas/auth.schema"
import { useAuthForm } from "@/contexts/auth-form-context"
import { signIn } from "next-auth/react";
import { CustomAlert } from "@/components/CustomAlert"
import { ApiResponse } from "@/lib/api/client"
import { useToast } from "@/hooks/use-toast"
import { authApi } from "@/lib/api"


export default function LoginPageContent() {
  const { setTotalSteps,nextStep,formStep,resetFields } = useAuthForm();
  const [error,setError] = React.useState<string>("");
  const { toast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectedFrom") || "/dashboard"
  const form = useForm<LoginPayload>({
      resolver: zodResolver(loginSchema),
      mode: "onTouched",
      defaultValues: {
        email: "",
        password: "",
      },
  })
  const {
    formState: { isSubmitting:loading },
    reset,
   } = form
  const onSubmit = async (values: LoginPayload) => {
    setError(""); 

    try {
       const res: ApiResponse<LoginPayload> = await authApi.login(values);
               
        if (!res?.success) {
            toast({
                title: "Error occurred.",
                description: res?.message || res?.errors?.[0]?.message || "Something went wrong.",
            });
            setError(res?.message || res?.errors?.[0]?.message || "Something went wrong.");
            return; 
          }
      const authRes = await signIn("credentials", {
        token: res?.data?.token,
        redirect: false,
      })
      reset()
      if (authRes?.ok) {
          toast({
              title: "Successful.",
              description: res?.message || "Welcome back.",
          });
        router.push(redirectTo)
      } else {
        setError(authRes?.error || "Authentication failed")
        return;
      }
    } catch (err) {
      setError("Something went wrong.");
      // return;
    } 
  };


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
          btnTitle="Login"
          loading={loading}
          cardDescription={"Enter your credentials to access your account"}
          >
            {error && (
              <CustomAlert variant={"destructive"} text={error}/>
            )}

          <LoginForm
          loading={loading}
          form={form}
          />
          </AuthCard>

      </AuthFormWrapper>
  )
}
