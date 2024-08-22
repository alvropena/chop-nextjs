"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useSchemaStore } from "@/providers/schema-store-provider";
import axios from "axios";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { recentSearches, setRecentSearches, addRecentSearch } = useSchemaStore(
    (state) => state
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setIsLoading(true);

        try {
          const response = await axios.get(
            `${baseUrl}/api/user/search?query=${searchQuery}`
          );
          const data = response.data;

          const timeoutId = setTimeout(() => {
            setSearchResults(data);
            setIsLoading(false);
          }, 1500);

          return () => clearTimeout(timeoutId);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearchResultClick = (result: any) => {
    addRecentSearch(result);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 bg-gray-100 dark:bg-black"
      />

      {searchQuery === "" && (
        <div>
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold">Recent</h2>
            <Button variant="link" onClick={() => setRecentSearches([])}>
              Clear All
            </Button>
          </div>
          <ul>
            {recentSearches.length > 0 &&
              recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="flex items-center justify-between mb-2"
                >
                  <Link href={`/search/${search.username}`}>
                    <div className="flex items-center">
                      <img
                        src={search.profile_picture}
                        alt={search.username}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold">{search.username}</p>
                        <p className="text-sm text-gray-500">
                          {search.name}{" "}
                          {search.verified && (
                            <span className="text-blue-500">&#10004;</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}

            {recentSearches.length === 0 && <p>No recent searches</p>}
          </ul>
        </div>
      )}

      {isLoading && searchQuery !== "" ? (
        <div className="flex justify-center items-center h-40">
          <LoaderCircle className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        searchQuery !== "" && (
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="flex items-center justify-between mb-2"
                onClick={() => handleSearchResultClick(result)}
              >
                <Link href={`/search/${result.username}`}>
                  <div className="flex items-center">
                    <img
                      src={result.profile_picture}
                      alt={result.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">{result.username}</p>
                      <p className="text-sm text-gray-500">
                        {result.name} • {result.followers}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
