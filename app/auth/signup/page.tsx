"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignupForm } from "@/components/auth/signup-form"
import { AuthCard } from "@/components/auth/auth-card"
import AuthFormWrapper from "@/components/auth/auth-form-wrapper"
import { useForm } from "react-hook-form"
import { SignupPayload, signupSchema } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthForm } from "@/contexts/auth-form-context"
import { VolunteerForm } from "@/components/auth/volunteer-form"
import { ApiResponse } from "@/lib/api/client"
import { authApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { CustomAlert } from "@/components/CustomAlert"

type SignUpTabsProps = {
    title:string;
    description:string;
    key:string;
  }

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("member")
  const { setTotalSteps,nextStep,formStep,resetFields } = useAuthForm()
  const [error,setError] = useState<string>("");
  
  const { toast } = useToast()
  const router = useRouter()
  

  const form = useForm<SignupPayload>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
   defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      memberType: "regular", 
      idNumber: "",
      serviceNumber: "",
      rank: "",
      station: "",
      county: "",
      agreeTerms: false, 
    }
  })
   const {
    formState: { isSubmitting:loading },
    reset,
   } = form
  const handleNextStep = async () => {
    const stepFields: Record<number, (keyof SignupPayload)[]> = {
      0: ["firstName", "lastName", "email", "phone"],
      1: ["password", "confirmPassword", "memberType"],
      2: ["idNumber", "county","serviceNumber", "rank", "station","agreeTerms"],
    }

    const valid = await form.trigger(stepFields[formStep])
    if (valid) {
      nextStep(() => Promise.resolve(true))
    }
  }
  const onSubmit = async (values: SignupPayload) => {
      console.log(values)
      const res: ApiResponse<SignupPayload> = await authApi.signup(values);
                    
      if (!res?.success) {
          toast({
              title: "Error occurred.",
              description: res?.message || res?.errors?.[0]?.message || "Something went wrong.",
          });
          setError(res?.message || res?.errors?.[0]?.message || "Something went wrong.");
          return; 
      }
        toast({
            title: "Successful.",
            description: res?.message,
      });
      router.push("/auth/login")
  }
    


  const signUpTabs: SignUpTabsProps[] = [
    {
      key:"member",
      title:"Member Registration",
      description:"Create an account as a police officer, widow, or family member of a police officer.",
    },
    {
      key:"volunteer",
      title:"Volunteer Registration",
      description:"Create an account to volunteer with NAPOWA.",
    },
  ]

    
  useEffect(()=>{
    resetFields()
    setTotalSteps(3)
  },[setTotalSteps])
  return (
    <AuthFormWrapper
    pageTitle="Create an account"
    description="Join the National Police Widows and Orphans Association community"
    >
       <Tabs value={activeTab} onValueChange={setActiveTab}
         className="w-full">
          <TabsList className="grid w-full grid-cols-2">
             {signUpTabs?.map(({key})=>(
              <TabsTrigger value={key} 
              key={key} className="first-letter:capitalize">{key}</TabsTrigger>
            ))}
          </TabsList>
          {signUpTabs?.map((item, idx)=>(
            <TabsContent value={item?.key} className="mt-4"
              key={idx}>
                <AuthCard
                authType="signup"
                form={form}
                btnTitle="Create Account"
                handleNextStep={handleNextStep}
                onSubmit={onSubmit}
                cardTitle={item?.title}
                cardDescription={item?.description}
                loading={loading}
                >
                   {error && (
                      <CustomAlert variant={"destructive"} text={error}/>
                    )}
                {item?.key==='member' ? (
                  <SignupForm form={form}/>
                ) : (
                  <VolunteerForm form={form}/>
                )}
                </AuthCard>
          
            </TabsContent>
          ))}
        
        </Tabs>
    </AuthFormWrapper>
  )
}
