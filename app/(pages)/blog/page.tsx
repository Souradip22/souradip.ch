import CommonListStyle from "@/components/CommonListStyle";
import { PageHeader } from "@/components/PageHeader";
import { getAllPostsMeta } from "@/lib/sanityContent";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
export const revalidate = 60;
const title = "✍🏻 Blog";
const description =
  "I've been programming for nearly 6 years, working with various technologies, and I'm here to share my journey.";

export const metadata: Metadata = {
  title,
  description,
};

const Blog: FC = async () => {
  const allBlogs = await getAllPostsMeta();
  if (!allBlogs) {
    notFound();
  }
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="mt-8 grid ">
        {allBlogs.map((post) => (
          <CommonListStyle
            key={post.slug.current}
            title={post.title}
            date={post.publishedAt}
            link={`blog/${post.slug.current}`}
          />
        ))}
      </div>
    </>
  );
};

export default Blog;
