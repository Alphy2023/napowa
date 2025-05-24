"use client"; // This directive is for Next.js App Router, indicating client-side rendering.

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value.
// It specifies the properties and their types that will be exposed by the context.
interface AuthContextType {
  sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void; // Function to directly set the sidebar's open state.
  openSidebar: () => void; // Convenience function to open the sidebar.
  closeSidebar: () => void; // Convenience function to close the sidebar.
}

// Create the context.
// We initialize it with `undefined` and type it as `AuthContextType | undefined`.
// This allows us to check if the context is being used outside of its provider.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that will wrap parts of your application.
// It manages the state and provides it to its children components.
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // `useState` hook to manage the `sidebarOpen` state.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Helper functions to update the sidebar state.
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    // The `AuthContext.Provider` makes the `value` prop available to all
    // components that consume this context.
    <AuthContext.Provider value={{ sidebarOpen, openSidebar, closeSidebar }}>
      {children} {/* Renders the child components wrapped by this provider. */}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext.
// This hook ensures that the context is used within an `AuthContextProvider`.
export const useAuthContext = (): AuthContextType => {
  // `useContext` hook to access the value from the nearest `AuthContext.Provider`.
  const context = useContext(AuthContext);

  // If `context` is undefined, it means `useAuthContext` was called outside of
  // an `AuthContextProvider`, which is an error.
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }

  // Returns the context value, which is guaranteed to be of type `AuthContextType` here.
  return context;
};
