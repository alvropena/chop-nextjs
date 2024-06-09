import React from 'react'
import Link from "next/link"
import { Prompt } from '@/types/types'

const searchHistory: Prompt[] = [
    {
        id: "1",
        text: "Artificial Intelligence",
        created_at: "2023-06-09T10:30:00Z",
        user_id: "user123"
    },
    {
        id: "2",
        text: "React.js tutorials",
        created_at: "2023-06-08T14:45:00Z",
        user_id: "user123"
    },
    {
        id: "3",
        text: "Best restaurants in New York",
        created_at: "2023-06-07T19:20:00Z",
        user_id: "user123"
    },
    {
        id: "4",
        text: "Cryptocurrency market trends",
        created_at: "2023-06-06T11:00:00Z",
        user_id: "user123"
    },
    {
        id: "5",
        text: "Web design inspiration",
        created_at: "2023-06-05T16:15:00Z",
        user_id: "user123"
    },
    {
        id: "6",
        text: "Python programming language",
        created_at: "2023-06-04T09:30:00Z",
        user_id: "user123"
    },
    {
        id: "7",
        text: "Travel destinations in Europe",
        created_at: "2023-06-03T18:45:00Z",
        user_id: "user123"
    },
    {
        id: "8",
        text: "Healthy meal recipes",
        created_at: "2023-06-02T13:20:00Z",
        user_id: "user123"
    },
    {
        id: "9",
        text: "Sustainable fashion brands",
        created_at: "2023-06-01T15:40:00Z",
        user_id: "user123"
    },
    {
        id: "10",
        text: "Blockchain technology",
        created_at: "2023-05-31T11:10:00Z",
        user_id: "user123"
    }
]

export default function HistoryPage() {

    return (
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Search History</h1>
            <div className="overflow-auto max-h-[500px]">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Search Query</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">View Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchHistory.map((search) => (
                            <tr
                                key={search.id}
                                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{search.text}</td>
                                <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{new Date(search.created_at).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm">
                                    <Link href={search.id} className="text-primary hover:underline" prefetch={false}>
                                        View Results
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
