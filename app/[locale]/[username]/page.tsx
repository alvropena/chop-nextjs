"use client";

import { useParams } from "next/navigation";

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const { username: urlUsername } = useParams(); // Extract the username from the URL

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold">
        This is the user profile of: {urlUsername}
      </h1>
    </div>
  );
}
