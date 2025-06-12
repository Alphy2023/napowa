
export const apiEndpoints = {
  auth: {
    login: () => '/api/auth/login', 
    signup: () => '/api/auth/signup', 
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
};