"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

const schema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function TwoFactorForm({ userId }: { userId: string }) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/auth/verify-otp", {
        userId,
        otp: data.otp,
      });

      if (response.data.token) {
        // Store token and redirect to dashboard
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-xl font-bold text-center">Enter OTP</h2>
      <p className="text-sm text-center text-gray-500">Check your email for the 6-digit code</p>
      <Input {...register("otp")} placeholder="Enter 6-digit OTP" maxLength={6} className="text-center text-xl" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Verify
      </Button>
    </form>
  );
}
