import React from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@react-email/components'


interface PageFetchErrroUIProps{
    title:string;
    error?:string;
    refetch:()=>void;
}
const PageFetchErrroUI = ({error,title,refetch}:PageFetchErrroUIProps) => {
  return (
    <div className="space-y-6 w-full">
        <Alert variant="destructive"
        className='w-full flex items-center'>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center">
            Failed to load {title}: {error}
            <Button variant="outline" size="sm" 
            className="ml-5 flex items-center cursor-pointer" 
            onClick={refetch}>
                <div className="flex items-center">

                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
                </div>
            </Button>
            </AlertDescription>
        </Alert>
    </div>
  )
}

export default PageFetchErrroUI