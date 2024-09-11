"use client";

import { useParams } from 'next/navigation';

export default function CommunityPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Welcome to the {id} Community</h1>
      {/* Add more content about the specific community */}
    </div>
  );
}
