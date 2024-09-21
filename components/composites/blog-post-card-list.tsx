import { createClient } from "@/prismicio";
import { PostCard } from "@/components/prismic/post-card";

export async function BlogPostCardList() {
  const client = createClient();

  const posts = await client.getAllByType("blog_post");

  return (
    <section className="flex flex-wrap justify-center gap-10 w-full mx-auto max-w-6xl">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
