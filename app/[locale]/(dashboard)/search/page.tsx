"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSearch } from "../../../../hooks/use-search";
import { handleInputChange } from "../../../../lib/search-utils";
import { SearchResultType } from "../../../../types/search/search-result-type";
import { SearchUserType } from "../../../../types/search/search-user-type";
import { SearchTopicType } from "../../../../types/search/search-topic-type";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";  // Import useRouter

export default function SearchPage() {
  const t = useTranslations("SearchPage");
  const router = useRouter();  // Initialize the Next.js router for navigation
  const {
    query,
    recentSearches,
    searchResults,
    searchClicked,
    setQuery,
    setSearchResults,
    addRecentSearch,
    setSearchClicked,
    handleClearAll,
    handleClearSearch,
    handleRemoveRecentSearch,
  } = useSearch();  // Access global state and functions via the context

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search to prevent too many updates on fast typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        setSearchClicked(true);  // Mark search as happening
        handleInputChange(query, setQuery, (results: SearchResultType[]) => {
          setSearchResults(results);  // Set the search results directly
        });
      } else {
        setSearchResults([]);  // Reset search results when query is empty
        setSearchClicked(false);  // Reset to show recent searches if query is cleared
      }
    }, 300);  // Debounce time of 300ms

    return () => clearTimeout(debounceTimer);  // Cleanup the debounce timer
  }, [query]);

  const handleResultClick = (result: SearchResultType) => {
    addRecentSearch(result);  // Track recent searches globally
    setQuery("");  // Clear the search input after a result is clicked
    setSearchClicked(false);  // Reset search clicked

    // Navigate to user profile if it's a user result
    if ('username' in result) {
      router.push(`/${result.username}`);  // Navigate to the user profile
    }

    // Navigate to community page if it's a topic result
    if ('label' in result) {
      const communityLabel = result.label.toLowerCase().replace(/\s+/g, "-");  // Convert label to a URL-friendly format
      router.push(`/c/${communityLabel}`);  // Navigate to the community page by label
    }
  };

  // Narrowing type by checking for unique properties
  const isUser = (result: SearchResultType): result is SearchUserType => {
    return 'username' in result;
  };

  const isTopic = (result: SearchResultType): result is SearchTopicType => {
    return 'emoji' in result;
  };

  const userResults = searchResults.filter(isUser);
  const topicResults = searchResults.filter(isTopic);

  return (
    <div className="flex flex-col gap-4 py-8">
      {/* Search Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder={t("searchPlaceholder")}
        />
        {query && (
          <button onClick={handleClearSearch} className="bg-secondary p-1 rounded-full">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Show recent searches when search has NOT been clicked */}
      {!searchClicked && (
        <>
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
            <ul className="flex space-x-4">
              {recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg flex items-center"
                  onClick={() => handleRemoveRecentSearch(search.id)}  // Use global function to remove recent search
                >
                  {isTopic(search) && <span className="text-lg">{search.emoji}</span>}  {/* Display emoji for topics */}
                  <span className="ml-2 font-bold">{search.label || search.username}</span>  {/* Show label or username */}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* After typing, show search results */}
      {searchClicked && (
        <div>
          {userResults.length === 0 && topicResults.length === 0 ? (
            <div>
              <h2>{t("noResults")}</h2>  {/* Show no results message */}
            </div>
          ) : (
            <>
              {/* Display Users if there are user results */}
              {userResults.length > 0 && (
                <>
                  <h3>{t("userResultsTitle")}</h3>
                  <ul>
                    {userResults.map((user) => (
                      <li
                        key={user.id}
                        className="cursor-pointer flex items-center gap-4 hover:bg-secondary p-2 rounded-lg"
                        onClick={() => handleResultClick(user)}  // Store user in recent searches, close search, navigate
                      >
                        <div className="flex items-center gap-4">
                          <img src={user.profilePicture} alt={user.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p>{user.name}</p>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Display Topics if there are topic results */}
              {topicResults.length > 0 && (
                <>
                  <h3>{t("topicResultsTitle")}</h3>
                  <ul>
                    {topicResults.map((topic) => (
                      <li
                        key={topic.id}
                        className="cursor-pointer flex items-center gap-4 hover:bg-secondary p-2 rounded-lg"
                        onClick={() => handleResultClick(topic)}  // Store topic in recent searches, close search, navigate
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                          <span className="text-lg">{topic.emoji}</span>
                        </div>
                        <span className="ml-2 font-bold">{topic.label}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
