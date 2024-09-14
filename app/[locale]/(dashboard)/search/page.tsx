"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSearch } from "../../../../hooks/use-search";
import { handleInputChange } from "../../../../lib/search-utils";
import { SearchResultType } from "../../../../types/search/search-result-type";
import { SearchUserType } from "../../../../types/search/search-user-type";
import { SearchTopicType } from "../../../../types/search/search-topic-type";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchPage() {
  const t = useTranslations("SearchPage");
  const router = useRouter();
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
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        setSearchClicked(true);
        handleInputChange(query, setQuery, (results: SearchResultType[]) => {
          setSearchResults(results);
        });
      } else {
        setSearchResults([]);
        setSearchClicked(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, setQuery, setSearchClicked, setSearchResults]);

  const handleResultClick = (result: SearchResultType) => {
    addRecentSearch(result);
    setQuery("");
    setSearchClicked(false);

    if (isUser(result)) {
      router.push(`/${result.username}`);
    } else if (isTopic(result)) {
      const communityLabel = result.label.toLowerCase().replace(/\s+/g, "-");
      router.push(`/c/${communityLabel}`);
    }
  };

  const isUser = (result: SearchResultType): result is SearchUserType => {
    return "username" in result;
  };

  const isTopic = (result: SearchResultType): result is SearchTopicType => {
    return "label" in result;
  };

  const userResults = searchResults.filter(isUser);
  const topicResults = searchResults.filter(isTopic);

  return (
    <div className="flex flex-col gap-4 py-8">
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

      {!searchClicked && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="font-bold">{t("recentSearchTitle")}</h2>
            <button onClick={handleClearAll} className="text-blue-500 hover:text-blue-700">
              {t("clearAllButton")}
            </button>
          </div>

          {recentSearches.length === 0 ? (
            <p className="text-gray-500">{t("noRecentSearches")}</p>
          ) : (
            <ul className="flex space-x-4">
              {recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg flex items-center"
                  onClick={() => handleRemoveRecentSearch(search.id)}
                >
                  {isTopic(search) && <span className="text-lg">{search.emoji}</span>}
                  <span className="ml-2 font-bold">
                    {isTopic(search) ? search.label : isUser(search) ? search.username : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {searchClicked && (
        <div>
          {userResults.length === 0 && topicResults.length === 0 ? (
            <div>
              <h2>{t("noResults")}</h2>
            </div>
          ) : (
            <>
              {userResults.length > 0 && (
                <>
                  <h3>{t("userResultsTitle")}</h3>
                  <ul>
                    {userResults.map((user) => (
                      <li
                        key={user.id}
                        className="cursor-pointer flex items-center gap-4 hover:bg-secondary p-2 rounded-lg"
                        onClick={() => handleResultClick(user)}
                      >
                        <div className="flex items-center gap-4">
                          <Image src={user.profilePicture} alt={user.name} className="w-10 h-10 rounded-full" />
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

              {topicResults.length > 0 && (
                <>
                  <h3>{t("topicResultsTitle")}</h3>
                  <ul>
                    {topicResults.map((topic) => (
                      <li
                        key={topic.id}
                        className="cursor-pointer flex items-center gap-4 hover:bg-secondary p-2 rounded-lg"
                        onClick={() => handleResultClick(topic)}
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
