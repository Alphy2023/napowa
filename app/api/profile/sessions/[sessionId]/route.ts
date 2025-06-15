import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function DELETE(req: Request, { params }: { params: { sessionId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const sessionId = params.sessionId

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // In a real application, you would delete the specified session
    // For this example, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "Session has been revoked successfully",
    })
  } catch (error) {
    console.error("Error revoking session:", error)
    return NextResponse.json({ error: "Failed to revoke session" }, { status: 500 })
  }
}
