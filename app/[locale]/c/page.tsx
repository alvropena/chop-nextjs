import { useRouter } from 'next/navigation';
import React from 'react';

export default function CommunityList() {
  const router = useRouter();

  const handleNavigate = (community: string) => {
    router.push(`/c/${community}`);
  };

  return (
    <div>
      <h1>Community List</h1>
      <button onClick={() => handleNavigate('football')}>Football</button>
      <button onClick={() => handleNavigate('wine')}>Wine</button>
      <button onClick={() => handleNavigate('italian')}>Italian</button>
    </div>
  );
}
