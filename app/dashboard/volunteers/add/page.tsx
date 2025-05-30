"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Save, ArrowLeft, Plus, X } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function AddProgramPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // Program details
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [coordinator, setCoordinator] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState("upcoming")
  const [budget, setBudget] = useState("")
  const [objectives, setObjectives] = useState<string[]>([""])
  const [outcomes, setOutcomes] = useState<string[]>([""])
  const [isSaving, setIsSaving] = useState(false)

  const [newVolunteer, setNewVolunteer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    status: "active",
    skills: "",
  })

  const handleAddObjective = () => {
    setObjectives([...objectives, ""])
  }

  const handleRemoveObjective = (index: number) => {
    const newObjectives = [...objectives]
    newObjectives.splice(index, 1)
    setObjectives(newObjectives)
  }

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...objectives]
    newObjectives[index] = value
    setObjectives(newObjectives)
  }

  const handleAddOutcome = () => {
    setOutcomes([...outcomes, ""])
  }

  const handleRemoveOutcome = (index: number) => {
    const newOutcomes = [...outcomes]
    newOutcomes.splice(index, 1)
    setOutcomes(newOutcomes)
  }

  const handleOutcomeChange = (index: number, value: string) => {
    const newOutcomes = [...outcomes]
    newOutcomes[index] = value
    setOutcomes(newOutcomes)
  }

  const handleSave = () => {
    // Validate required fields
    if (!title || !description || !category || !coordinator || !startDate || !endDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Program created",
        description: "The program has been created successfully.",
      })
      router.push("/dashboard/programs")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add New Volunteer</h2>
        </div>

      <div className="w-full">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Information</CardTitle>
              <CardDescription>
                Enter the details of the new volunteer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volunteer-first-name">First Name</Label>
                  <Input
                    id="volunteer-first-name"
                    value={newVolunteer.firstName}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, firstName: e.target.value })}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volunteer-last-name">Last Name</Label>
                  <Input
                    id="volunteer-last-name"
                    value={newVolunteer.lastName}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, lastName: e.target.value })}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="volunteer-email">Email</Label>
                <Input
                  id="volunteer-email"
                  type="email"
                  value={newVolunteer.email}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volunteer-phone">Phone</Label>
                <Input
                  id="volunteer-phone"
                  value={newVolunteer.phone}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volunteer-location">Location</Label>
                <Input
                  id="volunteer-location"
                  value={newVolunteer.location}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volunteer-skills">Skills</Label>
                <Textarea
                  id="volunteer-skills"
                  value={newVolunteer.skills}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, skills: e.target.value })}
                  placeholder="Enter skills (comma separated)"
                />
                <p className="text-xs text-muted-foreground">
                  Enter skills separated by commas (e.g., Event Planning, Fundraising, Teaching)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="volunteer-status">Status</Label>
                <Select
                  value={newVolunteer.status}
                  onValueChange={(value) => setNewVolunteer({ ...newVolunteer, status: value })}
                >
                  <SelectTrigger id="volunteer-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="flex items-center justify-between">
       
              <Button 
                className="bg-napowa-blue hover:bg-napowa-blue/80 text-white"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Program
                  </>
                )}
              </Button>
      </div>
            </div>
            </CardContent>
          </Card>
        </div>

       
      </div>
    </div>
  )
}
