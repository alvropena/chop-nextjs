"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { CommunitiesContext } from "../context/community-context";
import { CommunityType } from "../types/community/community-type";
import { CommunitiesData } from "../data/communities-data";

export const CommunitiesProvider = ({ children }: { children: ReactNode }) => {
  const [communities, setCommunities] = useState<CommunityType[]>([]);

  // Simulate fetching communities data
  useEffect(() => {
    const fetchCommunities = async () => {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setCommunities(CommunitiesData); // Set placeholder data
    };

    fetchCommunities();
  }, []);

  // Add a community
  const addCommunity = (community: CommunityType) => {
    setCommunities((prevCommunities) => {
      const isCommunityPresent = prevCommunities.some((c) => c.name === community.name);
      if (!isCommunityPresent) {
        return [...prevCommunities, community];
      }
      return prevCommunities;
    });
  };

  // Remove a community by name
  const removeCommunity = (communityName: string) => {
    setCommunities((prevCommunities) => prevCommunities.filter((c) => c.name !== communityName));
  };

  return (
    <CommunitiesContext.Provider value={{ communities, addCommunity, removeCommunity }}>
      {children}
    </CommunitiesContext.Provider>
  );
};
