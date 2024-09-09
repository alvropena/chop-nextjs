"use client"

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function BlogPost() {
    const t = useTranslations("BlogPage");
    const params = useParams();
    const postId = params.id;

    // Fetch the blog post data using the postId
    // This could be a fetch request or imported from a static file, etc.

    return (
        <main>
            <h1>{t(`post${postId}.title`)}</h1>
            <p>{t(`post${postId}.excerpt`)}</p>
            {/* Add more details about the post */}
        </main>
    );
}
