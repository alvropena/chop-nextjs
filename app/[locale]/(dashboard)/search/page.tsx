"use client";

import React, { useState, useEffect, useRef } from "react";
import TopicButtons from "../../../../components/search-topic-row";
import { useTranslations } from "next-intl";
import { SearchInput } from "../../../../components/search/search-input";
import { searchUsersAndTopics } from "../../../../lib/search-utils";  // Import the search function
import { SearchType } from "../../../../types/search/search-type";

export default function SearchPage() {
  const t = useTranslations("SearchPage");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{ users: SearchType[]; topics: SearchType[] }>({
    users: [],
    topics: [],
  });
  const [recentSearches, setRecentSearches] = useState<SearchType[]>([]);  // Track recent searches
  const [searchClicked, setSearchClicked] = useState<boolean>(false);  // Track if search is active

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search to prevent too many updates on fast typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        const { users, topics } = searchUsersAndTopics(searchQuery);  // Call the search function
        setSearchResults({ users, topics });
        setSearchClicked(true);  // Search has been triggered
      } else {
        setSearchResults({ users: [], topics: [] });
        setSearchClicked(false);  // Clear search when query is empty
      }
    }, 300);  // Debounce time of 300ms

    return () => clearTimeout(debounceTimer);  // Cleanup the debounce timer
  }, [searchQuery]);

  const handleClearAll = () => {
    setRecentSearches([]);  // Clear all recent searches
  };

  const handleClearSearch = () => {
    setSearchQuery("");  // Clear search query
    setSearchResults({ users: [], topics: [] });  // Clear search results
    setSearchClicked(false);  // Return to recent searches view
  };

  const handleResultClick = (result: SearchType) => {
    console.log("Result clicked:", result);  // Perform action on result click (e.g., navigate to profile, topic, etc.)
    // You can implement navigation or action here based on the result (e.g., redirect to user profile or topic)
  };

  const handleRemoveRecentSearch = (searchId: string) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((search) => search.id !== searchId)  // Remove the clicked recent search
    );
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleClearSearch={handleClearSearch}  // Handle clearing search
        inputRef={inputRef}
      />

      {/* Show TopicButtons when search has NOT been clicked */}
      {!searchClicked && (
        <>
          <TopicButtons
            selectedTopic=""  // No need to select topic here, just display default topics
            handleTopicClick={() => { }}  // No interaction needed
            topics={[]}  // Pass any default topics if needed
          />

          <div className="flex justify-between items-center">
            <h2 className="font-bold">{t("recentSearchTitle")}</h2>
            <button
              onClick={handleClearAll}
              className="text-blue-500 hover:text-blue-700"
            >
              {t("clearAllButton")}
            </button>
          </div>

          {/* If no recent searches, display "No recent searches" */}
          {recentSearches.length === 0 ? (
            <p className="text-gray-500">{t("noRecentSearches")}</p>
          ) : (
            <ul>
              {recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => handleRemoveRecentSearch(search.id)}  // Remove recent search on click
                >
                  {search.label}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* After typing, show search results */}
      {searchClicked && (
        <div>
          {searchResults.users.length > 0 || searchResults.topics.length > 0 ? (
            <div>
              {/* Display Users */}
              <h3>{t("userResultsTitle")}</h3>
              <ul>
                {searchResults.users.map((user) => (
                  <li
                    key={user.id}
                    className="cursor-pointer flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg"
                    onClick={() => handleResultClick(user)}  // Make user item clickable
                  >
                    <img src={user.profile_picture} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p>{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Display Topics */}
              <h3>{t("topicResultsTitle")}</h3>
              <ul>
                {searchResults.topics.map((topic) => (
                  <li
                    key={topic.id}
                    className="cursor-pointer flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg"
                    onClick={() => handleResultClick(topic)}  // Make topic item clickable
                  >
                    <div className="flex items-center">
                      <span className="text-lg">{topic.emoji}</span>  {/* Display the emoji */}
                      <span className="ml-2 font-bold">t/{topic.label}</span>  {/* Display the topic name as t/label */}
                    </div>
                    <div className="text-sm text-gray-500">
                      {generateRandomMembers()}  {/* Display random member count */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h2>{t("noResults")}</h2>  {/* Show no results message */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
