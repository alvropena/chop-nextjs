"use client";

import { createContext } from "react";
import { CommunitiesContextType } from "../types/community/community-context-type";

export const CommunitiesContext = createContext<
  CommunitiesContextType | undefined
>(undefined);
