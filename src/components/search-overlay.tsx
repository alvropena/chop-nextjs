"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function SearchOverlay() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<typeof placeholderData>(
      []
    );

    const recentSearches = [
        { id: 1, username: 'luana_acevedoo', name: 'Luana Acevedo', avatar: '/path/to/avatar1.jpg' },
        { id: 2, username: 'valeryrevello', name: 'Valery Revello', avatar: '/path/to/avatar2.jpg', verified: true, followers: '307K followers' }
    ];

    const placeholderData = [
        { id: 1, username: 'cesarvaldivia134', name: 'César Daniel Valdivia', avatar: '/path/to/avatar1.jpg', followers: 'Followed by nutal...' },
        { id: 2, username: 'churtado_31', name: 'Cesar Hurtado', avatar: '/path/to/avatar2.jpg', followers: 'Followed by fabiolivera0...' },
        { id: 3, username: 'ces_alexander', name: 'César Solís Díaz', avatar: '/path/to/avatar3.jpg', followers: 'Followed by macanturni26...' },
        { id: 4, username: 'cesarcipriani', name: 'César Cipriani Robles', avatar: '/path/to/avatar4.jpg', followers: 'Followed by dani...' },
        // Add more placeholder users
    ];

    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);

            // Simulate a search delay
            const timeoutId = setTimeout(() => {
                setSearchResults(placeholderData);
                setIsLoading(false);
            }, 1500);

            return () => clearTimeout(timeoutId);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <div className="p-4">
            <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 bg-gray-100"
            />

            {searchQuery === "" && (
                <div>
                    <h3 className="font-semibold mb-2">Recent</h3>
                    <ul>
                        {recentSearches.map(search => (
                            <li key={search.id} className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <img
                                        src={search.avatar}
                                        alt={search.username}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-semibold">{search.username}</p>
                                        <p className="text-sm text-gray-500">{search.name} {search.verified && <span className="text-blue-500">&#10004;</span>}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
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
                        {searchResults.map(result => (
                            <Link href={`/${result.username}`} key={result.id}>
                                <li className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <img
                                            src={result.avatar}
                                            alt={result.username}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="font-semibold">{result.username}</p>
                                            <p className="text-sm text-gray-500">{result.name} • {result.followers}</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
}
