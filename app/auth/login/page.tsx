import React, { Suspense } from "react";
import LoginPageContent from "./_components/login-page-content";


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent/>
    </Suspense>
  )
}
