import { apiEndpoints } from './endpoints';

// Helper to extract keys for endpoint configurations
type EndpointKeys = {
  [K in keyof typeof apiEndpoints]: typeof apiEndpoints[K] extends (...args: any[]) => string // If it's a function (dynamic URL)
    ? K
    : { [SK in keyof typeof apiEndpoints[K]]: `${K & string}.${SK & string}` }; // If it's a nested object
}[keyof typeof apiEndpoints];

// Flatten the keys (e.g., 'contactUs.settings')
export type FlattenedEndpointKey = EndpointKeys extends { [key: string]: infer U } ? U : EndpointKeys;

// Define the structure for each operation's configuration
interface ApiConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  authRequired?: boolean; // Set to true if the API call requires authentication
  contentType?: 'application/json' | 'multipart/form-data'; // Default to application/json
}

// Map flattened keys to their specific configurations
export const apiConfigs: {
  [key in FlattenedEndpointKey]: {
    [op in 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH']?: ApiConfig;
  };
} = {
  'auth.login': {
    POST: { method: 'POST', authRequired: false }, 
  },
  'auth.signup': {
    POST: { method: 'POST', authRequired: false }, 
  },
  'contactUs.settings': {
    GET: { method: 'GET', authRequired: false }, 
    POST: { method: 'POST', authRequired: true }, 
    PUT: { method: 'PUT', authRequired: true },   
    DELETE: { method: 'DELETE', authRequired: true }, 
  },
  'contactUs.enquiry': {
    GET: { method: 'GET', authRequired: false }, 
    POST: { method: 'POST', authRequired: false }, 
  },
  'settings.notifications': {
    GET: { method: 'GET', authRequired: false }, 
    POST: { method: 'POST', authRequired: true }, 
    PUT: { method: 'PUT', authRequired: true },   
  },
  'users.list': {
    GET: { method: 'GET', authRequired: true },
  },
  'users.profile': {
    GET: { method: 'GET', authRequired: true },
    PUT: { method: 'PUT', authRequired: true },
  },
};

// Helper function to resolve the URL from `apiEndpoints`
export function getEndpointUrl(key: FlattenedEndpointKey, ...args: any[]): string {
    const parts = key.split('.');
    let current: any = apiEndpoints;
    for (let i = 0; i < parts.length; i++) {
        if (!current || typeof current !== 'object' || !(parts[i] in current)) {
            throw new Error(`Endpoint path not found for key: ${key}`);
        }
        current = current[parts[i]];
    }
    if (typeof current === 'function') {
        return current(...args);
    }
    if (typeof current === 'string') {
        return current;
    }
    throw new Error(`Endpoint definition for key '${key}' is not a string or function.`);
}