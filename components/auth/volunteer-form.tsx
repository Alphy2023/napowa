"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"

export const VolunteerForm = () => {
      const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [formStep, setFormStep] = useState(0)

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [county, setCounty] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      })
      return
    }

    if (!agreeTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    // Submit form
    toast({
      title: "Account created",
      description: "Your account has been created successfully. Please check your email for verification.",
    })

    // Redirect to login
    router.push("/login")
  }

  const nextStep = () => {
    // Validate first step
    if (formStep === 0) {
      if (!firstName || !lastName || !email || !phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
    }

    // Validate second step
    if (formStep === 1) {
      if (!password || !confirmPassword) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      if (password !== confirmPassword) {
        toast({
          title: "Passwords do not match",
          description: "Please ensure both passwords match.",
          variant: "destructive",
        })
        return
      }
    }

    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
                  {formStep === 0 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name-vol">First Name</Label>
                          <Input
                            id="first-name-vol"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name-vol">Last Name</Label>
                          <Input
                            id="last-name-vol"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-vol">Email</Label>
                        <Input
                          id="email-vol"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone-vol">Phone Number</Label>
                        <Input
                          id="phone-vol"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {formStep === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="password-vol">Password</Label>
                        <div className="relative">
                          <Input
                            id="password-vol"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password-vol">Confirm Password</Label>
                        <Input
                          id="confirm-password-vol"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="id-number-vol">ID Number</Label>
                        <Input
                          id="id-number-vol"
                          placeholder="Enter your ID number"
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="county-vol">County</Label>
                        <Select value={county} onValueChange={setCounty}>
                          <SelectTrigger id="county-vol">
                            <SelectValue placeholder="Select your county" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nairobi">Nairobi</SelectItem>
                            <SelectItem value="mombasa">Mombasa</SelectItem>
                            <SelectItem value="kisumu">Kisumu</SelectItem>
                            <SelectItem value="nakuru">Nakuru</SelectItem>
                            <SelectItem value="eldoret">Eldoret</SelectItem>
                            {/* Add more counties as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills & Expertise</Label>
                        <Select>
                          <SelectTrigger id="skills">
                            <SelectValue placeholder="Select your skills" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teaching">Teaching</SelectItem>
                            <SelectItem value="counseling">Counseling</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="it">IT & Technology</SelectItem>
                            <SelectItem value="fundraising">Fundraising</SelectItem>
                            <SelectItem value="event-planning">Event Planning</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="legal">Legal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Select>
                          <SelectTrigger id="availability">
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                            <SelectItem value="evenings">Evenings</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interests">Areas of Interest</Label>
                        <Select>
                          <SelectTrigger id="interests">
                            <SelectValue placeholder="Select your interests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="education">Education Support</SelectItem>
                            <SelectItem value="health">Health Initiatives</SelectItem>
                            <SelectItem value="widows">Widows Support</SelectItem>
                            <SelectItem value="youth">Youth Programs</SelectItem>
                            <SelectItem value="community">Community Outreach</SelectItem>
                            <SelectItem value="fundraising">Fundraising</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms-vol"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                        />
                        <Label htmlFor="terms-vol" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary underline">
                            terms and conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary underline">
                            privacy policy
                          </Link>
                        </Label>
                      </div>
                    </div>
                  )}
        </form>
    </div>
  )
}
