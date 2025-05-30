"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useUserStore } from "@/store/user.store"

export function useSyncUserWithSession() {
  const { data: session, status } = useSession()
  const setUser = useUserStore((s) => s.setUser)
  const clearUser = useUserStore((s) => s.clearUser)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user as any)
    }

    if (status === "unauthenticated") {
      clearUser()
    }
  }, [session, status, setUser, clearUser])
}
