"use client";

import { useParams } from 'next/navigation';

export default function CommunityPage() {
  const { username } = useParams();

  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}
