import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { RichText } from "./rich-text";
import { Content } from "@prismicio/client";

export const PostCard = ({
  post,
}: {
  post: Content.BlogPostDocument;
}): JSX.Element => {
  const { data } = post;

  return (
    <PrismicLink
      document={post}
      className="max-w-80 h-[23.75rem] rounded-xl overflow-hidden space-y-4 shadow-lg shadow-muted"
    >
      <div className="max-h-56 overflow-hidden">
        <PrismicNextImage
          field={data.featured_image}
          sizes="100vw"
          className="w-full max-w-80 max-h-60 rounded-xl object-fill"
        />
      </div>
      <div className="flex flex-col gap-3 px-2 pb-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm opacity-75 text-gray-300 border-b-2 w-min pb-2">
            {new Date(data?.publication_date || "").toLocaleDateString()}
          </p>
          <div className="hover:opacity-75 duration-300 ease-in-out transition-all">
            <h2 className="font-semibold text-xl">
              <PrismicText field={data.title} />
            </h2>
          </div>
        </div>
        <div className="text-sm">
          <RichText field={data.description} />
        </div>
      </div>
    </PrismicLink>
  );
};
