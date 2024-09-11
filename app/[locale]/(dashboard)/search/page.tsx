"use client";

import React, { useState, useEffect, useRef } from "react";
import SearchTopicRow from "../../../../components/search-topic-row";
import { useTranslations } from "next-intl";
import { UserProfileData } from "../../../../data/user-profile-data";
import { filterUserProfiles, filterTopics, updateRecentSearches, removeRecentSearch } from "../../../../lib/search-utils";
import { SearchInput } from "../../../../components/search/search-input";
import { SearchRecent } from "../../../../components/search/seach-recent";
import { SearchResults } from "../../../../components/search/search-results";
import { SearchType } from "../../../../types/search/search-type";
import { useSearchTopic } from "../../../../hooks/use-search-topic";

export default function SearchPage() {
  const t = useTranslations("SearchPage");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchType[]>([]);

  // Manage recent searches locally
  const [recentSearches, setRecentSearches] = useState<SearchType[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Use the SearchTopic global state
  const { topics, selectedTopic, handleTopicClick } = useSearchTopic();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filteredUserProfiles = filterUserProfiles(UserProfileData, searchQuery);
      const filteredTopics = filterTopics(topics, searchQuery); // Use global topics
      setSearchResults([...filteredUserProfiles, ...filteredTopics]);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: SearchType) => {
    if (result) {
      const updatedSearches = updateRecentSearches(recentSearches, result);
      setRecentSearches(updatedSearches);  // Update recent searches locally
    }
  };

  const handleDeleteRecentSearch = (id: string) => {
    const updatedSearches = removeRecentSearch(recentSearches, id);
    setRecentSearches(updatedSearches);  // Update recent searches locally
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        inputRef={inputRef}
      />

      {!searchQuery && (
        <SearchTopicRow
          selectedTopic={selectedTopic}
          handleTopicClick={handleTopicClick}
          topics={topics} // Use the global topics
        />
      )}

      <div>
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold">{t("recentTitle")}</h2>
          <button
            onClick={() => setRecentSearches([])} // Clear recent searches
            className="text-blue-500 hover:text-blue-700"
          >
            {t("clearAllButton")}
          </button>
        </div>
      </div>


    </div>
  );
}
