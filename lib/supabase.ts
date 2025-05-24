import { createClient } from "@supabase/supabase-js"

// These would be environment variables in a real application
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common database operations
export async function getMembers(options = {}) {
  const { data, error } = await supabase.from("members").select("*")

  if (error) {
    console.error("Error fetching members:", error)
    return []
  }

  return data || []
}

export async function getEvents(options = {}) {
  const { data, error } = await supabase.from("events").select("*")

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data || []
}

export async function getBlogPosts(options = {}) {
  const { data, error } = await supabase.from("blog_posts").select("*")

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data || []
}

export async function getDonations(options = {}) {
  const { data, error } = await supabase.from("donations").select("*")

  if (error) {
    console.error("Error fetching donations:", error)
    return []
  }

  return data || []
}

// Function to handle event registration
export async function registerForEvent(eventId, userData) {
  const { data, error } = await supabase.from("event_registrations").insert([
    {
      event_id: eventId,
      user_data: userData,
      created_at: new Date(),
    },
  ])

  if (error) {
    console.error("Error registering for event:", error)
    throw error
  }

  return data
}
