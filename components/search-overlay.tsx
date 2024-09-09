"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useSchemaStore } from "../providers/schema-store-provider";
import axios from "axios";
import { Avatar } from "./ui/avatar";

export default function SearchOverlay() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { recentSearches, addRecentSearch } = useSchemaStore(
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

          // Simulate a delay in the search
          const timeoutId = setTimeout(() => {
            setSearchResults(data);
            setIsLoading(false);
          }, 1500);

          // Clean up timeout when effect unmounts or searchQuery changes
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

  // Function to handle clicking on a search result
  const handleSearchResultClick = (result: any) => {
    addRecentSearch(result); // Add the result to recent searches
  };

  // Function to handle clicking on a category button
  const handleCategoryClick = (category: string) => {
    addRecentSearch({ id: category, username: category });
    setSearchQuery(category); // Optionally, you can set the search query to the category
  };

  // Function to handle pressing Enter in the search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery) {
      addRecentSearch({ id: searchQuery, username: searchQuery });
    }
  };

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Add keydown event listener
        className="mb-4 bg-gray-100 dark:bg-black"
      />

      {/* Category buttons (example) */}
      <div className="mb-4">
        <button onClick={() => handleCategoryClick("Category 1")}>
          Category 1
        </button>
        <button onClick={() => handleCategoryClick("Category 2")}>
          Category 2
        </button>
        <button onClick={() => handleCategoryClick("Category 3")}>
          Category 3
        </button>
      </div>

      {searchQuery === "" && (
        <div>
          <h3 className="font-semibold mb-2">Recent</h3>
          <ul>
            {recentSearches.length > 0 &&
              recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="flex items-center justify-between mb-2"
                >
                  <Link href={`/search/${search.username}`}>
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold">{search.username}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}

            {recentSearches.length == 0 && <p>No recent searches</p>}
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
                onClick={() => handleSearchResultClick(result)} // Handle the click
              >
                <Link href={`/search/${result.username}`}>
                  <div className="flex flex-row items-center">
                    <Avatar
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
