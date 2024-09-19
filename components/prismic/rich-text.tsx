import { RichTextField } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  PrismicLink,
} from "@prismicio/react";

export const richTextComponents: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children }) => (
    <h1 className="font-bold text-4xl">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="font-bold text-2xl mt-8 mb-4">{children}</h2>
  ),
  heading3: ({ children }) => <h3 className="font-bold text-xl">{children}</h3>,
  paragraph: ({ children }) => <p className="text-lg">{children}</p>,
  hyperlink: ({ children, node }) => (
    <PrismicLink field={node.data} className="font-bold underline">
      {children}
    </PrismicLink>
  ),
  preformatted: ({ children }) => (
    <code className="bg-gray-400 bg-opacity-25 rounded-lg p-8 my-4 text-lg">
      {children}
    </code>
  ),
  list: ({ children }) => (
    <ul className="list-disc pl-4 space-y-3 mb-6 text-lg">{children}</ul>
  ),
  listItem: ({ children }) => <li className="">{children}</li>,
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
