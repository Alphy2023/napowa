"use client";

import { ContactUsSettings } from "@/schemas/contactUs.schema";
import { ApiResponse, useApiClient } from "./client";
import { NotificationSettingsForm } from "@/schemas/notificationSettings.schema";
import { LoginPayload, SignupPayload } from "@/schemas/auth.schema";

// contact us api calls
  const apiClient = useApiClient();

export const contactUsApi = {
  createOrUpdateContactSettings: async (
    data: ContactUsSettings
  ): Promise<ApiResponse<ContactUsSettings>> => {
    try {
      let response = await apiClient.mutate.put<ContactUsSettings>("contactUs.settings", data);

      if (response.status === 404) {
        response = await apiClient.mutate.post<ContactUsSettings>("contactUs.settings", data);
      }

      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while saving settings.",
        status: 500,
      };
    }
  },
  // get contact settings
   getContactSettings: async (): Promise<ApiResponse<ContactUsSettings>> => {
    try {
      const response = await apiClient.query<ContactUsSettings>("contactUs.settings");
      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while fetching settings.",
        status: 500,
      };
    }
  },
}
export const notificationApi = {
  createOrUpdateNotificationSettings: async (
    data: NotificationSettingsForm
  ): Promise<ApiResponse<NotificationSettingsForm>> => {
    try {
      let response = await apiClient.mutate.put<NotificationSettingsForm>("settings.notifications", data);

      if (response.status === 404) {
        response = await apiClient.mutate.post<NotificationSettingsForm>("settings.notifications", data);
      }

      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while saving settings.",
        status: 500,
      };
    }
  },
  
}
export const authApi = {
  signup: async (
    data: SignupPayload
  ): Promise<ApiResponse<SignupPayload>> => {
    try {
      const response = await apiClient.mutate.post<SignupPayload>("auth.signup", data);
      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while registering.",
        status: 500,
      };
    }
  },
  login: async (
    data: LoginPayload
  ): Promise<ApiResponse<LoginPayload>> => {
    try {
      const response = await apiClient.mutate.post<LoginPayload>("auth.login", data);
      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while logging in.",
        status: 500,
      };
    }
  },
  
}
