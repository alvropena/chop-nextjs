"use client";

import { useContext } from "react";
import { CommunitiesContext } from "../context/community-context";

// Custom hook to use the CommunitiesContext
export const useCommunities = () => {
  const context = useContext(CommunitiesContext);

  // Handle case where the context is not within the provider
  if (!context) {
    throw new Error("useCommunities must be used within a CommunitiesProvider");
  }

  return context;  // Return the value from the context
};
