import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchBarUser() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/api/user/search?query=${query}`
          );
          const data = await response.json();
          setResults(data);
          console.log("DATA SEARCH USER");
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [query]);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        variant="outline"
        className="h-9 w-9 flex items-center justify-center rounded-full"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-4 h-4" />
      </Button>
      {/* Aquí podrías renderizar los resultados de la búsqueda */}
    </div>
  );
}
