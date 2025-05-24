"use client";

import React, { createContext, useContext, useState } from "react";

interface AuthFormContextType {
  formStep: number;
  totalSteps: number;
  setTotalSteps: (steps: number) => void;
  setFormStep: (step: number) => void;
  nextStep: (validateCurrentStep: () => Promise<boolean>) => void;
  prevStep: () => void;
  resetFields:()=>void;
}

const AuthFormContext = createContext<AuthFormContextType | undefined>(undefined);

export const AuthFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formStep, setFormStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(1); 

  const nextStep = async (validateCurrentStep: () => Promise<boolean>) => {
    const isValid = await validateCurrentStep();
    if (isValid && formStep < totalSteps - 1) {
      setFormStep((prev) => prev + 1);
    }
  };
  const resetFields = ()=>{
    setFormStep(0)
    setTotalSteps(1)
  }
  const prevStep = () => setFormStep((prev) => Math.max(prev - 1, 0));

  return (
    <AuthFormContext.Provider value={{ formStep, setFormStep,
    setTotalSteps,resetFields,
    totalSteps, nextStep, prevStep }}>
      {children}
    </AuthFormContext.Provider>
  );
};

export const useAuthForm = (): AuthFormContextType => {
  const context = useContext(AuthFormContext);
  if (!context) {
    throw new Error("useAuthForm must be used within an AuthFormProvider");
  }
  return context;
};
