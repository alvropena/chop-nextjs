import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SearchResultsType } from "./types/search-results-type";

export function SearchResults({ searchResults, handleSearchResultClick }: SearchResultsType) {
    return (
        <ul>
            {searchResults.map((result) => (
                result && (
                    <li
                        key={result.id || result.label}
                        className="flex items-center justify-between mb-2 hover:bg-secondary p-2 rounded-md cursor-pointer"
                        onClick={() => handleSearchResultClick(result)}
                    >
                        <div className="flex items-center">
                            {result.username ? (
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src={result.profile_picture}
                                        alt={result.username}
                                    />
                                    <AvatarFallback>
                                        {result.name ? result.name.charAt(0).toUpperCase() : result.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                        {result.label && result.label.split(' ')[0]}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            <div className="ml-4">
                                <p className="font-semibold flex items-center">
                                    {result.username || result.label}
                                </p>
                            </div>
                        </div>
                    </li>
                )
            ))}
        </ul>
    );
}
