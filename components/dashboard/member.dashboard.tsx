"use client"

import { motion } from "framer-motion"
import { Calendar, DollarSign, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MemberDashboardPage() {
  const recentDonations = [
    { id: 1, amount: 1500, date: "2023-08-21", method: "M-Pesa" },
    { id: 2, amount: 2000, date: "2023-07-19", method: "Bank Transfer" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Community Clean-Up", date: "2023-09-02", location: "Local Church Grounds" },
    { id: 2, title: "Youth Retreat", date: "2023-09-15", location: "Naivasha" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} — {event.location}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Donations</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recentDonations.map((donation) => (
                  <li key={donation.id}>
                    <p className="text-sm font-semibold">KES {donation.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{donation.date} — {donation.method}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
