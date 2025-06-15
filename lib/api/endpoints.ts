
export const apiEndpoints = {
  auth: {
    login: () => '/api/auth/login', 
    signup: () => '/api/auth/signup', 
    forgotPassword: () => '/api/auth/forgot-password', 
    resetPassword: () => '/api/auth/reset-password', 
    verifyOtp: () => '/api/auth/verify-otp', 
    twoFactorAuth: () => '/api/auth/two-factor', 
  },
  contactUs: {
    settings: () => '/api/contact-us-settings', 
    enquiry: () => '/api/enquiry', 

  },
  settings: {
    notifications: () => '/api/settings/notifications', 
  },
  users: {
    list: () => '/api/users',
    profile: (userId: string) => `/api/users/${userId}`,
  },
  roles: {
    list: (params: string) => `/api/roles?${params}`,
    update: (roleId: string) => `/api/roles/${roleId}`,
    create: () => "/api/roles"
  },
  gallery: {
    list: (params: string) => `/api/gallery?${params}`,
    manage: (mediaId: string) => `/api/gallery/${mediaId}`,
    create: () => "/api/gallery"
  },
};