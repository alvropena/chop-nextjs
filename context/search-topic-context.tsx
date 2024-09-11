import { createContext } from "react";
import { SearchTopicType } from "../types/search/search-topic-type";

export interface SearchTopicContextType {
    topics: SearchTopicType[];
    selectedTopic: string;
    handleTopicClick: (topic: string) => void;
}

export const SearchTopicContext = createContext<SearchTopicContextType | undefined>(undefined);
