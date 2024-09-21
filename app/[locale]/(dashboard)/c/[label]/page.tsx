import { formatText } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CommunityPage({
  params,
}: {
  params: { label: string };
}) {
  const label = formatText(params.label);

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-11">
        Welcome to the {label} Community
      </h1>
      <h2 className="text-xl font-semibold mb-20">Lets start learning now!</h2>
      <Button>Begin</Button>
    </div>
  );
}
