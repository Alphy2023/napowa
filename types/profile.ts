export interface ProfileImageData {
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

export interface EducationEntry {
  id: string
  institution: string
  degree?: string
  field?: string
  startDate?: string
  endDate?: string
  current: boolean
  description?: string
}

export interface EmploymentEntry {
  id: string
  company: string
  position: string
  startDate?: string
  endDate?: string
  current: boolean
  description?: string
  location?: string
}

export interface ConnectedAccount {
  provider: string
  isConnected: boolean
  accountId?: string
  username?: string
  lastConnected?: string
}

export interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  eventReminders: boolean
  donationReceipts: boolean
  newsletterSubscription: boolean
  announcementNotifications: boolean
}

export interface SessionData {
  id: string
  device: string
  browser: string
  location: string
  ip?: string
  lastActive: string
  isCurrentSession: boolean
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  sessions: SessionData[]
}

export interface PrivacySettings {
  profileVisibility: "public" | "members" | "private"
  showEmail: boolean
  showPhone: boolean
  allowMessaging: boolean
  allowTagging: boolean
}

export interface UserProfileData {
  id: string
  userId: string
  firstName: string | null
  lastName: string | null
  email: string
  phone: string | null
  idNumber: string | null
  county: string | null
  memberType: string | null
  rank: string | null
  station: string | null
  serviceNumber: string | null
  profileImage: ProfileImageData | null
  bio: string | null
  address: string | null
  city: string | null
  postalCode: string | null
  socialLinks: Record<string, string> | null
  skills: string[]
  interests: string[]
  education: EducationEntry[]
  employment: EmploymentEntry[]
  language: string
  timezone: string
  connectedAccounts: ConnectedAccount[]
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  eventReminders: boolean
  donationReceipts: boolean
  newsletterSubscription: boolean
  announcementNotifications: boolean
  twoFactorEnabled: boolean
  profileVisibility: "public" | "members" | "private"
  showEmail: boolean
  showPhone: boolean
  allowMessaging: boolean
  allowTagging: boolean
  status: string
  isEmailVerified: boolean
  lastLogin: string | null
  createdAt: string
  updatedAt: string
}

export interface UploadingProfileImage {
  id: string
  file: File
  progress: number
  status: "idle" | "uploading" | "success" | "error"
  error?: string
  cloudinaryData?: ProfileImageData
}
