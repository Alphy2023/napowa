
import { useSession } from 'next-auth/react';
import { getEndpointUrl, apiConfigs } from './configs'; // Import configs and URL resolver
import { FlattenedEndpointKey } from './configs'; // Import type for key safety

// Define a generic API response type
export interface ApiResponse<T> {
  data: T | null;
  message: string;
  errors?: { path?: string[]; message: string }[]; // For Zod validation errors from backend
  status?: number; // HTTP status code
  success: boolean; // Convenience flag
}

// Define the options passed to query/mutate methods
interface QueryOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>; // For URL query parameters (GET)
}

interface MutationOptions {
  headers?: Record<string, string>;
  isFormData?: boolean; // Set to true if body is FormData
}

export const useApiClient = () => {
//   const { data: session, status: sessionStatus } = useSession();
  const apiToken = null // Get the API token from the session

  // Core request function
  const makeRequest = async <T>(
    endpointKey: FlattenedEndpointKey,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    bodyData?: Record<string, any> | FormData,
    options?: QueryOptions | MutationOptions,
    ...urlArgs: any[] // For dynamic URL segments (e.g., userId)
  ): Promise<ApiResponse<T>> => {
    const config = apiConfigs[endpointKey]?.[method];

    if (!config) {
      return { success: false, data: null, message: `No API configuration found for ${endpointKey} with method ${method}.`, status: 500 };
    }

    // if (config.authRequired && sessionStatus === 'unauthenticated') {
    //   return { success: false, data: null, message: 'Unauthorized: User not logged in.', status: 401 };
    // }
    // if (config.authRequired && sessionStatus === 'loading') {
    //   // In a real application, you might want to return a Promise that resolves
    //   // when session status is known, or queue the request. For now, it's an error.
    //   return { success: false, data: null, message: 'Authorization pending: Session still loading.', status: 401 };
    // }


    let url = getEndpointUrl(endpointKey, ...urlArgs);
    const requestHeaders: HeadersInit = {
      ...options?.headers,
    };

    // Attach Authorization header if token exists and required
    if (config.authRequired && apiToken) {
      (requestHeaders as Record<string, string>)['Authorization'] = `Bearer ${apiToken}`;
    }

    let requestBody: BodyInit | undefined;
    if (bodyData) {
      if ((options as MutationOptions)?.isFormData) {
        requestBody = bodyData as FormData;
        // For FormData, Content-Type is automatically set by fetch, so we don't set 'application/json'
      } else {
        (requestHeaders as Record<string, string>)['Content-Type'] = 'application/json';
        requestBody = JSON.stringify(bodyData);
      }
    }
   
    // Append query parameters for GET requests
    if (method === 'GET' && 'params' in (options || {})) {
      const queryParams = new URLSearchParams((options as QueryOptions).params as Record<string, string>).toString();
      if (queryParams) {
        url += `?${queryParams}`;
      }
    }


    try {
      const res = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody,
      });

      // Handle non-OK responses
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        return {
          success: false,
          data: null,
          message: errorData.message || `API Error: ${res.status}`,
          errors: errorData.errors || [],
          status: res.status,
        };
      }

      // Attempt to parse JSON response. Handle no content (204)
      const contentType = res.headers.get("content-type");
      if (res.status === 204 || !contentType || !contentType.includes("application/json")) {
        return { success: true, data: null, message: res.statusText || "Success (No Content)", status: res.status };
      }

      const responseData = await res.json();
      return {
        success: true,
        data: responseData?.data || responseData, // Backend might return { data: T } or just T
        message: responseData?.message || "Success",
        status: res.status,
      };

    } catch (error: any) {
      console.error(`API Call Error (${method} ${url}):`, error);
      return {
        success: false,
        data: null,
        message: error.message || "An unexpected error occurred",
        status: 500,
      };
    }
  }; // Depend on apiToken and sessionStatus

  // Expose methods for different HTTP verbs for more explicit calls
  const client = {
    // For GET requests (queries)
    query: <T>(endpointKey: FlattenedEndpointKey, options?: QueryOptions, ...urlArgs: any[]) =>
      makeRequest<T>(endpointKey, 'GET', undefined, options, ...urlArgs),

    // For POST, PUT, PATCH requests (mutations with a body)
    mutate: {
      post: <T>(endpointKey: FlattenedEndpointKey, data: Record<string, any> | FormData, options?: MutationOptions, ...urlArgs: any[]) =>
        makeRequest<T>(endpointKey, 'POST', data, options, ...urlArgs),

      put: <T>(endpointKey: FlattenedEndpointKey, data: Record<string, any> | FormData, options?: MutationOptions, ...urlArgs: any[]) =>
        makeRequest<T>(endpointKey, 'PUT', data, options, ...urlArgs),

      patch: <T>(endpointKey: FlattenedEndpointKey, data: Record<string, any> | FormData, options?: MutationOptions, ...urlArgs: any[]) =>
        makeRequest<T>(endpointKey, 'PATCH', data, options, ...urlArgs),
    },

    // For DELETE requests
    delete: <T>(endpointKey: FlattenedEndpointKey, options?: QueryOptions, ...urlArgs: any[]) => // DELETE usually doesn't have a body
      makeRequest<T>(endpointKey, 'DELETE', undefined, options, ...urlArgs),
  };

  return client;
};