"use client";

import React, { useState } from "react";
import { SearchTopicContext } from "../context/search-topic-context";
import { SearchTopicType } from "../types/search/search-topic-type";
import { SearchTopicData } from "../data/search-topic-data";

export const SearchTopicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [topics, setTopics] = useState<SearchTopicType[]>(SearchTopicData);
    const [selectedTopic, setSelectedTopic] = useState<string>("");

    const handleTopicClick = (topic: string) => {
        setSelectedTopic(topic);
    };

    return (
        <SearchTopicContext.Provider value={{ topics, selectedTopic, handleTopicClick }}>
            {children}
        </SearchTopicContext.Provider>
    );
};
