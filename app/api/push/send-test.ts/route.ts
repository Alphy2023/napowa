import type { NextApiRequest, NextApiResponse } from "next"
import webPush from "web-push"

// These should match your VAPID keys
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY! // Set this in your .env

// Set your VAPID details (only once per app run)
webPush.setVapidDetails(
  "mailto:your-email@example.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
)

// Simulate stored subscriptions (replace with real DB/store)
let subscriptions: PushSubscription[] = []

// You can reuse the same array from `save-subscription.ts` in real apps via a shared store
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const testNotification = JSON.stringify({
      title: "🎉 Test Notification",
      body: "This is a push test message from your app!",
    })

    for (const sub of subscriptions) {
      await webPush.sendNotification(sub, testNotification)
    }

    return res.status(200).json({ message: "Push sent to all subscribers" })
  } catch (error) {
    console.error("Error sending push:", error)
    return res.status(500).json({ message: "Failed to send push" })
  }
}
