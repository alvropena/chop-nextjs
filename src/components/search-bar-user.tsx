"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function SearchBarUser() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (query.length > 2) {
      // Fetch search results when the query is longer than 2 characters
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/api/user/search?query=${query}`
          );
          const data = await response.json();
          setResults(data); // Update the results state with the fetched data
          console.log(data)
        } catch (error) {
          console.error("Error fetching data:", error); // Log any errors encountered during fetch
        }
      };
      fetchData();
    }
  }, [query]); // Trigger useEffect when query changes

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
      />
    </div>
  );
}
