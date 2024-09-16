"use client";

import { useParams } from 'next/navigation';

export default function CommunityPage() {
  const { label } = useParams();  // Extract the community label from the URL

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold">Welcome to the {label} Community</h1>
      {/* Add more content related to the community if needed */}
    </div>
  );
}
