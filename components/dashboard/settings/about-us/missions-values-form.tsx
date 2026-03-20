"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"

interface Mission {
  id: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
}

interface Value {
  id: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
}

const ICON_OPTIONS = ["Heart", "Brain", "HandMetal", "Trophy", "Star", "Zap", "Target", "Users", "Lightbulb"]

export const MissionsValuesForm = () => {
  const [missions, setMissions] = useState<Mission[]>([])
  const [values, setValues] = useState<Value[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newMission, setNewMission] = useState({ title: "", description: "", icon: "Target" })
  const [newValue, setNewValue] = useState({ title: "", description: "", icon: "Heart" })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [missionsRes, valuesRes] = await Promise.all([
        fetch("/api/about-us/missions"),
        fetch("/api/about-us/values"),
      ])

      const missionsData = await missionsRes.json()
      const valuesData = await valuesRes.json()

      setMissions(Array.isArray(missionsData) ? missionsData : [])
      setValues(Array.isArray(valuesData) ? valuesData : [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddMission = () => {
    if (!newMission.title || !newMission.description) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" })
      return
    }

    const mission: Mission = {
      id: uuidv4(),
      ...newMission,
      order: missions.length + 1,
      isActive: true,
    }

    setMissions([...missions, mission])
    setNewMission({ title: "", description: "", icon: "Target" })
  }

  const handleAddValue = () => {
    if (!newValue.title || !newValue.description) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" })
      return
    }

    const value: Value = {
      id: uuidv4(),
      ...newValue,
      order: values.length + 1,
      isActive: true,
    }

    setValues([...values, value])
    setNewValue({ title: "", description: "", icon: "Heart" })
  }

  const handleDeleteMission = (id: string) => {
    setMissions(missions.filter((m) => m.id !== id))
  }

  const handleDeleteValue = (id: string) => {
    setValues(values.filter((v) => v.id !== id))
  }

  const handleMoveMission = (id: string, direction: "up" | "down") => {
    const index = missions.findIndex((m) => m.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === missions.length - 1)) return

    const newMissions = [...missions]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newMissions[index], newMissions[swapIndex]] = [newMissions[swapIndex], newMissions[index]]

    newMissions.forEach((mission, i) => {
      mission.order = i + 1
    })

    setMissions(newMissions)
  }

  const handleMoveValue = (id: string, direction: "up" | "down") => {
    const index = values.findIndex((v) => v.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === values.length - 1)) return

    const newValues = [...values]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newValues[index], newValues[swapIndex]] = [newValues[swapIndex], newValues[index]]

    newValues.forEach((value, i) => {
      value.order = i + 1
    })

    setValues(newValues)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await Promise.all([
        fetch("/api/about-us/missions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(missions),
        }),
        fetch("/api/about-us/values", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }),
      ])

      toast({ title: "Success", description: "Missions and values saved successfully!" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save data", variant: "destructive" })
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
      <Tabs defaultValue="missions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Mission</CardTitle>
              <CardDescription>Create a mission statement for your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newMission.title}
                  onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
                  placeholder="Mission title"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newMission.description}
                  onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
                  placeholder="Mission description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <select
                  value={newMission.icon}
                  onChange={(e) => setNewMission({ ...newMission, icon: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAddMission} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Mission
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {missions.map((mission, index) => (
              <Card key={mission.id}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge>{`Mission ${index + 1}`}</Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveMission(mission.id, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveMission(mission.id, "down")}
                        disabled={index === missions.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteMission(mission.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Input
                    value={mission.title}
                    onChange={(e) =>
                      setMissions(missions.map((m) => (m.id === mission.id ? { ...m, title: e.target.value } : m)))
                    }
                    placeholder="Title"
                  />

                  <Textarea
                    value={mission.description}
                    onChange={(e) =>
                      setMissions(missions.map((m) => (m.id === mission.id ? { ...m, description: e.target.value } : m)))
                    }
                    placeholder="Description"
                    rows={3}
                  />

                  <select
                    value={mission.icon}
                    onChange={(e) =>
                      setMissions(missions.map((m) => (m.id === mission.id ? { ...m, icon: e.target.value } : m)))
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
                      checked={mission.isActive}
                      onCheckedChange={(checked) =>
                        setMissions(missions.map((m) => (m.id === mission.id ? { ...m, isActive: checked } : m)))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="values" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Value</CardTitle>
              <CardDescription>Create core values for your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newValue.title}
                  onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                  placeholder="Value title"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newValue.description}
                  onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                  placeholder="Value description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <select
                  value={newValue.icon}
                  onChange={(e) => setNewValue({ ...newValue, icon: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAddValue} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Value
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {values.map((value, index) => (
              <Card key={value.id}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge>{`Value ${index + 1}`}</Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveValue(value.id, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveValue(value.id, "down")}
                        disabled={index === values.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteValue(value.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Input
                    value={value.title}
                    onChange={(e) =>
                      setValues(values.map((v) => (v.id === value.id ? { ...v, title: e.target.value } : v)))
                    }
                    placeholder="Title"
                  />

                  <Textarea
                    value={value.description}
                    onChange={(e) =>
                      setValues(values.map((v) => (v.id === value.id ? { ...v, description: e.target.value } : v)))
                    }
                    placeholder="Description"
                    rows={3}
                  />

                  <select
                    value={value.icon}
                    onChange={(e) =>
                      setValues(values.map((v) => (v.id === value.id ? { ...v, icon: e.target.value } : v)))
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
                      checked={value.isActive}
                      onCheckedChange={(checked) =>
                        setValues(values.map((v) => (v.id === value.id ? { ...v, isActive: checked } : v)))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save All Missions & Values
      </Button>
    </div>
  )
}
