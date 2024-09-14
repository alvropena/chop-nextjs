"use client";

import React, { useState, ReactNode } from "react";
import { SearchContext } from "../context/search-context";
import { SearchTopicType } from "../types/search/search-topic-type";
import { SearchResultType } from "../types/search/search-result-type";
import { SearchTopicData } from "../data/search-topic-data";
import { handleInputChange } from "../lib/search-utils";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQueryState] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<SearchResultType[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<SearchTopicType[]>([]);
  const [searchResults, setSearchResultsState] = useState<SearchResultType[]>([]);
  const [searchClicked, setSearchClicked] = useState<boolean>(false); // Track whether a search has been clicked

  const setQuery = (query: string) => {
    setQueryState(query);
    setSearchClicked(!!query); // Mark searchClicked as true when the query is not empty
  };

  const addRecentSearch = (search: SearchResultType) => {
    setRecentSearches((prevSearches) => Array.from(new Set([search, ...prevSearches])));
  };

  const setSearchResults = (results: SearchResultType[]) => {
    setSearchResultsState(results);
  };

  // Clear all recent searches
  const handleClearAll = () => {
    setRecentSearches([]);
  };

  // Clear the current search query and results
  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setSearchClicked(false); // Reset searchClicked to false
  };

  // Remove a specific recent search
  const handleRemoveRecentSearch = (id: string) => {
    setRecentSearches((prevSearches) => prevSearches.filter((search) => search.id !== id));
  };

  // Fetch trending topics from hardcoded data
  const fetchTrendingTopics = async () => {
    const trending = SearchTopicData.slice(0, 10);
    setTrendingTopics(trending);
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        recentSearches,
        trendingTopics,
        searchResults,
        searchClicked,
        setQuery,
        setSearchClicked,
        addRecentSearch,
        setSearchResults,
        fetchTrendingTopics,
        handleClearAll,
        handleClearSearch,
        handleRemoveRecentSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
