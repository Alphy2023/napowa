
export const apiEndpoints = {
  auth: {
    login: () => '/api/auth/login', 
    signup: () => '/api/auth/signup', 
  },
  contactUs: {
    settings: () => '/api/contact-us-settings', 
  },
  settings: {
    notifications: () => '/api/settings/notifications', 
  },
  users: {
    list: () => '/api/users',
    profile: (userId: string) => `/api/users/${userId}`,
  },
};