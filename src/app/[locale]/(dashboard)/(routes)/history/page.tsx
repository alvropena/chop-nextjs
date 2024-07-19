"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/types/prompt";
import { Table } from "@/components/ui/table";
import Link from "next/link";
import { getData } from "@/lib/utils";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Loading from "@/app/[locale]/loading";

export default function HistoryPage({
  searchParams,
}: {
  searchParams: { q: string; offset: string };
}) {
  const { user, error, isLoading } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [promptsHistory, setpromptsHistory] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define the number of items per page

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const tokenData = await getData(); // Assuming getData returns an object with an accessToken.
        const url = `${baseUrl}/api/v1/prompts/history?token=${tokenData.accessToken}`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(tokenData.accessToken);
        const historyData = response.data;
        setpromptsHistory(historyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (isLoading || loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Error</h1>
        <p>There was an error loading your history.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Not Logged In</h1>
        <p>Please log in to view your history.</p>
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(promptsHistory.length / itemsPerPage);

  // Get current items
  const currentItems = promptsHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 flex max-w-full flex-1 flex-col">
      <h1 className="text-2xl font-bold mb-6">History</h1>
      <div className="">
        <Table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Search Query
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Date & Time
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                View Results
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((search) => (
              <tr
                key={search.id}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {search.text}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(search.created_at).toLocaleString()}
                </td>
                <td className="py-4 px-4 text-sm">
                  <Link href={`/history/${search.id}`}>
                    <Button>View Results</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="m-1">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
