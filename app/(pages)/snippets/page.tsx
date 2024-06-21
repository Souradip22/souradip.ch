import CommonListStyle from "@/components/CommonListStyle";
import { Header } from "@/components/Header";
import { getAllSnippetsMeta } from "@/lib/sanityContent";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";
export const revalidate = 60;
const title = "Snippets";
const description =
  "Reusable code snippets that can be easily integrated in your application 🧩.";

export const metadata: Metadata = {
  title,
  description,
};

const Snippet: FC = async () => {
  const allSnippets = await getAllSnippetsMeta();
  if (!allSnippets) {
    notFound();
  }
  return (
    <>
      <Header title={title} description={description} />
      <div className="mt-8 grid ">
        {allSnippets.map((snippet) => (
          <CommonListStyle
            key={snippet.slug.current}
            title={snippet.title}
            date={snippet.publishedAt}
            link={`snippets/${snippet.slug.current}`}
            iconUrl={snippet.language.image.asset.url}
          />
        ))}
      </div>
    </>
  );
};

export default Snippet;
