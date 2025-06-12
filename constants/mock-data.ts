import { ContactUsSettings } from "@/schemas/contactUs.schema";
import { DonationData } from "@/types/donation.types";
import { EventData } from "@/types/event.types";
import { MembershipData } from "@/types/membership.types";

export const INITIAL_DEFAULT_CONTACT_SETTINGS: ContactUsSettings = {
    pageTitle: "Default Contact Us Title",
    pageDescription: "Default description for our contact page.",
    showFaqs: false,
    showConnect: true,
    socialLinks: [
        { platform: "facebook", url: "https://facebook.com/yourorg" },
    ],
    sections: [
        {
            id: "emailSection",
            fields: {
                general: "default@example.com",
                membership: "membership@example.com",
                donations: "donations@example.com",
            },
        },
        {
            id: "callUsSection",
            fields: {
                mainOffice: "+254712345678",
                hotline: "+254787654321",
                hours: { start: "09:00", end: "17:00" },
            },
        },
        {
            id: "visitUsSection",
            fields: {
                hq: "Main HQ",
                street: "123 Street",
                city: "Nairobi, Kenya",
                officeHours: { start: "08:00", end: "16:00" },
            },
        },
    ],
};


export const PERMISSIONS_BY_ROLE = {
  admin: {
    dashboard: ["view"],
    analytics: ["view"],
    members: ["view", "create", "manage_roles"],
    events: ["view", "create", "update", "delete"],
    blog: ["view", "create", "update", "delete", "manage_categories"],
    gallery: ["view", "create", "manage_albums"],
    donations: ["view", "manage_campaigns", "read_reports"],
    programs: ["view", "create"],
    volunteers: ["view", "create"],
    partners: ["view", "create"],
    messages: ["view"],
    meetings: ["view"],
    announcements: ["view"],
    notifications: ["view"],
    reports: ["view"],
    settings: ["view"]
  },
  editor: {
    dashboard: ["view"],
    analytics: ["view"],
    members: ["view", "create"],
    events: ["view", "create", "update"],
    blog: ["view", "create", "update"],
    gallery: ["view", "create"],
    donations: ["view", "manage_campaigns"],
    programs: ["view", "create"],
    volunteers: ["view", "create"],
    partners: ["view", "create"],
    messages: ["view"],
    meetings: ["view"],
    announcements: ["view"],
    notifications: ["view"],
    reports: ["view"],
    settings: ["view"]
  },
  member: {
    dashboard: ["view"],
    events: ["view"],
    messages: ["view"],
    meetings: ["view"],
    notifications: ["view"],
    settings: ["view"]
  }
}


  // Sample data for charts
export const donationMockData: DonationData[] = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 18000 },
    { month: "Mar", amount: 15000 },
    { month: "Apr", amount: 22000 },
    { month: "May", amount: 28000 },
    { month: "Jun", amount: 25000 },
    { month: "Jul", amount: 32000 },
  ]

export const membershipMockData: MembershipData[] = [
    { month: "Jan", members: 120 },
    { month: "Feb", members: 150 },
    { month: "Mar", members: 180 },
    { month: "Apr", members: 210 },
    { month: "May", members: 250 },
    { month: "Jun", members: 280 },
    { month: "Jul", members: 310 },
  ]

export const recentMockDonations: DonationData[] = [
    { id: 1, name: "Jane Doe",
         amount: 5000, date: "2023-05-15",
          method: "M-Pesa" },
    { id: 2, name: "John Smith", amount: 10000, date: "2023-05-14", method: "Bank Transfer" },
    { id: 3, name: "Mary Johnson", amount: 2500, date: "2023-05-13", method: "M-Pesa" },
    { id: 4, name: "Robert Brown", amount: 7500, date: "2023-05-12", method: "Card Payment" },
    { id: 5, name: "Sarah Williams", amount: 3000, date: "2023-05-11", method: "M-Pesa" },
  ]

export const upcomingMockEvents: EventData[] = [
    { id: 1, title: "Woman of Purpose Annual Event", 
        date: "2023-06-15", location: "Nairobi" },
    { id: 2, title: "Skills Training Workshop", date: "2023-06-22", location: "Mombasa" },
    { id: 3, title: "Health Advocacy Program", date: "2023-07-05", location: "Kisumu" },
  ]

export const COLORS: string[] = ["#5ECCE9", "#0A3161", "#FFD700", "#8B2323", "#FF8C00"]