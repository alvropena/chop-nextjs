"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSearch } from "@/hooks/use-search";
import { handleInputChange, fetchCommunityDetails } from "@/lib/search-utils";
import { SearchResultType } from "@/types/search/search-result-type";
import { SearchUserType } from "@/types/search/search-user-type";
import { SearchCommunityType } from "@/types/search/search-community-type";
import { User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  }, [query]);

  const handleResultClick = (result: SearchResultType) => {
    addRecentSearch(result);
    setQuery("");
    setSearchClicked(false);

    if (isUser(result)) {
      router.push(`/${result.username}`);
    } else if (isCommunity(result)) {
      const communityDetails = fetchCommunityDetails(result.communityId);
      if (communityDetails) {
        const communityLabel = communityDetails.name.toLowerCase().replace(/\s+/g, "-");
        router.push(`/c/${communityLabel}`);
      }
    }
  };

  const isUser = (result: SearchResultType): result is SearchUserType => {
    return "username" in result;
  };

  const isCommunity = (result: SearchResultType): result is SearchCommunityType => {
    return "members" in result;
  };

  const userResults = searchResults.filter(isUser);
  const communityResults = searchResults.filter(isCommunity);

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          className="border border-gray-300 rounded px-3 py-2 w-full pr-10"
          placeholder={t("searchPlaceholder")}
        />
        {query && (
          <button onClick={handleClearSearch} className="absolute right-2 top-2 bg-secondary p-1 rounded-full">
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
            <ul className="flex gap-x-4 flex-wrap">
              {recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="cursor-pointer hover:bg-gray-100/20 duration-300 p-2 rounded-lg flex items-center"
                  onClick={() => handleRemoveRecentSearch(search.id)}
                >
                  {isCommunity(search) && (
                    <span className="text-lg">{fetchCommunityDetails(search.communityId)?.emoji}</span>
                  )}
                  <span className={cn("font-bold", isCommunity(search) && 'ml-2')}>
                    {isCommunity(search)
                      ? fetchCommunityDetails(search.communityId)?.name
                      : isUser(search)
                      ? search.username
                      : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {searchClicked && (
        <div>
          {userResults.length === 0 && communityResults.length === 0 ? (
            <div>
              <h2>{t("noResults")}</h2>
            </div>
          ) : (
            <>
              {userResults.length > 0 && (
                <>
                  <h3>{t("userResultsTitle")}</h3>
                  <ul className="py-2">
                    {userResults.map((user) => (
                      <li
                        key={user.id}
                        className="cursor-pointer flex items-center gap-4 hover:bg-secondary p-2 rounded-lg"
                        onClick={() => handleResultClick(user)}
                      >
                        <div className="flex items-center gap-4">
                        {user.profilePicture ? (
                            <Image
                              src={user.profilePicture}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <User className="w-10 h-10 rounded-full bg-slate-200/30" />
                          )}
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

              {communityResults.length > 0 && (
                <>
                  <h3>{t("communityResultsTitle")}</h3>
                  <ul className="py-2">
                    {communityResults.map((community) => {
                      const communityDetails = fetchCommunityDetails(community.id);
                      return (
                        communityDetails && (
                          <li
                            key={community.id}
                            className="cursor-pointer flex items-center gap-4 hover:bg-secondary p-2 rounded-lg"
                            onClick={() => handleResultClick(community)}
                          >
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                              <span className="text-lg">{communityDetails.emoji}</span>
                            </div>
                            <span className="ml-2 font-bold">{communityDetails.name}</span>
                          </li>
                        )
                      );
                    })}
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
