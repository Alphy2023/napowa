"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Loader2, Plus, Trash2, Camera, Upload, X, ArrowUp, ArrowDown } from "lucide-react"
import { uploadFileToCloudinary } from "@/lib/upload-files"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"

interface CloudinaryImageData {
  url: string
  public_id: string
  asset_id: string
  version: number
  format: string
  width: number
  height: number
  bytes: number
  original_filename: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: CloudinaryImageData | null
  email?: string
  phone?: string
  socialLinks?: Record<string, string>
  order: number
  isActive: boolean
}

export const TeamMembersForm = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState<Record<string, { progress: number; status: string }>>({})
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/about-us/team-members")
      const data = await response.json()
      setTeamMembers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching team members:", error)
      toast({ title: "Error", description: "Failed to fetch team members", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.bio) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" })
      return
    }

    const member: TeamMember = {
      id: uuidv4(),
      ...newMember,
      image: null,
      socialLinks: {},
      order: teamMembers.length + 1,
      isActive: true,
    }

    setTeamMembers([...teamMembers, member])
    setNewMember({ name: "", role: "", bio: "", email: "", phone: "" })
  }

  const handleDeleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id))
  }

  const handleMoveMember = (id: string, direction: "up" | "down") => {
    const index = teamMembers.findIndex((m) => m.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === teamMembers.length - 1)) return

    const newMembers = [...teamMembers]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newMembers[index], newMembers[swapIndex]] = [newMembers[swapIndex], newMembers[index]]

    newMembers.forEach((member, i) => {
      member.order = i + 1
    })

    setTeamMembers(newMembers)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, memberId: string) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith("image/")) {
      toast({ title: "Invalid File", description: "Please select a valid image file.", variant: "destructive" })
      return
    }

    setUploadingImages((prev) => ({ ...prev, [memberId]: { progress: 0, status: "uploading" } }))

    try {
      const uploadingImage = { id: memberId, file, progress: 0, status: "uploading" }
      await uploadFileToCloudinary(uploadingImage, {
        onProgress: (id, progress) => {
          setUploadingImages((prev) => ({ ...prev, [id]: { progress, status: "uploading" } }))
        },
        onSuccess: (id, result) => {
          const cloudinaryData: CloudinaryImageData = {
            url: result.url,
            public_id: result.public_id,
            asset_id: result.asset_id,
            version: result.version,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            original_filename: result.original_filename,
          }

          setTeamMembers((prev) =>
            prev.map((m) => (m.id === id ? { ...m, image: cloudinaryData } : m))
          )

          setUploadingImages((prev) => {
            const newState = { ...prev }
            delete newState[id]
            return newState
          })

          toast({ title: "Upload Successful", description: "Image uploaded successfully!" })
        },
        onFailure: (id, errorMessage) => {
          setUploadingImages((prev) => ({ ...prev, [id]: { progress: 0, status: "error" } }))
          toast({ title: "Upload Failed", description: errorMessage, variant: "destructive" })
        },
      })
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch("/api/about-us/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamMembers),
      })

      toast({ title: "Success", description: "Team members saved successfully!" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save team members", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Team Member</CardTitle>
          <CardDescription>Add a member to your leadership team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                placeholder="e.g., Executive Director"
              />
            </div>
            <div className="space-y-2">
              <Label>Email (Optional)</Label>
              <Input
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                placeholder="email@example.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone (Optional)</Label>
              <Input
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                placeholder="+254..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={newMember.bio}
              onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
              placeholder="Team member biography"
              rows={4}
            />
          </div>
          <Button onClick={handleAddMember} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <Card key={member.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge>{`Member ${index + 1}`}</Badge>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveMember(member.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveMember(member.id, "down")}
                    disabled={index === teamMembers.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteMember(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  value={member.name}
                  onChange={(e) =>
                    setTeamMembers(teamMembers.map((m) => (m.id === member.id ? { ...m, name: e.target.value } : m)))
                  }
                  placeholder="Full name"
                />
                <Input
                  value={member.role}
                  onChange={(e) =>
                    setTeamMembers(teamMembers.map((m) => (m.id === member.id ? { ...m, role: e.target.value } : m)))
                  }
                  placeholder="Role"
                />
                <Input
                  value={member.email || ""}
                  onChange={(e) =>
                    setTeamMembers(teamMembers.map((m) => (m.id === member.id ? { ...m, email: e.target.value } : m)))
                  }
                  placeholder="Email"
                  type="email"
                />
                <Input
                  value={member.phone || ""}
                  onChange={(e) =>
                    setTeamMembers(teamMembers.map((m) => (m.id === member.id ? { ...m, phone: e.target.value } : m)))
                  }
                  placeholder="Phone"
                />
              </div>

              <Textarea
                value={member.bio}
                onChange={(e) =>
                  setTeamMembers(teamMembers.map((m) => (m.id === member.id ? { ...m, bio: e.target.value } : m)))
                }
                placeholder="Bio"
                rows={3}
              />

              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="relative h-48 w-full rounded-lg border-2 border-dashed bg-muted/50 overflow-hidden">
                  <label htmlFor={`member-image-${member.id}`} className="w-full h-full cursor-pointer block">
                    {member.image?.url ? (
                      <div className="relative w-full h-full">
                        <Image src={member.image.url} alt={member.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(`member-image-${member.id}`)?.click()
                          }}>
                            <Camera className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={(e) => {
                            e.preventDefault()
                            setTeamMembers(teamMembers.map((m) => (m.id === member.id ? { ...m, image: null } : m)))
                          }}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                        <p className="text-xs text-muted-foreground">Upload image</p>
                      </div>
                    )}
                    <input
                      id={`member-image-${member.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, member.id)}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch
                  checked={member.isActive}
                  onCheckedChange={(checked) =>
                    setTeamMembers(teamMembers.map((m) => (m.id === member.id ? { ...m, isActive: checked } : m)))
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save All Team Members
      </Button>
    </div>
  )
}
