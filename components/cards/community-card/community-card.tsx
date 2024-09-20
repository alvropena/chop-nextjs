import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMemberCount } from "@/lib/utils";
import Link from "next/link";

interface CommunityCardProps {
  name: string;
  emoji: string;
  members: number;
}

export function CommunityCard({ name, emoji, members }: CommunityCardProps) {
  return (
    <Card className="aspect-square max-w-72 flex flex-col items-center justify-between p-4 py-8 text-center">
      <div className="text-4xl mb-2">{emoji}</div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {formatMemberCount(members)} members
        </p>
      </div>
      <Button asChild>
        <Link href={`/c/${name.toLowerCase()}`}>Join</Link>
      </Button>
    </Card>
  );
}
