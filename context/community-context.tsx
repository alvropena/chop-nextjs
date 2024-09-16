"use client";

import { createContext } from "react";
import { CommunitiesContextType } from "../types/community-context-type";

export const CommunitiesContext = createContext<CommunitiesContextType | undefined>(undefined);
