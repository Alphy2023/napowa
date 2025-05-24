"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { DollarSign, Calendar, CreditCard, FileText, Trash, Download, Printer, Send, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample donation data
const donationData = {
  id: "1",
  amount: 5000,
  currency: "KES",
  donor: {
    id: "d1",
    name: "Jane Muthoni",
    email: "jane.muthoni@example.com",
    phone: "+254 712 345 678",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  campaign: "General Fund",
  paymentMethod: "M-Pesa",
  transactionId: "MPESA123456789",
  status: "completed",
  date: "2023-06-15T10:30:00Z",
  notes: "Monthly donation",
  receiptSent: true,
  thankyouSent: true,
  taxDeductible: true,
  tags: ["monthly", "regular donor"],
  history: [
    {
      action: "Donation received",
      date: "2023-06-15T10:30:00Z",
      user: "System",
    },
    {
      action: "Receipt sent",
      date: "2023-06-15T10:35:00Z",
      user: "System",
    },
    {
      action: "Thank you email sent",
      date: "2023-06-15T10:40:00Z",
      user: "System",
    },
  ],
}

export default function DonationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("details")

  // Form state
  const [amount, setAmount] = useState(donationData.amount.toString())
  const [currency, setCurrency] = useState(donationData.currency)
  const [campaign, setCampaign] = useState(donationData.campaign)
  const [paymentMethod, setPaymentMethod] = useState(donationData.paymentMethod)
  const [transactionId, setTransactionId] = useState(donationData.transactionId)
  const [status, setStatus] = useState(donationData.status)
  const [notes, setNotes] = useState(donationData.notes)
  const [receiptSent, setReceiptSent] = useState(donationData.receiptSent)
  const [thankyouSent, setThankyouSent] = useState(donationData.thankyouSent)
  const [taxDeductible, setTaxDeductible] = useState(donationData.taxDeductible)

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Donation updated",
      description: "The donation details have been updated successfully.",
    })
  }

  const handleDeleteDonation = () => {
    toast({
      title: "Donation deleted",
      description: "The donation has been deleted successfully.",
    })
    router.push("/dashboard/donations")
  }

  const handleSendReceipt = () => {
    toast({
      title: "Receipt sent",
      description: "The receipt has been sent to the donor.",
    })
    setReceiptSent(true)
  }

  const handleSendThankYou = () => {
    toast({
      title: "Thank you sent",
      description: "The thank you message has been sent to the donor.",
    })
    setThankyouSent(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Donation Details</h2>
          <p className="text-muted-foreground">View and manage donation information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Donations
          </Button>
          <Button variant="destructive" onClick={handleDeleteDonation}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Donation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Donation sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">
                {donationData.currency} {donationData.amount.toLocaleString()}
              </h3>
              <div className="mt-2">{getStatusBadge(donationData.status)}</div>
              <p className="mt-1 text-sm text-muted-foreground">{donationData.campaign}</p>

              <Separator className="my-4" />

              <div className="flex w-full items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={donationData.donor.avatar || "/placeholder.svg"} alt={donationData.donor.name} />
                  <AvatarFallback>{donationData.donor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{donationData.donor.name}</p>
                  <p className="text-xs text-muted-foreground">{donationData.donor.email}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="w-full space-y-3 text-left">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(donationData.date)}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{donationData.paymentMethod}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Transaction ID: {donationData.transactionId}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="w-full">
                <h4 className="mb-2 text-sm font-medium">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {donationData.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 w-full space-y-2">
                <Button variant="outline" className="w-full" onClick={handleSendReceipt} disabled={receiptSent}>
                  <Send className="mr-2 h-4 w-4" />
                  {receiptSent ? "Receipt Sent" : "Send Receipt"}
                </Button>
                <Button variant="outline" className="w-full" onClick={handleSendThankYou} disabled={thankyouSent}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {thankyouSent ? "Thank You Sent" : "Send Thank You"}
                </Button>
                <Button variant="outline" className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Receipt
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donation details */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="donor">Donor Info</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Information</CardTitle>
                  <CardDescription>View and edit donation details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSaveChanges}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="flex">
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="w-24 rounded-r-none">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="KES">KES</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1 rounded-l-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="campaign">Campaign</Label>
                        <Select value={campaign} onValueChange={setCampaign}>
                          <SelectTrigger id="campaign">
                            <SelectValue placeholder="Select campaign" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General Fund">General Fund</SelectItem>
                            <SelectItem value="Widows Support Fund">Widows Support Fund</SelectItem>
                            <SelectItem value="Education Scholarship">Education Scholarship</SelectItem>
                            <SelectItem value="Health Initiative">Health Initiative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M-Pesa">M-Pesa</SelectItem>
                            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Credit Card">Credit Card</SelectItem>
                            <SelectItem value="PayPal">PayPal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transaction-id">Transaction ID</Label>
                        <Input
                          id="transaction-id"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="tax-deductible" checked={taxDeductible} onCheckedChange={setTaxDeductible} />
                        <Label htmlFor="tax-deductible">Tax Deductible</Label>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donor" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donor Information</CardTitle>
                  <CardDescription>View donor details and donation history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={donationData.donor.avatar || "/placeholder.svg"}
                        alt={donationData.donor.name}
                      />
                      <AvatarFallback>{donationData.donor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{donationData.donor.name}</h3>
                      <p className="text-sm text-muted-foreground">{donationData.donor.email}</p>
                      <p className="text-sm text-muted-foreground">{donationData.donor.phone}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-4 text-lg font-medium">Donation History</h4>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left text-sm font-medium">Date</th>
                            <th className="p-2 text-left text-sm font-medium">Amount</th>
                            <th className="p-2 text-left text-sm font-medium">Campaign</th>
                            <th className="p-2 text-left text-sm font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 text-sm">June 15, 2023</td>
                            <td className="p-2 text-sm">KES 5,000</td>
                            <td className="p-2 text-sm">General Fund</td>
                            <td className="p-2 text-sm">
                              <Badge variant="default">Completed</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 text-sm">May 15, 2023</td>
                            <td className="p-2 text-sm">KES 5,000</td>
                            <td className="p-2 text-sm">General Fund</td>
                            <td className="p-2 text-sm">
                              <Badge variant="default">Completed</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 text-sm">April 15, 2023</td>
                            <td className="p-2 text-sm">KES 5,000</td>
                            <td className="p-2 text-sm">General Fund</td>
                            <td className="p-2 text-sm">
                              <Badge variant="default">Completed</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" asChild>
                      <a href={`/dashboard/donors/${donationData.donor.id}`}>View Full Donor Profile</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                  <CardDescription>View the history of actions for this donation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {donationData.history.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{formatDate(item.date)}</span>
                          </div>
                          {item.user && (
                            <p className="text-sm text-muted-foreground">
                              By: <span className="font-medium">{item.user}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
