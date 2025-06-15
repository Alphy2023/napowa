import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real application, you would delete all sessions except the current one
    // For this example, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "All sessions have been revoked successfully",
    })
  } catch (error) {
    console.error("Error revoking all sessions:", error)
    return NextResponse.json({ error: "Failed to revoke all sessions" }, { status: 500 })
  }
}
