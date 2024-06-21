import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { ArrowLeftToLineIcon, SquareArrowLeft } from "lucide-react";
import { LinkWrapper } from "@/components/LinkWrapper";
import { Header } from "@/components/Header";
import { siteUrl } from "@/lib/consts";
import type { FC } from "react";
import type { Metadata } from "next";
import { PageProperties } from "@/lib/types";
import {
  getAllPostsMeta,
  getAllSnippetsMeta,
  getPostFromSlug,
  getSnippetFromSlug,
} from "@/lib/sanityContent";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import Link from "next/link";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { Options as RehypeAutoLinkHeadingsOptions } from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

export const runtime = "nodejs";
export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const currentPath = params.slug;
  const allSnippets = await getAllSnippetsMeta();
  const snippet = allSnippets.find(({ slug }) => slug.current === currentPath);

  if (!snippet) {
    return {};
  }

  return {
    title: snippet.title,
  };
};
export const generateStaticParams = async (): Promise<
  PageProperties["params"][]
> => {
  const allSnippets = await getAllSnippetsMeta();
  return allSnippets.map((page) => ({
    slug: page.slug.current,
  }));
};

const rehypePrettyCodeOptions: PrettyCodeOptions = {
  theme: "ayu-dark",
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

const rehypeAutolinkHeadingsOptions: RehypeAutoLinkHeadingsOptions = {
  properties: {
    className: [
      "relative",
      "before:block",
      "before:absolute",
      "before:left-[-1.5rem]",
      "before:text-neutral-500",
      "focus:outline-none",
      "focus:before:text-neutral-600",
      "before:transition-colors",
    ],
    ariaLabel: "Link to section",
  },
};

const Page: FC<PageProperties> = async ({ params }) => {
  const snippet = await getSnippetFromSlug(params.slug);
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeAccessibleEmojis,
        rehypeSlug,
        [rehypePrettyCode as never, rehypePrettyCodeOptions],
        [rehypeAutolinkHeadings as never, rehypeAutolinkHeadingsOptions],
        // rehypePresetMinify as never,
      ],
    },
  };
  if (!snippet) {
    return notFound();
  }

  return (
    <>
      <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-primary-400">
        <SquareArrowLeft className="w-4 h-4 text-inherit" />
        <Link
          className="text-inherit text-sm no-underline hover:text-inherit"
          href="/snippets"
        >
          Go back
        </Link>
      </div>

      <Header title={snippet.title} description={snippet.description} />
      <p className="text-sm !mt-0">
        Published on{" "}
        {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
          new Date(snippet.publishedAt)
        )}{" "}
      </p>
      <div>
        <MDXRemote
          source={snippet.source}
          //@ts-ignore
          options={options}
          components={MDXComponents}
          frontmatter={{
            slug: snippet.slug.current,
            excerpt: snippet.excerpt,
            title: snippet.title,
            date: snippet.publishedAt,
            keywords: snippet.keywords ?? "",
          }}
        />
      </div>
    </>
  );
};

export default Page;
