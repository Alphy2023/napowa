"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WelcomeNoteForm } from "./about-us/welcome-note-form"
import { StoryForm } from "./about-us/story-form"
import { MissionsValuesForm } from "./about-us/missions-values-form"
import { AchievementsForm } from "./about-us/achievements-form"
import { TeamMembersForm } from "./about-us/team-members-form"
import { FileText, BookOpen, Target, Trophy, Users } from "lucide-react"

export const AboutUsSettings = () => {
  const [activeTab, setActiveTab] = useState("welcome-note")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">About Us Page Management</h1>
        <p className="text-muted-foreground">
          Manage all sections of your About Us page. Each section can be updated, reordered, and toggled on/off.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="welcome-note" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Welcome</span>
          </TabsTrigger>
          <TabsTrigger value="story" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Story</span>
          </TabsTrigger>
          <TabsTrigger value="missions-values" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Mission</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Achievement</span>
          </TabsTrigger>
          <TabsTrigger value="team-members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Team</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="welcome-note" className="mt-6">
          <WelcomeNoteForm />
        </TabsContent>

        <TabsContent value="story" className="mt-6">
          <StoryForm />
        </TabsContent>

        <TabsContent value="missions-values" className="mt-6">
          <MissionsValuesForm />
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <AchievementsForm />
        </TabsContent>

        <TabsContent value="team-members" className="mt-6">
          <TeamMembersForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
