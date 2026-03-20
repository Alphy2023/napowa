'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { getIconComponent } from '@/lib/icon-mapper'

interface CloudinaryImageData {
  url: string
  [key: string]: any
}

interface WelcomeNote {
  id: string
  title: string
  description: string
  content: string
  image: CloudinaryImageData | null
  isActive: boolean
}

interface Story {
  id: string
  title: string
  description: string
  content: string
  image: CloudinaryImageData | null
  order: number
  isActive: boolean
}

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

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  metric: string
  order: number
  isActive: boolean
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

export const DynamicAboutContent = () => {
  const [loading, setLoading] = useState(true)
  const [welcomeNote, setWelcomeNote] = useState<WelcomeNote | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [missions, setMissions] = useState<Mission[]>([])
  const [values, setValues] = useState<Value[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [welcomeRes, storiesRes, missionsRes, valuesRes, achievementsRes, teamRes] = await Promise.all([
        fetch('/api/about-us/welcome-note'),
        fetch('/api/about-us/story'),
        fetch('/api/about-us/missions'),
        fetch('/api/about-us/values'),
        fetch('/api/about-us/achievements'),
        fetch('/api/about-us/team-members'),
      ])

      const welcomeData = await welcomeRes.json()
      const storiesData = await storiesRes.json()
      const missionsData = await missionsRes.json()
      const valuesData = await valuesRes.json()
      const achievementsData = await achievementsRes.json()
      const teamData = await teamRes.json()

      if (welcomeData && welcomeData.id) setWelcomeNote(welcomeData)
      setStories(Array.isArray(storiesData) ? storiesData : [])
      setMissions(Array.isArray(missionsData) ? missionsData : [])
      setValues(Array.isArray(valuesData) ? valuesData : [])
      setAchievements(Array.isArray(achievementsData) ? achievementsData : [])
      setTeamMembers(Array.isArray(teamData) ? teamData : [])
    } catch (error) {
      console.error('Error fetching about data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="w-full py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    )
  }

  return (
    <>
      {/* Welcome Note Section */}
      {welcomeNote && welcomeNote.isActive && (
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{welcomeNote.title}</h2>
                <p className="mb-4 text-lg text-muted-foreground">{welcomeNote.description}</p>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {welcomeNote.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
              {welcomeNote.image?.url && (
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src={welcomeNote.image.url}
                    alt={welcomeNote.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Stories Section */}
      {stories.length > 0 && (
        <section className="w-full py-16 md:py-24">
          <div className="container space-y-12">
            {stories.map((story, index) => (
              story.isActive && (
                <div key={story.id} className={`grid gap-12 md:grid-cols-2 md:items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  {story.image?.url && (
                    <div className={`relative h-[400px] overflow-hidden rounded-lg ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <Image
                        src={story.image.url}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{story.title}</h2>
                    <p className="mb-4 text-lg text-muted-foreground">{story.description}</p>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {story.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Mission & Values Section */}
      {(missions.length > 0 || values.length > 0) && (
        <section className="w-full bg-muted/50 py-16 md:py-24">
          <div className="container space-y-12">
            {missions.length > 0 && (
              <div>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Mission</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {missions.map((mission) =>
                    mission.isActive ? (
                      <Card key={mission.id}>
                        <CardContent className="flex flex-col items-center p-6">
                          {mission.icon && getIconComponent(mission.icon, 'h-12 w-12 text-primary mb-4')}
                          <h3 className="mb-2 text-xl font-semibold">{mission.title}</h3>
                          <p className="text-center text-muted-foreground">{mission.description}</p>
                        </CardContent>
                      </Card>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {values.length > 0 && (
              <div>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Values</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {values.map((value) =>
                    value.isActive ? (
                      <Card key={value.id}>
                        <CardContent className="flex flex-col items-center p-6">
                          {value.icon && getIconComponent(value.icon, 'h-12 w-12 text-primary mb-4')}
                          <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                          <p className="text-center text-muted-foreground">{value.description}</p>
                        </CardContent>
                      </Card>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Achievements</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) =>
                achievement.isActive ? (
                  <div key={achievement.id} className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      {achievement.icon && getIconComponent(achievement.icon, 'h-6 w-6 text-primary')}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold">{achievement.title}</h3>
                      {achievement.metric && <p className="mb-2 text-sm font-medium text-primary">{achievement.metric}</p>}
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="w-full bg-muted/50 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Leadership Team</h2>
              <p className="text-muted-foreground">
                Meet the dedicated individuals who lead our mission.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) =>
                member.isActive ? (
                  <Card key={member.id}>
                    <CardContent className="p-0">
                      {member.image?.url ? (
                        <div className="relative h-64 w-full">
                          <Image src={member.image.url} alt={member.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="relative h-64 w-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                        <p className="mb-3 text-sm text-primary">{member.role}</p>
                        <p className="text-muted-foreground">{member.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Join Our Mission</h2>
            <p className="mb-8 text-muted-foreground">
              Whether you're interested in our cause or want to get involved, there are many ways to support us.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
