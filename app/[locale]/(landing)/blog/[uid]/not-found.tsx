import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">Blog post not found</h2>
      <p>Could not find requested blog post</p>
      <Button asChild variant="default">
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
