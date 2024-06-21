import { BlogPost, ISnippet } from "./interface/sanity";
export const runtime = "nodejs";

import groq from "groq";
import matter from "gray-matter";

import sanityClient from "./sanityClient";

export async function getAllPostsMeta(limit?: number): Promise<BlogPost[]> {
  const query = groq`*[_type == "post"] | order(publishedAt desc)${
    limit ? `[0..${limit - 1}]` : ""
  } {
    _id,
    title,
    slug,
    keywords,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    categories[]-> { 
      title,          
    },
    author->{name, image {asset -> {_id, url}}},
    organization->{name, image {asset -> {_id, url}}, website},
  }`;

  const res = await sanityClient.fetch(query);
  return res;
}

export async function getPostsByTag(
  category: string,
  limit?: number
): Promise<BlogPost[]> {
  const query = groq`*[_type == "post" && references(*[_type == "category" && title == $category]._id)] | order(publishedAt desc)${
    limit ? `[0..${limit - 1}]` : ""
  } {
    _id,
    title,
    slug,
    keywords,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    categories[]-> { 
      title,          
    },
    author->{name, image {asset -> {_id, url}}},
    organization->{name, image {asset -> {_id, url}}, website},
  }`;

  const params = { category };

  const res = await sanityClient.fetch(query, params);
  return res;
}

export async function getAllSnippetsMeta(limit?: number): Promise<ISnippet[]> {
  const query = groq`*[_type == "snippet"] | order(publishedAt desc)${
    limit ? `[0..${limit - 1}]` : ""
  } {
    _id,
    title,
    slug,
    excerpt,
    language->{name, image {asset -> {_id, url}}},
    publishedAt,
  }`;

  const res = await sanityClient.fetch(query);
  return res;
}

export async function getAllSlugs({
  type,
}: {
  type: "post" | "snippet";
}): Promise<string[]> {
  const query = groq`*[_type == "${type}"] | order(publishedAt desc) {
    slug {
      current
    }
  }`;

  const res_slugs = await sanityClient.fetch(query);
  const slugs = res_slugs.map((item: any) => {
    return item.slug.current;
  });
  return slugs;
}

export async function getAllCategories(): Promise<string[]> {
  const query = groq`*[_type == 'category'] {
      title,
      description
    }`;

  const res_categories = await sanityClient.fetch(query);
  const categories = res_categories.map((item: any) => {
    return item.title;
  });
  return categories;
}

export async function getPostFromSlug(slug: string) {
  const query = groq`*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    keywords,
    excerpt,
    image_url,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    _createdAt,
    publishedAt,
    categories[]-> {
      title,
    },
    author->{name, image {asset -> {_id, url}}},
    organization->{name, image {asset -> {_id, url}}, website},
    content
  }`;

  const post = await sanityClient.fetch(query);

  const source = post.content;
  post["source"] = source;

  return post;
}
export async function getSnippetFromSlug(slug: string) {
  const query = groq`*[_type == "snippet" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    language->{name, image {asset -> {_id, url}}},
    content
  }`;

  const snippet = await sanityClient.fetch(query);

  const source = snippet.content;
  snippet["source"] = source;
  return snippet;
}

export function getTableOfContents(markdown: string) {
  const regXHeader = /#{2,6}.+/g;
  const headingArray = markdown.match(regXHeader)
    ? markdown.match(regXHeader)
    : [];

  const headingCounts = new Map<string, number>();

  return headingArray?.map((heading) => {
    const cleanHeading = heading.replace(/#{2,6}/, "").trim();
    let suffix = "";

    if (headingCounts.has(cleanHeading)) {
      const count = headingCounts.get(cleanHeading)! + 1;
      headingCounts.set(cleanHeading, count);
      suffix = `-${count}`;
    } else {
      headingCounts.set(cleanHeading, 0);
    }

    return {
      level: heading.split("#").length - 1 - 2,
      id: cleanHeading + suffix,
      heading: heading.replace(/#{2,6}/, "").trim(),
    };
  });
}
