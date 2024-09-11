"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';

export default function CommunityList() {
  const router = useRouter();

  const handleNavigate = (community: string) => {
    router.push(`/c/${community}`);
  };

  return (
    <div>
      <h1>Community List</h1>
      <Button onClick={() => handleNavigate('football')}>Football</Button>
      <Button onClick={() => handleNavigate('wine')}>Wine</Button>
      <Button onClick={() => handleNavigate('italian')}>Italian</Button>
    </div>
  );
}
