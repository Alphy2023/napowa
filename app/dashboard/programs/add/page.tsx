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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add New Program</h2>
        </div>
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
              <CardDescription>
                Enter the details of the new program.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Program Title <span className="bg-napowa-red">*</span></Label>
                <Input
                  id="title"
                  placeholder="Enter program title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="bg-napowa-red">*</span></Label>
                <Textarea
                  id="description"
                  placeholder="Enter program description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="bg-napowa-red">*</span></Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Skills">Skills Development</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Youth">Youth</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordinator">Program Coordinator <span className="bg-napowa-red">*</span></Label>
                  <Input
                    id="coordinator"
                    placeholder="Enter coordinator name"
                    value={coordinator}
                    onChange={(e) => setCoordinator(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date <span className="bg-napowa-red">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date <span className="bg-napowa-red">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => startDate ? date < startDate : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (KES)</Label>
                  <Input
                    id="budget"
                    placeholder="Enter budget amount"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ''))}
                    type="text"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Program Objectives</Label>
                  <Button variant="outline" size="sm" onClick={handleAddObjective}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Objective
                  </Button>
                </div>
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Objective ${index + 1}`}
                      value={objective}
                      onChange={(e) => handleObjectiveChange(index, e.target.value)}
                    />
                    {objectives.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveObjective(index)}
                        className="bg-napowa-red hover:bg-napowa-red/80"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Expected Outcomes</Label>
                  <Button variant="outline" size="sm" onClick={handleAddOutcome}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Outcome
                  </Button>
                </div>
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Outcome ${index + 1}`}
                      value={outcome}
                      onChange={(e) => handleOutcomeChange(index, e.target.value)}
                    />
                    {outcomes.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveOutcome(index)}
                        className="bg-napowa-red hover:bg-napowa-red/80"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Program Settings</CardTitle>
              <CardDescription>
                Configure additional program settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch id="featured" />
                <Label htmlFor="featured">Featured Program</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="registration" />
                <Label htmlFor="registration">Enable Registration</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="donations" />
                <Label htmlFor="donations">Accept Donations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="volunteers" />
                <Label htmlFor="volunteers">Need Volunteers</Label>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="image">Program Image</Label>
                <div className="flex items-center justify-center rounded-md border-2 border-dashed p-6">
                  <div className="text-center">
                    <div className="mb-2 flex justify-center">
                      <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop an image here, or click to browse
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-napowa-blue hover:bg-napowa-blue/80 text-white"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Program"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
