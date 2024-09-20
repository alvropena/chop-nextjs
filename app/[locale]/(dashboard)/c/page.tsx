import { CommunityCard } from "@/components/cards/community-card/community-card";

export default function CommunityList() {
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
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-14 max-wd-lg px-10">
      {communities.map((community, index) => (
        <CommunityCard key={index} {...community} />
      ))}
    </div>
  );
}
