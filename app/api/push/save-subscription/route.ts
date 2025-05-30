import type { NextApiRequest, NextApiResponse } from "next"

// For demonstration, storing in memory (not for production!)
const subscriptions: PushSubscription[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const subscription = req.body

    // Here, you should ideally check if the subscription already exists and avoid duplicates
    subscriptions.push(subscription)

    console.log("🔔 New subscription saved:", subscription)
    return res.status(201).json({ message: "Subscription saved" })
  } catch (error) {
    console.error("Error saving subscription:", error)
    return res.status(500).json({ message: "Failed to save subscription" })
  }
}
