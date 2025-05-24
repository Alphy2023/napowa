import React from 'react'
import { Alert,AlertDescription } from './ui/alert'
import { AlertCircle} from "lucide-react"

interface CustomAlertProps {
    variant?:"default" | "destructive" | null | undefined;
    text?:string;
}

export const CustomAlert = ({variant,text}:CustomAlertProps) => {
  return (
    <div className="w-full pt-2 pb-2">
         <Alert variant={variant || "destructive"} className="">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="first-letter:capitalize">{text}</AlertDescription>
          </Alert>
    </div>
  )
}
