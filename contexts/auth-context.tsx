"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { useSyncUserWithSession } from "@/hooks/use-SyncUserWithSession"

interface AuthContextType {
  sidebarOpen: boolean;
  openSidebar: () => void; 
  closeSidebar: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Helper functions to update the sidebar state.
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  useSyncUserWithSession()
  return (
    <AuthContext.Provider value={{ sidebarOpen, openSidebar, closeSidebar }}>
      {children} 
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext.
// This hook ensures that the context is used within an `AuthContextProvider`.
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
