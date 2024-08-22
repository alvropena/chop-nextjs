"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ProfilePage() {
  // Inline useLocalePath logic
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  return (
    <div className="p-4">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        {/* Profile Picture */}
        <div className="relative">
          <Image
            src="/path-to-profile-pic.jpg"
            alt="Profile"
            width={100}
            height={100}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 ml-4">
          <h2 className="text-2xl font-bold">alvropena</h2>
          <p className="text-gray-500">Alvaro Peña</p>
          <p className="text-sm">can’t rush greatness</p>
        </div>

        {/* Settings Icon */}
        <div className="ml-4">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-4 flex justify-around border-t pt-4">
        <div className="text-center">
          <span className="block text-lg font-bold">5</span>
          <span className="text-sm text-gray-500">Streak</span>
        </div>
        <Link href={getLocalizedPath('/profile/followers')} className="flex flex-col items-center justify-center">
          <div className="text-center cursor-pointer">
            <span className="block text-lg font-bold">442</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
        </Link>
        <Link href={getLocalizedPath('/profile/following')} className="flex flex-col items-center justify-center">
          <div className="text-center cursor-pointer">
            <span className="block text-lg font-bold">423</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </Link>
      </div>

      {/* Profile Actions */}
      <div className="mt-4 flex space-x-2">
        <Link href={getLocalizedPath('/profile/edit')} className="flex-1">
          <Button className="w-full py-2">
            Edit Profile
          </Button>
        </Link>
        <Link href={getLocalizedPath('/profile/analytics')} className="flex-1">
        <Button className="w-full py-2">
            View Analytics
          </Button>
        </Link>
      </div>

      {/* Statistics Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Statistics</h3>
        <div className="mt-4 flex justify-around">
          <div className="text-center">
            <span className="block text-lg font-bold">1</span>
            <span className="text-sm text-gray-500">Day streak</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold">531</span>
            <span className="text-sm text-gray-500">Total XP</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold">Gold</span>
            <span className="text-sm text-yellow-500">Week 1</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold">0</span>
            <span className="text-sm text-gray-500">Top 3 finishes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
