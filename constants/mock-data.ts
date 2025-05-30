import { ContactUsSettings } from "@/schemas/contactUs.schema";

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
