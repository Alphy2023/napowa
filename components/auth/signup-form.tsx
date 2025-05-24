"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { SignupPayload } from "@/schemas/auth.schema"
import { UseFormReturn } from "react-hook-form"
import { FIELDTYPES } from "@/lib/utils"
import { InputField } from "../InputField"
import { useAuthForm } from "@/contexts/auth-form-context"



interface SignupFormProps{
  form: UseFormReturn<SignupPayload>
}
type SelectOption ={
    label:string;
    value:string;
}

export const SignupForm = ({form}:SignupFormProps) => {
  const { formStep } = useAuthForm()
  const memberType = form.watch("memberType") 

  const memberships: SelectOption[] = [
    {
        label: "Regular member",
        value:"regular"
    },
    {
        label: "Widow",
        value:"widow"
    },
    {
        label: "Orphan",
        value:"orphan"
    },
    {
        label: "Family member",
        value:"family"
    },
  ]
  const rankOptions: SelectOption[] = [
  { label: "Constable", value: "constable" },
  { label: "Corporal", value: "corporal" },
  { label: "Sergeant", value: "sergeant" },
  { label: "Inspector", value: "inspector" },
  { label: "", value: "chief-inspector" },
  { label: "Superintendent", value: "superintendent" },
  { label: "Senior Superintendent", value: "senior-superintendent" },
  { label: "Commissioner", value: "commissioner" },
];
  const countryOptions: SelectOption[] = [
  { label: "Nairobi", value: "nairobi" },
  { label: "Kisumu", value: "kisumu" },
  { label: "Mombasa", value: "mombasa" },
  { label: "Nakuru", value: "nakuru" },
  { label: "Eldoret", value: "eldoret" },
];


 
  return (
    <>
        {formStep === 0 && (
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <InputField
                    fieldType={FIELDTYPES.INPUT}
                    form={form}
                    type="text"
                    name="firstName"
                    id="firstName"
                    label="First name"
                    placeholder="Enter your first name"
                />
                <InputField
                    fieldType={FIELDTYPES.INPUT}
                    form={form}
                    type="text"
                    name="lastName"
                    id="lastName"
                    label="last name"
                    placeholder="Enter your last name"
                />
          
            </div>
             <InputField
                fieldType={FIELDTYPES.INPUT}
                form={form}
                type="email"
                name="email"
                id="email"
                label="Email"
                placeholder="eg, email@example.com"
            />
            <InputField
                fieldType={FIELDTYPES.INPUT}
                form={form}
                type="text"
                name="phone"
                id="phone"
                label="Phone number"
                placeholder="Enter your phone number"
            />
        </div>
        )}

        {formStep === 1 && (
        <div className="space-y-4">
             <InputField
                fieldType={FIELDTYPES.INPUT}
                form={form}
                type="password"
                name="password"
                id="password"
                label="Password"
                placeholder="********"
            />
             <InputField
                fieldType={FIELDTYPES.INPUT}
                form={form}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm password"
                placeholder="********"
            />
             <InputField
                fieldType={FIELDTYPES.SELECT}
                form={form}
                type="text"
                name="memberType"
                id="memberType"
                label="Member type"
                placeholder="Select member type"
                options={memberships}
            />
        </div>
        )}

        {formStep === 2 && (
        <div className="space-y-4">
            <InputField
                fieldType={FIELDTYPES.INPUT}
                form={form}
                type="number"
                name="idNumber"
                id="idNumber"
                label="ID number"
                placeholder="Enter your ID number"
            />
          

            {memberType === "regular" && (
            <>
               <InputField
                    fieldType={FIELDTYPES.INPUT}
                    form={form}
                    type="text"
                    name="serviceNumber"
                    id="serviceNumber"
                    label="Service Number"
                    placeholder="Enter your service number"
                />
               <InputField
                    fieldType={FIELDTYPES.SELECT}
                    form={form}
                    type="text"
                    name="rank"
                    id="rank"
                    label="Rank"
                    options={rankOptions}
                    placeholder="Select your rank"
                />
               <InputField
                    fieldType={FIELDTYPES.INPUT}
                    form={form}
                    type="text"
                    name="station"
                    id="station"
                    label="Station/Unit"
                    placeholder="Enter your station or unit"
                />
               
            </>
            )}
              <InputField
                    fieldType={FIELDTYPES.SELECT}
                    form={form}
                    type="text"
                    name="county"
                    id="county"
                    label="County"
                    options={countryOptions}
                    placeholder="Select your county"
                />
           

            <div className="flex items-center space-x-2">
            <InputField
                fieldType={FIELDTYPES.CHECKBOX}
                form={form}
                
                // type="text"
                name="agreeTerms"
                id="agreeTerms"
                checkboxLabel={
                    <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">
                    terms and conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                    privacy policy
                    </Link>
                </Label>
            }
            />
            </div>
        </div>
        )}
    </>
  )
}
