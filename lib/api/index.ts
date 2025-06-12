"use client";

import { ContactFormPayload, ContactUsSettings } from "@/schemas/contactUs.schema";
import { ApiResponse, useApiClient } from "./client";
import { NotificationSettingsForm } from "@/schemas/notificationSettings.schema";
import { LoginPayload, SignupPayload } from "@/schemas/auth.schema";
import { Role, RoleFormData, RoleResponse } from "@/types/roles";

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
  createEnquiry: async (
    data: ContactFormPayload
  ): Promise<ApiResponse<ContactFormPayload>> => {
    try {
      let response = await apiClient.mutate.post<ContactFormPayload>("contactUs.enquiry", data);
      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while submitting enquiry.",
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
// user api
export const userApi = {
  createUser: async (
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
  // get user info
   getUserInfo: async (userId:string): Promise<ApiResponse<ContactUsSettings>> => {
    try {
      const response = await apiClient.query<ContactUsSettings>
      ("contactUs.settings",{},userId);
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
// roles api
export const roleApi = {
  // create role
  createRole: async (
    data: RoleFormData
  ): Promise<ApiResponse<Role>> => {
    try {
      let response = await apiClient.mutate.post<Role>("roles.create", data);
      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error while creating role.",
        status: 500,
      };
    }
  },
  // get roles
   getRoles: async (params:string): Promise<ApiResponse<RoleResponse>> => {
    try {
      const response = await apiClient.query<RoleResponse>("roles.list",{},params);
      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while fetching roles.",
        status: 500,
      };
    }
  },
  // update role
  updateRole: async (roleId:string, data: RoleFormData):
   Promise<ApiResponse<Role>> => {
    try {

      let response = await apiClient.mutate.put<Role>("roles.update", data, {}, roleId);

      // const response = await apiClient.put<Role>("roles.update",data,roleId);
      return response;
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred while updating role.",
        status: 500,
      };
    }
  },
}
