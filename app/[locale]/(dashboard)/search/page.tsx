"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSchemaStore } from "../../../../providers/schema-store-provider";
import TopicButtons from "../../../../components/topic-buttons";
import { useTranslations } from "next-intl";
import { UserProfileData } from "../../../../data/user-profile/user-profile-data";
import { TopicData } from "../../../../data/topic/topic-data";
import { filterUserProfiles, filterTopics, updateRecentSearches, removeRecentSearch } from "../../../../lib/search-utils";
import { SearchInput } from "../../../../components/search/search-input";
import { SearchRecent } from "../../../../components/search/seach-recent";
import { SearchResults } from "../../../../components/search/search-results";
import { SearchType } from "../../../../components/search/types/search-type";

export default function SearchPage() {
  const t = useTranslations("SearchPage");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchType[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("geography");

  const {
    recentSearches = [],
    setRecentSearches,
  } = useSchemaStore((state) => state);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filteredUserProfiles = filterUserProfiles(UserProfileData, searchQuery);
      const filteredTopics = filterTopics(TopicData, searchQuery);
      setSearchResults([...filteredUserProfiles, ...filteredTopics]);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: SearchType) => {
    if (result) {
      const updatedSearches = updateRecentSearches(recentSearches, result);
      setRecentSearches(updatedSearches);  // Update recent searches directly
    }
  };

  const handleDeleteRecentSearch = (id: string) => {
    const updatedSearches = removeRecentSearch(recentSearches, id);
    setRecentSearches(updatedSearches);  // Update recent searches directly
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
        <TopicButtons
          selectedTopic={selectedTopic}
          handleTopicClick={setSelectedTopic}
          topics={TopicData.filter(topic => topic.userId === selectedTopic)} // Filter topics based on the user
        />
      )}

      <div>
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold">{t("recentTitle")}</h2>
          <button
            onClick={() => setRecentSearches([])}
            className="text-blue-500 hover:text-blue-700"
          >
            {t("clearAllButton")}
          </button>
        </div>
        <SearchRecent
          recentSearches={recentSearches}
          handleSearchResultClick={handleSearchResultClick}
          handleDeleteRecentSearch={handleDeleteRecentSearch}
        />
      </div>

      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          handleSearchResultClick={handleSearchResultClick}
        />
      )}
    </div>
  );
}
