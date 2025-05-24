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
import { getServerSession } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react"


export default function LoginPage() {
  const { setTotalSteps,nextStep,formStep,resetFields } = useAuthForm();
  const [error,setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

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
  const onSubmit = async (data: LoginPayload) => {
    setLoading(true); 
    setError(""); 

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("login error:", result);
        setLoading(false); 

        setError(result?.error || "Login failed");
        
        return;
      }
      const authRes = await signIn("credentials", {
        token: result.token,
        redirect: false,
      })

      if (authRes?.ok) {
        router.push(redirectTo)
      } else {
        setError(authRes?.error || "Authentication failed")
        return;
      }
    } catch (err) {
      setError("Something went wrong.");
      return;
    } finally {
      setLoading(false);
      return;
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
