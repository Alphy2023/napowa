"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  metric: string
  order: number
  isActive: boolean
}

const ICON_OPTIONS = ["Heart", "Brain", "HandMetal", "Trophy", "Star", "Zap", "Target", "Users", "Lightbulb", "Award"]

export const AchievementsForm = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    icon: "Trophy",
    metric: "",
  })

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/about-us/achievements")
      const data = await response.json()
      setAchievements(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching achievements:", error)
      toast({ title: "Error", description: "Failed to fetch achievements", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddAchievement = () => {
    if (!newAchievement.title || !newAchievement.description) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" })
      return
    }

    const achievement: Achievement = {
      id: uuidv4(),
      ...newAchievement,
      order: achievements.length + 1,
      isActive: true,
    }

    setAchievements([...achievements, achievement])
    setNewAchievement({ title: "", description: "", icon: "Trophy", metric: "" })
  }

  const handleDeleteAchievement = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id))
  }

  const handleMoveAchievement = (id: string, direction: "up" | "down") => {
    const index = achievements.findIndex((a) => a.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === achievements.length - 1)) return

    const newAchievements = [...achievements]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newAchievements[index], newAchievements[swapIndex]] = [
      newAchievements[swapIndex],
      newAchievements[index],
    ]

    newAchievements.forEach((achievement, i) => {
      achievement.order = i + 1
    })

    setAchievements(newAchievements)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch("/api/about-us/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievements),
      })

      toast({ title: "Success", description: "Achievements saved successfully!" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save achievements", variant: "destructive" })
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
          <CardTitle>Add New Achievement</CardTitle>
          <CardDescription>Create an achievement milestone for your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              placeholder="e.g., 300+ Members"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
              placeholder="Describe this achievement"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Metric (Optional)</Label>
            <Input
              value={newAchievement.metric}
              onChange={(e) => setNewAchievement({ ...newAchievement, metric: e.target.value })}
              placeholder="e.g., 300+"
            />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <select
              value={newAchievement.icon}
              onChange={(e) => setNewAchievement({ ...newAchievement, icon: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleAddAchievement} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <Card key={achievement.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge>{`Achievement ${index + 1}`}</Badge>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveAchievement(achievement.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveAchievement(achievement.id, "down")}
                    disabled={index === achievements.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteAchievement(achievement.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Input
                value={achievement.title}
                onChange={(e) =>
                  setAchievements(
                    achievements.map((a) => (a.id === achievement.id ? { ...a, title: e.target.value } : a))
                  )
                }
                placeholder="Title"
              />

              <Textarea
                value={achievement.description}
                onChange={(e) =>
                  setAchievements(
                    achievements.map((a) => (a.id === achievement.id ? { ...a, description: e.target.value } : a))
                  )
                }
                placeholder="Description"
                rows={3}
              />

              <Input
                value={achievement.metric}
                onChange={(e) =>
                  setAchievements(achievements.map((a) => (a.id === achievement.id ? { ...a, metric: e.target.value } : a)))
                }
                placeholder="Metric (e.g., 300+)"
              />

              <select
                value={achievement.icon}
                onChange={(e) =>
                  setAchievements(achievements.map((a) => (a.id === achievement.id ? { ...a, icon: e.target.value } : a)))
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch
                  checked={achievement.isActive}
                  onCheckedChange={(checked) =>
                    setAchievements(
                      achievements.map((a) => (a.id === achievement.id ? { ...a, isActive: checked } : a))
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save All Achievements
      </Button>
    </div>
  )
}
