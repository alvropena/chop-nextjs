"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export default function CommunityList() {
  const router = useRouter();

  const handleNavigate = (community: string) => {
    router.push(`/c/${community}`);
  };

  function formatMemberCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}m`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    } else {
      return count.toString();
    }
  }

  const communities = [
    { name: "Tech", emoji: "💻", members: 1500000 },
    { name: "Art", emoji: "🎨", members: 1200000 },
    { name: "Music", emoji: "🎵", members: 1800 },
    { name: "Sports", emoji: "⚽", members: 2000 },
    { name: "Food", emoji: "🍳", members: 1600000 },
    { name: "Travel", emoji: "✈️", members: 1400 },
    { name: "Books", emoji: "📚", members: 1100000 },
    { name: "Fashion", emoji: "👗", members: 1300 },
    { name: "Gaming", emoji: "🎮", members: 2200000 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 max-wd-lg">
      {communities.map((community, index) => (
        <Card
          key={index}
          className="aspect-square flex flex-col items-center justify-between p-4 text-center"
        >
          <div className="text-4xl mb-2">{community.emoji}</div>
          <div>
            <h3 className="text-lg font-semibold mb-1">{community.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {formatMemberCount(community.members)} members
            </p>
          </div>
          <Button onClick={() => handleNavigate(community.name.toLowerCase())}>
            Join
          </Button>
        </Card>
      ))}
    </div>
  );
}
