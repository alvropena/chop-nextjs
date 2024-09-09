import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BadgeCheck, X } from "lucide-react";
import { SearchRecentType } from "./types/search-recent-type";

export function SearchRecent({ recentSearches, handleSearchResultClick, handleDeleteRecentSearch }: SearchRecentType) {
    return (
        <ul>
            {Array.isArray(recentSearches) && recentSearches.length > 0 ? (
                recentSearches.map((search) => (
                    search && (
                        <li
                            key={search.id || search.label}
                            className="flex items-center justify-between mb-2 hover:bg-secondary p-2 rounded-md cursor-pointer"
                            onClick={() => handleSearchResultClick(search)}
                        >
                            <div className="flex items-center">
                                {search.username ? (
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage
                                            src={search.profile_picture}
                                            alt={search.username}
                                        />
                                        <AvatarFallback>
                                            {search.name ? search.name.charAt(0).toUpperCase() : search.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback>
                                            {search.label && search.label.split(' ')[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className="ml-4">
                                    <p className="font-semibold flex items-center">
                                        {search.username || search.label}
                                        {search.verified && search.username && (
                                            <BadgeCheck className="h-4 w-4 ml-2 text-blue-500" />
                                        )}
                                    </p>
                                </div>
                            </div>
                            <X
                                className="cursor-pointer text-secondary hover:text-gray-700 h-4 w-4"
                                onClick={() => handleDeleteRecentSearch(search.id || search.label)}
                            />
                        </li>
                    )
                ))
            ) : (
                <p>No recent searches</p>
            )}
        </ul>
    );
}
