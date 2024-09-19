// "use client";

import React from "react";
// import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { PostCard } from "@/components/prismic/post-card";

export default async function BlogPage() {
  const client = createClient();

  const posts = await client.getAllByType("blog_post");

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {/* {t("title")} */}
      </h1>
      <Badge variant="default" className="mt-4">
        {/* {t("comingSoon")} */}
      </Badge>
      <p className="mt-4 text-muted-foreground">{/* {t("subtitle")} */}</p>
      <PrismicPreview repositoryName={repositoryName} />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div> */}
      {/* Map over each of the blog posts created and display a `PostCard` for it */}
      <section className="grid grid-cols-1 gap-8 max-w-3xl w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
